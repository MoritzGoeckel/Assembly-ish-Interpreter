# Assembly-ish interpreter
This is an Interpreter for an assembly like language in Node.js.
It's Massembly, the M stands for Moritz :)
## List of commands
* mov reg|mem num|reg|mem
* add reg num|reg
* sub reg num|reg
* mul reg num|reg
* div reg num|reg
* mod reg num|reg
* out num|reg
* end
* push num|reg
* pop reg
* label:
* and reg num|reg
* or reg num|reg
* xor reg num|reg
* not reg
* cmp num|reg num|reg
* je label
* jne label
* jg label
* jge label
* jl label
* jle label
* jmp label
* check num|reg op num|reg
* dbg
* ; comment
## Example program: Finding primes
```
;Finding prime numbers
;Sieve of Eratosthenes

;Heighest number
mov rm 200

;Start number
mov rs 2

;Create a list with numbers
mov ry rs
start:
mov [ry] ry
add ry 1
cmp ry rm
jle start

;Set start adress
mov ry rs
out rs

conductSearch:

mov rx [ry]
mov rb ry
deletingNonPrimes:
add rb rx
mov [rb] 0
cmp rb rm
jle deletingNonPrimes

findNext:
add ry 1
cmp ry rm
jg shutdown
mov ro [ry]
cmp ro 0
je findNext

out ry
jmp conductSearch

shutdown:
end
```
This will output
```
2
3
5
7
11
13
17
...
```
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
## Extending the interpreter
Just extend the commands object in the Commands.js. Key is the command and value is a function receiving the entire line string, the arguments array and the context object as parameters.

The function can change the context, end the software and decide which line is the next to execute.
## Implementing commands
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