---
title: 3. Preliminaries, Notation, and Definitions
linktitle: 3. Preliminaries
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-setup-notation
    weight: 4
weight: 4
---

This chapter introduces the notation used for simultaneous-equation models. The key distinction is between variables determined inside a system and variables taken as given by the system.

## 3. Preliminaries, notation, and definitions

### A motivating demand-and-supply system

Start with the classical demand-and-supply example:

<div>$$
\begin{aligned}
y^d_t &= \beta_{11}p_t+\gamma_{11}x_t+u_{t1},\\
y^s_t &= \beta_{21}p_t+\cdots+u_{t2},\\
y^d_t &= y^s_t.
\end{aligned}
$$</div>

The price $p_t$ is not determined outside the model. In equilibrium, $y_t=y^d_t=y^s_t$, and both $y_t$ and $p_t$ are determined inside the system. By contrast, $x_t$ is treated as an outside or predetermined variable.

This distinction is the reason simultaneous-equation models are not just ordinary regressions with more equations. Some right-hand-side variables are themselves jointly determined with the left-hand-side variables.

### Endogenous and predetermined variables

For observation $i$, collect all variables in the column vector

<div>$$
x_i =
\begin{pmatrix}
y_i\\
z_i
\end{pmatrix},
\qquad
y_i\in\mathbb{R}^{G},
\qquad
z_i\in\mathbb{R}^{K}.
$$</div>

Here $y_i$ is a $G\times 1$ column vector of endogenous variables, while $z_i$ is a $K\times 1$ column vector of independent, exogenous, or predetermined variables. Therefore $x_i$ is a $(G+K)\times 1$ column vector.

The structural relationship among these variables is written as

<div>$$
A x_i = u_i,
\tag{3.1}
$$</div>

where $A$ is an $M\times(G+K)$ matrix of structural parameters and $u_i$ is an $M\times 1$ vector of structural disturbances. Since $A$ is unknown, the disturbance vector $u_i$ is not observed directly.

We assume

<div>$$
E(u_i)=0.
$$</div>

The vector $z_i$ is understood to include a constant term when an intercept is needed. Depending on the model, we may impose one of the following increasingly strong conditions:

<div>$$
\operatorname{Cov}(z_i,u_i)=0,
\tag{3.2}
$$</div>

<div>$$
E(u_i\mid z_i)=0,
\tag{3.3}
$$</div>

or independence between $u_i$ and $z_i$:

<div>$$
u_i \perp z_i.
\tag{3.4}
$$</div>

These conditions are nested:

<div>$$
(3.4)\Longrightarrow (3.3)\Longrightarrow (3.2).
$$</div>

Independence implies conditional mean independence, and conditional mean independence implies zero covariance with functions included in $z_i$, provided the relevant moments exist.

### Structural form

Equation (3.1) is called the structural form. The matrix $A$ contains the structural-form parameters, and $u_i$ is the structural-form disturbance vector.

We also assume finite second moments:

<div>$$
E(u_i u_i')=\Sigma,
$$</div>

where $\Sigma$ is finite and positive semidefinite.

Partition the structural matrix according to endogenous and predetermined variables:

<div>$$
A=(B,\ C),
\qquad
B\in\mathbb{R}^{M\times G},
\qquad
C\in\mathbb{R}^{M\times K}.
$$</div>

Then (3.1) becomes

<div>$$
A x_i
=
(B,\ C)
\begin{pmatrix}
y_i\\
z_i
\end{pmatrix}
=B y_i+C z_i
=u_i.
\tag{3.5}
$$</div>

This is a system with $M$ equations. If $M<G$, the system is incomplete. If $M=G$, the system is complete.

### Reduced form

For a complete system, suppose $B$ is nonsingular. Then $B^{-1}$ exists, and (3.5) can be rewritten as

<div>$$
B^{-1}(B y_i+C z_i)=B^{-1}u_i.
$$</div>

Equivalently,

<div>$$
y_i-\Pi z_i=v_i,
$$</div>

or

<div>$$
y_i=\Pi z_i+v_i,
\tag{3.6}
$$</div>

where

<div>$$
\Pi=-B^{-1}C,
\qquad
v_i=B^{-1}u_i.
$$</div>

The matrix $\Pi$ contains the reduced-form parameters, and $v_i$ is the reduced-form disturbance vector. The reduced-form covariance matrix is

<div>$$
E(v_i v_i')
=B^{-1}\Sigma(B')^{-1}
=\Omega.
$$</div>

The reduced form resembles a multivariate regression of $y_i$ on $z_i$. The important difference is interpretation: $\Pi$ is a composite object, $\Pi=-B^{-1}C$, so estimating $\Pi$ does not automatically reveal the separate structural matrices $B$ and $C$. The structural form is usually the object of economic interest, while the reduced form is often easier to estimate and useful for forecasting.

This leads to three central questions:

1. Can we estimate the structural matrix $A$?
2. What are the statistical properties of an estimator $\hat A$?
3. How can $\hat A$ be obtained in practice?

### Time-series notation and lagged variables

For time-series models, $x_i$ can include current variables and lagged variables. Let $z_i^\ast$ be a $K^\ast\times 1$ vector of exogenous variables. With $p$ lags of $y_i$ and $q$ lags of $z_i^\ast$, write

<div>$$
x_i=
\begin{pmatrix}
y_i\\
y_{i-1}\\
\vdots\\
y_{i-p}\\
z_i^\ast\\
z_{i-1}^\ast\\
\vdots\\
z_{i-q}^\ast
\end{pmatrix}.
$$</div>

The current endogenous vector $y_i$ is still $G\times 1$. The lagged endogenous block

<div>$$
\begin{pmatrix}
y_{i-1}' & \cdots & y_{i-p}'
\end{pmatrix}'
$$</div>

is treated as predetermined, and the total number of predetermined variables is

<div>$$
K=pG+K^\ast(q+1).
$$</div>

Using the lag operator $L$, where

<div>$$
L y_i=y_{i-1},
$$</div>

the dynamic structural system can be written compactly as

<div>$$
B(L)y_i=C(L)z_i^\ast+u_i,
\tag{3.7}
$$</div>

with

<div>$$
B(L)=\sum_{j=0}^{p}B_j L^j,
\qquad
C(L)=\sum_{j=0}^{q}C_j L^j.
$$</div>

Relative to the static notation in (3.5), this corresponds to

<div>$$
B=B_0,
\qquad
C=(B_1,\ldots,B_p,\ -C_0,\ -C_1,\ldots,\ -C_q).
$$</div>

The reduced form is then

<div>$$
y_i=\Pi_1(L)y_i+\Pi_2(L)z_i^\ast+v_i,
$$</div>

where

<div>$$
\Pi_1(L)=\sum_{j=1}^{p}\Pi_j L^j,
\qquad
\Pi_2(L)=\sum_{j=1}^{q+1}\Pi_{p+j}L^{j-1},
$$</div>

and

<div>$$
(\Pi_1,\ldots,\Pi_p,\Pi_{p+1},\ldots,\Pi_{p+q+1})
=
(-B_0^{-1}B_1,\ldots,-B_0^{-1}B_p,\ B_0^{-1}C_0,\ldots,B_0^{-1}C_q).
$$</div>

### Final form and stability

If $B(L)$ is invertible as a lag polynomial, (3.7) can be written in final form:

<div>$$
\begin{aligned}
y_i
&=B(L)^{-1}C(L)z_i^\ast+B(L)^{-1}u_i\\
&=\sum_{j=0}^{\infty}\Phi_j z_{i-j}^\ast
+\sum_{j=0}^{\infty}\Psi_j u_{i-j}.
\end{aligned}
\tag{3.8}
$$</div>

Define the final-form disturbance as

<div>$$
\eta_i=\sum_{j=0}^{\infty}\Psi_j u_{i-j}.
$$</div>

If the model is stable, meaning all roots of

<div>$$
|B(L)|=0
$$</div>

lie outside the unit circle $|L|\le 1$, then

<div>$$
\sum_{j=0}^{\infty}\|\Psi_j\|<\infty,
\qquad
\sum_{j=0}^{\infty}\|\Phi_j\|<\infty.
$$</div>

In that case $\eta_i$ is a linear process, and the final form is a useful representation for studying forecasting, impulse responses, and large-sample behavior.

### Serial correlation in structural disturbances

Because time-series observations are ordered, the structural disturbances $u_i$ may be serially correlated.

One simple benchmark is no serial correlation:

<div>$$
E(u_i u_j')=\Sigma\,\mathbf{1}_{\{i=j\}},
\tag{3.9}
$$</div>

where $\mathbf{1}(\cdot)$ denotes the indicator function.

Another possibility is an autoregressive disturbance:

<div>$$
D(L)u_i=\varepsilon_i,
\qquad
E(\varepsilon_i\varepsilon_j')=\Xi\,\mathbf{1}_{\{i=j\}},
$$</div>

where

<div>$$
D(L)=I_G-\sum_{j=1}^{r}D_j L^j.
$$</div>

If

<div>$$
|D(L)|\ne 0
\qquad
\text{for all } |L|\le 1,
$$</div>

then the autoregressive disturbance process is stationary.

Since $A x_i=u_i$, applying $D(L)$ gives

<div>$$
A x_i-\sum_{j=1}^{r}D_j A x_{i-j}=\varepsilon_i.
$$</div>

Equivalently,

<div>$$
A^\ast x_i^\ast=\varepsilon_i,
$$</div>

with

<div>$$
A^\ast=(A,\ -D_1A,\ldots,\ -D_rA),
\qquad
x_i^\ast=
\begin{pmatrix}
x_i\\
x_{i-1}\\
\vdots\\
x_{i-r}
\end{pmatrix}.
$$</div>

Combining the dynamic system (3.7) with autoregressive disturbances gives the more general formulation

<div>$$
\underbrace{D(L)B(L)}_{B^\ast(L)}y_i
=
\underbrace{D(L)C(L)}_{C^\ast(L)}z_i^\ast
+\varepsilon_i.
\tag{3.10}
$$</div>

This representation has the same basic structure as (3.7), but the order of the lag polynomial is increased by $r$. It is often called an ARARX representation.

Disturbances may also follow an ARMA process:

<div>$$
D(L)u_i=E(L)\varepsilon_i,
$$</div>

where

<div>$$
E(L)=\sum_{j=0}^{s}E_jL^j,
\qquad
E_0=I.
$$</div>

Thus

<div>$$
u_i=D(L)^{-1}E(L)\varepsilon_i,
\qquad
E(L)^{-1}D(L)u_i=\varepsilon_i.
$$</div>

The structural equation $A x_i=u_i$ becomes

<div>$$
E(L)^{-1}D(L)A x_i=\varepsilon_i.
$$</div>

If the process is invertible, meaning

<div>$$
|E(L)|\ne 0
\qquad
\text{for all } |L|\le 1,
$$</div>

then

<div>$$
E(L)^{-1}D(L)
=\sum_{j=0}^{\infty}\Lambda_jL^j,
\qquad
\sum_{j=0}^{\infty}\|\Lambda_j\|<\infty,
$$</div>

so that

<div>$$
\sum_{j=0}^{\infty}\Lambda_j A x_{i-j}=\varepsilon_i.
$$</div>

When the autoregressive order is $r=0$, the dynamic system becomes

<div>$$
B(L)y_i=C(L)z_i^\ast+E(L)\varepsilon_i,
$$</div>

which is known as an ARMAX representation. A final possibility is to avoid specifying a parametric serial-correlation model for $u_i$ and instead allow nonparametric autocorrelation.

### Identities

Sometimes some structural disturbances have zero variance. These equations are identities rather than stochastic behavioral equations. Write

<div>$$
u_i=
\begin{pmatrix}
u_{1i}\\
0
\end{pmatrix},
\qquad
A=
\begin{pmatrix}
A_1\\
A_2
\end{pmatrix},
$$</div>

where $u_{1i}$ is $G_1\times 1$, the zero block is $(G-G_1)\times 1$, and

<div>$$
A_1=(B_{11},B_{12},C_1),
\qquad
A_2=(B_{21},B_{22},C_2).
$$</div>

Partition $y_i$ conformably as $(y_{1i}',y_{2i}')'$. Then the system is

<div>$$
B_{11}y_{1i}+B_{12}y_{2i}+C_1z_i=u_{1i},
\tag{3.11}
$$</div>

<div>$$
B_{21}y_{1i}+B_{22}y_{2i}+C_2z_i=0.
$$</div>

If $B_{22}$ is nonsingular, the identity block can be solved for $y_{2i}$:

<div>$$
y_{2i}
=-B_{22}^{-1}B_{21}y_{1i}
-B_{22}^{-1}C_2z_i.
$$</div>

Substituting this into the stochastic block gives

<div>$$
\widetilde B y_{1i}+\widetilde C z_i=u_{1i},
\qquad
\widetilde A x_{1i}=u_{1i},
$$</div>

where

<div>$$
\widetilde B=B_{11}-B_{12}B_{22}^{-1}B_{21},
\qquad
\widetilde C=C_1-B_{12}B_{22}^{-1}C_2.
$$</div>

If the identity block $A_2$ is known, the transformed model is essentially another structural-form model. If $A_2$ is unknown, the identities must be handled as part of the model restrictions rather than simply eliminated.

The models above are linear in variables. In practice, as with nonlinear regression, the parameters may enter the model nonlinearly. That motivates the next section.

## 3.1 Nonlinear simultaneous equations
