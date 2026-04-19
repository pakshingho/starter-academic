---
title: 2. Asymptotic Theory
linktitle: 2. Asymptotic Theory
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-asymptotic-theory
    weight: 3
weight: 3
---

When we analyze the properties of estimators or statistics for unknown parameters, it is often difficult to say much in exact finite samples. The note therefore studies what happens as the sample size $n$ becomes larger and larger, treating the large-sample limit as a tractable approximation to finite-sample behavior. This is the basic asymptotic perspective used throughout the rest of econometrics.

## 2.1 Some types of convergence

This section introduces the main modes of stochastic convergence and the first general tools for working with them. Let $\{x_n : n = 1,2,\dots\}$ be a sequence of random variables, and let $x$ be another random variable defined on the same probability space. The limit $x$ may also be a constant.

A running econometric example is that $x_n$ may be the least-squares estimator of $\beta$ based on the first $n$ observations, while $x$ is the true parameter value $\beta_0$.

### Convergence in probability

We say that $x_n$ converges in probability to $x$, written

<div>$$x_n \xrightarrow{P} x,$$</div>

if for every $\delta > 0$,

<div>$$\lim_{n \to \infty} \Pr\{|x_n-x|>\delta\} = 0.$$</div>

Equivalently,

<div>$$\lim_{n \to \infty} \Pr\{|x_n-x| \le \delta\} = 1.$$</div>

The note also records the equivalent epsilon-delta form: for every $\delta>0$ and every $\varepsilon>0$, there exists $n_0(\varepsilon,\delta)$ such that for all $n \ge n_0(\varepsilon,\delta)$,

<div>$$\Pr\{|x_n-x|>\delta\}<\varepsilon.$$</div>

#### Weak consistency

If $\hat\theta_n$ estimates an unknown parameter $\theta$, then $\hat\theta_n$ is weakly consistent if

<div>$$\hat\theta_n-\theta \xrightarrow{P} 0.$$</div>

Intuitively, consistency means that when $n$ is large, the probability that $\hat\theta_n$ differs from $\theta$ by more than a fixed amount $\delta$ is very small. The note emphasizes that this is a minimal requirement for a usable estimator.

### Almost sure convergence

We say that $x_n$ converges almost surely to $x$, written

<div>$$x_n \xrightarrow{a.s.} x,$$</div>

if for every $\delta>0$,

<div>$$\lim_{n \to \infty}\Pr\{|x_m-x|>\delta \text{ for some } m \ge n\}=0.$$</div>

Equivalently,

<div>$$\lim_{n \to \infty}\Pr\{|x_m-x|\le \delta \text{ for all } m \ge n\}=1.$$</div>

Another equivalent way to write the same condition is

<div>$$\Pr\left\{\lim_{n\to\infty}|x_n-x|=0\right\}=1.$$</div>

If $\hat\theta_n \xrightarrow{a.s.} \theta$, then $\hat\theta_n$ is strongly consistent.

#### Example: convergence in probability

Let

<div>$$X_n =
\begin{cases}
\theta, & \text{with probability } 1-\frac{1}{n},\\
1+\theta, & \text{with probability } \frac{1}{n}.
\end{cases}$$</div>

Then

<div>$$X_n \xrightarrow{P} \theta,$$</div>

because for any fixed $0<\delta\le 1$,

<div>$$\Pr\{|X_n-\theta|>\delta\}=\Pr\{X_n=1+\theta\}=\frac{1}{n}\to 0.$$</div>

#### Example: almost sure convergence

Let

<div>$$X_n =
\begin{cases}
0, & \text{with probability } 1-\frac{1}{n^2},\\
n, & \text{with probability } \frac{1}{n^2}.
\end{cases}$$</div>

Then

<div>$$X_n \xrightarrow{a.s.} 0.$$</div>

Indeed, for any $\delta>0$,

<div>$$\Pr\{|X_m|\ge \delta \text{ for some } m\ge n\}
\le \sum_{m=n}^{\infty}\Pr\{|X_m|\ge \delta\}
= \sum_{m=n}^{\infty}\frac{1}{m^2}\to 0,$$</div>

since $\sum_{m=1}^{\infty} m^{-2}<\infty$.

### Uniform convergence in probability and complete convergence

Up to this point the sequence has not been indexed by an additional parameter. If instead $x_n(\theta)$ is indexed by $\theta \in \Theta$, then the note defines uniform convergence in probability by

<div>$$\lim_{n\to\infty}\Pr\left\{\sup_{\theta\in\Theta}|x_n(\theta)-x(\theta)|<\varepsilon\right\}=1.$$</div>

An even stronger notion is complete convergence. We say that

<div>$$x_n \xrightarrow{c} x$$</div>

if for every $\delta>0$,

<div>$$\sum_{n=0}^{\infty}\Pr\{|x_n-x|>\delta\}<\infty.$$</div>

### Relations among the different modes of convergence

The note records two basic implications:

1. <div>$$x_n \xrightarrow{a.s.} x \implies x_n \xrightarrow{P} x.$$</div>
2. <div>$$x_n \xrightarrow{c} x \implies x_n \xrightarrow{a.s.} x.$$</div>

#### Proof sketch

For the first implication, almost sure convergence says that for every $\delta>0$ and every $\varepsilon>0$, there exists $n_0(\varepsilon)$ such that

<div>$$1-\varepsilon < \Pr\left\{\bigcap_{m=n_0}^{\infty}\{|x_m-x|\le \delta\}\right\}.$$</div>

Since

<div>$$\bigcap_{m=n_0}^{\infty}\{|x_m-x|\le \delta\}\subseteq \{|x_n-x|\le \delta\} \qquad \text{for each } n\ge n_0,$$</div>

the monotonicity of probability implies

<div>$$1-\varepsilon<\Pr\{|x_n-x|\le \delta\}$$</div>

for all large $n$, which is exactly convergence in probability.

For the second implication, if $x_n \xrightarrow{c} x$, then for every $\delta>0$,

<div>$$\sum_{m=n+1}^{\infty}\Pr\{|x_m-x|>\delta\}\to 0.$$</div>

Using the union bound,

<div>$$\Pr\{|x_m-x|>\delta \text{ for some } m\ge n+1\}
\le \sum_{m=n+1}^{\infty}\Pr\{|x_m-x|>\delta\},$$</div>

and the right-hand side can be made arbitrarily small, which gives almost sure convergence.

The note remarks that convergence in probability does not, in general, imply almost sure convergence.

### Vector convergence and Slutsky's theorem

In econometrics we are usually interested in vectors and matrices. If $x_n$ and $x$ are $k\times 1$ vectors with components $x_{nj}$ and $x_j$, then

<div>$$x_n \xrightarrow{P} x \qquad \Longleftrightarrow \qquad x_{nj}\xrightarrow{P} x_j \text{ for all } j=1,\dots,k.$$</div>

The same componentwise equivalence also holds for almost sure convergence and complete convergence.

One of the key tools is Slutsky's theorem. If

<div>$$x_n \xrightarrow{P} x,$$</div>

and $g$ is continuous on the domain of $x$, then

<div>$$g(x_n)\xrightarrow{P} g(x).$$</div>

#### Proof idea

Following the note, fix a small $\eta>0$. Choose a compact set $S$ such that

<div>$$\Pr\{x\notin S\}\le \frac{\varepsilon}{2}.$$</div>

Because $g$ is continuous, it is uniformly continuous on $S$. Hence there exists $\delta(\eta)>0$ such that

<div>$$\|x-y\|\le \delta \implies \|g(x)-g(y)\|\le \eta \qquad \text{for all } x,y\in S.$$</div>

Since $x_n\xrightarrow{P}x$, for large enough $n$,

<div>$$\Pr\{\|x_n-x\|>\delta\}\le \frac{\varepsilon}{2}.$$</div>

Combining this with the compact-set event $\{x\in S\}$ yields

<div>$$\Pr\{\|g(x_n)-g(x)\|\le \eta\}\ge 1-\varepsilon,$$</div>

which proves the claim.

Two immediate corollaries used repeatedly later are:

1. If $x_n\xrightarrow{P} c$ and $g$ is continuous at $c$, then
   <div>$$g(x_n)\xrightarrow{P} g(c).$$</div>
2. If $x_n\xrightarrow{P} x$, then
   <div>$$\|x_n-x\|\xrightarrow{P} 0.$$</div>

#### Example: second-moment matrices in regression

Let $z_i$ be a $k\times 1$ vector, and let

<div>$$Z = (z_1^\prime,\dots,z_n^\prime)^\prime.$$</div>

Then the empirical second-moment matrix is

<div>$$\widehat M = \frac{1}{n}\sum_{i=1}^{n} z_i z_i^\prime = \frac{1}{n}Z^\prime Z.$$</div>

Suppose

<div>$$\widehat M \xrightarrow{P} M>0,$$</div>

where $M$ is positive definite. By Slutsky's theorem,

<div>$$\widehat M^{-1}\xrightarrow{P} M^{-1}.$$</div>

Now consider the regression model

<div>$$y_i=\beta^\prime z_i + u_i,$$</div>

where $u_i$ are iid with mean $0$ and variance $\sigma^2$, and are independent of $z_i$. The least-squares estimator is

<div>$$\hat\beta_n = (Z^\prime Z)^{-1}Z^\prime Y,$$</div>

with $Y=(y_1,\dots,y_n)^\prime$. Later in the course we show that

<div>$$n^{1/2}(\hat\beta_n-\beta)\xrightarrow{d}N(0,\sigma^2 M^{-1}).$$</div>

So if we also have an estimator $\hat\sigma^2$ with

<div>$$\hat\sigma^2\xrightarrow{P}\sigma^2,$$</div>

then Slutsky's theorem gives

<div>$$\hat\sigma^2\widehat M^{-1}\xrightarrow{P}\sigma^2 M^{-1},$$</div>

which means we have a consistent estimator for the asymptotic variance of $\hat\beta_n$.

### Asymptotic unbiasedness

The note next distinguishes unbiasedness from asymptotic unbiasedness.

An estimator $\hat\theta_n$ is unbiased for $\theta$ if

<div>$$E_\theta(\hat\theta_n)=\theta \qquad \text{for all } \theta.$$</div>

It is asymptotically unbiased if

<div>$$\lim_{n\to\infty}E_\theta(\hat\theta_n)=\theta \qquad \text{for all } \theta.$$</div>

#### Example

In the linear model

<div>$$Y=Z\beta+U,$$</div>

with

<div>$$Y=(y_1,\dots,y_n)^\prime,\qquad Z=(z_1^\prime,\dots,z_n^\prime)^\prime,\qquad U=(u_1,\dots,u_n)^\prime,\qquad \beta=(\beta_1,\dots,\beta_k)^\prime,$$</div>

if $u_i$ are iid with mean $0$ and variance $\sigma^2$, and the regressors are deterministic, then $\hat\beta_n$ is unbiased for $\beta$ whenever $\widehat M>0$.

Also,

<div>$$\hat\sigma_n^2 = \frac{1}{n-k}\sum_{i=1}^{n}(y_i-\hat\beta_n^\prime z_i)^2$$</div>

is unbiased for $\sigma^2$, whereas

<div>$$\tilde\sigma_n^2 = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat\beta_n^\prime z_i)^2$$</div>

is asymptotically unbiased provided $\widehat M \to M>0$.

#### Consistency and asymptotic unbiasedness do not imply one another

The note proves that consistency and asymptotic unbiasedness are logically distinct.

For asymptotic unbiasedness without consistency, take

<div>$$\hat\theta_n \equiv x \sim N(\theta,1) \qquad \text{for every } n.$$</div>

Then

<div>$$E(\hat\theta_n)=\theta,$$</div>

so the estimator is unbiased, hence asymptotically unbiased. But its distribution never tightens around $\theta$, so

<div>$$\Pr\{|\hat\theta_n-\theta|>\delta\}=\Pr\{|x-\theta|>\delta\}\not\to 0,$$</div>

and therefore it is not consistent.

For consistency without asymptotic unbiasedness, consider

<div>$$\hat\theta_n =
\begin{cases}
\theta, & \text{with probability } 1-\frac{1}{n},\\
n^\alpha, & \text{with probability } \frac{1}{n}.
\end{cases}$$</div>

Then for every $\delta>0$,

<div>$$\Pr\{|\hat\theta_n-\theta|>\delta\}=\Pr\{\hat\theta_n=n^\alpha\}=\frac{1}{n}\to 0,$$</div>

so $\hat\theta_n$ is consistent. But

<div>$$E(\hat\theta_n)=\theta\left(1-\frac{1}{n}\right)+n^\alpha \cdot \frac{1}{n}
= \theta-\frac{\theta}{n}+n^{\alpha-1},$$</div>

which converges to

<div>$$\begin{cases}
\theta, & \alpha<1,\\
\theta+1, & \alpha=1,\\
\infty, & \alpha>1.
\end{cases}$$</div>

Hence the estimator fails to be asymptotically unbiased when $\alpha\ge 1$.

The lesson emphasized in the note is that many econometric estimators are biased or asymptotically biased, or may not even have a convenient expectation, and yet they are still useful because they are consistent and, after normalization, have a limiting distribution centered on the true parameter.

- 2.1.1 Convergence in r-th mean
- 2.1.2 Conditions for convergence in r-th mean
- 2.1.3 Conditions for consistency in regression

## 2.2 Stochastic order of magnitude

## 2.3 Convergence in distribution

## 2.4 Central limit theorems

## 2.5 Consistency of extremum estimators

- 2.5.1 Central limit theorem for extremum estimators

## 2.6 Central limit theorems for time-series data
