const execMassembly = require("./Massembly.js");
const fs = require('fs')

fs.readFile('./test3.m', 'utf8', function (err,data) {
    if (err) {
        return console.log("Error: " + err);
    }

    execMassembly(data);  
    console.log("Program terminated");
});