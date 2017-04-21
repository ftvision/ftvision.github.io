---
layout: single
title: Modify files and foldes in Unix/Linux
permalink: /unix_linux_utilities/modify_files
modified: 2017-03-24
---

## Modify files and foldes

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
