; This is how a comment looks
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
cmp ra 1
jg outstart