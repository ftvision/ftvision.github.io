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