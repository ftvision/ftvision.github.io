#Main programm get parameters
from sys import argv

script, first, second, third = argv

print "The script is called:", script
print "Your first variable is:", first
print "Your second variable is:", second
print "Your third variable is:", third

#keyboard input
text = raw_input() #python2
text = input()		 #python3
#end with `Enter` or `Return`

n = int(raw_input())
arr = map(int, raw_input().split())

#add prompt for input
prompt = '> '
likes = raw_input(prompt)

#stdin
import sys
for line in sys.stdin:
    print line

#print
print "print results" #python2
print("print results") #python3
from __future__ import print_function
print("print results") #python2 and python3 
#print without newline in python2
for i in xrange(10):
    print i,
#1 2 3 4 5 ...

#print without newline in python3
for i in xrange(10):
    print(i, end="")

print(*range(1, int(10)+1), sep='')
#results: 123456...
#print format, with space in between and end with newline
values = [1,2,3,4]
print(*values, sep=' ', end='\n', file=sys.stdout)
print(value1, value2, value3, sep=' ', end='\n', file=sys.stdout)
#1 2 3 4\n

#print and execution at the same time, use backquote ``
testString2 = "Hello World!  "
print "Length after stripping "+ `len(testString2.strip())`

#file open
fin = open('words.txt')
##<open file 'words.txt', mode 'r' at 0xb7f4b380>
fin.readline() # read a line
##'aa\r\n'

fin = open('words.txt')
for line in fin:
    word = line.strip()
print word

#? line.strip()

#write to files
fout = open('output.txt', 'w')
line1 = "This here's the wattle,\n"
fout.write(line1)
line2 = "the emblem of our land.\n"
fout.write(line2)
fout.close()

rewind(current_file) #unclear

#formatting
'I have spotted %d camels.' % camels
'In %d years I have spotted %g %s.' % (3, 0.1, 'camels')

#file name and path
import os
cwd = os.getcwd() #get current working directory

#get path
os.path.abspath('memo.txt')
#exists file
os.path.exists('memo.txt')
#is directory
os.path.isdir('memo.txt') #False
#is file
os.path.isfile('memo.txt')#True
#list directory
os.listdir(cwd)
#takes a directory and a file name and joins them into a complete path.
os.path.join(dirname, name)

#os module: http://docs.python.org/lib/module-os.html

#file in unicode
import codecs

f = codecs.open('foo.txt', 'rU', 'utf-8')
for line in f:
  # here line is a *unicode* string

#internet
# urllib module: http://docs.python.org/lib/module-urllib.html
import urllib
conn = urllib.urlopen('http://thinkpython.com/secret.html')


## Given a url, try to retrieve it. If it's text/html,
## print its base url and its text.
def wget(url):
  ufile = urllib.urlopen(url)  ## get file-like object for url
  info = ufile.info()   ## meta-info about the url content
  if info.gettype() == 'text/html':
    print 'base url:' + ufile.geturl()
    text = ufile.read()  ## read all its text
    print text
#with error handling
## Version that uses try/except to print an error message if the
## urlopen() fails.
def wget2(url):
  try:
    ufile = urllib.urlopen(url)
    if ufile.info().gettype() == 'text/html':
      print ufile.read()
  except IOError:
    print 'problem reading url:', url



#talk to linux

#command module:http://docs.python.org/lib/module-commands.html

## Given a dir path, run an external 'ls -l' on it --
## shows how to call an external program
def listdir(dir):
  cmd = 'ls -l ' + dir
  print "Command to run:", cmd   ## good to debug cmd before actually running it
  (status, output) = commands.getstatusoutput(cmd)
  if status:    ## Error case, print the command's output to stderr and exit
    sys.stderr.write(output)
    sys.exit(1)
  print output  ## Otherwise do something with the command's output