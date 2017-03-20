#---------
#List
#---------
#
emptyList = []

array[-1]
#last
array[-2]
#second to last

#array indices are "slice"

s = 'Monty Python'
s[0:5]
#Monty

fruit = 'banana'
fruit[:3]
#'ban'
fruit[3:]
#'ana'
fruit[3:3]
#''

#even  elements
s[::2]
#odd elements
s[1::2]

#get the second largest
sorted(list(set(arr)))[-2]

#-------
#String
#-------
#String is immutable
greeting = 'Hello, world!'
greeting[0] = 'J'
#TypeError: 'str' object does not support item assignment

word = 'banana'
new_word = word.upper()
print new_word
#'BANANA'
##find(sub[, start[, end]]),
index = word.find('na')
index_start_from_3rd = word.find('na', 3) #4
index_start_1st_end_2nd = word.find('b', 1, 2) #-1
## in operator
'a' in 'banana'
#True

## string comparison
if word == 'banana': #equal
	print 'good'

if word < 'banana': #comparison of alphabetical
    print 'Your word,' + word + ', comes before banana.'
elif word > 'banana':
    print 'Your word,' + word + ', comes after banana.'
else:
    print 'All right, bananas.'

### string validation
c.islower() #is lower case
str.isalnum() 
str.isalpha() 
str.isdigit() 
str.islower() 
str.isupper() 
str.capitalize() #get capitalized word: hello -> Hello
### Text alignment
width = 20
filler = '-'
str.ljust(width, filler)
str.center(width, filler)
str.rjust(width, filler)

#if no filler, fill with space ' '

### Text Warp

#return a list
textwrap.wrap(s, length) 
#The wrap() function wraps a single paragraph in text (a string) so that every line is width characters long at most. 
#It returns a list of output lines.

#return a string
textwrap.fill(s, length) 
#The fill() function wraps a single paragraph in text and returns a single string containing the wrapped paragraph.

#Formatting digits with width
width = len("{0:b}".format(number))
for i in xrange(1,number+1):
    print "{0:{width}d} {0:{width}o} {0:{width}X} {0:{width}b}".format(i, width=width)

#Lists Like a string, a list is a sequence of values. In a string, the values are characters; in a list,
#they can be any type. The values in a list are called elements or sometimes items.

[10, 20, 30, 40]

['spam', 2.0, 5, [10, 20]]
empty = []
#list are mutable
numbers = [17, 123]
numbers[1] = 5 #numbers = [17, 5]

17 in numbers

#travers a list
for cheese in cheeses:
    print cheese

for i in range(len(numbers)):
    numbers[i] = numbers[i] * 2

#comprehension
[ expr for var in list ]

nums = [1, 2, 3, 4]
squares = [ n * n for n in nums ]   ## [1, 4, 9, 16]

nums = [2, 8, 1, 6]
small = [ n for n in nums if n <= 2 ]  ## [2, 1]
#A for loop over an empty list never executes the body: 
for x in []:
    print 'This never happens.'

#concatenation
a = [1,2,3]
b = [4,5,6]
c = a+b
#c = [1, 2, 3, 4, 5, 6]

#repetition
[0] * 4
#[0, 0, 0, 0]

#slicing
c[1:3]
#2,3

#appending
t = ['a', 'b', 'c']
t.append('d')
#t -> ['a', 'b', 'c', 'd']; in place change

#poping out (like stack)
t.pop() # pop the last one
t.pop(0) # pop the first one

#extend
t2 = ['e', 'f']
t.extend(t2)
#t -> ['a', 'b', 'c', 'd', 'e', 'f']; in place change

####List Methods
# https://docs.python.org/2/tutorial/datastructures.html
# append, extend, insert, remove, pop, index, count, sort, reverse

t = ['d', 'c', 'e', 'b', 'a']
sorted(t) 
t.sort()

#List methods are all void; they modify the list and return None. 
t = t.sort()
#t -> None

strs = ['ccc', 'aaaa', 'd', 'bb']
print sorted(strs, key=len)  ## ['d', 'bb', 'ccc', 'aaaa']
    print sorted(strs, key=str.lower)  ## ['aa', 'BB', 'CC', 'zz']

## Say we have a list of strings we want to sort by the last letter of the string.
strs = ['xc', 'zb', 'yd' ,'wa']

## Write a little function that takes a string, and returns its last letter.
## This will be the key function (takes in 1 value, returns 1 value).
def MyFn(s):
return s[-1]

## Now pass key=MyFn to sorted() to sort by the last letter:
print sorted(strs, key=MyFn)  ## ['wa', 'zb', 'xc', 'yd']

#map, filter, reduce
t = [1,2,3]
sum(t)
#6

#pop an element by index
t = ['a', 'b', 'c']
x = t.pop(1)
# x-> t[1] -> 'b'
# t-> ['a', 'c']  in place change

#delete an element by index
t = ['a', 'b', 'c']
del t[1]
# t-> ['a', 'c'] 

#remove an element by concatenation
t = ['a', 'b', 'c']
t.remove('b')
# t-> ['a', 'c'] 

t = ['a', 'b', 'c', 'd', 'e', 'f']
del t[1:5]
# t->['a','f']
# As usual, the slice selects all the elements up to, 
# but not including, the second index.

#string change to list
s = 'spam'
t = list(s)
#t -> ['s', 'p', 'a', 'm']
s = 'pining for the fjords'
t = s.split()
#t -> ['pining', 'for', 'the', 'fjords']
s = 'spam-spam-spam'
delimiter = '-'
s.split(delimiter)
#['spam', 'spam', 'spam']
t = ['pining', 'for', 'the', 'fjords']
delimiter = ' '
delimiter.join(t) 
#note: this is a method of delimiter
#'pining for the fjords'

#---------
#dictionary
#---------
eng2sp = dict() #empty initialization eng2sp -> {}
eng2sp['one'] = 'uno' #add one element
eng2sp = {'one': 'uno', 'two': 'dos', 'three': 'tres'} #initialization with elements

print eng2sp
#{'one': 'uno', 'three': 'tres', 'two': 'dos'}
#order of the keys are unpredictable
print eng2sp['two'] #>>'dos'
len(eng2sp) #>> 3
'one' in eng2sp #>> True
'uno' in eng2sp #>> False
vals = eng2sp.values() #all values
'uno' in vals #>> True

#loop dictionary
def print_hist(h):
    for c in h:
			print c, h[c]

def reverse_lookup(d, v):
    for k in d:
        if d[k] == v:
            return k
    raise ValueError('value does not appear in the dictionary')
#The raise statement causes an exception; 
#in this case it causes a ValueError, which generally 
#indicates that there is something wrong with the value of a parameter.

#!list can be the value of dict
#!list cannot be the key of dict

#use dict as a memo: an example of fibonacci serial

known = {0:0, 1:1}
def fibonacci(n):
    if n in known:
        return known[n]
    res = fibonacci(n-1) + fibonacci(n-2)
    known[n] = res
    return res

#Iteration
## Note that the keys are in a random order.
for key in dict: print key
## prints a g o

## Exactly the same as above
for key in dict.keys(): print key

## Get the .keys() list:
print dict.keys()  ## ['a', 'o', 'g']

## Likewise, there's a .values() list of values
print dict.values()  ## ['alpha', 'omega', 'gamma']

## Common case -- loop over the keys in sorted order,
## accessing each key/value
for key in sorted(dict.keys()):
print key, dict[key]

## .items() is the dict expressed as (key, value) tuples
print dict.items()  ##  [('a', 'alpha'), ('o', 'omega'), ('g', 'gamma')]

## This loop syntax accesses the whole dict by looping
## over the .items() tuple list, accessing one (key, value)
## pair on each iteration.
for k, v in dict.items(): print k, '>', v
## a > alpha    o > omega     g > gamma

#Formatting
hash['word'] = 'garfield'
hash['count'] = 42
s = 'I want %(count)d copies of %(word)s' % hash  # %d for int, %s for string
# 'I want 42 copies of garfield'

#------
# Tuple
#------
t = ('hi',)   ## size-1 tuple

t = 'a', 'b', 'c', 'd', 'e'
t = ('a', 'b', 'c', 'd', 'e')
#the two are the same
t = tuple()
t1 = 'a' #type 'tuple'
t1 = ('a') #type 'str' ##Have parentheses makes difference
t = tuple('lupins') # t->('l', 'u', 'p', 'i', 'n', 's')
#slicing
t[0] #'a'
t[1:3] #('b','c')
#immutable
t[0] = 'A' #WRONG 
t = ('A',) + t[1:] #Change the whole tuple
#tuple assigment
a, b = b, a #swap

#tuple is immutable
hash(tuple(integer_list)) #calculate the hash number

addr = 'monty@python.org'
uname, domain = addr.split('@')
#uname->monty, domain->python.org

#tuple as return 
def min_max(t):
    return min(t), max(t)
min, max = min_max(arr)


#List to Tuples

#list method: https://developers.google.com/edu/python/lists

s = 'abc'
t = [0, 1, 2]
zip(s, t)
#[('a', 0), ('b', 1), ('c', 2)]

#zip end with the shorter one
zip('Anne', 'Elk')
[('A', 'E'), ('n', 'l'), ('n', 'k')]

#Diction to Tuples
d = {'a':0, 'b':1, 'c':2}
t = d.items()
#t->[('a', 0), ('c', 2), ('b', 1)]
#Tuples to Diction
t = [('a', 0), ('c', 2), ('b', 1)]
d = dict(t)
#d->{'a': 0, 'c': 2, 'b': 1}

#List, Tuple, & Diction
d = dict(zip('abc', range(3)))
#d->{'a': 0, 'c': 2, 'b': 1}
for key, val in d.items():
    print val, key

#sort
t.sort(reverse=True)
#when sort a list of tuple, sort 1st element, then sort 2nd element, then sort 3rd...



#============
# set
#============

set()
set('HackerRank') #set(['a', 'c', 'e', 'H', 'k', 'n', 'r', 'R'])
set([1,2,1,2,3,4,5,6,0,9,12,22,3]) #set([0, 1, 2, 3, 4, 5, 6, 9, 12, 22])
set((1,2,3,4,5,5)) #set([1, 2, 3, 4, 5])
myset.add('c') #add
myset.update([1, 2, 3, 4]) #update
myset.discard(10) #discard, if not exist, do nothing
myset.remove(13)  #remove = discard, if not exist, raise error
#operations
a.union(b) #.update() or |= 
a.intersection(b) #.intersection_update() or &=
a.difference(b) #.difference_update() or -=
a.symmetric_difference(b) #.symmetric_difference_update() or ^=