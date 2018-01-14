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
halt