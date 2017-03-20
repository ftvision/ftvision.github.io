#----
#string related operations
#-----
#string is immutable
s = 'string' 

# 1. swap
s.swapcase()
# equivalent to
swap = ''.join([i.lower() if i.isupper() else i.upper for i in s]) 

# 2. split and join
a = "this is a string"
a = a.split(" ") # become a list: ['this', 'is', 'a', 'string'].
a = a.rsplit(" ") # what is rsplit()?
a = ['this', 'is', 'a', 'string']
a = "-".join(a) #become a string: this-is-a-string

# 3. format
a = "first name"
b = "last name"
print "Hello {0} {1}! You just delved into python.".format(a, b)
print "Hello %s %s! You just delved into python." % (a, b)

# 4. update string content
# - string is immutable
# abracadabra -> abrackdabra

##method 1
string = "abracadabra"
l = list(string)
l[5] = 'k'
string = ''.join(l)

##method 2
string = string[:5] + "k" + string[6:]

# 5. strip the leading and trailing whitespace characters
testString2 = "Hello World!  "
testString2.strip()


## regular expression
#http://www.thelearningpoint.net/computer-science/learning-python-programming-and-data-structures/learning-python-programming-and-data-structures--tutorial-13--regular-expression-matching
#https://developers.google.com/edu/python/regular-expressions
#https://regex101.com/#python
import re
re.search('@gmail\.com$',emailID)
reg = re.compile(input()) #compile a regular expression
reg.search(str) #use compiled reg to process string

#The re.search() expression scans through a string looking for the first location where the regex pattern produces a match. 
#It either returns a MatchObject instance or returns None if no position in the string matches the pattern.
re.search(r"ly","similarly")
#The re.match() expression only matches at the beginning of the string. 
#It either returns a MatchObject instance or returns None if the string does not match the pattern. 
re.match(r"ly","ly should be in the beginning")
#The re.split() expression splits the string by occurrence of a pattern.
re.split("-","+91-011-2711-1111") #['+91', '011', '2711', '1111']
re.split(r'[,.]',input())  #split with multiple characters
#A group() expression returns one or more subgroups of the match. 
m = re.match(r'(\w+)@(\w+)\.(\w+)','username@hackerrank.com')
m.group(0)       # The entire match 
m.group(1)       # The first parenthesized subgroup.
m.group(2)       # The second parenthesized subgroup.
m.group(1,2,3)   # Multiple arguments give us a tuple.
#A groups() expression returns a tuple containing all the subgroups of the match. 
m.groups()
#A groupdict() expression returns a dictionary containing all the named subgroups of the match, keyed by the subgroup name. 
m = re.match(r'(?P<user>\w+)@(?P<website>\w+)\.(?P<extension>\w+)','myname@hackerrank.com')
m.groupdict() #{'website': 'hackerrank', 'user': 'myname', 'extension': 'com'}
#The expression re.findall() returns all the non-overlapping matches of patterns in a string as a list of strings. 
re.findall(r'\w','http://www.hackerrank.com/')
#The expression re.finditer() returns an iterator yielding MatchObject instances over all non-overlapping matches for the re pattern in the string. 
re.finditer(r'\w','http://www.hackerrank.com/') #<callable-iterator object at 0x0266C790>
map(lambda x: x.group(),re.finditer(r'\w','http://www.hackerrank.com/'))
#get input of re-expr
v = "aeiou"
c = "qwrtypsdfghjklzxcvbnm"
m = re.findall(r"(?<=[%s])([%s]{2,})[%s]" % (c, v, c), input(), flags = re.I)
#re.start(), re.end() These expressions return the indices of the start and end of the substring matched by the group.
m = re.search(r'\d+','1234')
m.end() #4
m.start() #0
#The re.sub() tool (sub stands for substitution) evaluates a pattern and, for each valid match, it calls a method (or lambda). 
def square(match):
    number = int(match.group(0))
    return str(number**2)

print re.sub(r"\d+", square, "1 2 3 4 5 6 7 8 9")
#1 4 9 16 25 36 49 64 81