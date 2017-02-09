#!/bin/bash

#print -- echo

echo "hello, $USER. I wish to list some files of yours"
echo "listing files in the current directory, $PWD"

#variable
X="hello" #define

$X #refer to 

#unhappy about space
X=hello world # error
X="hello world" # OK

#Basically, variable names are exapnded within double quotes, but not single quotes.

#!/bin/bash
echo -n '$USER=' # -n option stops echo from breaking the line
echo "$USER"
echo "\$USER=$USER"  # this does the same thing as the first two lines

#Using Braces to Protect Your Variables
#!/bin/bash
X=ABC
echo "${X}abc" #$Xabc is not a variable, use {} to protect X from Xabc


#Command Substitution
#!/bin/bash

#brace expansion
#$(commands) expands to the output of commands This permits nesting, 
#so commands can include brace expansions
files="$(ls)"

#Backtick expansion expands `commands` to the output of commands
web_files=`ls public_html`
echo "$files"      # we need the quotes to preserve embedded newlines in $files
echo "$web_files"  # we need the quotes to preserve newlines 
X=`expr 3 \* 2 + 4` # expr evaluate arithmatic expressions. man expr for details.
echo "$X"