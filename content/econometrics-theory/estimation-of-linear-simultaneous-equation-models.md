---
title: 5. Estimation of Linear Simultaneous Equation Models
linktitle: 5. Linear SEM Estimation
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-linear-estimation
    weight: 6
weight: 6
---

This chapter studies estimators for the complete linear simultaneous-equation model. The estimators differ mainly in which parameterization they use and which sample criterion they minimize.

For observation $i$, write

<div>$$
x_i=
\begin{pmatrix}
y_i\\
z_i
\end{pmatrix},
\qquad
y_i\in\mathbb{R}^G,
\qquad
z_i\in\mathbb{R}^K,
$$</div>

and consider the structural form

<div>$$
A x_i=u_i,
\qquad
A=(B,\ C),
\qquad
|B|\ne 0.
$$</div>

The system is complete, so $B$ is $G\times G$. The reduced form is

<div>$$
y_i=\Pi z_i+v_i,
\qquad
\Pi=-B^{-1}C,
\qquad
v_i=B^{-1}u_i,
$$</div>

with

<div>$$
\Omega=E(v_i v_i')=B^{-1}\Sigma(B')^{-1}.
$$</div>

For the sample, stack observations by rows:

<div>$$
Y=
\begin{pmatrix}
y_1'\\
\vdots\\
y_n'
\end{pmatrix},
\qquad
Z=
\begin{pmatrix}
z_1'\\
\vdots\\
z_n'
\end{pmatrix},
\qquad
X=(Y,\ Z).
$$</div>

Thus $Y$ is $n\times G$, $Z$ is $n\times K$, and $X$ is $n\times(G+K)$. The fitted reduced-form relation is

<div>$$
Y\approx Z\Pi',
$$</div>

because each row of $Y$ is $y_i'$.

Throughout this chapter, assume the predetermined variables are exogenous:

<div>$$
E(u_i\mid z_i)=E(u_i)=0,
$$</div>

and the structural disturbances are homoskedastic and serially uncorrelated:

<div>$$
E(u_i u_i'\mid z_i)=E(u_i u_i')=\Sigma_0>0,
$$</div>

<div>$$
E(u_i u_j'\mid z_1,\ldots,z_n)
=E(u_i u_j')
=\Sigma_0\,\mathbf{1}_{\{i=j\}}.
$$</div>

Autoregressive errors can be handled by transforming the system as in Chapter 3. This chapter does not treat moving-average or ARMA structural disturbances.

## 5.1 Parameterizations

There are three useful ways to describe the parameters.

### Structural-form parameters

The structural-form parameterization is

<div>$$
\Phi=(A,\Sigma).
$$</div>

This is the parameterization with the clearest structural interpretation. But it is identified only after imposing restrictions on $A$ and possibly on $\Sigma$.

### Reduced-form parameters

The reduced-form parameterization is

<div>$$
\Gamma=(\Pi,\Omega).
$$</div>

The reduced form is identifiable unless the predetermined variables are collinear. It is especially useful for prediction:

<div>$$
\widehat y_i=\widehat\Pi z_i.
$$</div>

The ordinary least-squares estimator of $\Pi$ is obtained from

<div>$$
\widetilde\Pi
=Y'Z(Z'Z)^{-1},
$$</div>

so that the fitted matrix is $Z\widetilde\Pi'$.

### Minimal parameters

Let $\theta\in\mathbb{R}^p$ be a vector of functionally unrelated parameters. The structural and reduced forms are functions of $\theta$:

<div>$$
\Phi(\theta)=(A(\theta),\Sigma(\theta)),
\qquad
\Gamma(\theta)=(\Pi(\theta),\Omega(\theta)).
$$</div>

The dimension satisfies

<div>$$
p\le GK+\frac{G(G+1)}{2},
$$</div>

because the reduced form has $GK$ coefficients in $\Pi$ and $G(G+1)/2$ distinct covariance parameters in the symmetric matrix $\Omega$.

If

<div>$$
p=GK+\frac{G(G+1)}{2},
$$</div>

the model is just identified. If

<div>$$
p<GK+\frac{G(G+1)}{2},
$$</div>

the model is overidentified.

With linear restrictions, $\Phi(\theta)$ can often be written explicitly by solving

<div>$$
B\Pi+C=0,
\qquad
W\alpha=w,
$$</div>

where

<div>$$
\alpha=
\begin{pmatrix}
\operatorname{vec}(B')\\
\operatorname{vec}(C')
\end{pmatrix}.
$$</div>

With nonlinear restrictions, $\Phi(\theta)$ may be defined only implicitly. Then estimation usually requires numerical solution or local approximation.

In many models, the structural coefficients and covariance parameters are variation-independent:

<div>$$
(A(\theta),\Sigma(\theta))
=
(A(\theta_1),\Sigma(\theta_2)),
\qquad
\theta=(\theta_1',\theta_2')'.
$$</div>

If only $A$ is of interest, we can focus on $A=A(\theta_1)$, with $p\le GK$.

## 5.2 Gaussian pseudo-maximum likelihood estimation

The Gaussian pseudo-maximum likelihood estimator is also called the quasi-maximum likelihood estimator. It uses the Gaussian reduced-form likelihood as an objective function, even if the true distribution is not Gaussian.

Start from the reduced form

<div>$$
y_i=\Pi z_i+v_i.
$$</div>

If

<div>$$
y_i\mid z_i\sim N(\Pi z_i,\Omega),
$$</div>

then, up to constants, the likelihood contains

<div>$$
|\Omega|^{-n/2}
\exp\left\{
-\frac{1}{2}
\operatorname{tr}\left[
(Y-Z\Pi')'(Y-Z\Pi')\Omega^{-1}
\right]
\right\}.
$$</div>

Using minus twice the log likelihood divided by $n$, define the sample objective

<div>$$
\begin{aligned}
Q(\theta)
&=
C+\log|\Omega|
+\frac{1}{n}
\operatorname{tr}\left[
(Y-Z\Pi')'(Y-Z\Pi')\Omega^{-1}
\right]\\
&=
C+\log|\Sigma|-2\log|B|
+\operatorname{tr}\left[
A\frac{X'X}{n}A'\Sigma^{-1}
\right].
\end{aligned}
\tag{5.1}
$$</div>

The first line writes the criterion in reduced-form parameters. The second line writes the same criterion in structural-form parameters, using

<div>$$
\Omega=B^{-1}\Sigma(B')^{-1},
\qquad
Y-Z\Pi'=X A'(B')^{-1}.
$$</div>

The Gaussian PMLE is

<div>$$
\widehat\theta
=
\arg\min_{\theta\in\Theta}Q(\theta),
$$</div>

with

<div>$$
\widehat\Phi=\Phi(\widehat\theta),
\qquad
\widehat\Gamma=\Gamma(\widehat\theta).
$$</div>

If the structural disturbances are conditionally Gaussian,

<div>$$
u_i\mid z_i\sim N(0,\Sigma_0),
$$</div>

then this estimator is the full-information maximum likelihood estimator.

### Existence

Assume:

- A1: $\Theta$ is compact, $|B(\theta)|\ne 0$, and $\Sigma(\theta)>0$ for every $\theta\in\Theta$.
- A2: $\Phi(\theta)$ is continuous in $\theta$.

Under A1 and A2, the PMLE exists, although it need not be unique. The reason is simple: $Q(\theta)$ is continuous in $\theta$, and a continuous function on a compact set attains its minimum.

### Profiling out the covariance matrix

Suppose $\Sigma$ is unconstrained and $\theta$ parameterizes only $A$. Then, for a fixed $A(\theta)$, minimizing (5.1) over $\Sigma$ gives

<div>$$
\widehat\Sigma(\theta)
=
A(\theta)\frac{X'X}{n}A(\theta)'.
$$</div>

Therefore the PMLE of $\theta$ solves the profiled problem

<div>$$
\widehat\theta
=
\arg\min_{\theta\in\Theta}
\left|
\frac{V(\theta)'V(\theta)}{n}
\right|,
\tag{5.2}
$$</div>

where

<div>$$
V(\theta)=Y-Z\Pi(\theta)'.
$$</div>

Equivalently,

<div>$$
\left|
\frac{V(\theta)'V(\theta)}{n}
\right|
=
\left(
\frac{|B(\theta)|^2}
{\left|A(\theta)\frac{X'X}{n}A(\theta)'\right|}
\right)^{-1}.
$$</div>

After $\widehat\theta$ is found,

<div>$$
\widehat\Sigma
=
A(\widehat\theta)\frac{X'X}{n}A(\widehat\theta)'.
$$</div>

The intuition is that, when $\Sigma$ is free, the likelihood chooses the covariance matrix that matches the structural residual covariance. What remains is to choose $\theta$ to make the reduced-form residual covariance determinant as small as possible.

## 5.3 Minimum-distance estimation (MDE / NLLS)

The profiled PMLE minimizes the determinant of the reduced-form residual covariance matrix. Determinants multiply eigenvalues, so the criterion can be highly nonlinear. Minimum-distance estimation instead uses a quadratic distance between the unrestricted reduced-form estimate and the restricted reduced form implied by $\theta$.

Let

<div>$$
\widetilde\Pi=Y'Z(Z'Z)^{-1}
$$</div>

be the unrestricted reduced-form least-squares estimator, and define the unrestricted reduced-form residual covariance

<div>$$
\widetilde\Omega
=
\frac{1}{n}
Y'\left[I_n-Z(Z'Z)^{-1}Z'\right]Y.
$$</div>

For any candidate $\theta$, define

<div>$$
V(\theta)=Y-Z\Pi(\theta)'.
$$</div>

The minimum-distance objective is

<div>$$
Q_{\mathrm{MDE}}(\theta)
=
\frac{1}{n}
\operatorname{tr}
\left[
V(\theta)'V(\theta)\widetilde\Omega^{-1}
\right].
\tag{5.3}
$$</div>

Equivalently, it minimizes

<div>$$
Q_2(\Pi(\theta),\widetilde\Omega)-\log|\widetilde\Omega|,
$$</div>

where the log-determinant term is constant in $\theta$.

The MDE is

<div>$$
\widehat\theta_{\mathrm{MDE}}
=
\arg\min_{\theta\in\Theta}Q_{\mathrm{MDE}}(\theta),
$$</div>

with

<div>$$
\widehat A_{\mathrm{MDE}}=A(\widehat\theta_{\mathrm{MDE}}),
\qquad
\widehat\Pi_{\mathrm{MDE}}=\Pi(\widehat\theta_{\mathrm{MDE}}).
$$</div>

Assume:

- A3: $\Theta$ is compact and $|B(\theta)|\ne 0$ for every $\theta\in\Theta$.
- A4: $A(\theta)$ is continuous on $\Theta$.

Under A3 and A4, the MDE exists, although it need not be unique.

The practical difference from PMLE is the weighting geometry. PMLE chooses $\theta$ by minimizing a generalized residual determinant. MDE chooses $\theta$ by making the restricted reduced form $\Pi(\theta)$ close to the unrestricted reduced-form estimate $\widetilde\Pi$, using $\widetilde\Omega^{-1}$ as the weighting matrix.

## 5.4 Two-stage and three-stage least squares

PMLE and MDE generally require numerical optimization. Even when the structural model is linear in $A$, the likelihood criterion contains terms such as $\log|B^{-1}\Sigma(B')^{-1}|$, so closed-form solutions are not automatic.

Two-stage least squares and three-stage least squares replace the full likelihood geometry with projection-based quadratic criteria. These criteria become especially convenient when the restrictions on $A$ are linear.

Let

<div>$$
P_Z=Z(Z'Z)^{-1}Z'
$$</div>

be the projection matrix onto the column space of $Z$. Recall that

<div>$$
\widetilde\Pi=Y'Z(Z'Z)^{-1}.
$$</div>

For a candidate $\theta$, the difference between the unrestricted and restricted reduced forms satisfies

<div>$$
V(\theta)'V(\theta)-\widetilde V'\widetilde V
=
(\widetilde\Pi-\Pi(\theta))Z'Z(\widetilde\Pi-\Pi(\theta))',
\tag{5.4}
$$</div>

where

<div>$$
\widetilde V=Y-Z\widetilde\Pi'.
$$</div>

This identity says that the loss from imposing the structural restrictions can be measured by the distance between $\widetilde\Pi$ and $\Pi(\theta)$ in the $Z'Z$ metric.

### Three-stage least squares

For a given positive definite estimate $\widehat\Sigma$, the three-stage least-squares objective is

<div>$$
S_{\mathrm{3SLS}}(\theta)
=
\frac{1}{n}
\operatorname{tr}
\left[
A(\theta)X'P_ZX A(\theta)'\widehat\Sigma^{-1}
\right].
\tag{5.5}
$$</div>

Equivalently,

<div>$$
S_{\mathrm{3SLS}}(\theta)
=
\frac{1}{n}
\operatorname{tr}
\left\{
A(\theta)
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
Z'Z
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}'
A(\theta)'
\widehat\Sigma^{-1}
\right\}.
$$</div>

The 3SLS estimator is

<div>$$
\widehat\theta_{\mathrm{3SLS}}
=
\arg\min_{\theta\in\Theta}
S_{\mathrm{3SLS}}(\theta),
$$</div>

with

<div>$$
\widehat A_{\mathrm{3SLS}}=A(\widehat\theta_{\mathrm{3SLS}}),
\qquad
\widehat\Pi_{\mathrm{3SLS}}=\Pi(\widehat\theta_{\mathrm{3SLS}}).
$$</div>

Under A3 and A4, the 3SLS estimator exists, although it need not be unique.

The role of $\widehat\Sigma^{-1}$ is to account for contemporaneous correlation across structural equations. If one equation has residuals strongly correlated with another, 3SLS uses that covariance information to estimate the system more efficiently.

### Two-stage least squares

The two-stage least-squares objective is the same projection criterion with the weighting matrix set to the identity:

<div>$$
S_{\mathrm{2SLS}}(\theta)
=
\frac{1}{n}
\operatorname{tr}
\left[
A(\theta)X'P_ZX A(\theta)'
\right].
\tag{5.6}
$$</div>

Equivalently,

<div>$$
S_{\mathrm{2SLS}}(\theta)
=
\frac{1}{n}
\operatorname{tr}
\left\{
A(\theta)
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
Z'Z
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}'
A(\theta)'
\right\}.
$$</div>

The 2SLS estimator is

<div>$$
\widetilde\theta_{\mathrm{2SLS}}
=
\arg\min_{\theta\in\Theta}
S_{\mathrm{2SLS}}(\theta),
$$</div>

with

<div>$$
\widetilde A_{\mathrm{2SLS}}
=A(\widetilde\theta_{\mathrm{2SLS}}),
\qquad
\widetilde\Pi_{\mathrm{2SLS}}
=\Pi(\widetilde\theta_{\mathrm{2SLS}}).
$$</div>

Under A3 and A4, the 2SLS estimator exists, although it need not be unique. It also supplies the covariance estimate used by 3SLS:

<div>$$
\widehat\Sigma
=
\widetilde A_{\mathrm{2SLS}}
\frac{X'X}{n}
\widetilde A_{\mathrm{2SLS}}'.
\tag{5.7}
$$</div>

The computational logic is:

1. Estimate the unrestricted reduced form $\widetilde\Pi$ by regressing $Y$ on $Z$.
2. Use the fitted reduced-form variation $P_ZX$ to form a structural quadratic criterion.
3. Minimize the criterion with identity weighting to obtain 2SLS.
4. Use 2SLS structural residuals to estimate $\Sigma$.
5. Re-minimize the criterion with $\widehat\Sigma^{-1}$ weighting to obtain 3SLS.

For a single equation, 2SLS is the familiar instrumental-variables estimator. In a full system, 3SLS extends the idea by adding cross-equation covariance weighting.
