---
title: 10. Boundary Asymptotics and Nonlinear Models
linktitle: 10. Boundary Asymptotics
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
math: true
menu:
  econometrics-theory:
    identifier: chapter-boundary-asymptotics
    weight: 11
weight: 11
---

This chapter studies what happens when the true parameter may lie on the boundary of the parameter space. The main lesson is that the usual asymptotic normal approximation is an interior-point result. At a boundary, the estimator is constrained to move only in feasible local directions, so its limiting distribution can become truncated, kinked, or partly degenerate.

The cleanest way to see the idea is through a one-parameter regression model. After that, the same argument extends to nonlinear least squares by replacing the regressor with the derivative of the nonlinear regression function.

## Parameters on the boundary in linear models

Consider the scalar linear regression model

<div>$$
y_i=\beta_0 x_i+u_i,
\qquad
i=1,\ldots,n,
$$</div>

with a constrained parameter space

<div>$$
\Theta=[0,M],
\qquad
M<\infty.
$$</div>

The parameter is scalar, but the constraint matters. If $\beta_0>0$, the true value is locally interior. If $\beta_0=0$, the true value is at the lower boundary.

Use the least-squares objective

<div>$$
Q_n(\beta)
=
\frac{1}{n}\sum_{i=1}^n(y_i-\beta x_i)^2,
$$</div>

and define the constrained estimator

<div>$$
\widehat\beta
=
\arg\min_{\beta\in[0,M]}Q_n(\beta).
\tag{10.1}
$$</div>

Assume

<div>$$
\frac{1}{n}\sum_{i=1}^n x_i^2
\xrightarrow{P}
\sigma_x^2>0,
\qquad
\frac{1}{\sqrt n}\sum_{i=1}^n x_i u_i
\xrightarrow{d}
\sigma_u\sigma_x Z,
$$</div>

where $Z\sim N(0,1)$. These assumptions cover the basic independent case and can also be adapted to heteroskedastic or weakly dependent data by changing the limiting variance.

### Consistency

Compare the objective at $\beta$ with the objective at the truth. Since

<div>$$
y_i-\beta x_i
=
u_i-(\beta-\beta_0)x_i,
$$</div>

we have

<div>$$
Q_n(\beta_0)-Q_n(\beta)
=
-(\beta-\beta_0)^2
\frac{1}{n}\sum_{i=1}^n x_i^2
+
2(\beta-\beta_0)
\frac{1}{n}\sum_{i=1}^n x_i u_i.
\tag{10.2}
$$</div>

Uniformly over $\beta\in[0,M]$, the first term behaves like

<div>$$
-(\beta-\beta_0)^2\sigma_x^2,
$$</div>

while the second term is negligible away from $\beta_0$ because $n^{-1}\sum_i x_i u_i=o_p(1)$. Therefore,

<div>$$
Q_n(\beta_0)-Q_n(\beta)
\xrightarrow{P}
-(\beta-\beta_0)^2\sigma_x^2<0
$$</div>

whenever $\beta$ is bounded away from $\beta_0$. This gives consistency:

<div>$$
\widehat\beta\xrightarrow{P}\beta_0.
$$</div>

### Rate of convergence

The estimator is still $\sqrt n$-consistent. Let

<div>$$
A_n(L)
=
\left\{
\beta\in[0,M]:
|\beta-\beta_0|\ge L n^{-1/2}
\right\}.
$$</div>

On $A_n(L)$, the deterministic quadratic term has order $(\beta-\beta_0)^2$, while the stochastic linear term has order

<div>$$
|\beta-\beta_0|
\left|
\frac{1}{n}\sum_{i=1}^n x_i u_i
\right|
=
|\beta-\beta_0|\,O_p(n^{-1/2}).
$$</div>

When $|\beta-\beta_0|\ge L/\sqrt n$, the quadratic term dominates the stochastic term for large $L$. Hence

<div>$$
\sqrt n(\widehat\beta-\beta_0)=O_p(1).
\tag{10.3}
$$</div>

The boundary changes the limiting distribution, not the first-order rate.

### Local criterion

Write local deviations as

<div>$$
\beta=\beta_0+\frac{v}{\sqrt n}.
$$</div>

The feasible local set is

<div>$$
V_n
=
\left\{
v:\beta_0+\frac{v}{\sqrt n}\in[0,M]
\right\}.
$$</div>

Define

<div>$$
\widehat v
=
\sqrt n(\widehat\beta-\beta_0).
$$</div>

Because minimizing $Q_n(\beta)$ is equivalent to maximizing the local contrast

<div>$$
\Lambda_n(v)
=
n\left[
Q_n(\beta_0)
-
Q_n\left(\beta_0+\frac{v}{\sqrt n}\right)
\right],
$$</div>

we can study $\widehat v$ as the maximizer of $\Lambda_n(v)$ over $V_n$. From (10.2),

<div>$$
\Lambda_n(v)
=
-v^2
\frac{1}{n}\sum_{i=1}^n x_i^2
+
2v
\frac{1}{\sqrt n}\sum_{i=1}^n x_i u_i.
\tag{10.4}
$$</div>

Thus, on compact sets of $v$,

<div>$$
\Lambda_n(v)
\Rightarrow
\Lambda(v)
=
-v^2\sigma_x^2
+
2v\sigma_u\sigma_x Z.
\tag{10.5}
$$</div>

The limit process is a random parabola. Its unconstrained maximizer is

<div>$$
v^\star
=
\frac{\sigma_u}{\sigma_x}Z.
\tag{10.6}
$$</div>

The only remaining question is whether this maximizer is feasible.

### Interior true value

If $\beta_0>0$, then every bounded local deviation $v$ is feasible for large enough $n$. Locally, the constraint disappears:

<div>$$
V_n\to\mathbb{R}.
$$</div>

Therefore,

<div>$$
\sqrt n(\widehat\beta-\beta_0)
\xrightarrow{d}
\frac{\sigma_u}{\sigma_x}Z.
\tag{10.7}
$$</div>

This is the usual asymptotic normal approximation.

### Boundary true value

If $\beta_0=0$, then the local parameter must satisfy

<div>$$
\frac{v}{\sqrt n}\ge 0,
$$</div>

so the feasible local set converges to

<div>$$
V_n\to[0,\infty).
$$</div>

The limiting maximizer is the unconstrained maximizer projected onto $[0,\infty)$:

<div>$$
v^\star
=
\max\left\{
\frac{\sigma_u}{\sigma_x}Z,
0
\right\}
=
\frac{\sigma_u}{\sigma_x}Z\,\mathbf{1}_{\{Z\ge 0\}}.
\tag{10.8}
$$</div>

Thus

<div>$$
\sqrt n(\widehat\beta-\beta_0)
\xrightarrow{d}
\frac{\sigma_u}{\sigma_x}Z\,\mathbf{1}_{\{Z\ge 0\}}.
\tag{10.9}
$$</div>

This limit is not normal. It has probability $1/2$ at zero and a positive half-normal part when $Z>0$. The point mass appears because, in half of the samples asymptotically, the unconstrained estimate wants to move outside the parameter space and is pushed back to the boundary.

If the true value is at the upper boundary, $\beta_0=M$, the feasible local set becomes $(-\infty,0]$, and the limit is the projection of $(\sigma_u/\sigma_x)Z$ onto that half-line.

### General boundary intuition

The scalar example is a one-dimensional version of a general projection result. For a vector parameter $\theta\in\Theta$, local deviations take the form

<div>$$
\theta=\theta_0+\frac{v}{\sqrt n}.
$$</div>

If $\theta_0$ is on the boundary, the feasible local directions converge to a cone:

<div>$$
T_\Theta(\theta_0)
=
\lim_n
\left\{
v:\theta_0+\frac{v}{\sqrt n}\in\Theta
\right\}.
$$</div>

The local criterion often has the quadratic limit

<div>$$
\Lambda(v)
=
2v'G-v'Av,
\qquad
A>0,
$$</div>

where $G$ is a mean-zero normal vector. The limiting distribution of the estimator is

<div>$$
\arg\max_{v\in T_\Theta(\theta_0)}
\{2v'G-v'Av\}.
\tag{10.10}
$$</div>

If $T_\Theta(\theta_0)=\mathbb{R}^p$, this reduces to the usual normal limit $A^{-1}G$. If $T_\Theta(\theta_0)$ is a proper cone, the limit is a constrained projection of $A^{-1}G$.

## 10.1 Nonlinear models

Now consider the scalar nonlinear regression model

<div>$$
y_i=f(x_i,\beta_0)+u_i,
\qquad
\beta\in[0,M].
$$</div>

Write

<div>$$
f_i(\beta)=f(x_i,\beta),
\qquad
f_i'(\beta)=\frac{\partial f(x_i,\beta)}{\partial\beta}.
$$</div>

The nonlinear least-squares estimator is

<div>$$
\widehat\beta
=
\arg\min_{\beta\in[0,M]}Q_n(\beta),
\qquad
Q_n(\beta)
=
\frac{1}{n}\sum_{i=1}^n
\{y_i-f_i(\beta)\}^2.
\tag{10.11}
$$</div>

The boundary issue is the same as in the linear model. The only extra work is to show that, locally, the nonlinear regression function can be replaced by its derivative at the true value.

### Consistency and rate

By the mean value theorem,

<div>$$
f_i(\beta)-f_i(\beta_0)
=
(\beta-\beta_0)f_i'(\bar\beta_i),
$$</div>

where $\bar\beta_i$ lies between $\beta$ and $\beta_0$. Hence

<div>$$
Q_n(\beta_0)-Q_n(\beta)
=
-(\beta-\beta_0)^2
\frac{1}{n}\sum_{i=1}^n
\{f_i'(\bar\beta_i)\}^2
+
2(\beta-\beta_0)
\frac{1}{n}\sum_{i=1}^n
f_i'(\bar\beta_i)u_i.
\tag{10.12}
$$</div>

Suppose the derivative square satisfies a uniform law of large numbers:

<div>$$
\sup_{\beta\in[0,M]}
\left|
\frac{1}{n}\sum_{i=1}^n\{f_i'(\beta)\}^2
-
E\{f_i'(\beta)\}^2
\right|
\xrightarrow{P}0,
$$</div>

and suppose the identification curvature is positive near the truth:

<div>$$
E\{f_i'(\beta_0)\}^2>0.
$$</div>

Also require the empirical derivative-score process to be uniformly bounded:

<div>$$
\sup_{\beta\in[0,M]}
\left|
\frac{1}{\sqrt n}\sum_{i=1}^n f_i'(\beta)u_i
\right|
=O_p(1).
\tag{10.13}
$$</div>

Then the same comparison as in the linear model gives

<div>$$
\widehat\beta\xrightarrow{P}\beta_0,
\qquad
\sqrt n(\widehat\beta-\beta_0)=O_p(1).
$$</div>

### Why the derivative-score process is bounded

Define

<div>$$
\Upsilon_n(\beta)
=
\frac{1}{\sqrt n}\sum_{i=1}^n f_i'(\beta)u_i.
$$</div>

One route to (10.13) is weak convergence of $\Upsilon_n(\beta)$ to a tight Gaussian process. This requires:

1. finite-dimensional central limit theorems for $\Upsilon_n(\beta_1),\ldots,\Upsilon_n(\beta_q)$;
2. a tightness condition controlling increments of $\Upsilon_n(\beta)$.

A useful sufficient condition for tightness is a Hölder-type derivative bound. Suppose

<div>$$
|f_i'(\beta_2)-f_i'(\beta_1)|
\le
|\beta_2-\beta_1|^\xi g_i,
$$</div>

with

<div>$$
E\left[\sup_{\beta\in[0,M]}|g_i|^4\right]<K,
\qquad
E(u_i^4)<K,
\qquad
\xi>\frac{1}{4}.
$$</div>

Then fourth-moment bounds imply

<div>$$
E|\Upsilon_n(\beta_2)-\Upsilon_n(\beta_1)|^4
\le
K|\beta_2-\beta_1|^{4\xi},
$$</div>

which is enough for tightness because $4\xi>1$. Therefore

<div>$$
\Upsilon_n(\beta)\Rightarrow\Upsilon(\beta),
$$</div>

where $\Upsilon(\beta)$ is a Gaussian process, and the continuous mapping theorem gives

<div>$$
\sup_{\beta\in[0,M]}|\Upsilon_n(\beta)|=O_p(1).
$$</div>

### Local nonlinear criterion

Now localize again:

<div>$$
\beta=\beta_0+\frac{v}{\sqrt n}.
$$</div>

The key stochastic equicontinuity step is

<div>$$
\sup_{|v|\le L}
\left|
\frac{1}{\sqrt n}
\sum_{i=1}^n
\left[
f_i'\left(\beta_0+\tau\frac{v}{\sqrt n}\right)
-
f_i'(\beta_0)
\right]u_i
\right|
=o_p(1),
\tag{10.14}
$$</div>

for $\tau\in(0,1)$. This lets us replace the derivative at the intermediate point by the derivative at $\beta_0$.

Assume

<div>$$
\frac{1}{n}\sum_{i=1}^n\{f_i'(\beta_0)\}^2
\xrightarrow{P}
A_f>0,
$$</div>

and

<div>$$
\frac{1}{\sqrt n}\sum_{i=1}^n f_i'(\beta_0)u_i
\xrightarrow{d}
G_f,
\qquad
G_f\sim N(0,\Omega_f).
$$</div>

Then the local contrast satisfies, uniformly for bounded $v$,

<div>$$
\Lambda_n(v)
=
n\left[
Q_n(\beta_0)
-
Q_n\left(\beta_0+\frac{v}{\sqrt n}\right)
\right]
=
-v^2A_f+2vG_f+o_p(1).
\tag{10.15}
$$</div>

The limiting maximizer over the feasible local set is therefore

<div>$$
v^\star
=
\arg\max_{v\in T_\Theta(\beta_0)}
\{-v^2A_f+2vG_f\}.
\tag{10.16}
$$</div>

If $\beta_0$ is interior,

<div>$$
T_\Theta(\beta_0)=\mathbb{R},
\qquad
v^\star=\frac{G_f}{A_f},
$$</div>

so

<div>$$
\sqrt n(\widehat\beta-\beta_0)
\xrightarrow{d}
N\left(0,\frac{\Omega_f}{A_f^2}\right).
$$</div>

If $\beta_0=0$ is the lower boundary,

<div>$$
T_\Theta(\beta_0)=[0,\infty),
\qquad
v^\star=\max\left\{\frac{G_f}{A_f},0\right\}.
$$</div>

Thus the nonlinear boundary limit is the same shape as the linear boundary limit, but with $x_i$ replaced by the derivative $f_i'(\beta_0)$.

### Numerical simulation tour

We now perform the boundary simulation directly on the page. The default experiment uses the scalar linear model

<div>$$
y_i=\beta_0x_i+u_i,
\qquad
x_i\sim N(0,1),
\qquad
u_i\sim N(0,1),
$$</div>

with parameter space

<div>$$
\Theta=[0,1.5].
$$</div>

For each Monte Carlo replication, compute the unconstrained least-squares estimator

<div>$$
\widetilde\beta
=
\frac{\sum_{i=1}^n x_i y_i}
{\sum_{i=1}^n x_i^2},
$$</div>

and then impose the parameter-space restriction by projection:

<div>$$
\widehat\beta
=
\min\{1.5,\max\{0,\widetilde\beta\}\}.
$$</div>

When $\beta_0=0$, the lower boundary is active and the theory predicts

<div>$$
\sqrt n(\widehat\beta-\beta_0)
\xrightarrow{d}
\max\{Z,0\},
\qquad
Z\sim N(0,1).
$$</div>

So about half the limiting probability mass sits exactly at zero. When $\beta_0=0.5$, the true value is interior and the usual normal approximation returns.

<div class="probability-tool" id="boundary-asymptotics-tool">
  <div class="probability-tool__grid">
    <section class="probability-tool__panel">
      <p class="probability-tool__eyebrow">Interactive Monte Carlo</p>
      <h3>Boundary estimator simulator</h3>
      <p id="boundary-asymptotics-tool-copy">Choose whether the true parameter is on the lower boundary or safely inside the parameter space. The charts compare the constrained estimator with the local limiting approximation.</p>
      <div class="probability-tool__field">
        <label for="boundary-asymptotics-tool-scenario">True parameter location</label>
        <select id="boundary-asymptotics-tool-scenario">
          <option value="boundary" selected>Boundary: beta0 = 0</option>
          <option value="interior">Interior: beta0 = 0.5</option>
        </select>
        <p>The boundary case should pile up at zero. The interior case should look approximately normal.</p>
      </div>
      <div class="probability-tool__field">
        <label for="boundary-asymptotics-tool-reps">Monte Carlo repetitions</label>
        <input id="boundary-asymptotics-tool-reps" type="number" min="500" max="10000" step="500" value="4000">
        <p>More repetitions make the histogram smoother but take slightly longer.</p>
      </div>
      <div class="probability-tool__field">
        <label for="boundary-asymptotics-tool-snapshot">Histogram sample size</label>
        <select id="boundary-asymptotics-tool-snapshot"></select>
        <p>The histogram uses this sample size for the distribution of <code>sqrt(n)(betahat - beta0)</code>.</p>
      </div>
      <div class="probability-tool__actions">
        <button type="button" class="probability-tool__button" id="boundary-asymptotics-tool-run">Run simulation</button>
        <button type="button" class="probability-tool__button probability-tool__button--ghost" id="boundary-asymptotics-tool-reset">Reset preset</button>
      </div>
    </section>
    <section class="probability-tool__panel probability-tool__panel--results">
      <p class="probability-tool__eyebrow">Current Run</p>
      <h3>What the simulation is showing</h3>
      <div class="probability-tool__metrics">
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Scenario</span>
          <strong id="boundary-asymptotics-tool-metric-scenario">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Boundary mass at histogram n</span>
          <strong id="boundary-asymptotics-tool-metric-boundary">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Unconstrained estimate below 0</span>
          <strong id="boundary-asymptotics-tool-metric-infeasible">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Mean of sqrt(n)(betahat - beta0)</span>
          <strong id="boundary-asymptotics-tool-metric-mean">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">SD of sqrt(n)(betahat - beta0)</span>
          <strong id="boundary-asymptotics-tool-metric-sd">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Limit benchmark</span>
          <strong id="boundary-asymptotics-tool-metric-limit">-</strong>
        </div>
      </div>
      <div class="probability-tool__notes" id="boundary-asymptotics-tool-notes"></div>
      <div class="probability-tool__error" id="boundary-asymptotics-tool-error" hidden></div>
    </section>
  </div>
  <section class="probability-tool__panel probability-tool__panel--charts">
    <div class="probability-tool__charts">
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Probability of hitting the boundary</h3>
          <p>The teal line is simulated. The dashed line is the limiting prediction: 0.5 at the lower boundary and 0 in the interior.</p>
        </div>
        <div id="boundary-asymptotics-tool-mass-chart"></div>
      </article>
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Distribution of the scaled estimator</h3>
          <p>The bars show <code>sqrt(n)(betahat - beta0)</code>. The dashed curve is the unconstrained normal benchmark.</p>
        </div>
        <div id="boundary-asymptotics-tool-histogram"></div>
      </article>
    </div>
    <div class="probability-tool__table-wrap">
      <table class="probability-tool__table">
        <thead>
          <tr>
            <th>Sample size n</th>
            <th>Simulated Pr(betahat = 0)</th>
            <th>Limit Pr(point mass at 0)</th>
            <th>Mean scaled estimate</th>
            <th>SD scaled estimate</th>
          </tr>
        </thead>
        <tbody id="boundary-asymptotics-tool-table-body"></tbody>
      </table>
    </div>
  </section>
</div>

Read the two charts together. At the boundary, many unconstrained estimates want to be negative, but negative values are infeasible. The constrained estimator therefore sticks exactly at zero in those replications. In the histogram, that shows up as a large spike at zero rather than a smooth bell curve.

The interior case is a useful control experiment. Once $\beta_0$ is away from the boundary, the projection almost never matters for large $n$, and the scaled constrained estimator behaves like the usual unconstrained normal approximation.
