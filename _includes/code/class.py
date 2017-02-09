#Class
#Be careful about what is public and what is private
#C++ pays more attention on it

class Point(object):
"""Represents a point in 2-D space."""

blank = Point()

#Classs
class ClassName(object):
	"""Description of the Class

	attributes: width, height, corner.
	"""
#You can return an instantiation of a class
def find_center(rect):
    p = Point()
    p.x = rect.corner.x + rect.width/2.0
    p.y = rect.corner.y + rect.height/2.0
    return p

#Copy an object
import copy
p2 = copy.copy(p1)
#not refereing to the same object.



def time_to_int(time):
    minutes = time.hour * 60 + time.minute
    seconds = minutes * 60 + time.second
    return seconds

def int_to_time(seconds):
    time = Time()
    minutes, time.second = divmod(seconds, 60)
    time.hour, time.minute = divmod(minutes, 60)
    return time

def add_time(t1, t2):
    seconds = time_to_int(t1) + time_to_int(t2)
    return int_to_time(seconds)

class Time(object):
  def print_time(time):
		print '%.2d:%.2d:%.2d' % (time.hour, time.minute, time.second)

start = Time()
Time.print_time(start) #use class to call
start.print_time() #an instantiation calls methods directly

class Time(object):
	def __init__(self, hour=0, minute=0, second=0): #initiation
        self.hour = hour
        self.minute = minute
        self.second = second
  def print_time(self):
        print '%.2d:%.2d:%.2d' % (self.hour, self.minute, self.second)

time = Time() # time : 00:00:00
time = Time(9) # time : 09:00:00
time = Time(9, 45) # time : 09:45:00

#__str__ is a special method, 
# supposed to return a string representation of an object.

class Time(object):
	def __str__(self):
    return '%.2d:%.2d:%.2d' % (self.hour, self.minute, self.second)
#When you print an object, Python invokes the str method:
print time

## type-based dispatch
class Time(object):
    def __add__(self, other):
        if isinstance(other, Time):
            return self.add_time(other)
        else:
            return self.increment(other)
    def add_time(self, other):
        seconds = self.time_to_int() + other.time_to_int()
        return int_to_time(seconds)
    def increment(self, seconds):
        seconds += self.time_to_int()
        return int_to_time(seconds)
     def __radd__(self, other): #right-side add
        return self.__add__(other)

print 1337 + start

#ready for some inheritance

class Card(object):
    """Represents a standard playing card."""
    def __init__(self, suit=0, rank=2):
        self.suit = suit
        self.rank = rank
    #instance attribute
    suit_names = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
    rank_names = [None, 'Ace', '2', '3', '4', '5', '6', '7',
              '8', '9', '10', 'Jack', 'Queen', 'King']
    def __str__(self):
        return '%s of %s' % (Card.rank_names[self.rank],
                             Card.suit_names[self.suit])
    #comparison Python 2
    def __cmp__(self, other):
        # check the suits
        if self.suit > other.suit: return 1
        if self.suit < other.suit: return -1
        # suits are the same... check ranks
        if self.rank > other.rank: return 1
        if self.rank < other.rank: return -1
        # ranks are the same... it's a tie
        return 0
    #or Python 3
    def __lt__(self, other): # < 
    def __gt__(self, other): # >


class Deck(object):
   def __init__(self):
   		...
#inheritance	
class Hand(Deck):
    """Represents a hand of playing cards."""
    #If we provide an init method in the Hand class, 
    # it overrides the one in the Deck class:

    def __init__(self, label=''):
        self.cards = []
        self.label = label
#===
class Parent(object):

    def implicit(self):
        print "PARENT implicit()"

class Child(Parent):
    pass #implicit inheritance

dad = Parent()
son = Child()
dad.implicit()
son.implicit()

#===
class Parent(object):

    def override(self):
        print "PARENT override()"

class Child(Parent):

    def override(self):
        print "CHILD override()" #override

dad = Parent()
son = Child()

dad.override()
son.override()

#==== super

class Parent(object):

    def altered(self):
        print "PARENT altered()"

class Child(Parent):

    def altered(self):
        print "CHILD, BEFORE PARENT altered()"
        super(Child, self).altered() #get parent's version
        print "CHILD, AFTER PARENT altered()"

dad = Parent()
son = Child()

dad.altered()
son.altered()

#Output:
#PARENT altered()
#CHILD, BEFORE PARENT altered()
#PARENT altered()
#CHILD, AFTER PARENT altered()

#==== super in initiation
class Child(Parent):

    def __init__(self, stuff):
        self.stuff = stuff
        super(Child, self).__init__() #continue finish parent's initiation


#----abstract class
# python: https://docs.python.org/3.5/library/abc.html
# C++: http://www.cplusplus.com/doc/tutorial/polymorphism/#abstract_base_classes
# polymorphism: https://www.wikiwand.com/en/Polymorphism_(computer_science)

#abstract methods
from abc import ABCMeta, abstractmethod
class Book:
    __metaclass__ = ABCMeta
    def __init__(self,title,author):
        self.title=title
        self.author=author   
    @abstractmethod
    def display(): pass

#Write MyBook class
class MyBook(Book):
    price = 0
    def __init__(self, title, author, price):
        super(Book, self).__init__()
        self.price = price 

    def display(self):
        print("Title: "+ title)
        print("Author: "+ author)
        print("Price: "+ str(price))