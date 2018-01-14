# An assembly-ish interpreter
This is an Interpreter for a assembly like language in NodeJS
## List of commands
* check num|reg op num|reg
* jmp label
* add reg num|reg
* sub reg num|reg
* mul reg num|reg
* div reg num|reg
* mod reg num|reg
* mov reg num|reg
* out num|reg
* end
* push num|reg
* pop reg
* label:

## Running the interpreter
An example on how to run the interpreter check out the main.js
```js
//Including the Interpreter
const execMassembly = require("./Massembly.js");
const fs = require('fs')

//Load the source code from a file
fs.readFile('./test.m', 'utf8', function (err,data) {
    if (err) {
        return console.log("Error: " + err);
    }

    execMassembly(data); // <-- Create a program with 
    // the source code and execute it
});
```

## Example program
```
# This is how a comment looks
mov rx 0
start:
add rx 1
push rx
check rx < 5
jmp start
out rx

outstart:
pop ra
out ra
check ra > 1
jmp outstart
```

## Extending the interpreter
Just extend the commands object in the Commands.js. Key is the command and value is a function recieving the entire line string, the arguments array and the context object as parameters.

The function can change the context, end the software and decide which line is the next to execute.

### Example commands
```js
// Ending the software
"end":function(line, args, context){
    context.__end = true;
},
// Doing an output
"out":function(line, args, context){
    console.log(getRightHandValue(args[0], context));
    context.nextLine++;
},
// Multiplication
"mul":function(line, args, context){
    setRegister(
        args[0], 
        getRightHandValue(args[0], context) * getRightHandValue(args[1], context), 
        context
    );
    context.nextLine++;  
}
```