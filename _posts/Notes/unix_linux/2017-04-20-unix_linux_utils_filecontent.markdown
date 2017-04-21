---
layout: single
title: Modify files and foldes in Unix/Linux
permalink: /unix_linux_utilities/file_content
modified: 2017-03-24
---

## File Contents

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


### 15. `wc` (word count)

```bash
$ wc -w science.txt # number of words
$ wc -l science.txt # number of lines
```



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
