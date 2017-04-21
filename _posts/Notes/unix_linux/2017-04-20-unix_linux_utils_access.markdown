---
layout: single
title: Redirect Info in Unix/Linux
permalink: /unix_linux_utilities/access
modified: 2017-03-24
---





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
Symbol  Meaning
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