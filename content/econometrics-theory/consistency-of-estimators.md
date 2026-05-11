---
title: 6. Consistency of Estimators
linktitle: 6. Consistency
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-consistency
    weight: 7
weight: 7
---

This chapter studies why the estimators from Chapter 5 converge to the true parameters. The main tool is the consistency theorem for extremum estimators: if a sample criterion is uniformly close to a population criterion and the population criterion has a separated unique minimizer, then the sample minimizer is consistent.

## Consistency of extremum estimators

Let

<div>$$
\widehat\alpha
=
\arg\min_{\alpha\in\mathcal{A}} R_n(\alpha),
$$</div>

where $\mathcal{A}\subset\mathbb{R}^p$ is compact and $\alpha_0\in\mathcal{A}$. Suppose

<div>$$
R_n(\alpha)-R_n(\alpha_0)
=
S(\alpha)-T_n(\alpha),
$$</div>

where $S(\alpha)$ is nonstochastic. Assume:

<div>$$
\inf_{\|\alpha-\alpha_0\|\ge\varepsilon}S(\alpha)\ge\delta>0
\qquad
\text{for every } \varepsilon>0
\tag{6.1}
$$</div>

for some $\delta$ depending on $\varepsilon$, and

<div>$$
\sup_{\alpha\in\mathcal{A}}|T_n(\alpha)|=o_p(1).
\tag{6.2}
$$</div>

Then

<div>$$
\widehat\alpha\xrightarrow{P}\alpha_0.
$$</div>

The intuition is crisp. Away from $\alpha_0$, the deterministic part $S(\alpha)$ is bounded away from zero. The stochastic part $T_n(\alpha)$ becomes uniformly negligible. Therefore, with probability approaching one, no point outside an $\varepsilon$-neighborhood of $\alpha_0$ can beat $\alpha_0$ in the sample criterion.

### Reduced-form map and regularity conditions

Let

<div>$$
\Gamma(\theta)=(\Pi(\theta),\Omega(\theta))
$$</div>

be the reduced-form map from the structural parameter space $\Theta$ into a reduced-form parameter space $\mathcal{B}$. The strategy is:

1. Show that the estimator of $\Gamma_0=(\Pi_0,\Omega_0)$ is consistent.
2. Use identification to transfer consistency from $\Gamma$ to $\Phi=(A,\Sigma)$ or to $\theta$.

The chapter uses the following assumptions.

A5: no asymptotic multicollinearity and asymptotic orthogonality. Let

<div>$$
\widehat M=\frac{Z'Z}{n},
\qquad
\widehat N=\frac{Z'V_0}{n},
\qquad
\widehat O=\frac{V_0'V_0}{n},
$$</div>

where

<div>$$
V_0=Y-Z\Pi_0'.
$$</div>

Assume

<div>$$
\widehat M\xrightarrow{P}M>0,
\qquad
\widehat N\xrightarrow{P}0,
\qquad
\widehat O\xrightarrow{P}\Omega_0>0.
\tag{6.3}
$$</div>

A6: reduced-form identification of structural-form parameters:

<div>$$
\Gamma=\Gamma_0
\quad\Longrightarrow\quad
\Phi=\Phi_0.
$$</div>

A7: reduced-form identification of minimal parameters:

<div>$$
\Gamma=\Gamma_0
\quad\Longrightarrow\quad
\theta=\theta_0.
$$</div>

A8: the true parameter belongs to the parameter space:

<div>$$
\theta_0\in\Theta.
$$</div>

Assumptions A6 and A7 are identification conditions. Assumption A5 does not require exact finite-sample orthogonality between $Z$ and $V_0$; it requires asymptotic orthogonality. This distinction matters for time-series settings, where regressors and errors may be serially dependent but still satisfy appropriate law-of-large-numbers conditions.

### Consistency of the Gaussian PMLE

Recall the reduced-form Gaussian objective

<div>$$
Q_2(\Gamma)
=
\log|\Omega|
+\frac{1}{n}
\operatorname{tr}\left[
(Y-Z\Pi')'(Y-Z\Pi')\Omega^{-1}
\right].
$$</div>

Let

<div>$$
\widehat\Gamma
=
\arg\min_{\Gamma\in\mathcal{B}}Q_2(\Gamma).
$$</div>

Under A1, A2, A5, and A8,

<div>$$
\widehat\Gamma\xrightarrow{P}\Gamma_0.
$$</div>

If A6 also holds, then

<div>$$
\widehat\Phi\xrightarrow{P}\Phi_0.
$$</div>

If A7 also holds, then

<div>$$
\widehat\theta\xrightarrow{P}\theta_0.
$$</div>

The proof follows the extremum-estimator template. Write $\Gamma=(\Pi,\Omega)$ and compare the objective at $\Gamma$ and $\Gamma_0$. Since

<div>$$
Y-Z\Pi'
=
V_0-Z(\Pi-\Pi_0)',
$$</div>

the criterion difference can be decomposed into a deterministic separation term plus a stochastic remainder:

<div>$$
Q_2(\Gamma)-Q_2(\Gamma_0)
=S(\Gamma)-T_n(\Gamma).
$$</div>

The deterministic term is

<div>$$
\begin{aligned}
S(\Gamma)
&=
\operatorname{tr}
\left[
(\Pi-\Pi_0)M(\Pi-\Pi_0)'\Omega^{-1}
\right]\\
&\quad
+\operatorname{tr}(H)-\log|H|-G,
\end{aligned}
\tag{6.4}
$$</div>

where

<div>$$
H=\Omega_0^{1/2}\Omega^{-1}\Omega_0^{1/2}.
$$</div>

The first term penalizes deviations in $\Pi$. The second term penalizes deviations in $\Omega$. If $\lambda_1,\ldots,\lambda_G$ are the eigenvalues of $H$, then

<div>$$
\operatorname{tr}(H)-\log|H|-G
=
\sum_{j=1}^G(\lambda_j-\log\lambda_j-1)\ge 0,
$$</div>

with equality only when every $\lambda_j=1$, that is, when $\Omega=\Omega_0$.

The stochastic remainder consists of terms involving

<div>$$
\widehat M-M,
\qquad
\widehat N,
\qquad
\widehat O-\Omega_0.
$$</div>

By A5, these converge to zero in probability. Compactness and continuity make the convergence uniform over the parameter space, so

<div>$$
\sup_{\Gamma\in\mathcal{B}}|T_n(\Gamma)|=o_p(1).
$$</div>

Thus $\widehat\Gamma\to_p\Gamma_0$. The conclusions for $\widehat\Phi$ and $\widehat\theta$ then follow from continuity and the identification assumptions A6 and A7.

The proof highlights what each assumption does:

- A5 delivers the probability limits needed to control the sample criterion.
- Compactness prevents the estimator from escaping to pathological regions.
- A6 and A7 turn reduced-form consistency into structural and minimal-parameter consistency.
- Differentiability is not required for consistency; continuity is enough.

## 6.1 Consistency of the minimum-distance estimator

For the MDE, use the following conditions.

B1: $\Theta$ is compact and $|B(\theta)|\ne 0$ for every $\theta\in\Theta$.

B2: $A(\theta)$ is continuous in $\theta$.

B3: reduced-form identification of the structural matrix:

<div>$$
\Pi=\Pi_0
\quad\Longrightarrow\quad
A=A_0.
$$</div>

B4: reduced-form identification of the minimal parameter:

<div>$$
\Pi=\Pi_0
\quad\Longrightarrow\quad
\theta=\theta_0.
$$</div>

Recall that the unrestricted reduced-form estimator is

<div>$$
\widetilde\Pi=Y'Z(Z'Z)^{-1},
$$</div>

and the unrestricted residual covariance is

<div>$$
\widetilde\Omega
=
\frac{1}{n}
\left[
Y'Y-Y'Z(Z'Z)^{-1}Z'Y
\right].
$$</div>

The MDE chooses $\widehat\theta$ so that

<div>$$
\Pi(\widehat\theta)=\widehat\Pi
$$</div>

is the restricted reduced form closest to $\widetilde\Pi$ in the MDE criterion.

Under B1, B2, and A5,

<div>$$
\widehat\Pi\xrightarrow{P}\Pi_0.
$$</div>

If B3 also holds, then

<div>$$
\widehat A\xrightarrow{P}A_0.
$$</div>

If B4 also holds, then

<div>$$
\widehat\theta\xrightarrow{P}\theta_0.
$$</div>

The key reason is that A5 implies consistency of the unrestricted reduced-form least-squares estimator:

<div>$$
\widetilde\Pi-\Pi_0
=
Y'Z(Z'Z)^{-1}-\Pi_0
=
V_0'Z(Z'Z)^{-1}
=
\widehat N'\widehat M^{-1}
\xrightarrow{P}0.
$$</div>

Since $\widetilde\Omega\to_p\Omega_0>0$, the MDE criterion is asymptotically minimized at the reduced form $\Pi_0$. Identification then transfers the reduced-form convergence to $A_0$ and $\theta_0$.

## 6.2 Consistency of two-stage and three-stage least squares

Both 2SLS and 3SLS can be handled through a common criterion. Let $D$ be a positive definite weighting matrix and define

<div>$$
R_n(A)
=
\frac{1}{n}
\operatorname{tr}
\left[
A
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
Z'Z
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}'
A'D
\right].
\tag{6.5}
$$</div>

Let $\widehat A$ minimize $R_n(A)$ over the structural parameter space.

For 2SLS,

<div>$$
D=I_G.
$$</div>

For 3SLS,

<div>$$
D=\widehat\Sigma^{-1},
$$</div>

where $\widehat\Sigma$ is estimated from preliminary 2SLS residuals.

Assume B1 and B2, plus

<div>$$
\widehat M=\frac{Z'Z}{n}\xrightarrow{P}M>0,
\qquad
\widehat N=\frac{Z'V_0}{n}\xrightarrow{P}0,
$$</div>

and assume structural identification:

<div>$$
A=A_0
\quad\Longrightarrow\quad
\theta=\theta_0.
$$</div>

Then

<div>$$
\widehat A\xrightarrow{P}A_0.
$$</div>

### The common proof

Use

<div>$$
\widetilde\Pi
=
\Pi_0+\widehat N'\widehat M^{-1}.
$$</div>

Then

<div>$$
A
\begin{pmatrix}
\widetilde\Pi\\
I_K
\end{pmatrix}
=
B\Pi_0+C+B\widehat N'\widehat M^{-1}.
$$</div>

At the true structural matrix $A_0=(B_0,C_0)$,

<div>$$
B_0\Pi_0+C_0=0.
$$</div>

The criterion difference can again be written as

<div>$$
R_n(A)-R_n(A_0)
=
S(A)-T_n(A),
$$</div>

where the deterministic part is

<div>$$
S(A)
=
\operatorname{tr}
\left[
(B\Pi_0+C)M(B\Pi_0+C)'D
\right].
\tag{6.6}
$$</div>

Since $M>0$ and $D>0$, $S(A)$ is zero only when

<div>$$
B\Pi_0+C=0.
$$</div>

By the identification condition, this pins down $A=A_0$ on the parameter space. Therefore $S(A)$ is bounded away from zero outside any neighborhood of $A_0$.

The stochastic remainder $T_n(A)$ contains terms involving

<div>$$
\widehat M-M,
\qquad
\widehat N,
\qquad
\widehat N'\widehat M^{-1}\widehat N.
$$</div>

By the assumed probability limits and compactness,

<div>$$
\sup_A |T_n(A)|=o_p(1).
$$</div>

The extremum consistency theorem then gives $\widehat A\to_p A_0$.

### Applying the result to 2SLS

For 2SLS, $D=I_G$, which is fixed and positive definite. Therefore the common proof applies directly:

<div>$$
\widetilde A_{\mathrm{2SLS}}\xrightarrow{P}A_0.
$$</div>

The corresponding parameter estimator is consistent whenever $A=A_0$ implies $\theta=\theta_0$:

<div>$$
\widetilde\theta_{\mathrm{2SLS}}\xrightarrow{P}\theta_0.
$$</div>

### Applying the result to 3SLS

For 3SLS, the weight matrix is random:

<div>$$
D=\widehat\Sigma^{-1}.
$$</div>

The preliminary 2SLS estimator gives

<div>$$
\widehat\Sigma
=
\widetilde A_{\mathrm{2SLS}}
\frac{X'X}{n}
\widetilde A_{\mathrm{2SLS}}'.
$$</div>

Because $\widetilde A_{\mathrm{2SLS}}\to_p A_0$ and

<div>$$
\frac{X'X}{n}
\xrightarrow{P}
\begin{pmatrix}
\Omega_0+\Pi_0M\Pi_0' & \Pi_0M\\
M\Pi_0' & M
\end{pmatrix},
$$</div>

we obtain

<div>$$
\widehat\Sigma\xrightarrow{P}\Sigma_0.
$$</div>

Hence

<div>$$
\widehat\Sigma^{-1}\xrightarrow{P}\Sigma_0^{-1}.
$$</div>

The 3SLS criterion is therefore asymptotically equivalent to the common criterion with fixed positive definite weight $D=\Sigma_0^{-1}$. The same separation and stochastic-equicontinuity argument yields

<div>$$
\widehat A_{\mathrm{3SLS}}\xrightarrow{P}A_0,
\qquad
\widehat\theta_{\mathrm{3SLS}}\xrightarrow{P}\theta_0.
$$</div>

The takeaway is that 2SLS establishes a consistent preliminary structural estimate, which supplies a consistent estimate of the structural covariance matrix. 3SLS then uses that covariance estimate for more efficient system-wide weighting without changing the consistency target.
