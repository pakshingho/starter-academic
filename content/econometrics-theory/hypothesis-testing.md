---
title: 9. Hypothesis Testing
linktitle: 9. Hypothesis Testing
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-testing
    weight: 10
weight: 10
---

This chapter studies large-sample hypothesis tests built from asymptotically normal estimators. The central idea is simple: if an estimator is close to normal after multiplying by $\sqrt n$, then restrictions on the true parameter can be tested by measuring how far the unrestricted estimate, the restricted estimate, or the objective function moves away from the null.

The three main tests are:

1. Wald tests, which use the unrestricted estimator and ask whether the estimated restriction is far from zero.
2. Lagrange multiplier tests, also called score tests, which use the restricted estimator and ask whether the unrestricted first-order conditions are nearly satisfied.
3. Pseudo likelihood ratio tests, which compare the objective value under the restricted and unrestricted estimates.

Under standard regularity conditions, all three tests have the same first-order null distribution. Under local alternatives, they also share the same noncentral chi-square limit when they are based on the same efficient objective.

## Testing setup and notation

Let the full parameter vector be a column vector partitioned as

<div>$$
\theta
=
\begin{pmatrix}
\theta_1\\
\theta_2
\end{pmatrix},
\qquad
\theta_1\in\mathbb{R}^q,
\qquad
\theta_2\in\mathbb{R}^s,
\qquad
p=q+s.
$$</div>

The true value is

<div>$$
\theta_0
=
\begin{pmatrix}
\theta_{10}\\
\theta_{20}
\end{pmatrix}.
$$</div>

The null hypothesis is written as

<div>$$
H_0:\theta_{10}=0,
$$</div>

against the alternative

<div>$$
H_1:\theta_{10}\ne 0.
$$</div>

The restriction is simple if $q=p$, because it pins down the entire parameter vector. It is composite if $q<p$, because $\theta_{20}$ remains unrestricted.

This form is not as special as it looks. Many hypotheses can be rewritten as $\theta_{10}=0$ by changing coordinates. For example, suppose the original parameter is $\phi_0\in\mathbb{R}^p$ and the null is the linear restriction

<div>$$
H_0:R\phi_0=r,
\qquad
R\in\mathbb{R}^{q\times p},
\qquad
\operatorname{rank}(R)=q.
$$</div>

Define a new parameter by

<div>$$
\theta_1=R\phi-r,
$$</div>

and choose $\theta_2$ to be any $s=p-q$ additional coordinates that make the transformation from $\phi$ to $\theta$ one-to-one locally. Then $H_0:R\phi_0=r$ becomes $H_0:\theta_{10}=0$.

This convention is especially helpful for numerical work. A simulation can generate data at different values of $\theta_{10}$ while keeping $\theta_{20}$ fixed, and then compare how quickly the rejection probabilities of Wald, LM, and likelihood-ratio-type tests change as the null becomes false.

## 9.1 Wald tests

Let $\widehat\theta$ be an unrestricted estimator of $\theta_0$, written as the column vector

<div>$$
\widehat\theta
=
\begin{pmatrix}
\widehat\theta_1\\
\widehat\theta_2
\end{pmatrix}.
$$</div>

Assume first that

<div>$$
\sqrt n(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,D),
\qquad
D=
\begin{pmatrix}
D_{11} & D_{12}\\
D_{21} & D_{22}
\end{pmatrix},
$$</div>

where $D_{11}$ is $q\times q$. The block $D_{11}$ is the asymptotic covariance matrix of $\sqrt n(\widehat\theta_1-\theta_{10})$.

Let $\widehat D_{11}$ estimate the null-limit value of $D_{11}$. Under $H_0$, the Wald statistic is

<div>$$
W
=
n\,\widehat\theta_1'\widehat D_{11}^{-1}\widehat\theta_1.
\tag{9.1}
$$</div>

The statistic has the form "estimate squared divided by variance." The only difference from a scalar $t$-test is that the restriction is vector-valued, so distance is measured using the inverse covariance matrix.

If $H_0$ is true and $\widehat D_{11}\xrightarrow{P}D_{11}^0>0$, then

<div>$$
W\xrightarrow{d}\chi_q^2.
\tag{9.2}
$$</div>

The proof is a direct Slutsky argument. Under $H_0$,

<div>$$
\sqrt n\,\widehat\theta_1
\xrightarrow{d}
N(0,D_{11}^0),
$$</div>

so premultiplying by $(D_{11}^0)^{-1/2}$ gives a $q$-dimensional standard normal vector. The squared Euclidean length of that vector is chi-square with $q$ degrees of freedom.

An asymptotic level-$\alpha$ Wald test rejects when

<div>$$
W>\chi_{q,\alpha}^2,
$$</div>

where $\chi_{q,\alpha}^2$ is the upper-tail critical value satisfying

<div>$$
\Pr\{\chi_q^2>\chi_{q,\alpha}^2\}=\alpha.
$$</div>

### Linear regression example

Consider the linear model

<div>$$
y_i=\beta_0'z_i+v_i,
\qquad
E(v_i\mid z_i)=0,
$$</div>

where $z_i$ is a $k\times 1$ column vector and $\beta_0$ is also $k\times 1$. The sample matrices stack observations by rows:

<div>$$
Y=
\begin{pmatrix}
y_1\\
\vdots\\
y_n
\end{pmatrix},
\qquad
Z=
\begin{pmatrix}
z_1'\\
\vdots\\
z_n'
\end{pmatrix}.
$$</div>

Suppose the null is

<div>$$
H_0:R\beta_0=r,
\qquad
R\in\mathbb{R}^{q\times k},
\qquad
\operatorname{rank}(R)=q.
$$</div>

With ordinary least squares,

<div>$$
\widehat\beta=(Z'Z)^{-1}Z'Y.
$$</div>

Let

<div>$$
\widehat M=\frac{Z'Z}{n},
\qquad
\widehat\sigma_v^2
=
\frac{1}{n}
\sum_{i=1}^n
(y_i-\widehat\beta'z_i)^2.
$$</div>

If $\widehat M\xrightarrow{P}M>0$ and the usual central limit theorem applies, then

<div>$$
\sqrt n(\widehat\beta-\beta_0)
\xrightarrow{d}
N(0,\sigma_v^2M^{-1}).
$$</div>

Under the null,

<div>$$
\sqrt n(R\widehat\beta-r)
\xrightarrow{d}
N(0,\sigma_v^2RM^{-1}R').
$$</div>

Thus the Wald statistic is

<div>$$
W
=
n(R\widehat\beta-r)'
\left[
\widehat\sigma_v^2 R\widehat M^{-1}R'
\right]^{-1}
(R\widehat\beta-r).
\tag{9.3}
$$</div>

This is the large-sample version of the familiar joint test for linear restrictions.

### Power and consistency

For a test statistic $\widehat\tau$ and critical value $c$, define the power function

<div>$$
\Pi_c(\theta_{10})
=
\Pr_{\theta_{10}}\{\widehat\tau>c\}.
$$</div>

If $c=\chi_{q,\alpha}^2$ and the null regularity conditions hold, then

<div>$$
\Pi_c(0)\to\alpha.
$$</div>

The test is consistent if, for every fixed $\theta_{10}\ne 0$,

<div>$$
\Pi_c(\theta_{10})\to 1.
$$</div>

For the Wald test, consistency follows if $\widehat D_{11}\xrightarrow{P}D_{11}>0$ under fixed alternatives. When $\theta_{10}\ne 0$,

<div>$$
\widehat\theta_1
=
\theta_{10}+O_p(n^{-1/2}),
$$</div>

so

<div>$$
W
=
n\,\theta_{10}'D_{11}^{-1}\theta_{10}
+O_p(\sqrt n).
$$</div>

The leading term grows at rate $n$, so the probability of crossing any fixed critical value converges to one.

### Local alternatives and noncentral chi-square limits

Fixed alternatives are easy to detect asymptotically. To compare tests more finely, use local alternatives:

<div>$$
H_{1n}:\theta_{10}^{(n)}
=
\frac{\delta}{\sqrt n},
\qquad
\delta\in\mathbb{R}^q.
$$</div>

Here the alternative drifts toward the null at exactly the same rate at which the estimator concentrates. Suppose that, under $H_{1n}$,

<div>$$
\sqrt n(\widehat\theta_1-\theta_{10}^{(n)})
\xrightarrow{d}
N(0,D_{11}),
\qquad
\widehat D_{11}\xrightarrow{P}D_{11}>0.
$$</div>

Then

<div>$$
\sqrt n\,\widehat\theta_1
\xrightarrow{d}
N(\delta,D_{11}),
$$</div>

and the Wald statistic satisfies

<div>$$
W
\xrightarrow{d}
\chi_q^2(\Lambda),
\qquad
\Lambda=\delta'D_{11}^{-1}\delta.
\tag{9.4}
$$</div>

The distribution $\chi_q^2(\Lambda)$ is a noncentral chi-square distribution. It can be represented as

<div>$$
\sum_{j=1}^q(U_j+\lambda_j)^2,
\qquad
U_j\overset{\mathrm{iid}}{\sim}N(0,1),
\qquad
\sum_{j=1}^q\lambda_j^2=\Lambda.
$$</div>

For fixed $q$ and fixed critical value $c$, the rejection probability

<div>$$
\Pr\{\chi_q^2(\Lambda)>c\}
$$</div>

is increasing in $\Lambda$. Therefore, under local alternatives, a test is more powerful when it produces a larger noncentrality parameter.

### Local efficiency

Suppose two unrestricted estimators are both asymptotically normal, and their $\theta_1$ covariance blocks are $D_{11}$ and $E_{11}$. The corresponding local noncentrality parameters are

<div>$$
\Lambda_D=\delta'D_{11}^{-1}\delta,
\qquad
\Lambda_E=\delta'E_{11}^{-1}\delta.
$$</div>

If

<div>$$
D_{11}\le E_{11}
$$</div>

in the Loewner order, then

<div>$$
\Lambda_D\ge \Lambda_E
$$</div>

for every local direction $\delta$. The estimator with smaller asymptotic covariance gives the more locally powerful Wald test.

This is the testing version of estimator efficiency. For example, in a linear regression with valid exogeneity, ordinary least squares is more efficient than an instrumental-variables estimator that uses only a projection of $Z$. If both are used to test $R\beta_0=r$, the OLS-based Wald test has the larger local noncentrality parameter.

## 9.2 Extremum-estimator test setup

Many estimators in the course are extremum estimators. Let

<div>$$
\widehat\theta=\arg\min_{\theta\in\Theta}Q(\theta),
$$</div>

where $Q(\theta)$ is the sample objective. To keep notation compact, write

<div>$$
Q_\theta(\theta)
=
\frac{\partial Q(\theta)}{\partial\theta},
\qquad
Q_{\theta\theta}(\theta)
=
\frac{\partial^2 Q(\theta)}
{\partial\theta\,\partial\theta'}.
$$</div>

Assume that $\theta_0$ is an interior point, $\widehat\theta\xrightarrow{P}\theta_0$, and

<div>$$
\sqrt n\,Q_\theta(\theta_0)
\xrightarrow{d}
N(0,B),
\qquad
Q_{\theta\theta}(\bar\theta)
\xrightarrow{P}
A>0
$$</div>

for every sequence $\bar\theta\xrightarrow{P}\theta_0$. The first-order expansion of $Q_\theta(\widehat\theta)=0$ gives

<div>$$
\sqrt n(\widehat\theta-\theta_0)
=
-A^{-1}\sqrt n\,Q_\theta(\theta_0)+o_p(1),
$$</div>

and therefore

<div>$$
\sqrt n(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,A^{-1}BA^{-1}).
\tag{9.5}
$$</div>

The covariance matrix in (9.5) is the sandwich matrix. In efficient likelihood-type cases, the information equality gives $A=B$, and the limit variance becomes $A^{-1}$.

For testing, suppose the efficient-form condition is written as

<div>$$
\sqrt n\,Q_\theta(\theta_0)
\xrightarrow{d}
N(0,D^{-1}),
\qquad
Q_{\theta\theta}(\bar\theta)
\xrightarrow{P}
D^{-1}>0.
$$</div>

Then

<div>$$
\sqrt n(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,D).
$$</div>

The Wald statistic remains

<div>$$
W
=
n\,\widehat\theta_1'\widehat D_{11}^{-1}\widehat\theta_1,
$$</div>

where $\widehat D_{11}$ estimates the $q\times q$ upper-left block of $D$. Under $H_0$,

<div>$$
W\xrightarrow{d}\chi_q^2.
$$</div>

Under fixed alternatives, the same statistic is consistent. Under local alternatives $\theta_{10}^{(n)}=\delta/\sqrt n$,

<div>$$
W\xrightarrow{d}\chi_q^2(\delta'D_{11}^{-1}\delta).
$$</div>

This section is the bridge from the general Wald test to the LM and pseudo likelihood ratio tests. Once the objective has a quadratic expansion around $\theta_0$, the unrestricted estimate, the restricted score, and the objective-value gap all become different views of the same local geometry.

## 9.3 Lagrange multiplier (score) tests

The Wald test estimates the unrestricted model first. The Lagrange multiplier test goes the other way: estimate the model under the null and then ask whether the unrestricted first-order conditions are nearly satisfied.

Let the restricted estimator be

<div>$$
\widetilde\theta
=
\arg\min_{\theta\in\Theta:\theta_1=0}Q(\theta)
=
\begin{pmatrix}
0\\
\widetilde\theta_2
\end{pmatrix}.
$$</div>

Since $\widetilde\theta_2$ is unrestricted inside the null model, its first-order condition is

<div>$$
Q_2(\widetilde\theta)=0,
$$</div>

where $Q_2$ denotes the derivative with respect to $\theta_2$.

Set up the Lagrangian

<div>$$
\mathcal L(\theta,\lambda)
=
Q(\theta)-\lambda'\theta_1,
\qquad
\lambda\in\mathbb{R}^q.
$$</div>

The restricted first-order conditions are

<div>$$
Q_1(\widetilde\theta)-\widetilde\lambda=0,
\qquad
Q_2(\widetilde\theta)=0.
$$</div>

Therefore,

<div>$$
\widetilde\lambda=Q_1(\widetilde\theta).
$$</div>

The multiplier is the part of the unrestricted score that remains after imposing the null. If the null is true, the restriction should be almost nonbinding in large samples, so $\widetilde\lambda$ should be close to zero.

Let $\widetilde D_{11}$ estimate the covariance block used to standardize the restricted score. In the efficient extremum setup, this block is the upper-left block of $D$, equivalently the inverse of the asymptotic covariance of $\sqrt{n}\widetilde\lambda$. The LM statistic is

<div>$$
LM
=
n\,\widetilde\lambda'\widetilde D_{11}\widetilde\lambda.
\tag{9.6}
$$</div>

Because $Q_2(\widetilde\theta)=0$, the full score at the restricted estimator is

<div>$$
Q_\theta(\widetilde\theta)
=
\begin{pmatrix}
\widetilde\lambda\\
0
\end{pmatrix}.
$$</div>

Thus the same statistic can often be written as a score quadratic form:

<div>$$
LM
=
n\,Q_\theta(\widetilde\theta)'\widetilde D\,Q_\theta(\widetilde\theta),
$$</div>

with the appropriate block weighting matrix $\widetilde D$.

Under the null and the same efficient local quadratic conditions used above,

<div>$$
LM\xrightarrow{d}\chi_q^2.
\tag{9.7}
$$</div>

The proof uses a Taylor expansion of the restricted score around $\theta_0$. Under $H_0$, the restricted estimator is consistent for $\theta_0$, and the part of the score left over in the restricted direction has asymptotic covariance $\widetilde D_{11}^{-1}$. The quadratic form in (9.6) therefore converges to chi-square with $q$ degrees of freedom.

### Regression example: LM as $nR^2$

Return to the regression model and the null $R\beta_0=r$. Let $\widetilde\beta$ be the restricted least-squares estimator and let

<div>$$
\widetilde v=Y-Z\widetilde\beta
$$</div>

be the restricted residual vector. With the Gaussian pseudo-likelihood objective, the restricted variance estimate is

<div>$$
\widetilde\sigma^2
=
\frac{1}{n}
\widetilde v'\widetilde v.
$$</div>

The LM statistic can be written as

<div>$$
LM
=
\frac{\widetilde v'Z(Z'Z)^{-1}Z'\widetilde v}
{\widetilde\sigma^2}.
\tag{9.8}
$$</div>

If $R_{\mathrm{aux}}^2$ is the centered or appropriately uncentered $R^2$ from the auxiliary regression of the restricted residuals $\widetilde v$ on the regressors $Z$, then

<div>$$
LM=nR_{\mathrm{aux}}^2.
$$</div>

This formula gives the score-test intuition very clearly. If the null is correct, the residuals from the restricted model should have no systematic projection on the regressors left for the unrestricted model to exploit.

### Local behavior

Under fixed alternatives, the restricted score does not vanish asymptotically, and the LM statistic diverges. Hence the LM test is consistent.

Under local alternatives

<div>$$
\theta_{10}^{(n)}=\frac{\delta}{\sqrt n},
$$</div>

the LM statistic has the same local limit as the efficient Wald statistic:

<div>$$
LM
\xrightarrow{d}
\chi_q^2(\delta'D_{11}^{-1}\delta).
\tag{9.9}
$$</div>

So, to first order, the Wald and LM tests are locally equivalent when they use the same efficient objective. Their finite-sample behavior can still differ because one uses the unrestricted estimate and the other uses the restricted estimate.

## 9.4 Pseudo likelihood ratio tests

The pseudo likelihood ratio test compares the minimized objective under the null with the minimized objective without the null. Let

<div>$$
\widehat\theta
=
\arg\min_{\theta\in\Theta}Q(\theta),
\qquad
\widetilde\theta
=
\arg\min_{\theta\in\Theta:\theta_1=0}Q(\theta).
$$</div>

Because the unrestricted parameter space contains the restricted one,

<div>$$
Q(\widehat\theta)\le Q(\widetilde\theta).
$$</div>

The pseudo likelihood ratio statistic is

<div>$$
LR
=
2n\{Q(\widetilde\theta)-Q(\widehat\theta)\}.
\tag{9.10}
$$</div>

The factor $2n$ matches the usual likelihood-ratio scaling when $Q$ is the average negative log likelihood, up to constants.

Under the null and the efficient local quadratic conditions,

<div>$$
LR\xrightarrow{d}\chi_q^2.
\tag{9.11}
$$</div>

The proof expands $Q(\widetilde\theta)$ around $\widehat\theta$. Since $Q_\theta(\widehat\theta)=0$,

<div>$$
Q(\widetilde\theta)-Q(\widehat\theta)
=
\frac{1}{2}
(\widetilde\theta-\widehat\theta)'
Q_{\theta\theta}(\bar\theta)
(\widetilde\theta-\widehat\theta),
$$</div>

where $\bar\theta$ lies between $\widetilde\theta$ and $\widehat\theta$. The Hessian converges to the information matrix, and the constrained-unconstrained difference is driven by the same estimated restriction that appears in the Wald statistic. Hence $LR=W+o_p(1)$ under $H_0$ in the efficient quadratic case.

### Regression example

For the Gaussian regression objective

<div>$$
Q(\beta,\sigma^2)
=
\frac{1}{2}\log\sigma^2
+
\frac{1}{2n\sigma^2}
(Y-Z\beta)'(Y-Z\beta),
$$</div>

the unrestricted and restricted minimized objectives are

<div>$$
Q(\widehat\beta,\widehat\sigma^2)
=
\frac{1}{2}\log\widehat\sigma^2+\frac{1}{2},
\qquad
Q(\widetilde\beta,\widetilde\sigma^2)
=
\frac{1}{2}\log\widetilde\sigma^2+\frac{1}{2}.
$$</div>

Therefore,

<div>$$
LR
=
n\log\left(
\frac{\widetilde\sigma^2}{\widehat\sigma^2}
\right).
\tag{9.12}
$$</div>

The restricted residual sum of squares can be related to the unrestricted one:

<div>$$
\widetilde\sigma^2
=
\widehat\sigma^2
+
(\widehat\beta-\widetilde\beta)'
\widehat M
(\widehat\beta-\widetilde\beta),
\qquad
\widehat M=\frac{Z'Z}{n}.
$$</div>

Using the restricted least-squares formula,

<div>$$
\widetilde\beta
=
\widehat\beta
+
\widehat M^{-1}R'
(R\widehat M^{-1}R')^{-1}
(r-R\widehat\beta),
$$</div>

one obtains

<div>$$
\widetilde\sigma^2
=
\left(1+\frac{W}{n}\right)\widehat\sigma^2.
$$</div>

Thus

<div>$$
LR
=
n\log\left(1+\frac{W}{n}\right)
=
W+o_p(1)
$$</div>

under the null.

### Local behavior and comparison

Under fixed alternatives, the objective gap between the restricted and unrestricted estimators remains positive in the limit, so $LR$ diverges at rate $n$. The pseudo likelihood ratio test is therefore consistent.

Under local alternatives

<div>$$
\theta_{10}^{(n)}=\frac{\delta}{\sqrt n},
$$</div>

the pseudo likelihood ratio statistic satisfies

<div>$$
LR
\xrightarrow{d}
\chi_q^2(\delta'D_{11}^{-1}\delta).
\tag{9.13}
$$</div>

In the regular efficient case, Wald, LM, and pseudo likelihood ratio tests are asymptotically equivalent:

<div>$$
W=LM+o_p(1),
\qquad
LR=W+o_p(1),
$$</div>

under the null and under local alternatives. A useful finite-sample ordering in many quadratic settings is

<div>$$
LM\le LR\le W.
$$</div>

The three statistics answer the same local question from three directions. Wald starts from the unrestricted estimate, LM starts from the restricted estimate, and pseudo likelihood ratio measures the objective-function cost of imposing the restriction.
