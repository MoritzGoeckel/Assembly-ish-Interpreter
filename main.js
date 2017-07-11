const Program = require("./Program.js");
const fs = require('fs')

fs.readFile('./test.m', 'utf8', function (err,data) {
    if (err) {
        return console.log("Error: " + err);
    }

    let p = new Program(data);  
    console.log("Program terminated");
});