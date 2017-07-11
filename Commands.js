module.exports = {

    "if":function(line, args, context){
        let rargs = resolveArgs(args, context);
        
        if(
            (rargs[0] > rargs[2] && rargs[1] == ">") ||
            (rargs[0] < rargs[2] && rargs[1] == "<") ||
            (rargs[0] == rargs[2] && rargs[1] == "==") ||
            (rargs[0] <= rargs[2] && rargs[1] == "<=") ||
            (rargs[0] != rargs[2] && rargs[1] == "!=") ||            
            (rargs[0] >= rargs[2] && rargs[1] == ">=")              
        )
            context.nextLine++;
        else
            context.nextLine += 2;  
    },
    "goto":function(line, args, context){
        context.nextLine = parseInt(args[0]) - 1;  
    },
    "add":function(line, args, context){
        if(context[args[0]] == undefined)
            context[args[0]] = 0;
        
        if(typeof context[args[0]] === 'number')
            context[args[0]] += parseFloat(args[1]);
        else
            context[args[0]] += args[1];

        context.nextLine++;  
    },
    "mul":function(line, args, context){
        let rargs = resolveArgs(args, context);
        context[rargs[0]] *= parseFloat(rargs[1]);
        context.nextLine++;  
    },
    "div":function(line, args, context){
        let rargs = resolveArgs(args, context);
        context[rargs[0]] /= parseFloat(rargs[1]);
        context.nextLine++;  
    },
    "mod":function(line, args, context){
        let rargs = resolveArgs(args, context);
        context[rargs[0]] %= parseFloat(rargs[1]);
        context.nextLine++;  
    },
    "set":function(line, args, context){
        let rargs = resolveArgs(args, context);
        let f = parseFloat(rargs[1]);
        if(isNaN(f) == false)
            context[rargs[0]] = f;
        else
            context[rargs[0]] = rargs[1];

        context.nextLine++;  
    },
    "out":function(line, args, context){
        let rargs = resolveArgs(args, context);
        console.log(rargs.join(" "));

        context.nextLine++;
    },
    "end":function(line, args, context){
        context.__end = true;
    },

}

// Replacing $variable with the variable value
function resolveArgs(args, context){
    let resolved = [];

    for(let a in args)
        if(args[a] != "" && args[a].startsWith("$") && context[args[a].substring(1)] != undefined)
            resolved.push(context[args[a].substring(1)]);
        else
            resolved.push(args[a]);

    return resolved;
}