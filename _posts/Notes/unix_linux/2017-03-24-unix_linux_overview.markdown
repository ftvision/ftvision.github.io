---
layout: single
title: Overview of Unix/Linux
permalink: /unix_linux_overview
modified: 2017-04-20
---

## Types of Unix

It was originally developed as a research project at AT&T Bell Labs in 1969. Over the years, many versions of UNIX and UNIX-like operating systems (including Linux and Mac OS X) have been developed. The most popular varieties of UNIX are Sun Solaris, GNU/Linux, and MacOS X, see the family tree below ([source](http://www.doc.ic.ac.uk/~wjk/UnixIntro/Lecture1.html)). 

![FamilyTreeOfUNIX](/assets/img/notes/unix_linux/familytree.gif)

These all work in much the same manner and all share the following characteristics:

- **Portable**
    - UNIX was designed to be easily ported (moved from one hardware platform to another). It has been ported to everything from desktop computers to room-sized supercomputers.
- **Mutli-user**
    - UNIX allows many people to share the resources of a single computer simultaneously.
- **Mutli-tasking**
    - UNIX allows users to run multiple programs at once. UNIX imposes strict constraints which keep ill-behaved programs from affecting other programs and the operating system itself.

## Basic Parts of UNIX operating system

### 1. The Kernel

The kernel of UNIX is the hub of the operating system, it provides low-level device, memory and processor management functions: it directly controls the underlying hardware, deals with interrupts from hardware devices, shares the processor among multiple programs, allocates time and memory to programs, and handles the filestore and communications in response to system calls.

Basic hardware-independent kernel services are exposed to higher-level programs through a library of **system calls** (e.g. services to create a file, begin execution of a program, or open a logical network connection to another computer).

#### Latest Kernal

You can get [Latest Kernel](https://www.kernel.org/) online.

#### Know your kernal

You can get your kernal version from terminal (credits to [source](https://www.liquidweb.com/kb/how-to-check-the-kernel-version-in-linux-ubuntu-centos/))

```bash
$ uname -r

#-a, --all                print all information
#-s, --kernel-name        print the kernel name
#-n, --nodename           print the network node hostname
#-r, --kernel-release     print the kernel release
#-v, --kernel-version     print the kernel version
#-m, --machine            print the machine hardware name
#-p, --processor          print the processor type or "unknown"
#-i, --hardware-platform  print the hardware platform or "unknown"
#-o, --operating-system   print the operating system
#--help                   display this help and exit
#--version                output version information and exit
```

You can see something like:

```bash
2.6.32-431.11.2.el6.x86_64:
#- 2 – Kernel Version
#- 6 – Major Revision
#- 32 – Minor Revision
#- 431.11.2.el6 – Fix/Revision Detail
```

or if you use `uname -rs` in MaxOS X, you can get something like

```
Darwin 14.5.0
```


### 2. The Shell

The shell acts as an interface between the user and the kernel. When a user logs in, the login program checks the username and password, and then starts another program called the shell. The shell is a command line interpreter (CLI). It interprets the commands the user types in and arranges for them to be carried out. 

Commonly used shells include: BASH, TCSH, ZSH, etc.

### 3. The Programmes

Everything in UNIX is either a **file** or a **process**.
    
- A process is an executing program identified by a unique PID (process identifier).
- A file is a collection of data. They are created by users using text editors, running compilers etc.

**Application programs** (e.g. word processors, spreadsheets) and **system utility programs** make use of system calls. Applications and system utilities are launched using a `shell` (a textual command line interface) or a `graphical user interface` that provides direct user interaction.

