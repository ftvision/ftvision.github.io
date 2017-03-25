---
layout: single
title: Overview of Unix/Linux
permalink: /unix_linux_overview
modified: 2017-03-24
---

## Types of Unix

It was originally developed as a research project at AT&T Bell Labs in 1969. Over the years, many versions of UNIX and UNIX-like operating systems (including Linux and Mac OS X) have been developed. These all work in much the same manner and all share the following characteristics:


- Portable
    - UNIX was designed to be easily ported (moved from one hardware platform to another). It has been ported to everything from desktop computers to room-sized supercomputers.
- Mutli-user
    - UNIX allows many people to share the resources of a single computer simultaneously.
- Mutli-tasking
    - UNIX allows users to run multiple programs at once. UNIX imposes strict constraints which keep ill-behaved programs from affecting other programs and the operating system itself.

There are many different versions of UNIX, although they share common similarities. The most popular varieties of UNIX are Sun Solaris, GNU/Linux, and MacOS X.

## Basic Parts of UNIX operating system

1. The Kernel
    - The kernel of UNIX is the hub of the operating system: it allocates time and memory to programs and handles the filestore and communications in response to system calls.
2. The Shell
    - The shell acts as an interface between the user and the kernel. When a user logs in, the login program checks the username and password, and then starts another program called the shell. The shell is a command line interpreter (CLI). It interprets the commands the user types in and arranges for them to be carried out. 
    - BASH, TCSH, ZSH, etc.
3. The Programmes
    - Everything in UNIX is either a **file** or a **process**.
    - A process is an executing program identified by a unique PID (process identifier).
    - A file is a collection of data. They are created by users using text editors, running compilers etc.

- The operating system **kernel** is in direct control of the underlying hardware. The kernel provides low-level device, memory and processor management functions (e.g. dealing with interrupts from hardware devices, sharing the processor among multiple programs, allocating memory for programs etc.)
    - [Latest Kernel](https://www.kernel.org/)
- Basic hardware-independent kernel services are exposed to higher-level programs through a library of **system calls** (e.g. services to create a file, begin execution of a program, or open a logical network connection to another computer).
- **Application programs** (e.g. word processors, spreadsheets) and system utility programs (simple but useful application programs that come with the operating system, e.g. programs which find text inside a group of files) make use of system calls. Applications and system utilities are launched using a `shell` (a textual command line interface) or a `graphical user interface` that provides direct user interaction.

![FamilyTreeOfUNIX](/assets/img/notes/unix_linux/familytree.gif)
[source](http://www.doc.ic.ac.uk/~wjk/UnixIntro/Lecture1.html)


## Directory Structure

The file-system is arranged in a hierarchical structure, like an inverted tree. The top of the hierarchy is traditionally called `root` (written as a slash `/` )

```
/home/its/ug1/ee51vn/report.doc 
```