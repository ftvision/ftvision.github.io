---
layout: single
title: Redirect Info in Unix/Linux
permalink: /unix_linux_utilities/redirection
modified: 2017-03-24
---



### 16. Redirect 

Standard Input:

- keyboard input
- 'end of file' (`Ctrl+D`)

If you run the `cat` command without specifing a file to read, it reads the standard input (the keyboard), and on receiving the , copies it to the standard output (the screen).

#### Redirecting the output

We use the `>` symbol to redirect the output of a command. For example, to create a file called list1 containing a list of fruit, type  

```bash
$ cat > list1
```
Then type in the names of some fruit. Press [Return] after each one. All your input goes to the file `list1`

#### Appending to a file

The form `>>` appends standard output to a file. So to add more items to the file `list1`, type

```bash
$ cat >> list1
```

#### combine files

```bash
$ cat list1 list2 > biglist
```
output the contents of `list1` and `list2` to `biglist`

#### Redirecting the Input

We use the `<` symbol to redirect the input of a command.

```bash
$ sort # sort alphabetically or numerically sorts a list. 
$ # Got standard input
```
sort the `biglist` and output on the screen

```bash
$ sort < biglist
```

sort the `biglist` and output the a new file `slist`

```bash
$ sort < biglist > slist
```

### 18. `|` pipe

connect the output of one command directly to the input of the another command. 

```bash
$ who | sort #connect output of who to be the input of sort
```
similarly, we can count how many users are logged on

```bash
$ who | wc -l
```

Using pipes, display all lines of list1 and list2 containing the letter 'p', and sort the result.

```bash
$ cat list1 list2 | grep p | sort
```

