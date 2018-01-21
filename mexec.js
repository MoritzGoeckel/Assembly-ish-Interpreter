const execMassembly = require("./Massembly/Massembly.js");
const fs = require('fs')

if(process.argv.length != 3){
    console.log("Provide source file path as parameter");
    console.log("Usage: node mexec.js <file>");
}
else{
    fs.readFile(process.argv[2], 'utf8', function (err,data) {
        if (err) {
            return console.log("Error: " + err);
        }

        execMassembly(data);  
        console.log("Program terminated");
    });
}