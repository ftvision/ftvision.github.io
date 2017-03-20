import numpy

# convert to numpy array
a = numpy.array([1,2,3,4,5])
print a[1]          #2
# convert to numpy array with special data type
b = numpy.array([1,2,3,4,5],float)
print b[1]          #2.0

#shape
npArray.shape
#re-shape
npArray.shape = (3,2) #directly change shape, [1,2,3,4,5,6] -> [ [1,2], [3,4], [5,6]]
numpy.reshape(npArray, (3,2))

#transpose
numpy.transpose(npArray)
#flatten
npArray.flatten() #becomes 1-D

#concatenate
numpy.concatenate((array_1, array_2, array_3))    
#concatenate in another axis: 0:rbind, attach new columns, 1:crbind, attach new row
array_1 = numpy.array([[1,2,3],[0,0,0]])
array_2 = numpy.array([[0,0,0],[7,8,9]])
numpy.concatenate((array_1, array_2), axis = 1)   

#zeros and ones
numpy.zeros((1,2)) #defaul type: float
numpy.zeros((1,2), int)
numpy.zeros( (dim1, dim2, dim3, ...), dtype = int) 
#eyes and identities
numpy.identity(n) #identity matrix
numpy.eye(n,m,k = k) #nxm matrix, the kth diagonal: k > 0, upper; k < 0, lower

#operations
#1. array, + - * / % ** mod, power(a,b) are all elementwise operation is the dimension is the same
#2. floor, ceil, rint(round to the nearest int), all return float
numpy.floor()
numpy.ceil()
numpy.rint()
#3. sum, prod
numpy.sum(data, axis = None) # axis = None, sum everything; 0: column, 1: row
numpy.prod(data, axis = None) # axis = None, prod everything; 0: column, 1: row
#4. min, max
numpy.min(data, axis = None) # axis = None, sum everything; 0: column, 1: row
numpy.max(data, axis = None) # axis = None, sum everything; 0: column, 1: row
#5. mean, var, std
numpy.mean(data, axis = None) # axis = None, sum everything; 0: column, 1: row
numpy.var(data, axis = None) # axis = None, sum everything; 0: column, 1: row
numpy.std(data, axis = None) # axis = None, sum everything; 0: column, 1: row
#6. dot and cross
#numpy.dot is actually calculate matrix product if inputs are n-dimensional
numpy.dot(a,b)
numpy.cross(a,b)
#7. inner product and outer product of vectors 
## 7.1 Inner Product: https://www.wikiwand.com/en/Inner_product_space
## 7.2 Outer Product: https://www.wikiwand.com/en/Outer_product
numpy.inner(a,b)
numpy.outer(a,b) 
#8. Polynomials: 
## 8.1 The `poly` tool returns the coefficients of a polynomial with the given sequence of roots.
numpy.poly([-1, 1, 1, 10]) #Output : [  1 -11   9  11 -10]
## 8.2 The `roots` tool returns the roots of a polynomial with the given coefficients.
numpy.roots([1, 0, -1])   #Output : [-1.  1.]
## 8.3 The `polyint` tool returns an antiderivative (indefinite integral) of a polynomial.
numpy.polyint([1, 1, 1])  #Output : [ 0.33333333  0.5 1. 0.]
## 8.4 The `polyder` tool returns the derivative of the specified order of a polynomial.
numpy.polyder([1, 1, 1, 1])       #Output : [3 2 1]
## 8.5 The `polyval` tool evaluates the polynomial at specific value.
numpy.polyval([1, -2, 0, 2], 4)   #Output : 34
## 8.6 The `polyfit` tool fits a polynomial of a specified order to a set of data using a least-squares approach.
numpy.polyfit([0,1,-1, 2, -2], [0,1,1, 4, 4], 2) #Output : [  1.00000000e+00   0.00000000e+00  -3.97205465e-16]

#9. Linear Algebra
## 9.1 The `linalg.det` tool computes the determinant of an array.
numpy.linalg.det([[1 , 2], [2, 1]]) #Output : -3.0
## 9.2 The `linalg.eig` computes the eigenvalues and right eigenvectors of a square array.
vals, vecs = numpy.linalg.eig([[1 , 2], [2, 1]])
## 9.3 The `linalg.inv` tool computes the (multiplicative) inverse of a matrix.
numpy.linalg.inv([[1 , 2], [2, 1]])