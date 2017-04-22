---
layout: single
title: LFS Preface
permalink: /LFS_preface
modified: 2017-04-20
---

LFS, as of Version 8.0, builds a Linux System according to the following standards:

## 1. [POSIX.1-2008](http://pubs.opengroup.org/onlinepubs/9699919799/) 


POSIX.1-2008 defines a standard operating system interface and environment, including a command interpreter (or “shell”), and common utility programs to support applications portability at the source code level. (Note: POSIX - The Portable Operating System Interface)
    
- **Base Definitions**: General terms, concepts, and interfaces common to all volumes of this standard, including utility conventions and C-language header definitions, are included in the Base Definitions volume.
- **System Interfaces**: Definitions for system service functions and subroutines, language-specific system services for the C programming language, function issues, including portability, error handling, and error recovery, are included in the System Interfaces volume.
- **Shell & Utilities**: Definitions for a standard source code-level interface to command interpretation services (a “shell”) and common utility programs for application programs are included in the Shell and Utilities volume.
- **Rationale**: Extended rationale that did not fit well into the rest of the document structure, which contains historical information concerning the contents of POSIX.1-2008 and why features were included or discarded by the standard developers, is included in the Rationale (Informative) volume.

## 2. [Filesystem Hierarchy Standard (FHS) Version 3.0](http://refspecs.linuxfoundation.org/fhs.shtml)

- Root Filesystem
- The `/usr` Hierarchy
- The `/var` Hierarchy

Details are referred to [Here](/unix_linux_filesystem)

## 3. [Linux Standard Base (LSB) Version 5.0](http://refspecs.linuxfoundation.org/fhs.shtml)

The Linux Standard Base (LSB) defines a system interface for compiled applications and a minimal environment for support of installation scripts. Its purpose is to enable a uniform industry standard environment for high-volume applications conforming to the LSB.

The LSB specification set is divided into modules, each of which provides fundamental system interfaces, libraries, and runtime environment upon which all conforming applications and libraries using that module depend.

- Core
- Desktop
- Runtime Languages
- Imaging
- Trial Use: Gtk3, Graphics