---
layout: single
title: Redirect Info in Unix/Linux
permalink: /unix_linux_utilities/search_info
modified: 2017-03-24
---



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