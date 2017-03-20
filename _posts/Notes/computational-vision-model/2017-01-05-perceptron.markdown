---
layout: single
title: Perceptrons and Multilayer Perceptrons 
permalink: /CVmodel/perceptron
prev: /CVmodel/perceptron/
late: /CVmodel/deeplearning/
topic: Computational Models for Vision
topiclink: /CVmodel/
---

## Perceptrons

Perceptron is the simplest neural network algorithm, which dates back to the 1950's. It can represent quite a range of, though not all of, decision rules. Inspired by the biological neural system, the perceptron is usually depicted in the following way. 


<img src="\assets\img\notes\computational-vision-model\perceptron.png" alt="SchematicFigure" class="img-responsive center-block">

We need to solve two problems by using the perceptron:

1. **Decision Making**: use a decision rule to classify the data 
2. **Learning**: learn the decision rule from the data

Given a dataset contains $N$ samples: $\\{ (\mathbf{x}\_\mu, y\_\mu): \mu = 1 ... N , y\_\mu \in \\{-1, +1\\}\\}$, where each data $\mathbf{x}\_\mu = (x\_{\mu 1}, x\_{\mu 2}, ..., x\_{\mu d})$ is a $d$-dimension vector. What's more, suppose we have a set of weights $\mathbf{w}= (w_1, w_2, ... w_d)$, also a $d$-deminsion vector.

<hr>

#### 1. Decision Making

$$\hat{y}(\mathbf{x}) = sign(\mathbf{w \cdot x})$$

Here, $\mathbf{w \cdot x} = 0$ draws a hyperplane that separate the space such that 

$$\mathbf{w \cdot x_\mu} \geq 0 \text{ if } y_\mu = +1$$

$$\mathbf{w \cdot x_\mu} \leq 0 \text{ if } y_\mu = -1$$

We can know that $\mathbf{w \cdot x} = 0$ is a hyperplane that goes through the origin. We can relax this constrain by setting $\mathbf{\hat{w}} = (w_0, w_1, ... w_d)$, and $\mathbf{\hat{x}}\_{\mu} = (1, x\_{\mu 1},x\_{\mu 2}, ..., x\_{\mu d})$. So, in the end, we actually work in $(d + 1)$-dimensional space.

<hr>

#### 2. Learning

If we know the weights $\mathbf{w}$, we can classify a new data $\mathbf{x}_{N+1}$ into one of the two categories by the decision rule that is described above.

What if we don't know the weights and we want to find out the decision rule? That is, we have a set of data and their categories, can we learn the underlying decision rule from the data? This is the learning problem. 

**Algorithm**

1. $\mathbf{w}(0) = 0$
2. loop over $\mu = 1 ... N$
	- if $x\_\mu$ is missclassifed (i.e. $y\_\mu \cdot sign(\mathbf{w \cdot x\_\mu}) < 0$), update weights: $\mathbf{w} = \mathbf{w} + y\_\mu \mathbf{x\_\mu}$
3. repeat 2 until all samples are classified correctly.

**Note 1:** $\mathbf{w}$ is not unique, as shown in the figure below. We can require $\|\mathbf{w}\|=1$ .

<img src="\assets\img\notes\computational-vision-model\Perceptron_multiweight.png" alt="SchematicFigure" class="img-responsive center-block">

**Note 2:** There is a hypothesis space of classifiers – the set of all perceptrons in this case – and this hypothesis space has a capacity which is $d + 1$ for perceptrons. To ensure generalization, you need much more training data than the capacity of the hypothesis space that you are using.

<hr>

### On Convergence: Novikov’s Theorem 

>**Assumption:** a hyperplane decision rule is possible.

Is the perceptron guaranteed to converge if the assumption is satisfied?

<div class="theorem"> <strong>Novikov’s Theorem:</strong> The perceptron algorithm will converge to a solution weight $\hat{w}$ that classifies all the samples correctly, provided this is possible.</div>

<blockquote class="proof">
<p>sketch of the proof: Let $\tilde{\mathbf{w}}$ be a separating weight, $m = \min_\mu \tilde{\mathbf{w}} \cdot \mathbf{x_\mu} > 0$, and $\beta^2 = \max_\mu |\mathbf{x}_\mu|^2$, we can show that $||\mathbf{w_{t+1}} - \frac{\beta^2}{m}\mathbf{\tilde{w}}||^2$ decrease by a fixed amount $\beta^2$ in each update, and  $||\mathbf{w_{0}} - \frac{\beta^2}{m}\mathbf{\tilde{w}}||^2$ is bounded above by $||0 - \frac{\beta^2}{m}\mathbf{\tilde{w}}||^2$. Therefore, the perceptron is guaranteed to converge.</p>
<p>For a full proof, <a href="http://cs229.stanford.edu/notes/cs229-notes6.pdf">refer to here.</a></p>
</blockquote>

<hr>

### Limitations

The Perceptron was criticized (Minksy and Papert) because it was not all to represent all decision rules – i.e. you cannot always separate data into positive and negative by using a plane. But it is also good: this means that perceptrons have limited capacity and this enables good generalization for some types of data.

<hr>

## Multi-layer Perceptrons