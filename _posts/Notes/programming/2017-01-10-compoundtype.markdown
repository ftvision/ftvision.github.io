---
layout: mathnote
title: Compound Types & Data Structures
permalink: /coding101/compoundtype
prev: 
late: 
topic: Programming Introduction
topiclink: /coding101/
---

#string

string methods

#List

Like a string, a list is a sequence of values. In a string, the values are characters; in a list, they can be any type. The values in a list are called elements or sometimes items.

A list within another list is **nested**: `['spam', 2.0, 5, [10, 20]]`.

You can think of a list as a relationship between indices and elements. This relationship is called a mapping; each index “maps to” one of the elements. 

List indices work the same way as string indices:
• Any integer expression can be used as an index.
• If you try to read or write an element that does not exist, you get an IndexError. • If an index has a negative value, it counts backward from the end of the list.


# Map, filter and reduce
An operation like this that combines a sequence of elements into a single value is some- times called reduce.

```
t = [1, 2, 3]
sum(t)
#6
```


```
def capitalize_all(t):
    res = []
    for s in t:
        res.append(s.capitalize())
```

An operation like capitalize_all is sometimes called a map because it “maps” a function (in this case the method capitalize) onto each of the elements in a sequence.

An operation like only_upper is called a filter because it selects some of the elements and filters out the others.


# equivalent and identical

python
```
a = 'banana'
b = 'banana'
a is b
#True

a = [1, 2, 3]
b = [1, 2, 3]
a is b
#False
```

In this case we would say that the two lists are equivalent, because they have the same elements, but not identical, because they are not the same object. If two objects are identical, they are also equivalent, but if they are equivalent, they are not necessarily identical.

If a refers to an object and you assign b = a, then both variables refer to the same object:
```
>>> a = [1, 2, 3]
>>> b = a
>>> b is a
True
```

The association of a variable with an object is called a **reference**. In this example, there are two references to the same object.

An object with more than one reference has more than one name, so we say that the object is **aliased**.


List will change in function

# List Argument

When you pass a list to a function, the function gets a reference to the list. If the function modifies a list parameter, the caller sees the change. For example, delete_head removes the first element from a list:


def delete_head(t):
    del t[0]
```
>>> letters = ['a', 'b', 'c']
>>> delete_head(letters)
>>> print letters
['b', 'c']
```

```
>>> t1 = [1, 2]
>>> t2 = t1.append(3)
>>> print t1
[1, 2, 3]
>>> print t2
None
```

# Dictionary 

A **dictionary** is like a list, but more general. In a list, the indices have to be integers; in a dictionary they can be (almost) any type.

You can think of a dictionary as a mapping between a set of indices (which are called **keys**) and a set of values. Each key maps to a value. The association of a key and a value is called a **key-value pair** or sometimes an item.


The function `dict` creates a new dictionary with no items. Because dict is the name of a built-in function, you should avoid using it as a variable name.

```
>>> eng2sp = dict()
>>> print eng2sp
{}
```

List could be the **value** of the dictionary
List cannot be the **key** of the dictionary -- because it is not *hashable*

This system works fine if the keys are immutable. But if the keys are mutable, like lists, bad things happen. For example, when you create a key-value pair, Python hashes the key and stores it in the corresponding location. If you modify the key and then hash it again, it would go to a different location. In that case you might have two entries for the same key, or you might not be able to find a key. Either way, the dictionary wouldn’t work correctly.


#Tuple

It is common to use tuples as keys in dictionaries (primarily because you can’t use lists). For example, a telephone directory might map from last-name, first-name pairs to telephone numbers. Assuming that we have defined last, first and number, we could write:

`directory[last,first] = number`

The relational operators work with tuples and other sequences; Python starts by comparing the first element from each sequence. If they are equal, it goes on to the next elements, and so on, until it finds elements that differ. Subsequent elements are not considered (even if they are really big).

```
>>> (0, 1, 2) < (0, 3, 4)
True
>>> (0, 1, 2000000) < (0, 3, 4)
True
```

#How to choose compound type

In many contexts, the different kinds of sequences (strings, lists and tuples) can be used interchangeably. So how and why do you choose one over the others?
To start with the obvious, strings are more limited than other sequences because the ele- ments have to be characters. They are also immutable. If you need the ability to change the characters in a string (as opposed to creating a new string), you might want to use a list of characters instead.

Lists are more common than tuples, mostly because they are mutable. But there are a few cases where you might prefer tuples:

1. In some contexts, like a return statement, it is syntactically simpler to create a tuple than a list. In other contexts, you might prefer a list.

2. If you want to use a sequence as a dictionary key, you have to use an immutable type like a tuple or string.

3. If you are passing a sequence as an argument to a function, using tuples reduces the potential for unexpected behavior due to aliasing.



<div>
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#cpp" aria-controls="cpp" role="tab" data-toggle="tab">C/C++</a></li>
    <li role="presentation"><a href="#python" aria-controls="python" role="tab" data-toggle="tab">Python</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="cpp">
    		<pre> <code class="c++">
{% include helloworld.cpp %}
				</code></pre>
	</div>
    <div role="tabpanel" class="tab-pane" id="python"> 	
    		<pre> <code class="python">

            {% include helloworld.cpp %}

				</code>
<p><strong>最好的注意的是：</strong>这个不容易</p> 	
		</pre>   	
    </div>
  </div>

</div>



