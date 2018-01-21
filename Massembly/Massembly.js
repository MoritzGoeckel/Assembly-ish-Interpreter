commands = require("./Commands.js");

module.exports = function(text, context)
{
    if(context == null || context == undefined)
        context = {"nextLine":0};
    else
        context.nextLine = 0;

    text = text.replace(/;.*/g, ''); //Delete comments
    let lines = text.split("\r\n")
        .filter(function(el) {return el.length != 0}); //Delete empty lines

    console.log(lines);

    let labels = {};
    let labelPattern = new RegExp("^[A-Za-z]+:$");
    for(let i in lines){
        if(lines[i].match(labelPattern) != null)
            labels[lines[i].substr(0, lines[i].length - 1)] = i;
    }
    
    context.labels = labels;
    context.stack = [];
    context.memory = {};
    context.registers = {};

    function isLineExecutable(line){
        return line.match(labelPattern) == null;
    }

    while(context.nextLine < lines.length && context.__end != true){
        let line = lines[context.nextLine];
        if(isLineExecutable(line)){
            line += " ";
            let args = line.split(" ");
            let name = args.shift();
            commands[name](line.substr(name.length + 1, line.length - name.length - 2), args, context);
        }
        else{
            context.nextLine++;
        }
    }
};