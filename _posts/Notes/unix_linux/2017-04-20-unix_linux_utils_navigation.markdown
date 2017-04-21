---
layout: single
title: Navigate the filesystem in Unix/Linux
permalink: /unix_linux_utilities/navigation
modified: 2017-03-24
---

## Navigate the filesystem

### 1. `ls` (list)

`ls` does not, in fact, cause all the files in your home directory to be listed, but only those ones whose name does not begin with a dot (.) Files beginning with a dot (.) are known as hidden files and usually contain important program configuration information. They are hidden because you should not change them unless you are very familiar with UNIX!!!

```bash
$ ls -a # lists files that are normally hidden.
$ ls -l # for long listing
$ ls -F # fancy listing: 
## / for directory
## * for executable
## @ for symbolic link
```

we can format and print the list of `ls` in specific number of columns by using `pr -n`
```bash
$ ls | pr -5 | less #list, then print every 5 columsn, then less
```

### 2. `mkdir`  (make directory)

We will now make a subdirectory in your home directory to hold the files you will be creating and using in the course of this tutorial. To make a subdirectory called unixstuff in your current working directory type

### 3. `cd`  (change directory)

`$ cd unixstuff`

**space in name** can not be recognized

- Quotes: The first approach involves using quotes around the entire item. You may use either single or double quotes (later on we will see that there is a subtle difference between the two but for now that difference is not a problem). Anything inside quotes is considered a single item.
    - `Holiday Photos`
- Escape Characters: Another method is to use what is called an escape character, which is a backslash ( \ ). What the backslash does is escape (or nullify) the special meaning of the next character.
    - `Holiday\ Photos`

### 4. The directories `.` and `..`

- `.` means current directory
- `..` means the parent of the current directory

### 5. `pwd` (print working directory)

### 6. `~` (your home directory)

Home directories can also be referred to by the tilde `~` character. It can be used to specify paths starting at your home directory. So typing

```bash
$ ls ~/unixstuff
```
- `~`: `/Users/Feitong`
- `~/..`: `/Users/`
