#Collections are high efficiency containers

#collections.Counter() 
## == dict()

from collections import Counter
myList = [1,1,2,3,4,5,3,2,3,4,2,1,2,3]
Counter(myList)
#Counter({2: 4, 3: 4, 1: 3, 4: 2, 5: 1})
Counter(myList).items()
#[(1, 3), (2, 4), (3, 4), (4, 2), (5, 1)]
Counter(myList).keys()
#[1, 2, 3, 4, 5]
Counter(myList).values()
#Counter(myList).values()

#DefaultDict
#The defaultdict tool is a container in the collections
#class of Python. It's similar to the usual dictionary (dict) container, 
#but it has one difference: The value fields' data type is specified upon 
#initialization. 
from collections import defaultdict
d = defaultdict(list)
d['python'].append("awesome")
d['something-else'].append("not relevant")
d['python'].append("language")
for i in d.items():
    print i
#('python', ['awesome', 'language'])
#('something-else', ['not relevant'])

#An OrderedDict is a dictionary that remembers the order of the keys that were inserted first. If a new entry overwrites an existing entry, the original insertion position is left unchanged.
#Basically, namedtuples are easy to create, lightweight object types. 
#They turn tuples into convenient containers for simple tasks. 
#With `namedtuples`, you don’t have to use integer indices for accessing members of a tuple.
#The `defaultdict` tool is a container in the collections class of Python. It's similar to the usual dictionary (dict) container, but it has one difference: The value fields' data type is specified upon initialization. 
#get ordered counter 
from collections import Counter, OrderedDict
class OrderedCounter(Counter, OrderedDict):
    pass
#use class to extend both Counter and OrderedDict

#`deque`