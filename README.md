# An assembly-ish interpreter
This is an Interpreter for a assembly like language in Nodejs.

## Running the interpreter
An example on how to run the interpreter check out the main.js
```js
//Including the Interpreter
const Program = require("./Program.js");
const fs = require('fs')

//Load the source code from a file
fs.readFile('./test.m', 'utf8', function (err,data) {
    if (err) {
        return console.log("Error: " + err);
    }

    let p = new Program(data); // <-- Create a program with 
    // the source code and execute it
});
```

## Example source code of a program
This is an interpreter for a custom language which is highly inspired by assembly
```
# This is how a comment looks

# Output of a string
out output works

# Creating or overriding a variable
set var 0

# Printing out the variable
# Reading a value needs a preceeding "$"
out var is $var

# Do a simple condition with < > == != <= >=
# If the condition is met the next line is executed
# Else the next line will be skipped
if $var == 0
out var is probably zero
if $var != 0
out var is probably not zero

set counter 0
add counter 1
out counter is $counter
if $counter < 10
goto 46
# Goto is used for conditions and for loops
# Parameter is the line number

out counter is now 10 -> $counter

# You can set a variable with the value 
# of another variable with the $ sign 
set ten $counter
out ten is $ten

# Divide, the value is stored in the 1th variable
div ten 3
out $ten

# Multiply
mul ten 3
out $ten

# Modulo
mod ten 3
out $ten

end

# this is the end of the file
```

## Extending the interpreter
Just extend the commands object in the Commands.js. Key is the command and value is a function recieving the entire line string, the arguments array and the context object as parameters.

The function can change the context, end the software and decide which line is the next to execute.

### Example commands
```js
// Ending the software
"end":function(line, args, context){
    context.__end = true; // Ending the software
},
// Doing an output
"out":function(line, args, context){
    // Replacing $variables with the value
    let rargs = resolveArgs(args, context); 
    console.log(rargs.join(" "));

    context.nextLine++; // Going to the next line
},
// Multiplication
"mul":function(line, args, context){
    let rargs = resolveArgs(args, context);
    // The context is a key value dictionary
    context[rargs[0]] *= parseFloat(rargs[1]); // Changing the context
    context.nextLine++;  
}
```