#http://www.panix.com/~elflord/unix/bash-tute.html

if condition
then
	statement1
	statement2
	..........
fi

#if ... else
if condition
then
	statement1
	statement2
	..........
else
	statement3
fi

#if ... elif ... else
if condition1
then
	statement1
	statement2
	..........
elif condition2
then
	statement3
	statement4
	........    
elif condition3
then
	statement5
	statement6
	........    

fi

# "test" expression
# "operand1<space>operator<space>operand2" or operator<space>operand2
test operand1 operator operand2
# or
[ operand1 operator operand2 ]
# such as 
[ $X -lt $Y ] # <

#will have weird bug. always wrap everything after "-n"

#!/bin/bash
X="-n"
Y=""
if [ $X = $Y ] ; then #becomes [ -n = ]
	echo "X=Y"
fi

#test and operants http://www.panix.com/~elflord/unix/bash-tute.html


#loops

#for loop
#bash is an interpreted language, 
#and a rather slow one for for loop. 
#For this reason, heavy iteration is discouraged.
for X in red green blue
do
	echo $X
done

#echo all images
echo *.jpg

#while loop
X=0
while [ $X -le 20 ]
do
	echo $X
	X=$((X+1))
done
