---
title: 8. Estimation of Nonlinear Simultaneous Equations and Transformation Models
linktitle: 8. Nonlinear SEM
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-nonlinear-gmm
    weight: 9
weight: 9
---

This chapter gives a practical introduction to estimating nonlinear simultaneous-equation systems and transformation models. The rigorous large-sample theory is more delicate than in the linear case because nonlinear systems introduce nonconstant Jacobians, implicit reduced forms, and moment conditions whose behavior depends on the distribution of the structural disturbances.

Consider a complete nonlinear system

<div>$$
u(x_i,\theta)=u_i,
\qquad
x_i=
\begin{pmatrix}
y_i\\
z_i
\end{pmatrix},
\qquad
u_i\in\mathbb{R}^G.
$$</div>

Throughout this chapter, take $z_i$ as predetermined and assume:

<div>$$
u_i\perp z_i,
\qquad
E(u_i)=0,
$$</div>

and

<div>$$
E(u_i u_j'\mid z_i,z_j)
=
E(u_i u_j')
=
\Sigma\,\mathbf{1}_{\{i=j\}}.
$$</div>

The goal is to estimate the structural parameter $\theta$ without relying on the linear reduced-form shortcuts used in earlier chapters.

## Maximum likelihood estimation (Gaussian)

Suppose temporarily that

<div>$$
u_i\sim N(0,\Sigma),
\qquad
i=1,\ldots,n.
$$</div>

When the transformation from $y_i$ to $u_i=u(x_i,\theta)$ is one-to-one, the Gaussian objective is

<div>$$
Q(\theta,\Sigma)
=
\frac{1}{2}\log|\Sigma|
-
\frac{1}{n}\sum_{i=1}^n
\log
\left|
\frac{\partial u(x_i,\theta)}{\partial y_i'}
\right|
+
\frac{1}{2n}\sum_{i=1}^n
u(x_i,\theta)'\Sigma^{-1}u(x_i,\theta).
\tag{8.1}
$$</div>

The middle term is the Jacobian adjustment from the change of variables between the observed endogenous vector $y_i$ and the structural disturbance $u_i$. In linear simultaneous-equation models this Jacobian is constant. In nonlinear systems it generally depends on the data and on $\theta$, and that is exactly where the difficulty begins.

For each parameter component $\theta_j$, define

<div>$$
T_j(x_i,\theta)
=
\frac{\partial u(x_i,\theta)}{\partial\theta_j}.
$$</div>

The first derivative of the Gaussian objective is

<div>$$
\frac{\partial Q(\theta,\Sigma)}{\partial\theta_j}
=
\frac{1}{n}\sum_{i=1}^n
\left\{
u(x_i,\theta)'\Sigma^{-1}T_j(x_i,\theta)
-
\operatorname{tr}
\left[
\left(
\frac{\partial u(x_i,\theta)}{\partial y_i'}
\right)^{-1}
\frac{\partial T_j(x_i,\theta)}{\partial y_i'}
\right]
\right\}.
\tag{8.2}
$$</div>

Equivalently, since changes in $y_i$ map into changes in $u_i$,

<div>$$
\frac{\partial Q(\theta,\Sigma)}{\partial\theta_j}
=
\frac{1}{n}\sum_{i=1}^n
\left\{
u(x_i,\theta)'\Sigma^{-1}T_j(x_i,\theta)
-
\operatorname{tr}
\left[
\frac{\partial T_j(x_i,\theta)}{\partial u_i'}
\right]
\right\}.
$$</div>

Let the nonlinear reduced form be written abstractly as

<div>$$
y_i=R(u_i,z_i,\theta_0).
$$</div>

Under regularity conditions, if

<div>$$
E\left[
\frac{\partial Q(\theta_0,\Sigma_0)}{\partial\theta}
\right]=0,
\tag{8.3}
$$</div>

then a Gaussian estimator

<div>$$
(\widehat\theta,\widehat\Sigma)
=
\arg\min_{\theta,\Sigma}Q(\theta,\Sigma)
$$</div>

can be consistent. With additional smoothness and information conditions,

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,\Xi^{-1}),
$$</div>

where

<div>$$
\frac{\partial^2 Q(\theta_0,\Sigma_0)}
{\partial\theta\,\partial\theta'}
\xrightarrow{P}\Xi.
$$</div>

When the Gaussian distribution is correctly specified, this estimator is asymptotically efficient. But the key warning is that the pseudo-likelihood may fail to be consistent under distributional misspecification.

### Why the linear case is easier

In the linear simultaneous-equation system,

<div>$$
A x_i=u_i,
$$</div>

we have

<div>$$
\frac{\partial u(x_i,\theta)}{\partial\theta_j}=A_jx_i,
\qquad
\frac{\partial u(x_i,\theta)}{\partial y_i'}=B,
\qquad
\frac{\partial^2u(x_i,\theta)}{\partial\theta_j\,\partial y_i'}=B_j.
$$</div>

The Jacobian term is constant in the data. If $E(u_i\mid z_i)=0$, then the expected score of the Gaussian pseudo-likelihood is zero at the true parameter, even without Gaussian errors.

The intuition is the same as in ordinary least squares. In a linear regression,

<div>$$
y_i=x_i'\beta_0+u_i,
$$</div>

the first-order condition is

<div>$$
\frac{1}{n}\sum_{i=1}^n
x_i(y_i-x_i'\widehat\beta)=0.
$$</div>

This is a sample analogue of the population moment

<div>$$
E(x_i u_i)=0.
$$</div>

If $E(x_i u_i)\ne 0$, the first-order condition forces the estimator toward the wrong population value. If $E(x_i u_i)=0$, the estimator targets $\beta_0$.

In nonlinear simultaneous-equation models, the score includes the Jacobian derivative term in (8.2). Since

<div>$$
\log
\left|
\frac{\partial u(x_i,\theta)}{\partial y_i'}
\right|
$$</div>

is generally data-dependent, the expected score need not be zero under only $E(u_i\mid z_i)=0$. Therefore, unlike the linear case, Gaussian pseudo-maximum likelihood can be inconsistent when the disturbance distribution is misspecified.

If the true density of $u_i$ were known, maximum likelihood could be built from that density. But departures from the assumed density can again lead to inconsistency. This motivates moment-based estimators.

## 8.1 Instrumental variables and GMM estimates

Instrumental-variable and GMM estimators use moment restrictions implied by exogeneity rather than a full density assumption.

If $u_i$ and $z_i$ are independent, then for any suitable function $\phi(z_i)$,

<div>$$
E[u_i\phi(z_i)']
=
E\{E[u_i\phi(z_i)'\mid z_i]\}
=
E\{E[u_i\mid z_i]\phi(z_i)'\}
=0.
\tag{8.4}
$$</div>

Thus sample averages of the form

<div>$$
\frac{1}{n}\sum_{i=1}^n
\phi(z_i)u(x_i,\theta)
$$</div>

should be close to zero at $\theta=\theta_0$.

Let $P_i=P(z_i)$ be a $q\times G$ matrix of instruments, with $q\ge p$, and define the sample moment

<div>$$
m_n(\theta)
=
\frac{1}{n}\sum_{i=1}^n
P_i u(x_i,\theta).
$$</div>

A GMM criterion is

<div>$$
Q_n(\theta)
=
m_n(\theta)'W_n m_n(\theta),
\tag{8.5}
$$</div>

where $W_n$ is positive definite. The note's IV criterion corresponds to a weight built from

<div>$$
\sum_{i=1}^nP_iMP_i',
$$</div>

with $M>0$.

Let

<div>$$
T(x_i,\theta)
=
\frac{\partial u(x_i,\theta)}{\partial\theta'}
$$</div>

be the $G\times p$ derivative matrix. The first-order condition for (8.5) is proportional to

<div>$$
\left[
\frac{1}{n}\sum_{i=1}^n
T(x_i,\theta)'P_i'
\right]
W_n
\left[
\frac{1}{n}\sum_{i=1}^n
P_i u(x_i,\theta)
\right]
=0.
\tag{8.6}
$$</div>

At the true value,

<div>$$
E[P_i u(x_i,\theta_0)]=0,
$$</div>

so under regularity conditions

<div>$$
\widehat\theta_{\mathrm{GMM}}
\xrightarrow{P}\theta_0.
$$</div>

This consistency result uses only moment restrictions such as $E(u_i\mid z_i)=0$, not a parametric density for $u_i$.

### Asymptotic distribution and optimal instruments

Let

<div>$$
G_0
=
\operatorname*{plim}
\frac{1}{n}\sum_{i=1}^n
P_iT(x_i,\theta_0),
$$</div>

and

<div>$$
S_0
=
\operatorname*{plim}
\frac{1}{n}\sum_{i=1}^n
P_i\Sigma_0P_i'.
$$</div>

With $W_n\to_p W$, the asymptotic covariance matrix has the standard GMM sandwich form

<div>$$
(G_0'WG_0)^{-1}G_0'WS_0WG_0(G_0'WG_0)^{-1}.
\tag{8.7}
$$</div>

The efficient choice uses the conditional expectation of the derivative:

<div>$$
S_i
=
S(z_i,\theta_0)
=
E[T(x_i,\theta_0)\mid z_i],
\qquad
S_i\in\mathbb{R}^{G\times p}.
$$</div>

If $\Sigma_0$ is nonsingular and the optimal instrument is

<div>$$
P_i=S_i'\Sigma_0^{-1},
$$</div>

then the efficiency bound is

<div>$$
C^{-1},
\qquad
C=
\operatorname*{plim}
\frac{1}{n}\sum_{i=1}^n
S_i'\Sigma_0^{-1}S_i.
\tag{8.8}
$$</div>

The infeasible optimal IV estimator minimizes

<div>$$
\left[
\frac{1}{n}\sum_{i=1}^n
S_i'\Sigma_0^{-1}u(x_i,\theta)
\right]'
\left[
\frac{1}{n}\sum_{i=1}^n
S_i'\Sigma_0^{-1}S_i
\right]^{-1}
\left[
\frac{1}{n}\sum_{i=1}^n
S_i'\Sigma_0^{-1}u(x_i,\theta)
\right].
\tag{8.9}
$$</div>

The problem is that both $\Sigma_0$ and $S_i=E[T(x_i,\theta_0)\mid z_i]$ are unknown. Estimating $\Sigma_0$ is usually straightforward from preliminary residuals. Estimating $S_i$ is harder because $T(x_i,\theta_0)$ is nonlinear in the endogenous variables and therefore depends on the distribution of $u_i$.

### 8.1.1 Feasible optimal IV estimator

To estimate the optimal instruments, suppose there is a random vector $v_i\in\mathbb{R}^r$, independent of $z_i$, and a parameter $\xi_0\in\mathbb{R}^\ell$ such that

<div>$$
T(x_i,\theta_0)=Q(v_i,z_i,\xi_0).
$$</div>

Then

<div>$$
S(z_i,\theta_0)
=
E[T(x_i,\theta_0)\mid z_i]
=
E[Q(v_i,z_i,\xi_0)\mid z_i].
$$</div>

If $v_j$ values independent of $z_i$ are available, a sample analogue is

<div>$$
\widehat S_i
=
\frac{1}{M_i}
\sum_{j\in\mathcal{M}_i}
Q(\widehat v_j,z_i,\widehat\xi),
\tag{8.10}
$$</div>

where $\mathcal{M}_i$ is an index set with $M_i$ elements. The estimates $\widehat v_j$ and $\widehat\xi$ come from a preliminary consistent estimator.

One important case uses the reduced form

<div>$$
y=R(u,z,\theta_0),
$$</div>

the unique solution to

<div>$$
u(x,\theta_0)=u.
$$</div>

Then

<div>$$
T(x,\theta)
=
T(R(u,z,\theta_0),z,\theta)
=
Q(u,z,\theta),
$$</div>

so we can take $v_i=u_i$ and $\xi_0=\theta_0$. A preliminary estimator gives residuals $\widehat u_i$ and a preliminary $\widetilde\theta$, leading to

<div>$$
\widehat S_i
=
\frac{1}{M_i}
\sum_{j\in\mathcal{M}_i}
Q(\widehat u_j,z_i,\widetilde\theta).
$$</div>

The feasible optimal IV estimator is then

<div>$$
\widehat\theta
=
\arg\min_{\theta\in\Theta}
\left[
\frac{1}{n}\sum_{i=1}^n
\widehat S_i'\widehat\Sigma^{-1}u(x_i,\theta)
\right]'
\left[
\frac{1}{n}\sum_{i=1}^n
\widehat S_i'\widehat\Sigma^{-1}\widehat S_i
\right]^{-1}
\left[
\frac{1}{n}\sum_{i=1}^n
\widehat S_i'\widehat\Sigma^{-1}u(x_i,\theta)
\right].
\tag{8.11}
$$</div>

Under suitable regularity conditions,

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,C^{-1}),
$$</div>

and

<div>$$
\widehat C
=
\frac{1}{n}\sum_{i=1}^n
\widehat S_i'\widehat\Sigma^{-1}\widehat S_i
\xrightarrow{P}
C.
$$</div>

The averaging sets $\mathcal{M}_i$ can grow slowly. It is enough that

<div>$$
\frac{1}{n}\sum_{i=1}^n M_i^{-1}\to 0.
$$</div>

This matters computationally: using all pairs $(i,j)$ can require $n^2$ operations, while smaller $\mathcal{M}_i$ can deliver the same asymptotic behavior with far less work.

### Serially correlated disturbances

If the structural disturbances are serially correlated, the previous estimator is generally not efficient. Stack the structural disturbances as

<div>$$
U(\theta)=
\begin{pmatrix}
u(x_1,\theta)' & \cdots & u(x_n,\theta)'
\end{pmatrix}'.
$$</div>

Let

<div>$$
\Omega_U=E[U(\theta_0)U(\theta_0)'].
$$</div>

With $S=(S_1',\ldots,S_n')'$ stacked conformably, the optimal criterion is

<div>$$
U(\theta)'\Omega_U^{-1}
S
(S'\Omega_U^{-1}S)^{-1}
S'\Omega_U^{-1}
U(\theta).
\tag{8.12}
$$</div>

Then

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,\Psi^{-1}),
\qquad
\Psi=
\operatorname*{plim}_{n\to\infty}
\frac{1}{n}S'\Omega_U^{-1}S.
$$</div>

As an example, suppose the disturbance has an autoregressive representation

<div>$$
\sum_{j=0}^{\infty}B_j u_{i-j}=e_i,
\qquad
\sum_{j=0}^{\infty}\|B_j\|<\infty,
$$</div>

where $e_i$ is white noise with $E(e_i e_j')=I_G\mathbf{1}_{\{i=j\}}$. If $B_j=B_j(\tau_0)$ and $\widehat\tau-\tau_0=O_p(n^{-1/2})$, define $\widehat B_j=B_j(\widehat\tau)$ and transform the residuals:

<div>$$
\widehat e_i(\theta)
=
\sum_{j=0}^{i-1}
\widehat B_j u(x_{i-j},\theta).
$$</div>

The transformed instruments are

<div>$$
\widehat H_i
=
\sum_{j=0}^{i-1}
\widehat B_j\widehat S_{i-j}.
$$</div>

The feasible estimator minimizes

<div>$$
\left[
\sum_{i=1}^n
\widehat H_i'\widehat e_i(\theta)
\right]'
\left[
\sum_{i=1}^n
\widehat H_i'\widehat H_i
\right]^{-1}
\left[
\sum_{i=1}^n
\widehat H_i'\widehat e_i(\theta)
\right].
\tag{8.13}
$$</div>

Under suitable conditions,

<div>$$
n^{1/2}(\widehat\theta-\theta_0)
\xrightarrow{d}
N(0,\Psi^{-1}),
\qquad
\widehat\Psi=
\frac{1}{n}\sum_{i=1}^n
\widehat H_i'\widehat H_i
\xrightarrow{P}\Psi.
$$</div>

### 8.1.2 The instrumental variable estimator

The familiar 2SLS and 3SLS estimators from the linear model are also instrumental-variable estimators.

Write the linear system in stacked form as

<div>$$
XA'=U,
$$</div>

or, using vectorization,

<div>$$
(X\otimes I_G)\alpha=u,
\qquad
\alpha=\operatorname{vec}(A'),
\qquad
u=\operatorname{vec}(U).
$$</div>

Let $W$ be an instrument matrix with the same number of rows as $u$. An IV-style quadratic criterion can be written as

<div>$$
Q(\theta)
=
\alpha(\theta)'W'(X\otimes I_G)\alpha(\theta).
\tag{8.14}
$$</div>

For 2SLS, the objective is

<div>$$
\operatorname{tr}
\left[
AX'Z(Z'Z)^{-1}Z'XA'
\right].
$$</div>

Using

<div>$$
\widetilde\Pi=Y'Z(Z'Z)^{-1},
$$</div>

this can be written in the IV form with

<div>$$
W'
=
\left[
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
Z'
\otimes I_G
\right].
\tag{8.15}
$$</div>

Therefore 2SLS is an IV estimator whose instruments are the fitted reduced-form components generated by $Z$.

For 3SLS, the corresponding instrument matrix incorporates the estimated cross-equation covariance:

<div>$$
W'
=
\left[
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
Z'
\otimes \widehat\Sigma^{-1}
\right].
\tag{8.16}
$$</div>

Thus 3SLS is the covariance-weighted system version of the same IV logic.
