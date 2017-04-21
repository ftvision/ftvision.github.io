---
layout: single
title: Redirect Info in Unix/Linux
permalink: /unix_linux_utilities/processes
modified: 2017-03-24
---


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
