---
title: 4. Identification in Simultaneous Equation Models
linktitle: 4. Identification
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-identification
    weight: 5
weight: 5
---

Identification asks whether the structural parameters of a model are uniquely recoverable from the information contained in the distribution of the observed variables. In simultaneous-equation models, this is subtle because the reduced form can often be learned from the data even when many different structural systems generate the same reduced form.

To state this problem cleanly, let $Q(x,\theta)$ be an objective, risk, loss, or likelihood-based criterion indexed by a parameter vector $\theta\in\Theta\subset\mathbb{R}^p$. Two parameter values $\theta_1$ and $\theta_2$ are observationally equivalent with respect to $Q$ if

<div>$$
Q(x,\theta_1)=Q(x,\theta_2)
\qquad
\text{for every } x\in\mathcal{X}.
$$</div>

A parameter value $\theta_0$ is identifiable if there is no other $\theta\in\Theta$ observationally equivalent to it. If another observationally equivalent value exists, the data and criterion cannot distinguish the two parameter values.

This issue is familiar even in linear regression. If $Y=Z\beta+v$ and $\operatorname{rank}(Z)<K$, then there is a nonzero vector $c$ such that $Zc=0$. The least-squares objective satisfies

<div>$$
(Y-Z\beta)'(Y-Z\beta)
=
(Y-Z(\beta+c))'(Y-Z(\beta+c)),
$$</div>

so $\beta$ and $\beta+c$ are observationally equivalent. The least-squares estimator is not uniquely defined.

For a complete linear simultaneous-equation system, write

<div>$$
A=(B,\ C),
\qquad
B\in\mathbb{R}^{G\times G},
\qquad
C\in\mathbb{R}^{G\times K},
\qquad
|B|\ne 0.
$$</div>

The reduced form is

<div>$$
y_i=\Pi z_i+v_i,
\qquad
\Pi=-B^{-1}C,
\qquad
\Omega=B^{-1}\Sigma(B')^{-1}.
$$</div>

If the predetermined variables are not collinear, the reduced-form parameters $(\Pi,\Omega)$ are identifiable. The structural parameters $(A,\Sigma)$ are not automatically identifiable, because different structural systems can imply the same $(\Pi,\Omega)$. For any nonsingular $G\times G$ matrix $P$, the transformed parameters

<div>$$
\bar A=PA,
\qquad
\bar\Sigma=P\Sigma P'
$$</div>

produce the same reduced form. Identification of the structural form therefore requires additional restrictions.

## 4.1 Identification of linear simultaneous equations

Because

<div>$$
\Pi=-B^{-1}C,
$$</div>

we have the structural-reduced-form relation

<div>$$
B\Pi+C=0.
$$</div>

Equivalently,

<div>$$
\Pi'B'+C'=0.
\tag{4.1}
$$</div>

This equation is the starting point for the rank conditions. It gives $GK$ scalar equations. But the unknown structural matrix $A=(B,C)$ contains $G^2+GK=G(G+K)$ scalar parameters. The reduced form alone therefore leaves $G^2$ degrees of freedom unresolved.

Let

<div>$$
\alpha=
\begin{pmatrix}
\beta\\
\gamma
\end{pmatrix},
\qquad
\beta=\operatorname{vec}(B'),
\qquad
\gamma=\operatorname{vec}(C').
$$</div>

Using the vectorization identity $\operatorname{vec}(MN)=(I\otimes M)\operatorname{vec}(N)$ when the right multiplier is an identity matrix of the appropriate size,

<div>$$
\begin{aligned}
\operatorname{vec}(\Pi'B'+C')
&=(I_G\otimes \Pi')\operatorname{vec}(B')+\operatorname{vec}(C')\\
&=
\begin{pmatrix}
I_G\otimes \Pi' & I_{GK}
\end{pmatrix}\alpha.
\end{aligned}
$$</div>

Define

<div>$$
V=
\begin{pmatrix}
I_G\otimes \Pi' & I_{GK}
\end{pmatrix}.
$$</div>

Then (4.1) becomes

<div>$$
V\alpha=0.
\tag{4.2}
$$</div>

The matrix $V$ supplies $GK$ equations in $G(G+K)$ unknowns. To identify the structural parameters, impose additional known restrictions

<div>$$
W\alpha=w,
$$</div>

where $W$ is an $r\times G(G+K)$ known matrix. The combined system is

<div>$$
\begin{pmatrix}
V\\
W
\end{pmatrix}
\alpha
=
\begin{pmatrix}
0\\
w
\end{pmatrix}.
\tag{4.3}
$$</div>

The order condition is

<div>$$
r\ge G^2.
$$</div>

It is necessary because we need at least $G^2$ extra scalar restrictions beyond the $GK$ reduced-form equations. It is not sufficient: the restrictions must also be placed in directions that actually resolve the remaining ambiguity.

### Rank condition for the full structural matrix

The structural parameter vector $\alpha$ is identified if and only if the combined coefficient matrix in (4.3) has full column rank:

<div>$$
\operatorname{rank}
\begin{pmatrix}
V\\
W
\end{pmatrix}
=G(G+K).
\tag{4.4}
$$</div>

This is the rank condition. It says the reduced-form equations plus the imposed restrictions must determine one and only one value of $\alpha$.

There is an equivalent way to express the same condition directly in terms of the structural matrices. Define

<div>$$
D=
\begin{pmatrix}
I_G\otimes B & I_G\otimes C
\end{pmatrix}.
$$</div>

Then $\alpha$ is identifiable if and only if

<div>$$
\operatorname{rank}(WD')=G^2.
\tag{4.5}
$$</div>

The intuition is useful. The reduced-form relation $B\Pi+C=0$ always removes $GK$ dimensions. The restrictions $W\alpha=w$ identify the structural form only if, after accounting for the reduced form, they eliminate exactly the remaining $G^2$ directions of observational equivalence.

### 4.1.1 Identification of a single equation

Often we care first about one structural equation rather than the entire system. Suppose the parameter vector is partitioned as

<div>$$
\theta=
\begin{pmatrix}
\theta_1\\
\theta_2
\end{pmatrix},
\qquad
\theta_0=
\begin{pmatrix}
\theta_{01}\\
\theta_{02}
\end{pmatrix}.
$$</div>

The subvector $\theta_{01}$ is identifiable if every parameter vector observationally equivalent to $\theta_0$ has the same value of $\theta_1$.

For the first structural equation, write the first row of $A$ as

<div>$$
\alpha_1=
\begin{pmatrix}
\beta_1\\
\gamma_1
\end{pmatrix},
$$</div>

so that the equation is

<div>$$
\beta_1'y_i+\gamma_1'z_i=u_{1i}.
$$</div>

The reduced-form restriction for this equation is

<div>$$
\beta_1'\Pi+\gamma_1'=0,
$$</div>

or equivalently

<div>$$
\Pi'\beta_1+\gamma_1=0.
\tag{4.6}
$$</div>

This gives $K$ equations in $G+K$ unknowns. Therefore we need at least $G$ additional restrictions to identify the first equation.

Let the additional restrictions be

<div>$$
W_1\alpha_1=w_1,
$$</div>

where $W_1$ is an $r_1\times(G+K)$ known matrix. The order condition for identifying the first equation is

<div>$$
r_1\ge G.
$$</div>

The rank condition is

<div>$$
\operatorname{rank}(W_1A')=G.
\tag{4.7}
$$</div>

This is the single-equation analogue of the full-system condition. The restrictions on the first equation must interact with the rest of the structural system strongly enough to remove the $G$ remaining degrees of freedom for that row.

### Normalizations and exclusion restrictions

Most identifying restrictions in linear simultaneous-equation models are homogeneous restrictions, especially zero restrictions. A zero restriction may select a coefficient directly:

<div>$$
(0,\ldots,0,1,0,\ldots,0)\alpha_1=0,
$$</div>

or impose an equality between two coefficients:

<div>$$
(0,\ldots,0,-1,0,\ldots,0,1,0,\ldots,0)\alpha_1=0.
$$</div>

Purely homogeneous restrictions cannot by themselves determine scale. If $\alpha_1$ satisfies homogeneous restrictions, then so does $c\alpha_1$ for any nonzero scalar $c$. We therefore also need a normalization, such as setting one coefficient equal to one. A common normalization is

<div>$$
\operatorname{diag}(B)=(1,\ldots,1).
$$</div>

For a single equation, this often means the coefficient on its own endogenous variable is normalized to one.

When there are no cross-equation restrictions, single-equation identification is usually checked by the excluded-variables rank condition. Suppose all restrictions are zero restrictions except the normalization $\alpha_{11}=1$. Then the first equation is identifiable if and only if

<div>$$
r_1\ge G
\qquad
\text{and}
\qquad
\operatorname{rank}(A^\ast)=G-1,
\tag{4.8}
$$</div>

where $A^\ast$ is formed from the rows of the structural matrix corresponding to the variables excluded from the first equation, after removing the normalized row. In words: the variables excluded from the equation being identified must appear in the other equations with enough independent variation to solve for the remaining endogenous coefficients.

If the model is identified but uses exactly enough independent restrictions, it is just identified. If there are two or more linearly independent sets of restrictions, each capable of identifying the parameter, then the parameter is overidentified. Overidentification matters because the extra restrictions can improve efficiency and can also be tested against the data.

### 4.1.2 Nonlinearities and local identification

The preceding rank conditions are clean because both the model and the restrictions are linear in the structural coefficients. Identification becomes more delicate when the restrictions are nonlinear or when covariance restrictions are used.

For example, suppose the structural covariance matrix is restricted by

<div>$$
\Sigma=\sigma^2 I
\qquad
\text{or}
\qquad
\Sigma=\lambda \mathbf{1}\mathbf{1}'+\sigma^2 I.
$$</div>

The reduced-form covariance is

<div>$$
\Omega=B^{-1}\Sigma(B')^{-1},
$$</div>

so the structural and reduced-form covariance matrices satisfy

<div>$$
B\Omega B'=\Sigma.
\tag{4.9}
$$</div>

Together with

<div>$$
B\Pi+C=0,
$$</div>

and additional restrictions

<div>$$
W(A,\Sigma)=0,
$$</div>

the covariance structure can help identify $B$, $C$, and $\Sigma$. The important difference is that $W(A,\Sigma)=0$ may be nonlinear.

A classical source of nonlinear restrictions comes from serially correlated structural disturbances. Suppose

<div>$$
B y_i+C^\ast z_i^\ast=u_i^\ast,
\qquad
u_i^\ast=D u_{i-1}^\ast+e_i,
$$</div>

with

<div>$$
E(e_i)=0,
\qquad
E(e_ie_j')=\Sigma\,\mathbf{1}_{\{i=j\}}.
$$</div>

Then the system can be rewritten as

<div>$$
B y_i+C z_i=e_i,
$$</div>

where

<div>$$
C=(C_1,\ C_2,\ C_3),
\qquad
z_i=
\begin{pmatrix}
y_{i-1}' & {z_i^\ast}' & {z_{i-1}^\ast}'
\end{pmatrix}'.
$$</div>

The dynamic structure implies

<div>$$
C_1=-DB,
\qquad
C_2=C^\ast,
\qquad
C_3=-DC^\ast.
$$</div>

Eliminating $D$ and $C^\ast$ gives the nonlinear restriction

<div>$$
C_3-C_1B^{-1}C_2=0.
\tag{4.10}
$$</div>

This restriction is nonlinear because it contains $B^{-1}$. Combined with $B\Pi+C=0$, it can reduce the number of additional exclusion restrictions needed for identification.

### 4.1.3 General setup

The general identification problem can be written as a system of equations

<div>$$
\psi(\theta)=0,
\qquad
\psi(\theta)\in\mathbb{R}^q.
\tag{4.11}
$$</div>

Here $\psi(\theta)$ collects all restrictions and all equations linking the structural parameters to the reduced-form quantities. Known quantities are suppressed to keep the notation readable.

If $\psi$ is linear, the solution is either unique or lies on a continuum. If $\psi$ is nonlinear, additional possibilities appear: there may be one solution, finitely many solutions, countably many solutions, or a continuum of solutions.

A parameter value $\theta_0$ is locally identifiable if there is an open neighborhood of $\theta_0$ containing no other parameter value observationally equivalent to $\theta_0$. It is globally identifiable if there is no observationally equivalent value anywhere in the parameter space.

In linear models, local and global identification coincide. If two distinct solutions $\alpha_1$ and $\alpha_2$ satisfy the same linear restrictions, then every convex combination

<div>$$
\lambda\alpha_1+(1-\lambda)\alpha_2
$$</div>

also satisfies those restrictions. Thus nonuniqueness is immediately local. In nonlinear models, by contrast, another observationally equivalent point may be far away, so local and global identification can differ.

Let

<div>$$
\Psi(\theta)=\frac{\partial \psi(\theta)}{\partial\theta'},
\qquad
\Psi_0=\Psi(\theta_0).
$$</div>

Assume $\psi$ is continuously differentiable in a neighborhood of $\theta_0$ and $\psi(\theta_0)=0$.

If

<div>$$
\operatorname{rank}(\Psi_0)=p,
\tag{4.12}
$$</div>

then $\theta_0$ is locally identifiable. This is the local rank condition. It says the restrictions move independently in every parameter direction near $\theta_0$, so no nearby alternative parameter can satisfy the same equations.

The converse requires regularity. A point $\theta_0$ is a regular point of $\Psi(\theta)$ if the rank of $\Psi(\theta)$ is constant in a neighborhood of $\theta_0$. If $\theta_0$ is regular and locally identifiable, then

<div>$$
\operatorname{rank}(\Psi_0)=p.
$$</div>

The proof idea is the same geometric intuition as the implicit function theorem. If the derivative has full column rank, the equations pin down the parameter locally. If the derivative loses rank in a regular way, there is a nonzero direction along which the restrictions do not change locally, so the parameter is not locally identified.

A useful cautionary example is

<div>$$
\theta=(\theta_1,\theta_2)',
\qquad
\psi(\theta)=\theta_1^2+\theta_2^2.
$$</div>

The solution $\theta_0=(0,0)'$ is unique, hence identifiable, but

<div>$$
\Psi(\theta_0)=
\begin{pmatrix}
0 & 0
\end{pmatrix}.
$$</div>

The derivative has rank zero at the solution. This does not contradict the rank theorem because $\theta_0$ is not a regular point: the rank changes in every neighborhood of zero.

### Covariance restrictions in the general setup

When restrictions also involve the covariance matrix, collect

<div>$$
\theta=\operatorname{vec}(B',C',\Sigma).
$$</div>

The identifying equations include

<div>$$
B\Pi+C=0,
\tag{4.13}
$$</div>

<div>$$
B\Omega B'=\Sigma,
\tag{4.14}
$$</div>

and additional restrictions

<div>$$
W_1(\theta)=0.
\tag{4.15}
$$</div>

Let

<div>$$
W(\theta)=\frac{\partial W_1(\theta)}{\partial\theta'}.
$$</div>

The local rank condition can be written in compressed form using

<div>$$
H(\theta)
=
W(\theta)
\begin{pmatrix}
I_G\otimes B\\
I_G\otimes C\\
I_G\otimes 2\Sigma
\end{pmatrix}.
$$</div>

If

<div>$$
\operatorname{rank}(H(\theta_0))=G^2,
$$</div>

then $\theta_0$ is locally identifiable. Conversely, if $\theta_0$ is a regular point of $H(\theta)$ and is locally identifiable, then the same rank condition must hold.

### Identifying functions of parameters

Even when $\theta_0$ itself is not identifiable, a lower-dimensional function of it may be identifiable. Let

<div>$$
\tau=\tau(\theta)\in\mathbb{R}^m,
\qquad
m<p,
$$</div>

and define

<div>$$
\Upsilon(\theta)=\frac{\partial \tau(\theta)}{\partial\theta'},
\qquad
\Upsilon_0=\Upsilon(\theta_0).
$$</div>

If

<div>$$
\operatorname{rank}
\begin{pmatrix}
\Psi_0\\
\Upsilon_0
\end{pmatrix}
=
\operatorname{rank}(\Psi_0),
\tag{4.16}
$$</div>

then $\tau(\theta_0)$ is locally identifiable. The condition says that adding the equation $\tau(\theta)=\tau(\theta_0)$ does not add a new independent restriction beyond $\psi(\theta)=0$. Geometrically, $\tau$ is constant along the local set of observationally equivalent parameter values.

With the appropriate regularity condition, the converse also holds: if $\tau(\theta_0)$ is locally identifiable, then the derivative of $\tau$ must lie in the row span of the derivative of the identifying restrictions.

## 4.2 Identifiability and asymptotic theory
