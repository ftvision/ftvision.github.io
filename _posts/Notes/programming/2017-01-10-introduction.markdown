---
layout: mathnote
title: Hello World
permalink: /coding101/introduction
prev: 
late: 
topic: Programming Introduction
topiclink: /coding101/
---

### Interpreted v.s. Compiled

>Two kinds of programs process high-level languages into low-level languages: **interpreters** and **compilers**. An **interpreter** reads a high-level program and executes it, meaning that it does what the program says. It processes the program a little at a time, alternately reading lines and performing computations. Figure 1.1 shows the structure of an interpreter.

>A **compiler** reads the program and translates it completely before the program starts run- ning. In this context, the high-level program is called the source code, and the translated program is called the **object code** or **the executable**. Once a program is compiled, you can execute it repeatedly without further translation. Figure 1.2 shows the structure of a compiler.

>--"Think Python"


Python is interpreted language; C++ is compiled language

### Errors

1. Syntax Errors

> Python can only execute a program if the syntax is correct; otherwise, the interpreter dis- plays an error message. Syntax refers to the structure of a program and the rules about that structure. For example, parentheses have to come in matching pairs, so (1 + 2) is legal, but 8) is a syntax error.

2. Runtime Errors

> The second type of error is a runtime error, so called because the error does not appear until after the program has started running. These errors are also called exceptions because they usually indicate that something exceptional (and bad) has happened.

3. Semantic Errors

>The third type of error is the semantic error. If there is a semantic error in your program, it will run successfully in the sense that the computer will not generate any error messages, but it will not do the right thing. It will do something else. Specifically, it will do what you told it to do.ß

##List of Topics

- Comment
- Hello World

# Incremental development

>To deal with increasingly complex programs, you might want to try a process called in- cremental development. The goal of incremental development is to avoid long debugging sessions by adding and testing only a small amount of code at a time.

The final version of the function doesn’t display anything when it runs; it only returns a value. The print statements we wrote are useful for debugging, but once you get the function working, you should remove them. Code like that is called scaffolding because it is helpful for building the program but is not part of the final product.

The key aspects of the process are:

1. Start with a working program and make small incremental changes. At any point, if there is an error, you should have a good idea where it is.
2. Use temporary variables to hold intermediate values so you can display and check them.
3. Once the program is working, you might want to remove some of the scaffolding or consolidate multiple statements into compound expressions, but only if it does not make the program difficult to read.


A string is a sequence of characters. You can access the characters one at a time with the bracket operator

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



