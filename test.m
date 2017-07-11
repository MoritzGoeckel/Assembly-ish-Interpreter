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
goto 22
# Goto is used for conditions and for loops
# Parameter is the line number

out counter is now 10 -> $counter

# You can set a variable with the value 
# of another variable with the $ sign 
set ten $counter
out ten is $ten

# Divide, the value is stored in the 1th variable
div ten 3

# Multiply
mul ten 3

# Modulo
mod ten 3

out $ten

end

# this is the end of the file