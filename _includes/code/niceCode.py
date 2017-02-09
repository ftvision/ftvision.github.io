
# level Order of binary tree
# a nice code of using queue to do BSF
def levelOrder(self,root):
    queue = [root] if root else []
    
    while queue:
        node = queue.pop()
        print(node.data, end=" ")
        
        if node.left: queue.insert(0,node.left)
        if node.right: queue.insert(0,node.right)

##tuple comparison
# - get return day, month, year: rd, rm, ry
# - get dealine day, month, year: ed, em, ey
# IF return is before dealine: no penality
# ELIF in the same month: 15 * (late day)
# ELIF in the same year: 500 * (late month)
# ELSE : 10000
#
# This is probabily the most elegant way to do this set of comparison
# Original Link: https://www.hackerrank.com/challenges/30-nested-logic
rd, rm, ry = [int(x) for x in raw_input().split(' ')]
ed, em, ey = [int(x) for x in raw_input().split(' ')]

if (ry, rm, rd) <= (ey, em, ed):
    print(0)
elif (ry, rm) == (ey, em):
    print(15 * (rd - ed))
elif ry == ey:
    print(500 * (rm - em))
else:
    print(10000)