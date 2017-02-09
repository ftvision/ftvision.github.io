#control flow

#simple
if expr:
	statement

if x > 0:
	print("Right")

#a bit longer
if expr:
	statement1
else:
	statement2

#much longer
if expr:
	statement1
elif expr2:
	statement2
else:
	statement3

#nested
if expr:
	statement1
else:
	if expr2_1:
		statement2_1
	else:
		statement2_2

#----------

while expr: #while true, do; 
	statement

while n > 0:
	print n
  n = n-1
  print 'Blastoff!'

while True: 
	break


for char in fruit:
	print char

#for loop with no-iterator identified
for _ in range(int(raw_input())):

#---loop with number

def is_abecedarian(word): 
	i=0
  while i < len(word)-1:
  	if word[i+1] < word[i]:
    	return False
    i = i+1
	return True

#---loop with tuple
t = [('a', 0), ('b', 1), ('c', 2)]
for letter, number in t:
    print number, letter

for index, element in enumerate('abc'):
	print index, element