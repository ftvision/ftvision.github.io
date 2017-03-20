#iteration tool
#high efficiency iteration tool in Python

#itertools.product
#"""get Cartesian Product"""
from itertools import product
### Need to Change into list type or other types
list(product([1,2,3],repeat = 2))
#[(1, 1), (1, 2), (1, 3), (2, 1), (2, 2), (2, 3), (3, 1), (3, 2), (3, 3)]
product(A,B,C)
#equivalent to [(x,y,z) for x in A for y in B for z in C]
A = [[1,2,3],[3,4,5]]
list(product(*A))
#[(1, 3), (1, 4), (1, 5), (2, 3), (2, 4), (2, 5), (3, 3), (3, 4), (3, 5)]

#itertools.permutations
#"""get permutation from the list"""
from itertools import permutations
#itertools.permutations(iterable[, r])
list(permutations(['1','2','3'],2))
#[('1', '2'), ('1', '3'), ('2', '1'), ('2', '3'), ('3', '1'), ('3', '2')]

#itertools.combinations
from itertools import combinations
#itertools.combinations(iterable, r) 

#itertools.combinations_with_replacement()
from itertools import combinations_with_replacement
#itertools.combinations_with_replacement(iterable, r) 

#itertools.groupby()
#[list(g) for k, g in groupby('AAAABBBCCD')] --> AAAA BBB CC D
# [k for k, g in groupby('AAAABBBCCDAABBB')] --> A B C D A B
#k is the key, g is the group 