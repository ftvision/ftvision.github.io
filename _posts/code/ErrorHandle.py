#Build-in Exceptions
#https://docs.python.org/2/library/exceptions.html#module-exceptions

#First go with try
try:
    fin = open('bad_file')
    for line in fin:
        print line
    fin.close()
except:
    print 'Something went wrong.'

#Python starts by executing the try clause. 
#If all goes well, it skips the except clause and proceeds. 
#If an exception occurs, it jumps out of the try clause
# and executes the except clause.

#if a string S cannot but converted into int, throw "Bad String"
#you can receive different error information 
try:
    print int(S)
except ValueError:
    print 'Bad String'

#Sometimes, we don't want to handle the exception now, so we can 
#throw / or raise the exception for others to handle

class Calculator:
    def power(self, n, p):
        if n | p < 0:
            raise ValueError('n and p should be non-negative')
        else:
            return n ** p
            
class Vector(object):
	def __init__(self, coordinates):
		try:
			if not coordinates:
				raise ValueError
			#ensure floating numbers
			self.coordinates = tuple([Decimal(x) for x in coordinates])
			self.dimension 	 = len(coordinates) 

		except ValueError:
			raise ValueError('The coordinate must be nonempty')

		except TypeError:
			raise TypeError('The coordinates must be an iterable')

#multiple errors
for i in range(n):
    a, b = input().split()
    try:
        print(int(a)//int(b))
    except (ValueError, ZeroDivisionError) as e:
        print("Error Code:", e)
#or you can use
for i in range(n):
    a, b = input().split()
    try:
        print(int(a)//int(b))
    except Exception as e:
        print("Error Code:", e)
