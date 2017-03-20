#complex use cmath 
from cmath import *
s = raw_input()
#complex() functin can get string or numbers
#complex(s)
#complex(real, imag)
# length
print abs(complex(s)) 
# phase
print phase(complex(s))

# power
a ** b
pow(a, b)
pow(a,b,m) # a^b mod m

# get quotient a/b and remainder a % b
divmod(a, b) 

## Bitwise AND question
##
# https://www.hackerrank.com/challenges/30-bitwise-and