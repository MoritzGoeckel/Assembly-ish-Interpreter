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
    "cmp":function(line, args, context){
        let left = getRightHandValue(args[0], context);
        let right = getRightHandValue(args[1], context);
        context.cmpflag = left - right;

        context.nextLine++;
    },
    "je":function(line, args, context){
        if(context.cmpflag == 0)
            context.nextLine = context.labels[args[0]];
        else
            context.nextLine++;
    },
    "jne":function(line, args, context){
        if(context.cmpflag != 0)
            context.nextLine = context.labels[args[0]];
        else
            context.nextLine++;
    },
    "jg":function(line, args, context){
        if(context.cmpflag > 0)
            context.nextLine = context.labels[args[0]];
        else
            context.nextLine++;
    },
    "jge":function(line, args, context){
        if(context.cmpflag >= 0)
            context.nextLine = context.labels[args[0]];
        else
            context.nextLine++;
    },
    "jl":function(line, args, context){
        if(context.cmpflag < 0)
            context.nextLine = context.labels[args[0]];
        else
            context.nextLine++;
    },
    "jle":function(line, args, context){
        if(context.cmpflag <= 0)
            context.nextLine = context.labels[args[0]];
        else
            context.nextLine++;
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
        let value;

        if(args[1].startsWith("["))
            value = context.memory[getRightHandValue(args[1].substr(1, args[1].length - 2), context)]; //Read memory
        else
            value = getRightHandValue(args[1], context); //Read regiester

        if(args[0].startsWith("["))
            context.memory[getRightHandValue(args[0].substr(1, args[0].length - 2), context)] = value; //Write memory

        if(args[0].toLowerCase().startsWith("r")) //Write regiester
            setRegister(args[0], value, context);

        context.nextLine++;  
    },
    "out":function(line, args, context){
        console.log(getRightHandValue(args[0], context));
        context.nextLine++;
    },
    "halt":function(line, args, context){
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
    },
    "or":function(line, args, context){
        let output = getRightHandValue(args[0], context) > 0 || getRightHandValue(args[1], context) > 0 ? 1 : 0;
        setRegister(args[0], output, context);

        context.nextLine++;
    },
    "and":function(line, args, context){
        let output = getRightHandValue(args[0], context) > 0 && getRightHandValue(args[1], context) > 0 ? 1 : 0;
        setRegister(args[0], output, context);

        context.nextLine++;
    },
    "xor":function(line, args, context){
        let output = getRightHandValue(args[0], context) > 0 != getRightHandValue(args[1], context) > 0 ? 1 : 0;
        setRegister(args[0], output, context);

        context.nextLine++;
    },
    "not":function(line, args, context){
        let output = getRightHandValue(args[0], context) > 0 ? 0 : 1;
        setRegister(args[0], output, context);

        context.nextLine++;
    },
    "dbg":function(line, args, context){
        console.log(context);
        context.nextLine++;
    }
}

function getRightHandValue(value, context){
    if(value.startsWith("r") && context.registers[value] != undefined)
        return context.registers[value];
    
    let number = parseFloat(value);
    if(isNaN(number) == false)
        return number;

    throw value + " is not a right hand value";
}

function setRegister(name, value, context){
    if (name.toLowerCase().startsWith("r") && 
            name.length == 2 && 
            "abcdefghijklmnopqrstovwxyz".indexOf(name.substr(1).toLowerCase() != -1) &&
            isNaN(parseFloat(value)) == false)
    {
        context.registers[name] = value;
    }
    else 
        throw name + " is not a register name or " + value + " is not a number";
}