module.exports = {

    "check":function(line, args, context){
        let left = getRightHandValue(args[0], context);
        let right = getRightHandValue(args[2], context);
        
        if(
            (left > right && args[1] == ">") ||
            (left < right && args[1] == "<") ||
            (left == right && args[1] == "==") ||
            (left <= right && args[1] == "<=") ||
            (left != right && args[1] == "!=") ||            
            (left >= right && args[1] == ">=")              
        )
            context.nextLine++;
        else
            context.nextLine += 2;  
    },
    "jmp":function(line, args, context){
        context.nextLine = context.labels[args[0]];
    },
    "add":function(line, args, context){
        setRegister(
            args[0], 
            getRightHandValue(args[0], context) + getRightHandValue(args[1], context), 
            context
        );
        context.nextLine++;  
    },
    "sub":function(line, args, context){
        setRegister(
            args[0], 
            getRightHandValue(args[0], context) * getRightHandValue(args[1], context), 
            context
        );
        context.nextLine++;  
    },
    "mul":function(line, args, context){
        setRegister(
            args[0], 
            getRightHandValue(args[0], context) * getRightHandValue(args[1], context), 
            context
        );
        context.nextLine++;  
    },
    "div":function(line, args, context){
        setRegister(
            args[0], 
            getRightHandValue(args[0], context) / getRightHandValue(args[1], context), 
            context
        );
        context.nextLine++;  
    },
    "mod":function(line, args, context){
        setRegister(
            args[0], 
            getRightHandValue(args[0], context) % getRightHandValue(args[1], context), 
            context
        );
        context.nextLine++;  
    },
    "mov":function(line, args, context){
        setRegister(args[0], getRightHandValue(args[1], context), context);
        context.nextLine++;  
    },
    "out":function(line, args, context){
        console.log(getRightHandValue(args[0], context));
        context.nextLine++;
    },
    "end":function(line, args, context){
        context.__end = true;
    },
    "push":function(line, args, context){
        context.stack.push(getRightHandValue(args[0], context));
        context.nextLine++;
    },
    "pop":function(line, args, context){
        let returnvalue = context.stack.pop();
        if(returnvalue == undefined)
            throw "Stack is empty, unable to pop";

        setRegister(args[0], returnvalue, context);

        context.nextLine++;
    }
}

function getRightHandValue(value, context){
    if(value.startsWith("r") && context[value] != undefined)
        return context[value];
    
    let number = parseFloat(value);
    if(isNaN(number) == false)
        return number;

    throw value + " is not a right hand value";
}

function setRegister(name, value, context){
    if (name.toLowerCase().startsWith("r") && 
            name.length == 2 && 
            "abcxyz".indexOf(name.substr(1).toLowerCase() != -1) &&
            isNaN(parseFloat(value)) == false)
    {
        context[name] = value;
    }
    else 
        throw name + " is not a register name or " + value + " is not a number";
}