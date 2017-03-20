# Functions are first class objects in Python
foo.__class__ # <type 'function'>
issubclass(foo.__class__, object) #True

#function call
#function(param1, param2,..., paramN)
print('params')

x = math.exp(math.log(x+1))

def sentence():
	print "I'm a good guy"
	print("I'm a good guy")

def rep_sentence():
	sentence()
	sentence()

def foo(para1, para2):


type(sentence)

#<type 'function'>

def polyline(t, n, length, angle):
    """Draws n line segments with the given length and
    angle (in degrees) between them.  t is a turtle.
    """
    for i in range(n):
        fd(t, length)
        lt(t, angle)

def function(params):
	"""docstring: a string at the beginning of a 
	function that explains the interface"""

#recusion
def fib(n):
	if n <= 0:
		print "Done"
	else:
		print "Not Done Yet"
		fib(n - 1)

fib(3)

def area(radius):
	temp = math.pi * radius ** 2
	return temp


#global and local

count = 0
def example3():
    count = count + 1         
# WRONG, the count in the example3 is local, undefined

count = 0
def example3():
  global count
	count += 1
# RIGHT, declare `count` as global

#If the global value is mutable, you can modify it without declaring it:
known = {0:0, 1:1}
def example4():
    known[2] = 1


#tuple and variable-legnth arguments
def printall(*args):
    print args
printall(1, 2.0, '3')
#(1, 2.0, '3')

t = (7, 3)
divmod(*t)
#(2,1)

#optional parameters

def print_most_common(hist, num=10):
	return 0
#num has default value as 10

#lambda function
lambda (x,y): x ** 2 + y ** 2
#map function
map(int, list(1,2,3))
#NOTE: python2, map returns a list; python3, map returns an iterator 
list(map(int, list(1,2,3))) #python 3

#filter function, filter items that func(item) == True
filter(fun, list_to_be_filtered)
#reduce function
#The reduce() function applies a function of two arguments cumulatively
#on a list of objects in succession from left to right to reduce it to one value. 
#Say you have a list, say [1,2,3] and you have to find its sum.
reduce(lambda x, y : x + y,[1,2,3])
# ans = 6
reduce(lambda x, y : x + y, [1,2,3], -3)
# ans = 3
#The last parameters is the initial value, which will be added to the first place in the list

#any, all
#any(), This expression returns True if any element of the iterable is true. 
any([1>0,1==0,1<0]) #True
any([1<0,2<1,3<2]) # False
#all(), This expression returns True if all of the elements of the iterable are true. If the iterable is empty, it will return True.
all(['a'<'b','b'<'c']) #True
all(['a'<'b','c'<'b']) #False
#sort
sorted(x, key = func)
sorted(x, key = lambda xi: xi[2]) #sort the list x by each element's 3rd value
#eval
eval("9 + 5") #14
#eval() can also be used to work with Python keywords or defined functions and variables. 
type(eval("len")) #<type 'builtin_function_or_method'>

#closure and decorate
def wrapper(func):
    def checker(a, b): # 1
        if a.x < 0 or a.y < 0:
            a = Coordinate(a.x if a.x > 0 else 0, a.y if a.y > 0 else 0)
        if b.x < 0 or b.y < 0:
            b = Coordinate(b.x if b.x > 0 else 0, b.y if b.y > 0 else 0)
        ret = func(a, b)
        if ret.x < 0 or ret.y < 0:
            ret = Coordinate(ret.x if ret.x > 0 else 0, ret.y if ret.y > 0 else 0)
        return ret
    return checker
#wrapper is to check the scope, and add/sub is decorated by wrapper
add = wrapper(add)
sub = wrapper(sub)
sub(one, two) #Coord: {'y': 0, 'x': 0}
add(one, three) #Coord: {'y': 200, 'x': 100}

@logger
def foo1(x, y=1):
	return x * y

#wrapper a sort_phone function such that all numbers are organized
def wrapper(f):
    def phone(l):
        f(["+91 "+c[-10:-5]+" "+c[-5:] for c in l])
    return phone

@wrapper
def sort_phone(l):
    print(*sorted(l), sep='\n')

if __name__ == '__main__':
    l = [input() for _ in range(int(input()))]
    sort_phone(l) 

#multiple more Functions
tupleData.itemgetter(2)