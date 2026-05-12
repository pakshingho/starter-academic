---
title: 7. Asymptotic Normality and Constrained Estimation
linktitle: 7. Asymptotic Normality
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-asymptotic-normality
    weight: 8
weight: 8
---

This chapter moves from consistency to asymptotic normality. Once an estimator is known to converge to the true parameter, the next question is whether its centered and scaled error has an approximately normal distribution.

The chapter also studies constrained estimation. Restrictions can identify an otherwise unidentified model, and valid restrictions can improve efficiency.

## Asymptotic normality of extremum estimates

Let $\widehat\theta$ minimize a sample objective $Q_n(\theta)$. To keep notation light, write $Q(\theta)$ for $Q_n(\theta)$ in this section. Assume:

C1: $\theta_0$ is an interior point of the compact parameter space $\Theta$.

C2: $Q(\theta)$ is twice continuously differentiable in a neighborhood of $\theta_0$, and

<div>$$
n^{1/2}\frac{\partial Q(\theta_0)}{\partial\theta}
\xrightarrow{d}
N(0,D),
$$</div>

while, for every intermediate sequence $\widetilde\theta\xrightarrow{P}\theta_0$,

<div>$$
\frac{\partial^2 Q(\widetilde\theta)}
{\partial\theta\,\partial\theta'}
\xrightarrow{P}
E>0.
$$</div>

C3: $\widehat\theta\xrightarrow{P}\theta_0$.

Then

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,E^{-1}DE^{-1}).
\tag{7.1}
$$</div>

The proof is the standard extremum-estimator expansion. Since $\theta_0$ is interior and $\widehat\theta\to_p\theta_0$, with probability approaching one $\widehat\theta$ is also interior. Therefore the first-order condition holds:

<div>$$
\frac{\partial Q(\widehat\theta)}{\partial\theta}=0.
$$</div>

A mean-value expansion around $\theta_0$ gives

<div>$$
0
=
n^{1/2}\frac{\partial Q(\theta_0)}{\partial\theta}
+
\left[
\frac{\partial^2 Q(\widetilde\theta)}
{\partial\theta\,\partial\theta'}
\right]
n^{1/2}(\widehat\theta-\theta_0),
$$</div>

where $\widetilde\theta$ lies between $\widehat\theta$ and $\theta_0$. By C2 and C3,

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
=
-E^{-1}
n^{1/2}\frac{\partial Q(\theta_0)}{\partial\theta}
+o_p(1).
$$</div>

The limit distribution in (7.1) follows by Slutsky's theorem.

The interior condition C1 is essential. If $\theta_0$ lies on the boundary of $\Theta$, the first-order condition may fail, and the asymptotic distribution can be nonnormal or truncated.

In likelihood and nonlinear least-squares settings with independent errors, it is common to have $D=E$. Then

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,E^{-1}).
$$</div>

For instrumental-variables and related estimators, generally $D\ne E$, producing the familiar sandwich covariance matrix.

### PMLE asymptotic normality

For the Gaussian PMLE from Chapter 5, introduce the following conditions.

B1: $\theta_0$ is an interior point of $\Theta$.

B2:

<div>$$
\widehat M=\frac{Z'Z}{n}\xrightarrow{P}M>0.
$$</div>

B3:

<div>$$
n^{1/2}
\begin{pmatrix}
\operatorname{vec}(\widehat N)\\
\operatorname{vec}(\widehat O-\Omega_0)
\end{pmatrix}
\xrightarrow{d}
N(0,L),
\tag{7.2}
$$</div>

where

<div>$$
\widehat N=\frac{Z'V_0}{n},
\qquad
\widehat O=\frac{V_0'V_0}{n},
\qquad
V_0=Y-Z\Pi_0'.
$$</div>

B4: $\Phi(\theta)=(A(\theta),\Sigma(\theta))$ is twice continuously differentiable in $\theta$.

B5: $\theta_0$ is a regular point of

<div>$$
\begin{pmatrix}
P\\
W
\end{pmatrix},
\qquad
P=\frac{\partial\operatorname{vec}(\Pi')}{\partial\theta'},
\qquad
W=\frac{\partial\operatorname{vec}(\Omega)}{\partial\theta'}.
$$</div>

Let

<div>$$
\Pi_i=\frac{\partial\Pi}{\partial\theta_i},
\qquad
\Omega_i=\frac{\partial\Omega}{\partial\theta_i}.
$$</div>

Define

<div>$$
H_0'
=
\left[
\begin{array}{cc}
\Omega_0^{-1}\otimes I_K & 0\\
0 & \frac{1}{2}(\Omega_0^{-1}\otimes\Omega_0^{-1})
\end{array}
\right]
\begin{pmatrix}
P\\
W
\end{pmatrix}_{\theta=\theta_0},
$$</div>

and

<div>$$
E_0
=
\begin{pmatrix}
P' & W'
\end{pmatrix}
\left[
\begin{array}{cc}
\Omega_0^{-1}\otimes M & 0\\
0 & \frac{1}{2}(\Omega_0^{-1}\otimes\Omega_0^{-1})
\end{array}
\right]
\begin{pmatrix}
P\\
W
\end{pmatrix}_{\theta=\theta_0}.
\tag{7.3}
$$</div>

The matrix $H_0$ comes from the first derivative of the Gaussian objective, while $E_0$ is the probability limit of the Hessian.

Under A1, A7, and B1-B5, the PMLE satisfies

<div>$$
n^{1/2}(\widehat\theta_{\mathrm{PMLE}}-\theta_0)
\xrightarrow{d}
N(0,E_0^{-1}D_0E_0^{-1}),
\qquad
D_0=H_0LH_0'.
\tag{7.4}
$$</div>

The logic is:

1. B2 and B3 imply the probability limits used in the Chapter 6 consistency proof.
2. A7 and B5 imply local identification, so $E_0$ is positive definite.
3. The score has a central limit theorem with covariance $D_0$.
4. The Hessian converges to $E_0$.
5. The general extremum-estimator theorem applies.

The condition $E_0>0$ is sufficient for identification. Under the regular-point condition, it is also necessary for local asymptotic identification.

Condition B3 holds in many common settings, including some time-series settings with stochastic or nonstochastic $z_i$, lagged dependent variables, and serially correlated reduced-form disturbances, provided the relevant central limit theorem applies.

## Special case: when reduced-form and covariance parameters are functionally unrelated

Suppose the parameter vector separates as

<div>$$
\theta=
\begin{pmatrix}
\theta_\Pi\\
\theta_\Omega
\end{pmatrix},
\qquad
\Pi=\Pi(\theta_\Pi),
\qquad
\Omega=\Omega(\theta_\Omega).
$$</div>

Then the derivative matrix is block diagonal:

<div>$$
\frac{\partial}{\partial\theta'}
\operatorname{vec}(\Pi',\Omega)
=
\begin{pmatrix}
P_1 & 0\\
0 & P_2
\end{pmatrix}.
$$</div>

Consequently,

<div>$$
E_0=
\begin{pmatrix}
E_1 & 0\\
0 & E_2
\end{pmatrix},
$$</div>

where

<div>$$
E_1=P_1'(\Omega_0^{-1}\otimes M)P_1,
\qquad
E_2=\frac{1}{2}P_2'(\Omega_0^{-1}\otimes\Omega_0^{-1})P_2.
$$</div>

The asymptotic covariance matrix keeps the same block logic, although the off-diagonal block can be nonzero if the reduced-form coefficient estimator and covariance estimator are asymptotically correlated.

If the structural disturbances are Gaussian, the corresponding cross-covariance block is zero, so the estimators of $\theta_\Pi$ and $\theta_\Omega$ are asymptotically uncorrelated.

For the coefficient block,

<div>$$
n^{1/2}
(\widehat\theta_\Pi-\theta_{\Pi,0})
\xrightarrow{d}
N\left(
0,
\left[
P_1'(\Omega_0^{-1}\otimes M)P_1
\right]^{-1}
\right).
\tag{7.5}
$$</div>

There is also a structural-form expression. Let

<div>$$
\widetilde P_1
=
\frac{\partial\operatorname{vec}(A')}{\partial\theta_\Pi'}.
$$</div>

Using $B\Pi+C=0$, the same covariance matrix can be written as

<div>$$
\left[
\widetilde P_1'
\left\{
\Sigma_0^{-1}
\otimes
\left(
\begin{pmatrix}
\Pi_0\\
I_K
\end{pmatrix}
M
\begin{pmatrix}
\Pi_0\\
I_K
\end{pmatrix}'
\right)
\right\}
\widetilde P_1
\right]^{-1}.
$$</div>

This representation is useful because it expresses the asymptotic variance directly in terms of the structural matrix $A$ rather than the reduced-form map $\Pi(\theta)$.

## 7.1 Statistical properties of numerical methods

Before deriving the asymptotic distribution of MDE and 3SLS, it is useful to compare estimators by comparing their first-order conditions.

Let $F_n(\theta)$ and $H_n(\theta)$ be two loss functions. Let

<div>$$
f_n(\theta)=\frac{\partial F_n(\theta)}{\partial\theta},
\qquad
g_n(\theta)=\frac{\partial H_n(\theta)}{\partial\theta}.
$$</div>

Suppose

<div>$$
f_n(\widehat\theta_n)=0,
\qquad
g_n(\widetilde\theta_n)=0.
$$</div>

Assume:

1. $\widehat\theta_n\xrightarrow{P}\theta_0$.
2. $\widetilde\theta_n\xrightarrow{P}\theta_0$.
3. In a neighborhood of $\theta_0$, $g_n$ has derivative

<div>$$
G_n(\theta)=\frac{\partial g_n(\theta)}{\partial\theta'},
$$</div>

with

<div>$$
G_n(\theta_0)=G+o_p(1),
\qquad
|G|\ne 0,
$$</div>

and $G_n(\theta)$ is uniformly close to $G_n(\theta_0)$ on shrinking neighborhoods of $\theta_0$.

Then

<div>$$
\widehat\theta_n-\widetilde\theta_n
=
O_p\left(
\left\|
f_n(\widehat\theta_n)-g_n(\widehat\theta_n)
\right\|
\right)
=
O_p\left(
\left\|
g_n(\widehat\theta_n)
\right\|
\right).
\tag{7.6}
$$</div>

The idea is that if both estimators solve nearby smooth first-order conditions, then their distance is controlled by how badly one estimator violates the other's first-order condition.

Now assume $\Sigma$ is unrestricted and $\theta$ parameterizes $A$ alone. Add:

B6:

<div>$$
n^{1/2}\operatorname{vec}(\widehat N)
\xrightarrow{d}
N(0,L_{11}).
$$</div>

B7:

<div>$$
\widehat O\xrightarrow{P}\Omega_0>0.
$$</div>

B8: $A(\theta)$ is twice continuously differentiable.

B9: $\theta_0$ is a regular point of

<div>$$
P=\frac{\partial\operatorname{vec}(\Pi')}{\partial\theta'}.
$$</div>

Under A3, A7, B1, B2, and B6-B9,

<div>$$
\widehat\theta_{\mathrm{PMLE}}
-\widehat\theta_{\mathrm{MDE}}
=
O_p(n^{-3/2}),
\tag{7.7}
$$</div>

<div>$$
\widehat\theta_{\mathrm{PMLE}}
-\widehat\theta_{\mathrm{3SLS}}
=
O_p(n^{-1}),
\tag{7.8}
$$</div>

and

<div>$$
\widehat\theta_{\mathrm{MDE}}
-\widehat\theta_{\mathrm{3SLS}}
=
O_p(n^{-1}).
\tag{7.9}
$$</div>

Thus PMLE and MDE are extremely close asymptotically; both are closer to each other than either is to 3SLS. The theorem also implies that PMLE, MDE, and 3SLS share the same first-order asymptotic distribution.

Specifically, for

<div>$$
\widehat\theta
\in
\{
\widehat\theta_{\mathrm{PMLE}},
\widehat\theta_{\mathrm{MDE}},
\widehat\theta_{\mathrm{3SLS}}
\},
$$</div>

we have

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,E_0^{-1}D_0E_0^{-1}),
\tag{7.10}
$$</div>

where

<div>$$
D_0
=
P_0'
(\Omega_0^{-1}\otimes I_K)'
L_{11}
(\Omega_0^{-1}\otimes I_K)
P_0,
$$</div>

and

<div>$$
E_0
=
P_0'(\Omega_0^{-1}\otimes M)P_0.
$$</div>

The 2SLS estimator is not included in this equivalence result because it generally does not have the same asymptotic distribution as PMLE, MDE, and 3SLS.

## 7.2 Asymptotic distribution of constrained estimators

There are two standard ways to obtain asymptotic distributions for constrained estimators:

1. Delta methods, which transform the asymptotic distribution of an underlying estimator.
2. Lagrange multiplier methods, which work directly with constrained first-order conditions.

The delta method is usually simpler when the asymptotic distribution of $\widehat\theta$ is already available. The Lagrange multiplier method is often more convenient when restrictions define the estimator directly.

### 7.2.1 Delta methods

Let

<div>$$
\varphi(\theta)\in\mathbb{R}^q
$$</div>

be a vector of functions, and define

<div>$$
F(\theta)=\frac{\partial\varphi(\theta)}{\partial\theta'}.
$$</div>

Suppose $F(\theta)$ is continuous in a neighborhood of $\theta_0$ and

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,J).
$$</div>

Then

<div>$$
n^{1/2}
\left[
\varphi(\widehat\theta)-\varphi(\theta_0)
\right]
\xrightarrow{d}
N(0,F(\theta_0)JF(\theta_0)').
\tag{7.11}
$$</div>

This follows from the mean-value expansion

<div>$$
\varphi(\widehat\theta)-\varphi(\theta_0)
=
F(\widetilde\theta)(\widehat\theta-\theta_0),
$$</div>

where $\widetilde\theta$ lies between $\widehat\theta$ and $\theta_0$. Since $\widetilde\theta\to_p\theta_0$, continuity gives $F(\widetilde\theta)\to_p F(\theta_0)$.

For structural or reduced-form parameters,

<div>$$
\varphi(\theta)=\operatorname{vec}(\Phi(\theta))
\qquad
\text{or}
\qquad
\varphi(\theta)=\operatorname{vec}(\Gamma(\theta)).
$$</div>

If the model is overidentified, the covariance matrix

<div>$$
F(\theta_0)JF(\theta_0)'
$$</div>

is singular because the higher-dimensional vector $\varphi(\theta)$ depends on fewer underlying free parameters. If the model is just identified, this covariance matrix is typically nonsingular.

For example, if

<div>$$
\varphi_1=\theta_1+\theta_2,
\qquad
\varphi_2=\theta_1-\theta_2,
\qquad
\varphi_3=2\theta_1+3\theta_2,
$$</div>

then $(\varphi_1,\varphi_2,\varphi_3)'$ depends on only two parameters, so its asymptotic covariance matrix must be singular.

### 7.2.2 Lagrange multiplier methods

Let

<div>$$
\widehat\varphi
=
\arg\min_{\varphi\in\mathcal{A}}Q(\varphi),
$$</div>

where

<div>$$
\mathcal{A}=\{\varphi:w(\varphi)=0\}.
$$</div>

Form the Lagrangian

<div>$$
\mathcal{L}(\varphi,\lambda)
=
Q(\varphi)+\lambda'w(\varphi).
$$</div>

Let

<div>$$
W(\varphi)=\frac{\partial w(\varphi)'}{\partial\varphi},
\qquad
W_0=W(\varphi_0),
$$</div>

and let

<div>$$
K_0=
\frac{\partial^2 Q(\varphi_0)}
{\partial\varphi\,\partial\varphi'}.
$$</div>

The first-order conditions imply, after a mean-value expansion,

<div>$$
o_p(1)
=
n^{1/2}\frac{\partial Q(\varphi_0)}{\partial\varphi}
+
K_0n^{1/2}(\widehat\varphi-\varphi_0)
+
W_0n^{1/2}\widehat\lambda,
$$</div>

and

<div>$$
o_p(1)
=
W_0'n^{1/2}(\widehat\varphi-\varphi_0).
$$</div>

Equivalently,

<div>$$
\begin{pmatrix}
n^{1/2}\dfrac{\partial Q(\varphi_0)}{\partial\varphi}\\
0
\end{pmatrix}
=
\begin{pmatrix}
K_0 & W_0\\
W_0' & 0
\end{pmatrix}
\begin{pmatrix}
n^{1/2}(\widehat\varphi-\varphi_0)\\
n^{1/2}\widehat\lambda
\end{pmatrix}
+o_p(1).
\tag{7.12}
$$</div>

If

<div>$$
n^{1/2}\frac{\partial Q(\varphi_0)}{\partial\varphi}
\xrightarrow{d}
N(0,L),
$$</div>

and

<div>$$
\begin{vmatrix}
K_0 & W_0\\
W_0' & 0
\end{vmatrix}
\ne 0,
$$</div>

then

<div>$$
n^{1/2}
\begin{pmatrix}
\widehat\varphi-\varphi_0\\
\widehat\lambda
\end{pmatrix}
\xrightarrow{d}
N\left(
0,
\begin{pmatrix}
K_0 & W_0\\
W_0' & 0
\end{pmatrix}^{-1}
\begin{pmatrix}
L & 0\\
0 & 0
\end{pmatrix}
\begin{pmatrix}
K_0 & W_0\\
W_0' & 0
\end{pmatrix}^{-1}
\right).
\tag{7.13}
$$</div>

The block matrix is nonsingular when the constraints are not redundant.

If $L=K_0$, as in correctly specified likelihood settings, and $K_0$ is nonsingular, then the covariance matrix of the restricted estimator is

<div>$$
K_0^{-1}
-
K_0^{-1}W_0
(W_0'K_0^{-1}W_0)^{-1}
W_0'K_0^{-1}.
\tag{7.14}
$$</div>

The unrestricted estimator has covariance $K_0^{-1}$. Since

<div>$$
K_0^{-1}W_0
(W_0'K_0^{-1}W_0)^{-1}
W_0'K_0^{-1}
$$</div>

is positive semidefinite, valid restrictions cannot worsen asymptotic efficiency. Restrictions therefore play two roles:

1. They may identify a system that is otherwise unidentified.
2. They may improve efficiency when the restrictions are valid.

### 7.2.3 Consistency of restricted least squares for $A_0$

Let

<div>$$
\alpha=\operatorname{vec}(A')
=F\theta-f,
$$</div>

and estimate $\theta$ by minimizing

<div>$$
Q(\theta)
=
\operatorname{tr}
\left[
A\frac{X'X}{n}A'
\right].
$$</div>

Using

<div>$$
\operatorname{tr}(EBCD)
=
\operatorname{vec}(C)'(D\otimes B')\operatorname{vec}(E'),
$$</div>

the objective can be written as

<div>$$
Q(\theta)
=
\alpha'
\left(
I_G\otimes\frac{X'X}{n}
\right)
\alpha
=
(F\theta-f)'\widehat L(F\theta-f),
$$</div>

where

<div>$$
\widehat L=I_G\otimes\frac{X'X}{n}.
$$</div>

Thus

<div>$$
\widehat\theta
=
(F'\widehat L F)^{-1}F'\widehat L f.
$$</div>

Under A5,

<div>$$
\frac{X'X}{n}
\xrightarrow{P}
\begin{pmatrix}
\Omega_0+\Pi_0M\Pi_0' & \Pi_0M\\
M\Pi_0' & M
\end{pmatrix}.
$$</div>

A sufficient condition for

<div>$$
\widehat\alpha\xrightarrow{P}\alpha_0=\operatorname{vec}(A_0')
$$</div>

is

<div>$$
F'
\operatorname{vec}
\begin{pmatrix}
B_0^{-1}\Sigma_0\\
0_{K\times G}
\end{pmatrix}
=0.
\tag{7.15}
$$</div>

The condition says that the linear restrictions defining $\alpha=F\theta-f$ must be compatible with the probability limit of the least-squares criterion. It holds in the classical multivariate regression case where $B_0=I_G$ is known a priori, and also in recursive systems.

### 7.2.4 Indirect least squares and relationships between estimators

The indirect least-squares estimator solves the reduced-form restrictions directly:

<div>$$
\widehat A
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
=0,
\qquad
\widehat A=A(\widehat\theta),
\tag{7.16}
$$</div>

where $\widetilde\Pi$ is the unrestricted least-squares estimator of the reduced form and $p\le GK$.

When $p<GK$, there may be more equations than unknowns, so multiple ways of projecting the unrestricted reduced form onto the restricted structural form are possible. This is the overidentified case.

If there are no overidentifying restrictions and the indirect least-squares equations have a unique solution, then

<div>$$
\mathrm{ILSE}
=
\mathrm{PMLE}
=
\mathrm{MDE}
=
\mathrm{3SLS}
=
\mathrm{2SLS}.
\tag{7.17}
$$</div>

The reason is that, in the just-identified case, all criteria are minimized by the same structural matrix satisfying

<div>$$
\widehat A
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
=0.
$$</div>

The unrestricted reduced-form estimator $\widetilde\Pi$ is also the Gaussian reduced-form PMLE. MDE, 2SLS, and 3SLS all reduce to solving the same exact restriction when a unique just-identified solution exists.

### 7.2.5 Single-equation and subsystem estimation

Sometimes we estimate only one equation or a subsystem of $G_1$ equations, with

<div>$$
1\le G_1<G.
$$</div>

Reasons include:

1. The full system may not be identified, while the subsystem is.
2. The selected equations may be the substantive equations of interest.
3. Subsystem estimation can be easier computationally, though it may lose efficiency.

Partition

<div>$$
A=
\begin{pmatrix}
A_1\\
A_2
\end{pmatrix},
\qquad
A_1\in\mathbb{R}^{G_1\times(G+K)},
$$</div>

and

<div>$$
A x_i
=
\begin{pmatrix}
A_1x_i\\
A_2x_i
\end{pmatrix}
=
\begin{pmatrix}
u_{1i}\\
u_{2i}
\end{pmatrix}.
$$</div>

Also partition

<div>$$
\Sigma=
\begin{pmatrix}
\Sigma_{11} & \Sigma_{12}\\
\Sigma_{21} & \Sigma_{22}
\end{pmatrix},
\qquad
y_i=
\begin{pmatrix}
y_{1i}\\
y_{2i}
\end{pmatrix}.
$$</div>

Write

<div>$$
A_1=(B_{11},B_{12},C_1),
\qquad
A_2=(B_{21},B_{22},C_2),
$$</div>

Let $B_1=(B_{11},B_{12})$ denote the $G_1\times G$ block of coefficients on all current endogenous variables in the first subsystem. Assume $|B_{11}|\ne 0$. The parameters $A_1$ and $\Sigma_{11}$ are assumed identifiable, while $A_2$, $\Sigma_{12}$, and $\Sigma_{22}$ may not be.

The subsystem can be transformed into a convenient form. Choose a nonsingular transformation $D$ that leaves the first block of equations intact and writes the remaining endogenous variables in reduced-form form. Then

<div>$$
A^\ast=DA
=
\begin{pmatrix}
B_{11} & B_{12} & C_1\\
0 & I_{G-G_1} & -\Pi_2
\end{pmatrix},
$$</div>

and

<div>$$
\Sigma^\ast=D\Sigma D'.
$$</div>

Now we can estimate the transformed subsystem using the same PMLE, MDE, 2SLS, or 3SLS logic as before. The nuisance blocks are left unrestricted, while the restrictions on $(B_{11},B_{12},C_1,\Sigma_{11})$ are the original restrictions of interest.

The limited-information PMLE estimates the components $A_1$ and $\Sigma_{11}$ by minimizing

<div>$$
Q(A^\ast,\Sigma^\ast)
=
\log|\Sigma^\ast|
-2\log|B^\ast|
+
\operatorname{tr}
\left[
A^\ast\frac{X'X}{n}A^{\ast\prime}\Sigma^{\ast-1}
\right].
$$</div>

After concentrating out nuisance parameters, the relevant criterion for $(A_1,\Sigma_{11})$ is

<div>$$
\widetilde Q(A_1,\Sigma_{11})
=
\log|\Sigma_{11}|
-2\log|B_1\widehat\Omega B_1'|
+
\operatorname{tr}
\left[
A_1\frac{X'X}{n}A_1'\Sigma_{11}^{-1}
\right],
\tag{7.18}
$$</div>

where

<div>$$
\widehat\Omega
=
\frac{1}{n}
Y'
\left[
I_n-Z(Z'Z)^{-1}Z'
\right]
Y.
$$</div>

If $\Sigma_{11}$ is unrestricted and only $A_1$ depends on $\theta_1$, the limited-information PMLE of $\theta_1$ solves

<div>$$
\widehat\theta_1
=
\arg\min_{\theta_1\in\Theta_1}
\frac{
\left|
A_1\frac{X'X}{n}A_1'
\right|
}{
\left|
B_1\widehat\Omega B_1'
\right|
}.
\tag{7.19}
$$</div>

The subsystem 2SLS estimator minimizes

<div>$$
\operatorname{tr}
\left[
A_1X'Z(Z'Z)^{-1}Z'XA_1'
\right],
\tag{7.20}
$$</div>

while the subsystem 3SLS estimator minimizes

<div>$$
\operatorname{tr}
\left[
A_1X'Z(Z'Z)^{-1}Z'XA_1'\widehat\Sigma_{11}^{-1}
\right],
\tag{7.21}
$$</div>

with

<div>$$
\widehat\Sigma_{11}
=
A_1\frac{X'X}{n}A_1'.
$$</div>

Three useful comparisons:

1. For a single equation, single-equation 3SLS coincides with single-equation 2SLS.
2. Single-equation 2SLS can differ from system 2SLS when the system estimator uses cross-equation restrictions.
3. Subsystem 3SLS is asymptotically as efficient as the limited-information PMLE for the transformed subsystem when $\Sigma^\ast$ is unrestricted.
