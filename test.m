# Test comment
# This is a test source file for the assembly inspired mlang language

out output works
set var 0
out var is $var
if $var == 0
out var is probably zero
if $var != 0
out var is probably not zero

set counter 0
add counter 1
out counter is $counter
if $counter < 10
goto 13

out counter is now 10 -> $counter

set ten $counter
out ten is $ten

mod ten 3
out $ten

end

# this is the end of the file