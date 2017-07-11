commands = require("./Commands.js");

module.exports = class{

    constructor(text, context){
        
        if(context == null || context == undefined)
            context = {"nextLine":0};
        else
            context.nextLine = 0;

        function isLineExecutable(line){
            return line.startsWith("#") == false && line.match(/\S+/g);
        }
        
        let lines = text.split("\r\n");

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
    }

}