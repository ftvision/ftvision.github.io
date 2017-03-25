---
layout: single
title: Utilities in Unix/Linux
permalink: /unix_linux_utilities
modified: 2017-03-24
---

- [Cheat Sheet](http://ryanstutorials.net/linuxtutorial/cheatsheet.php)

### 0. get kernal version

```bash
$ uname -r
```

2.6.32-431.11.2.el6.x86_64:

- 2 – Kernel Version
- 6 – Major Revision
- 32 – Minor Revision
- 431.11.2.el6 – Fix/Revision Detail

```
-a, --all                print all information
-s, --kernel-name        print the kernel name
-n, --nodename           print the network node hostname
-r, --kernel-release     print the kernel release
-v, --kernel-version     print the kernel version
-m, --machine            print the machine hardware name
-p, --processor          print the processor type or "unknown"
-i, --hardware-platform  print the hardware platform or "unknown"
-o, --operating-system   print the operating system
--help                   display this help and exit
--version                output version information and exit
```
- [source](https://www.liquidweb.com/kb/how-to-check-the-kernel-version-in-linux-ubuntu-centos/)

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

### 7. `cp` (copy)

`cp file1 file2` is the command which makes a copy of file1 in the current working directory and calls it file2

```bash
% cp /vol/examples/tutorial/science.txt .
```
The above command means copy the file science.txt to the current directory (remember the `.`), keeping the name the same.

### 8. `mv` (move or rename)

`mv file1 file2` moves (or **renames**) file1 to file2

### 9. `rm` (remove), `rmdir` (remove directory)

`rm file` or `rmdir directory`. However, UNIX will not let you remove a non-empty directory. You may need to **repeatedly** remove the subdirectory.

### 10. `clear` (clear screen)

Before you start the next section, you may like to clear the terminal window of the previous commands so the output of the following commands can be clearly understood.

### 11. `cat` (concatenate)

The command cat can be used to **display the contents** of a file on the screen.

```bash
$ cat science.txt
```
As you can see, the file is longer than than the size of the window, so it scrolls past making it unreadable.

nl stands for **number lines** and it does just that: show the content with number lines

```bash
nl [-options] [path]
bash: nl -s '. ' -w 10 mysampledata.txt
         1. Fred apples 20
         2. Susy oranges 5
         3. Mark watermellons 12
         4. Robert pears 4
         5. Terry oranges 9
         6. Lisa peaches 7
         7. Susy oranges 12
         8. Mark grapes 39
         9. Anne mangoes 7
        10. Greg pineapples 3
        11. Oliver rockmellons 2
        12. Betty limes 14
```

`tac`: Linux guys are known for having a funny sense of humor. The program tac is actually cat in reverse. It was named this as it does the opposite of cat. Given data it will print the last line first, through to the first line.

```bash
$ tac [path]
```

`uniq`: uniq stands for unique and it's job is to remove duplicate lines from the data. One limitation however is that those lines must be adjacent (ie, one after the other).

```bash
$ uniq [options] [path]
```

`cut`: cut is a nice little program to use if your content is separated into fields (columns) and you only want certain fields.

In our sample file we have our data in 3 columns, the first is a name, the second is a fruit and the third an amount. Let's say we only wanted the first column.

```bash
cut -f 1 -d ' ' mysampledata.txt
```

cut defaults to using the TAB character as a separator to identify fields. In our file we have used a single space instead so we need to tell cut to use that instead. The separator character may be anything you like, for instance in a CSV file the separator is typically a comma ( , ). This is what the -d option does (we include the space within single quotes so it knows this is part of the argument). The -f option allows us to specify which field or fields we would like. If we wanted 2 or more fields then we separate them with a comma as below.

```bash
cut -f 1,2 -d ' ' mysampledata.txt
```

### 12. `less` (print less -- always one screen)

```bash
$ less science.txt
```
Press the `[space-bar]` if you want to see another page, and type `[q]` if you want to quit reading. As you can see, less is used in preference to cat for long files.

### 13. `head` (first `#n` lines) and `tail` (last `#n` lines)

The head command writes the first ten lines of a file to the screen.

```bash
head (-n) science.txt
tail (-n) science.txt
```
use `-n` to specify the number of lines you want to print

### 14. Search for info

- 1) Use `less` and search in the text

In `less` screen,  type a forward slash **[/]** followed by the word to search. Type **[n]** to search for the next occurrence of the word.

-  2) `grep`

It searches files for specified words or patterns. 
```bash
$ grep science science.txt
```

As you can see, `grep` has printed out each line containg the word **science**.

Also, the `grep` command is case sensitive. To ignore upper/lower case distinctions, use the -i option, i.e. type

```bash
$ grep -i science science.txt
```
To search for a phrase or pattern, you must enclose it in single quotes (the apostrophe symbol). For example to search for spinning top, type

```bash
$ grep -i 'spinning top' science.txt
```

Some of the other options of grep are:

-v display those lines that do **NOT** match 
-n precede each matching line with the line number 
-c print only the total count of matched lines 

### 15. `wc` (word count)

```bash
$ wc -w science.txt # number of words
$ wc -l science.txt # number of lines
```



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

### 17. `who` (who is on the system)

- just get an idea who is using the system -- also know who is your neighbor
- to know the name of current user, use `whoami` -- print the login name of the current user.
- see what program each user is running, use `w`
- see the last several logins for a given user `last`: `last -3 rocky`

- change password: 

```bash
$ passwd
passwd:  Changing password for natasha 
Enter login password: your-old-password
New password: your-new-password
Re-enter new password: your-new-password
```
- log out of the system

```bash
$ logout
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

### 19. Naming wildcards

The `*` wildcard: will match against **none or more character(s)** in a file (or directory) name. 
The character `?` will match **exactly one** character.

We should note here that a directory is merely a special type of file. So the rules and conventions for naming files apply also to directories.

In naming files, characters with special meanings such as `/ * & %` , should be avoided. Also, avoid using spaces within names. The safest way to name a file is to use only alphanumeric characters, that is, letters and numbers, together with _ (underscore) and . (dot).

### 20. Get help for a command

```bash
$ man wc #get on-line manual of wc
$ man -k wc #get the keyword of  on-line manual of wc
$ whatis wc #get one-line description of wc
$ info wc #get information of wc
```

### 21. Search for possible commands

```bash
$ apropos keyword
$ apropos copy # an example
```

### 22. File System access right

Every item stored in a UNIX filesystem belongs to one of four types:

- Ordinary files
    - Ordinary files can contain text, data, or program information. Files cannot contain other files or directories. Unlike other operating systems, UNIX filenames are not broken into a name part and an extension part (although extensions are still frequently used as a means to classify files). Instead they can contain any keyboard character except for '/' and be up to 256 characters long (note however that characters such as *,?,# and & have special meaning in most shells and should not therefore be used in filenames). Putting spaces in filenames also makes them difficult to manipulate - rather use the underscore '_'.
- Directories
    - Directories are containers or folders that hold files, and other directories.
- Devices
    - To provide applications with easy access to hardware devices, UNIX allows them to be used in much the same way as ordinary files. There are two types of devices in UNIX - `block-oriented` devices which transfer data in blocks (e.g. hard disks) and `character-oriented` devices that transfer data on a byte-by-byte basis (e.g. modems and dumb terminals).
- Links
    - **A link is a pointer to another file**. There are two types of links - a *hard link* to a file is indistinguishable from the file itself. A *soft link (or symbolic link)* provides an indirect pointer or shortcut to a file. A soft link is implemented as a directory file entry containing a pathname.

![FileAccess](/assets/img/notes/unix_linux/file_access.gif)

Each file (and directory) has associated access rights, which may be found by typing `ls -l`. Also, `ls -lg` gives additional information as to which **group** owns the file (beng95 in the following example):

`-rwxrw-r-- 1 ee51ab beng95 2450 Sept29 11:52 file1`

Another snapshot for file access

![FileAccess](/assets/img/notes/unix_linux/file_access_2.gif)


In the left-hand column is a *10 symbol string* consisting of the symbols `d, r, w, x, -`, and, occasionally, `s` or `S`. If `d` is present, it will be at the left hand end of the string, and indicates a **directory**: otherwise `-` will be the starting symbol of the string.

The 9 remaining symbols indicate the permissions, or access rights, and are taken as **three groups of 3**.

- **[Left-three: owner]** The left group of 3 gives the file permissions for **the user that owns the file** (or directory) (ee51ab in the above example); 
- **[Middle-three: belong]** the middle group gives the permissions for the group of people to whom the file (or directory) belongs (eebeng95 in the above example);
- **[Right-three: all other]** the rightmost group gives the permissions for all others.
- The symbols `r, w`, etc., have slightly different meanings depending on whether they refer to a simple file or to a directory.

#### Access rights on files.

- `r (or -)`, indicates **read** permission (or otherwise), that is, the presence or absence of permission to read and copy the file 
- `w (or -)`, indicates **write** permission (or otherwise), that is, the permission (or otherwise) to change a file 
- `x (or -)`, indicates **execution** permission (or otherwise), that is, the permission to execute a file, where appropriate

#### Access rights on directories.

- `r` allows users to **list files** in the directory;
- `w` means that users **may delete files** from the directory or **move files into it**;
- `x` means the right to **access files in the directory**. This implies that you may read files in the directory provided you have read permission on the individual files.
- So, in order to read a file, you must have execute permission on the directory containing that file, and hence on any directory containing that directory as a subdirectory, and so on, up the tree.


| info | explanation |
|----|---|
|`-rwxrwxrwx` | a file that everyone can read, write and execute (and delete).|
|`-rw-------` | a file that only the owner can read and write - no-one else can read or write and no-one has execution rights (e.g. your  mailbox file). |


#### change access right `chmod` (change a file mode)

```
Symbol	Meaning
u   user
g   group
o   other
a   all
r   read
w   write (and delete)
x   execute (and access directory)
+   add permission
-   take away permission
```

For example, to remove read write and execute permissions on the file biglist for the group and others, type

```bash
$ chmod go-rwx biglist
```

To give read and write permissions on the file biglist to all,

```bash
$ chmod a+rw biglist
```

### 23. Processes and Jobs

- list all jobs: `jobs`
- to restart (foreground) a suspended processes: `fg %jobnumber`
- to put a process to background: `Ctrl + Z`
    - to see background  `bg`
- running a process in background: end with `&`
    - To background a process, type an & at the end of the command line.
    - `$ sleep 10 &`

### 24. Killing a process

- kill a foreground job: `Ctrl + C`
- kill a background / suspended job `kill %jobnumber`
    - ```kill %4```
- find the process status `ps` 
    - by default, just list the process in the **current shell**
    -  The `-e` option tells ps to list all processes running on the system, not just those associated with the current shell. 
    -  The `-f` option creates a full listing, which includes more information about each process.
    - and then kill by PID: `kill 20077`
    - If a process refuses to be killed, uses the -9 option, `kill -9 20077`
- dynamic list of processes, `top`:
    - The top program also lists processes, but adds the ability to sort by various criteria (CPU utilization by default) and provides a continuously updated display. 
- **Note: It is not possible to kill off other users' processes !!!**


| field | description |
|------|------|
| UID	| the user who owns the process |
| PID	| the process id, a unique identifier assigned to each process |
| PPID	| the parent process id, the process that spawned the current process |
| C	        | this field is obsolete |
| STIME	| the start time for the current process |
| TTY	| the controlling terminal for the current process |
| TIME	| the amount of CPU time accumulated by the current process |
| CMD	| the command used to invoke the process |

### 25. Printing

`lpr, lpq, lprm, enscript`

At the time that UNIX was being developed, line printers were all the rage. This is reflected in the simple printing system used in UNIX. This system consists of a print server (called `lpd` on many systems), which sends jobs placed in the print queue to the printer, and several client programs that allow you to 

- 1) place jobs in the print queue (`lpr`), Use the lpr command to send a simple text file to the printer.

```bash
$ lpr /etc/hosts # lpr will send the print job to the default printer.
$ lpr -P myprinter /etc/hosts # specify printer 
```

- 2) check the status of the print queue (`lpq`), 

```bash
$ lpq -P myprinter #when no -P, show default printer
Rank   Owner      Job   Files                  Total Size
active root       3     nsswitch.conf           958 bytes
1st    dopey      4     (standard input)       1387 bytes
2nd    sneezy     5     myfile                 5623 bytes
3rd    sneezy     6     myfile2                5692 bytes
4rd    grumpy     7     hosts                  2317 bytes 
```

- 3) and remove jobs from the print queue (`lprm`).

```bash
$ lprm -P myprinter 6 #when no -P, work on the default printer
myprinter-6 dequeued
```

- 4) modify the text file for printing (`enscript`)
    - "-G" (add a "gaudy" header, including current date/time, file name, and page number), 
    - "-r" (rotate the page orientation to landscape), and
    -"-2" (print two columns instead of one). In order to make these changes to a text file, enscript converts it to PostScript.

### 26. Making Hard and Soft (Symbolic) Links

#### Hard Link: 

Both directory entries appear identical (and both now have a link count of 2). If either filename or linkname is modified, the change will be reflected in the other file (since they are in fact just two different directory entries pointing to the same file).

```bash
$ ln filename linkname
```
creates another directory entry for filename called linkname (i.e. linkname is a hard link). 

#### Soft Link

The link count of the source file remains unaffected. 

```bash
$ ln -s filename linkname
```
creates a shortcut called linkname (i.e. linkname is a soft link). The shortcut appears as an entry with a special type ('l')

```bash
$ ln -s hello.txt bye.txt 
$ ls -l bye.txt 
lrwxrwxrwx   1 will finance 13 bye.txt -> hello.txt 
```

Notice that the permission bits on a symbolic link are not used (always appearing as rwxrwxrwx). Instead the permissions on the link are determined by the permissions on the target (hello.txt in this case).

#### Differences

- **Note that you can create a symbolic link to a file that doesn't exist, but not a hard link.**
- Another difference between the two is that you can create symbolic links across different physical disk devices or partitions, but hard links are restricted to the same disk partition. 
- Finally, most current UNIX implementations do not allow hard links to point to directories.

### 27. Other useful utilities

```bash
$ quota -v #check your current quota and how much of it you have used
$ df .  #reports on the space left on the file system
$ du -s * # outputs the number of kilobyes used by each subdirectory.
$ gzip science.txt # compress the file and place it in a file called science.txt.gz
$ gunzip science.txt.gz #expand the file
$ zcat science.txt.gz  # read gzipped files without needing to uncompress them first.
$ file * #classifies the named files according to the type of data they contain,
$ diff file1 file2 # compares the contents of two files and displays the differences
# diff: [cont.] Lines beginning with a < denotes file1, while lines beginning with a > denotes file2

$ find . -name "*.txt" -print 
#1. To search for all fies with the extention .txt, 
#2. starting at the current directory (.) and 
#3. working through all sub-directories, 
#4. then printing the name of the file to the screen, type

$ find . -size +1M -ls #To find files over 1Mb in size, and display the result as a long listing
$ history # show command history list
```

### 28. `sed`

### 29. `awk`

