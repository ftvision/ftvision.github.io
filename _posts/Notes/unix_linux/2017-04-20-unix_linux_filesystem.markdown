---
layout: single
title: the FileSystem in Unix/Linux
permalink: /unix_linux_filesystem
modified: 2017-04-21
---

{% include toc %}

The file system in Unix/Linux is arranged in a hierarchical structure, like an inverted tree. The top of the hierarchy is traditionally called `root` (written as a slash `/` )

The file system follows the [Filesystem Hierarchy Standard (FHS)](http://refspecs.linuxfoundation.org/fhs.shtml). This [UNIX FileSystem Wiki entry](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) serves as a good summary of the file system. 

**This standard consists of a set of requirements and guidelines for file and directory placement under UNIX-like operating systems**. It provides clear purposes and rationals for organizing files in this hierarchical system.


## The FileSystem

This standard assumes that the operating system underlying an FHS-compliant file system supports the same basic security features found in most UNIX filesystems.

**"Shareable"** files are those that can be stored on one host and used on others. **"Unshareable"** files are those that are not shareable. It is convenient if all the files a system requires that are stored on a foreign host can be made available by mounting one or a few directories from the foreign host.

**"Static"** files include binaries, libraries, documentation files and other files that do not change without system administrator intervention. **"Variable"** files are files that are not static, like emails, logs.

| |	shareable |	unshareable |
|----|:---:|:---:|
|static |/usr<br>/opt |/etc<br>/boot|
|variable| /var/mail <br> /var/spool/news | /var/run <br> /var/lock| 		

## The **Root** FileSystem

The contents of the root filesystem must be adequate to boot, restore, recover, and/or repair the system.

- **boot**: requires utilities, configuration, boot loader information, and other essential start-up data.
- **recover/repair**: utilities needed by an experienced maintainer to diagnose and reconstruct a damaged system must be present on the root filesystem.
- `/usr`, `/opt`, and `/var` are designed such that they may be located on other partitions or filesystems.
- **minimum principle**: The minimum requirements for the root filesystem should be as small as reasonably possible, but no smaller: mounted from other small media; and less pront to errors on disk that stores root.


![RootStructure](/assets/img/notes/unix_linux/rootstructure.png)

#### **Other** directories that must stay in `/`

|Directory	| Description |
|--|---|
|`home`	 | User home directories (optional) |
|`lib<qual>`	| Alternate format essential shared libraries (optional) |
|`root` |	Home directory for the root user (optional) |
|`proc`| LINUX: Kernel and process information virtual filesystem |
|`sys`| LINUX: Kernel and system information virtual filesystem |

### Details for subdirectories

#### `/`: Root

LINUX: if the kernel is located in `/`, we recommend using the names vmlinux or vmlinuz, which have been used in recent Linux kernel source packages.
{: .notice--warning}

#### `/bin`: Essential user command binaries (for use by all users)

contains commands that may be used by both the system administrator and by users, but which are required when no other filesystems are mounted (e.g. in single user mode). It may also contain commands which are used indirectly by scripts.
{: .notice--info}

There must be no subdirectories in `/bin`.
{: .notice--danger}

There are some essential utilities stored as binaries here.
{: .notice--danger}

LINUX: require additional files into `/bin`: setserial
{: .notice--warning}


#### `/boot`: Static files of the boot loader

contains everything required for the boot process except configuration files not needed at boot time and the map installer.Thus /boot stores data that is used before the kernel begins executing user-mode programs. This may include saved master boot sectors and sector map files.
{: .notice--info}

Programs necessary to arrange for the boot loader to be able to boot a file must be placed in `/sbin`. Configuration files for boot loaders that are not required at boot time must be placed in `/etc`.
{: .notice--danger}

The operating system kernel must be located in either `/` or `/boot`.
{: .notice--danger}

#### `/dev`: Device files

the location of special or device files.
{: .notice--info}

If it is possible that devices in `/dev` will need to be manually created, `/dev` must contain a command named `MAKEDEV`, which can create devices as needed. It may also contain a MAKEDEV.local for any local devices
{: .notice--danger}

LINUX: following devices must exist under `/dev`<br>`/dev/null`: All data written to this device is discarded. A read from this device will return an EOF condition. <br>`/dev/zero`: This device is a source of zeroed out data. All data written to this device is discarded. A read from this device will return as many bytes containing the value zero as was requested. <br>`/dev/tty`:This device is a synonym for the controlling terminal of a process. Once this device is opened, all reads and writes will behave as if the actual controlling terminal device had been opened.
{: .notice--warning}

#### `/etc`: Host-specific system configuration

contains configuration files. A "configuration file" is a local file used to control the operation of a program; it must be static and cannot be an executable binary.
{: .notice--info}

It is recommended that files be stored in subdirectories of `/etc` rather than directly in `/etc`. 
{: .notice--danger}

No binaries may be located under `/etc`.
{: .notice--danger}

LINUX: require  additional files into `/etc`: lilo.conf
{: .notice--warning}

`/etc/opt` (Configuration files for /opt): Host-specific configuration files for add-on application software packages must be installed within the directory `/etc/opt/<subdir>`, where `<subdir>` is the name of the subtree in `/opt` where the static data from that package is stored.
{: .notice--danger}

`/etc/X11`(Configuration for the X Window System (optional)): `/etc/X11` is the location for all X11 host-specific configuration. This directory is necessary to allow local control if `/usr` is mounted read only.
{: .notice--info}

#### `/home`: User home directories (optional)

`/home` is a fairly standard concept, but it is clearly a site-specific filesystem. The setup will differ from host to host. Therefore, no program should assume any specific location for a home directory, rather it should query for it.
{: .notice--info}

User specific configuration files for applications are stored in the user's home directory in a file that starts with the '.' character (a "dot file"). 
{: .notice--danger}

If an application needs to create more than one dot file then they should be placed in a subdirectory with a name starting with a '.' character, (a "dot directory"). In this case the configuration files should not start with the '.' character. 
{: .notice--danger}

#### `/lib`: Essential shared libraries and kernel modules

contains those shared library images needed to boot the system and run the commands in the root filesystem, ie. by binaries in `/bin` and `/sbin`. 
{: .notice--info}

If a C preprocessor is installed, `/lib/cpp` must be a reference to it, for historical reasons
{: .notice--danger}

`/lib<qual>`(Alternate format essential shared libraries (optional)): There may be one or more variants of the `/lib` directory on systems which support more than one binary format requiring separate libraries.
{: .notice--danger}

#### `/media`: Mount point for removable media

contains subdirectories which are used as mount points for removable media such as **floppy disks**, **cdroms** and **zip disks**.
{: .notice--info}

On systems where more than one device exists for mounting a certain type of media, mount directories can be created by appending a digit to the name of those available above starting with '0', but the unqualified name must also exist.
{: .notice--danger}

#### `/mnt`: Mount point for a *temporarily* mounted filesystem

serves when temporarily mount a filesystem as needed. The content of this directory is a local issue and should not affect the manner in which any program is run.
{: .notice--info}

#### `/opt`: Add-on application software packages

`/opt` is reserved for the installation of add-on application software packages.A package to be installed in `/opt` must locate its static files in a separate `/opt/<package>` or `/opt/<provider>` directory tree, where `<package>` is a name that describes the software package and `<provider>` is the provider's LANANA registered name.
{: .notice--info}

The directories `/opt/bin`, `/opt/doc`, `/opt/include`, `/opt/info`, `/opt/lib`, and `/opt/man` are reserved for local system administrator use. Packages may provide "front-end" files intended to be placed in (by linking or copying) these reserved directories by the local system administrator, but must function normally in the absence of these reserved directories.
{: .notice--danger}

Generally, all data required to support a package on a system must be present within `/opt/<package>`, including files intended to be copied into `/etc/opt/<package>` and `/var/opt/<package>` as well as reserved directories in /opt.
{: .notice--danger}

#### `/root`: Home directory for the root user (optional)

The root account's home directory may be determined by developer or local preference, but this is the recommended default location. 
{: .notice--info}

#### `/run`: Run-time variable data

contains system information data describing the system since it was booted. Files under this directory must be cleared (removed or truncated as appropriate) at the beginning of the boot process.
{: .notice--info}

Process identifier (PID) files, which were originally placed in `/etc`, must be placed in `/run`. The naming convention for PID files is `<program-name>.pid`. For example, the **crond** PID file is named `/run/crond.pid`.
{: .notice--danger}

#### `/sbin`: System binaries

Utilities used for **system administration** (and other root-only commands) are stored in `/sbin`, `/usr/sbin`, and `/usr/local/sbin`. **`/sbin` contains binaries essential for booting, restoring, recovering, and/or repairing the system in addition to the binaries in /bin.**Programs executed after `/usr` is known to be mounted (when there are no problems) are generally placed into `/usr/sbin`. Locally-installed system administration programs should be placed into `/usr/local/sbin`.
{: .notice--info}

There must be no subdirectories in `/sbin`.
{: .notice--danger}

LINUX: place commands relating to filesystem maintenance and boot loader management into `/sbin`.
{: .notice--warning}

#### `/srv`: Data for services provided by this system

contains site-specific data which is served by this system.
{: .notice--info}

#### `/tmp` : Temporary files

The /tmp directory must be made available for programs that require temporary files.
{: .notice--danger}

Programs must not assume that any files or directories in /tmp are preserved between invocations of the program.
{: .notice--danger}

#### `/proc` : Kernel and process information virtual filesystem

LINUX: The proc filesystem is the de-facto standard Linux method for handling process and system information, rather than /dev/kmem and other similar methods. We strongly encourage this for the storage and retrieval of process information as well as other kernel and memory information.
{: .notice--warning}

#### `/sys`: Kernel and system information virtual filesystem

LINUX: The `sys` filesystem is the location where information about devices, drivers, and some kernel features is exposed. Its underlying structure is determined by the particular Linux kernel being used at the moment, and is otherwise unspecified.
{: .notice--warning}

## `/usr` Hierarchy

`/usr` is the second major section of the filesystem. `/usr` is shareable, read-only data. That means that `/usr` should be shareable between various FHS-compliant hosts and must not be written to. Any information that is host-specific or varies with time is stored elsewhere.

![usrstr](/assets/img/notes/unix_linux/usrstructure.png)

#### `/usr/bin`: Most user commands

This is the primary directory of executable commands on the system.
{: .notice--info}

In many executable scripts, the interpreter to be invoked to execute the script is specified using `#!path_to_interpreter` on the first line of a script. To make such scripts portable among different systems, it is advantageous to standardize the interpreter locations. The shell interpreter is already fixed in `/bin` by this specification, but interpreters for Perl, Python, Tcl and expect may be installed in various places. The locations specified here may be implemented as symbolic links to the physical location of the interpreters.
{: .notice--info}

There must be no subdirectories in /usr/bin.
{: .notice--danger}


#### `/usr/include`: Directory for standard include files.

This is where all of the system's general-use include files for the C programming language should be placed.
{: .notice--info}


LINUX: These symbolic links are required if a C or C++ compiler is installed and only for systems not based on glibc. <br> `/usr/include/asm -> /usr/src/linux/include/asm-<arch>` <br> `/usr/include/linux -> /usr/src/linux/include/linux`
{: .notice--warning}

#### `/usr/lib`: Libraries for programming and packages

`/usr/lib` includes object files and libraries. On some systems, it may also include internal binaries that are not intended to be executed directly by users or shell scripts.
{: .notice--info}

Applications may use a single subdirectory under `/usr/lib`. If an application uses a subdirectory, all architecture-dependent data exclusively used by the application must be placed within that subdirectory. 
{: .notice--danger}

#### `/usr/libexec`: Binaries run by other programs (optional)

`/usr/libexec` includes internal binaries that are not intended to be executed directly by users or shell scripts. Applications may use a single subdirectory under `/usr/libexec`.
{: .notice--info}

#### `/usr/lib<qual>`: Alternate format libraries (optional)


#### `/usr/local`: Local hierarchy

The `/usr/local` hierarchy is for use by the system administrator when installing software locally. It needs to be safe from being overwritten when the system software is updated. It may be used for programs and data that are shareable amongst a group of hosts, but not found in `/usr`.
{: .notice--info}

Locally installed software must be placed within `/usr/local` rather than /usr unless it is being installed to replace or upgrade software in `/usr`.
{: .notice--danger}

If directories `/lib<qual>` or `/usr/lib<qual>` exist, the equivalent directories must also exist in `/usr/local`.`/usr/local/etc` may be a symbolic link to `/etc/local`.
{: .notice--danger}

#### `/usr/sbin`: Non-essential standard system binaries

This directory contains any non-essential binaries used exclusively by the system administrator. System administration programs that are required for system repair, system recovery, mounting /usr, or other essential functions must be placed in /sbin instead.
{: .notice--info}

There must be no subdirectories in /usr/sbin.
{: .notice--danger}

#### `/usr/share`: Architecture-independent data

The `/usr/share` hierarchy is for all read-only architecture independent data files.
{: .notice--info}

`/usr/share/man`: The primary `<mandir>` of the system is `/usr/share/man`. `/usr/share/man` contains manual information for commands and data under the `/` and `/usr` filesystems. Manual pages are stored in `<mandir>/<locale>/man<section>/<arch>`. 
{: .notice--info}

| Man Section | Content | Description |
|-------------|---------|-------------|
|man1|User programs | describe publicly accessible commands; most program documentation that a user will need to use is located here.|
|man2|System calls |This section describes all of the system calls (requests for the kernel to perform operations)|
|man3|Library calls |program library routines that are not direct calls to kernel services. This and chapter 2 are only really of interest to programmers.|
|man4|Special files|describes the special files, related driver functions, and networking support available in the system. Typically, this includes the device files found in `/dev` and the kernel interface to networking protocol support.|
|man5|File formats |The formats for many data files are documented in the section 5. This includes various include files, program output files, and system files.|
|man6|Games|This chapter documents games, demos, and generally trivial programs. |
|man7|Miscellaneous |Manual pages that are difficult to classify are designated as being section 7|
|man8|System administration |Programs used by system administrators for system operation and maintenance are documented here. Some of these programs are also occasionally useful for normal users.|

`/usr/share/misc`(Miscellaneous architecture-independent data): This directory contains miscellaneous architecture-independent files which don't require a separate subdirectory under /usr/share.
{: .notice--info}

#### `/usr/src`: Source code (optional)

LINUX: The only source code that should be placed in a specific location is the Linux kernel source code. It is located in `/usr/src/linux`. It is important that the kernel include files be located in `/usr/src/linux` and not in `/usr/include` so there are no problems when system administrators upgrade their kernel version for the first time.
{: .notice--warning}


## The `/var` Hierarchy

`/var` contains variable data files. This includes spool directories and files, administrative and logging data, and transient and temporary files. (Spool directory: The spool folder is a software folder or computer that holds files waiting to be printed until the printer is ready.)

Some portions of `/var` are not shareable between different systems. For instance, `/var/log`, `/var/lock`, and `/var/run`. Other portions may be shared, notably `/var/mail`, `/var/cache/man`, `/var/cache/fonts`, and `/var/spool/news`.

`/var` is specified here in order to make it possible to mount `/usr` read-only. Everything that once went into `/usr` that is written to during system operation (as opposed to installation and software maintenance) must be in `/var`.

If `/var` cannot be made a separate **partition**, it is often preferable to move `/var` out of the `root` partition and into the `/usr` partition. (This is sometimes done to reduce the size of the root partition or when space runs low in the root partition.) However, `/var` must not be linked to `/usr` because this makes separation of `/usr` and `/var` more difficult and is likely to create a naming conflict. Instead, link `/var` to `/usr/var`.

![varstr](/assets/img/notes/unix_linux/varstructure.png)

#### `/var/cache`: Application cache data

`/var/cache` is intended for cached data from applications. Such data is locally generated as a result of time-consuming I/O or calculation. The application must be able to regenerate or restore the data. Unlike `/var/spool`, the cached files can be deleted without data loss. The data must remain valid between invocations of the application and rebooting the system.
{: .notice--info}

Files located under `/var/cache` may be expired in an application specific manner, by the system administrator, or both. The application must always be able to recover from manual deletion of these files (generally because of a disk space shortage). No other requirements are made on the data format of the cache directories.
{: .notice--danger}

#### `/var/lib`: Variable state information

This hierarchy holds state information pertaining to an application or the system. State information is data that programs modify while they run, and that pertains to one specific host. Users must never need to modify files in `/var/lib` to configure a package's operation, and the specific file hierarchy used to store the data must not be exposed to regular users.
{: .notice--info}

State information is generally used to preserve the condition of an application (or a group of inter-related applications) between invocations and between different instances of the same application. State information should generally remain valid after a reboot, should not be logging output, and should not be spooled data.
{: .notice--info}

#### `/var/lock`: Lock files

Lock files should be stored within the `/var/lock` directory structure.
{: .notice--info}

Lock files for devices and other resources shared by multiple applications, such as the serial device lock files that were originally found in either `/usr/spool/locks` or `/usr/spool/uucp`, must now be stored in `/var/lock`. The naming convention which must be used is "LCK.." followed by the base name of the device.
{: .notice--danger}

The format used for the contents of such lock files must be the HDB UUCP lock file format. The HDB format is to store the process identifier (PID) as a ten byte ASCII decimal number, with a trailing newline. For example, if process 1230 holds a lock file, it would contain the eleven characters: space, space, space, space, space, space, one, two, three, zero, and newline.
{: .notice--danger}

Not Sure I understand this at all.
{: .notice--warning}

#### `/var/log`: Log files and directories

This directory contains miscellaneous log files. 
{: .notice--info}

Most logs must be written to this directory or an appropriate subdirectory.
{: .notice--danger}

#### `/var/opt`: Variable data for /opt

Variable data of the packages in `/opt` must be installed in `/var/opt/<subdir>`, where `<subdir>` is the name of the subtree in `/opt` where the static data from an add-on software package is stored, except where superseded by another file in `/etc`. No structure is imposed on the internal arrangement of `/var/opt/<subdir>`.
{: .notice--info}

#### `/var/run`: Run-time variable data

This directory was once intended for system information data describing the system since it was booted. These functions have been moved to /run; this directory exists to ensure compatibility with systems and software using an older version of this specification.
{: .notice--info}

#### `/var/spool`: Application spool data

`/var/spool` contains data which is awaiting some kind of later processing. Data in `/var/spool` represents work to be done in the future (by a program, user, or administrator); often data is deleted after it has been processed. 
{: .notice--info}

LINUX: This directory contains the variable data for the cron and at programs.
{: .notice--warning}

#### `/var/tmp`: Temporary files preserved between system reboots

The `/var/tmp` directory is made available for programs that require temporary files or directories that are preserved between system reboots. Therefore, data stored in /var/tmp is more persistent than data in `/tmp`.
{: .notice--info}

Files and directories located in `/var/tmp` must not be deleted when the system is booted. Although data stored in `/var/tmp` is typically deleted in a site-specific manner, it is recommended that deletions occur at a less frequent interval than /tmp.
{: .notice--danger}


