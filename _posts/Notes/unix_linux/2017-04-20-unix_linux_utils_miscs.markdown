---
layout: single
title: Redirect Info in Unix/Linux
permalink: /unix_linux_utilities/miscs
modified: 2017-03-24
---


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

