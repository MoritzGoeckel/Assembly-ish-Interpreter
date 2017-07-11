module.exports = {

    "ifmore":function(line, args, context){
        let rargs = resolveArgs(args, context);
        
        if(rargs[0] > rargs[1])
            context.nextLine++;
        else
            context.nextLine += 2;  
    },
    "goto":function(line, args, context){
        context.nextLine = args[0];  
    },
    "add":function(line, args, context){
        if(context[args[0]] == undefined)
            context[args[0]] = 0;
        
        //Int / String?
        context[args[0]] += int(args[1]);
        context.nextLine++;  
    },
    "set":function(line, args, context){
        context[args[0]] = args[1];
        context.nextLine++;  
    },
    "out":function(line, args, context){
        let rargs = resolveArgs(args, context);
        console.log(rargs.join(" "));

        context.nextLine++;
    },
    "end":function(line, args, context){
        context.end = true;
    },

}

function resolveArgs(args, context){
    let resolved = [];
    for(let a in args)
        if(a != "" && a.startsWith("$") && context[a] != undefined)
            resolved.push(context[args[a]].substring(1));
        else
            resolved.push(args[a]);
    return resolved;
}