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
