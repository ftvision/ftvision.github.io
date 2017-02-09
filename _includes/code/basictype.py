#!/usr/bin/env python 
#!/usr/bin/python

#Either the usage of #!/usr/bin/env python
#or #!/usr/bin/python plays a role if the script is executable, 
#and called without the preceding language. The script then calls 
#the language's interpreter to run the code inside the script, and 
#the shebang is the "guide" to find, in your example,  python.

# Get Type

type('Hello, World') # <type 'str'>

# Numbers: int, float
intValue = 17
floatValue = 3.2
longIntValue = 10000000L #long integers

(1,000,000) => (1,0,0)
#not a number, becomes a tuple

# Strings: string
strValue = 'Hello World'
numStrValue = '17' #this is a string

# Boolean: True False
true = True
false = False

type(True)
#<type 'bool'>

x != y
x > y
x < y
x >= y
x <= y
x == y
true and True
false or False
not False

# Constant


# Basic Operations

1 + 2
2 - 2
3 * 1
3 ** 2
2 / 4 #python 2 this is floor division
2 / 4.0 #float division
2 // 4 #python 3 floor division
from __future__ import division #now python 2 will use the same as python 3
remainder = 3 % 4 #modulus
#Always be careful of the devision

# String 
## concatenation
'a' + 'b' #'ab'
##reptition
'a' * 3 #'aaa'

# Comment; This is a Comment
"""This is a long comment,
It can go several lines. """


raw = r'this\t\n and that'
print raw     ## this\t\n and that

#string methods: http://docs.python.org/library/stdtypes.html#string-methods

#pay attention to escape \t

#unicode
ustring = u'A unicode \u018e string \xf1'
s = ustring.encode('utf-8') #'A unicode \xc6\x8e string \xc3\xb1'
t = unicode(s, 'utf-8')             ## Convert bytes back to a unicode string

#Type Convert
speed='1'
x = int(speed)
#x = 1, <type 'int'>

#check type
if not isinstance(n, int):

#----------string
fruit = 'banana'
#0,1,2,3,4,5
letter = fruit[1]
len(fruit) #6