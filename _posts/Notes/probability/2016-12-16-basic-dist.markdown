#bernulli
p(x | p) = p^x * (1 - p) ^ {1 - p}

#binominal:
p(n, k | p) = c(n, k) * p ^ k * (1 - p) ^ (n - k)

```
def fac(n):
    return 1 if n == 0 else n * fac(n - 1)
def comb(n, k):
    return fac(n) / (fac(k) *  fac(n - k))
def binom(n, k, p):
    return comb(n, k) * p ** k * (1 - p) ** (n - k)
```

#negative binomial: The experiment continues until  successes are observed. 
p(n,k | p) = c(n - 1, k - 1) * p ^ k * (1 - p) ^ (n - k)

#geometric: defect at k
p(k | p) = (1 - p)^{k - 1} * p

#poisson: 
p(k | \lambda) = \frac{\lambda ^ k}{k!} exp(-\lambda)
```
from math import exp, factorial
def poisson(k, l):
    return l ** k / factorial(k) * exp(-l)
```

#normal distribution

p(x | \mu, \sigma^2) = \frac{1}{\sigma\sqrt{2\pi}}\exp(-frac{(x - \mu)^2}{2\sigma^2})

## standard normal 
p(x | 0, 1) = \frac{1}{\sqrt{2\pi}}\exp(-frac{x^2}{2})

## cumulative F(x) = P(X <= x)

F(x) = \frac{1}{2}(1 + erf(\frac{x - \mu}{\sigma \sqrt{2}}))

where erf(z) = \frac{2}{\sqrt{\pi}} \int^{z}_{0} \exp(-x^2)dx

```
from math import erf, sqrt

def cumulative(x, mu, sigma):
    return 0.5 * (1 + erf( (x - mu) / (sigma * sqrt(2))))
```

#central limit theorem: i.i.d

mu = n * mu
sigma = sqrt(n) * sigma
var = n * var

#correlation

## Pearson Correlation

rho = (sum( (x - mu_x) * (y - mu_y) )) / (n * std_x * std_y)

```
from math import sqrt
def mean(arr):
    return sum(arr) / len(arr)
def variance(arr, avg):
    return sum((x - avg) ** 2 for x in arr) / len(arr)
rho = sum((x - avg1) * (y - avg2) for x, y in zip(arr1, arr2)) / (n * sqrt(var1) * sqrt(var2))
```

## Spearman Rank Correlation

```
from scipy.stat import rankdata
```

d_i = rank_{x_i} - rank_{y_i}

rho = 1 - {6 * sum(d_i^2)}{N(N^2 - 1)}


#linear regression y = a + bx

b = rho * \frac{\sigma_x}{\sigma_y}

```
from sklearn import linear_model
x = [[5, 7], [6, 6], [7, 4], [8, 5], [9, 6]]
y = [10, 20, 60, 40, 50]
lm = linear_model.LinearRegression()
lm.fit(x, y)
a = lm.intercept_
b = lm.coef_
print a, b[0], b[1]
```