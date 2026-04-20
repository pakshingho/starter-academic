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

#### How to understand convergence in probability

The most useful intuition is that convergence in probability is about repeated samples, not about one single sample path being smooth. Fix a tolerance band around the target value $x$, say

<div>$$[x-\delta,\;x+\delta].$$</div>

Then ask: if we repeated the experiment many times at the same sample size $n$, what fraction of those repetitions would land outside that band? Convergence in probability says that, for every fixed $\delta>0$, that fraction goes to zero as $n$ grows.

So the right mental picture is:

1. Fix a band width $\delta$ around the limit.
2. For each $n$, simulate many independent repetitions of $x_n$.
3. Count how often $|x_n-x|>\delta$.
4. If those frequencies shrink toward zero, we are seeing convergence in probability numerically.

#### Numerical simulation tour

##### Tour 1: the rare-jump example

Take the same example as above with $\theta=2$ and $\delta=0.5$:

<div>$$X_n =
\begin{cases}
2, & \text{with probability } 1-\frac{1}{n},\\
3, & \text{with probability } \frac{1}{n}.
\end{cases}$$</div>

In 50,000 Monte Carlo repetitions, the simulated probability of falling outside the band $[1.5,2.5]$ behaves as follows:

<table>
  <thead>
    <tr>
      <th>n</th>
      <th>simulated Pr(|X_n - 2| &gt; 0.5)</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>10</td><td>0.0981</td></tr>
    <tr><td>20</td><td>0.0499</td></tr>
    <tr><td>50</td><td>0.0194</td></tr>
    <tr><td>100</td><td>0.0093</td></tr>
    <tr><td>500</td><td>0.0020</td></tr>
    <tr><td>1000</td><td>0.0011</td></tr>
  </tbody>
</table>

This is exactly what the definition predicts: misses still happen, but they become rarer and rarer as $n$ increases.

##### Tour 2: sample averages

Now take a more econometric example. Let

<div>$$\bar U_n = \frac{1}{n}\sum_{i=1}^n U_i,\qquad U_i \stackrel{iid}{\sim} N(0,1).$$</div>

Then $\bar U_n \xrightarrow{P} 0$. To see this numerically, fix $\delta=0.1$ and simulate 50,000 sample averages for each $n$:

<table>
  <thead>
    <tr>
      <th>n</th>
      <th>simulated Pr(|Ubar_n| &gt; 0.1)</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>10</td><td>0.7512</td></tr>
    <tr><td>20</td><td>0.6534</td></tr>
    <tr><td>50</td><td>0.4780</td></tr>
    <tr><td>100</td><td>0.3164</td></tr>
    <tr><td>250</td><td>0.1116</td></tr>
    <tr><td>500</td><td>0.0259</td></tr>
  </tbody>
</table>

At small sample sizes, the average is still noisy, so missing the band is common. But as the sample size grows, the average concentrates near $0$, and the fraction of large deviations falls sharply.

##### Reproducible Python sketch

The following code reproduces the same idea:

```python
import numpy as np

rng = np.random.default_rng(20260419)
reps = 50_000

# Tour 1: rare-jump example
theta = 2.0
delta = 0.5
for n in [10, 20, 50, 100, 500, 1000]:
    x = np.where(rng.random(reps) < 1 / n, theta + 1, theta)
    print(n, np.mean(np.abs(x - theta) > delta))

# Tour 2: sample mean example
delta = 0.1
for n in [10, 20, 50, 100, 250, 500]:
    u = rng.normal(0, 1, size=(reps, n))
    ubar = u.mean(axis=1)
    print(n, np.mean(np.abs(ubar) > delta))
```

<div class="probability-tool" id="probability-tool">
  <div class="probability-tool__grid">
    <section class="probability-tool__panel">
      <p class="probability-tool__eyebrow">Interactive Monte Carlo</p>
      <h3>Convergence in probability simulator</h3>
      <p id="probability-tool-example-copy">Pick an example, choose a tolerance band, and rerun the simulation. The chart tracks how often the statistic falls outside the band as the sample size grows.</p>
      <div class="probability-tool__field">
        <label for="probability-tool-example">Example</label>
        <select id="probability-tool-example">
          <option value="rare-jump" selected>Rare jump to theta + 1</option>
          <option value="sample-mean">Sample mean of iid N(0,1)</option>
        </select>
        <p>The first matches the note's toy example. The second is the law of large numbers in simulation form.</p>
      </div>
      <div class="probability-tool__field">
        <label for="probability-tool-delta">Tolerance delta</label>
        <input id="probability-tool-delta" type="number" min="0.01" step="0.01" value="0.50">
        <p>The simulator estimates <code>Pr(|x_n - x| &gt; delta)</code> for each sample size <code>n</code>.</p>
      </div>
      <div class="probability-tool__field">
        <label for="probability-tool-reps">Monte Carlo repetitions</label>
        <input id="probability-tool-reps" type="number" min="500" max="20000" step="500" value="5000">
        <p>More repetitions smooth the simulated curve but take slightly longer to run.</p>
      </div>
      <div class="probability-tool__field">
        <label for="probability-tool-snapshot">Snapshot sample size</label>
        <select id="probability-tool-snapshot"></select>
        <p>This controls the dot plot on the right, which shows one Monte Carlo cross-section of simulated outcomes at a fixed <code>n</code>.</p>
      </div>
      <div class="probability-tool__actions">
        <button type="button" class="probability-tool__button" id="probability-tool-run">Run simulation</button>
        <button type="button" class="probability-tool__button probability-tool__button--ghost" id="probability-tool-reset">Reset preset</button>
      </div>
    </section>
    <section class="probability-tool__panel probability-tool__panel--results">
      <p class="probability-tool__eyebrow">Current Run</p>
      <h3>What the simulation is showing</h3>
      <div class="probability-tool__metrics">
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Target limit</span>
          <strong id="probability-tool-metric-target">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Tolerance band</span>
          <strong id="probability-tool-metric-band">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Miss probability at smallest n</span>
          <strong id="probability-tool-metric-small">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Miss probability at largest n</span>
          <strong id="probability-tool-metric-large">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Inside-band share at snapshot n</span>
          <strong id="probability-tool-metric-inside">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Theoretical miss probability at largest n</span>
          <strong id="probability-tool-metric-theory">-</strong>
        </div>
      </div>
      <div class="probability-tool__notes" id="probability-tool-notes"></div>
      <div class="probability-tool__error" id="probability-tool-error" hidden></div>
    </section>
  </div>
  <section class="probability-tool__panel probability-tool__panel--charts">
    <div class="probability-tool__charts">
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Miss probability versus sample size</h3>
          <p>The teal line is simulated. The dashed line is the exact probability when it is available in closed form.</p>
        </div>
        <div id="probability-tool-tail-chart"></div>
      </article>
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Snapshot of simulated draws at one n</h3>
          <p>The shaded band is <code>[x - delta, x + delta]</code>. Blue points land inside the band; orange points miss it.</p>
        </div>
        <div id="probability-tool-snapshot-chart"></div>
      </article>
    </div>
    <div class="probability-tool__table-wrap">
      <table class="probability-tool__table">
        <thead>
          <tr>
            <th>Sample size n</th>
            <th>Simulated Pr(|x_n - x| &gt; delta)</th>
            <th>Theoretical Pr(|x_n - x| &gt; delta)</th>
          </tr>
        </thead>
        <tbody id="probability-tool-table-body"></tbody>
      </table>
    </div>
  </section>
</div>

The key lesson from both tours is the same: convergence in probability does not mean that every realization is close to the limit, nor that the sequence moves monotonically toward it. It means that the probability of being noticeably far away becomes negligible as $n$ increases.

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

#### How to understand almost sure convergence

Almost sure convergence is stronger than convergence in probability because it is about whole sample paths. The right question is not just whether

<div>$$\Pr\{|x_n-x|>\delta\}$$</div>

gets small for a fixed $n$. Instead, the definition asks whether the probability of ever leaving the band again after time $n$ goes to zero:

<div>$$\Pr\{|x_m-x|>\delta \text{ for some } m\ge n\} \to 0.$$</div>

So the mental picture is:

1. Fix a tolerance band around the limit.
2. Look at one realized path of the sequence.
3. Ask whether that path eventually stays inside the band forever.
4. Almost sure convergence means that this eventual staying-inside happens for almost every path.

This is why almost sure convergence is often called a pathwise notion of convergence.

#### Numerical simulation tour

The most helpful numerical comparison is between:

1. a sequence with jump probability $1/n^2$, where the jumps are rare enough that they occur only finitely many times almost surely
2. a sequence with jump probability $1/n$, where the jumps still become rare at each fixed $n$, but they keep reappearing infinitely often along typical paths

Both sequences can have small one-period miss probabilities for large $n$, but only the first one has the tail-event probability going to zero.

<div class="probability-tool" id="almost-sure-tool">
  <div class="probability-tool__grid">
    <section class="probability-tool__panel">
      <p class="probability-tool__eyebrow">Interactive Monte Carlo</p>
      <h3>Almost sure convergence simulator</h3>
      <p id="almost-sure-tool-example-copy">This tool focuses on the tail event in the definition: after time n, does the path ever leave the band again?</p>
      <div class="probability-tool__field">
        <label for="almost-sure-tool-example">Example</label>
        <select id="almost-sure-tool-example">
          <option value="summable" selected>Jump probability 1 / n^2</option>
          <option value="nonsummable">Jump probability 1 / n</option>
        </select>
        <p>The first example converges almost surely. The second converges in probability but not almost surely.</p>
      </div>
      <div class="probability-tool__field">
        <label for="almost-sure-tool-delta">Tolerance delta</label>
        <input id="almost-sure-tool-delta" type="number" min="0.01" step="0.01" value="0.50">
        <p>The tool studies whether future values ever leave the band <code>[x - delta, x + delta]</code>.</p>
      </div>
      <div class="probability-tool__field">
        <label for="almost-sure-tool-horizon">Finite horizon N</label>
        <input id="almost-sure-tool-horizon" type="number" min="100" max="5000" step="100" value="1000">
        <p>The Monte Carlo approximation tracks the tail event from <code>n</code> up to <code>N</code>. Larger horizons make the pathwise contrast sharper.</p>
      </div>
      <div class="probability-tool__field">
        <label for="almost-sure-tool-paths">Displayed sample paths</label>
        <input id="almost-sure-tool-paths" type="number" min="8" max="36" step="2" value="20">
        <p>The heatmap below shows the first few simulated paths and where their jumps occur. Using 20 paths makes the row-by-row comparison especially easy to read.</p>
      </div>
      <div class="probability-tool__actions">
        <button type="button" class="probability-tool__button" id="almost-sure-tool-run">Run simulation</button>
        <button type="button" class="probability-tool__button probability-tool__button--ghost" id="almost-sure-tool-reset">Reset preset</button>
      </div>
    </section>
    <section class="probability-tool__panel probability-tool__panel--results">
      <p class="probability-tool__eyebrow">Current Run</p>
      <h3>What the tail event says</h3>
      <div class="probability-tool__metrics">
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Target limit</span>
          <strong id="almost-sure-tool-metric-target">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Tolerance band</span>
          <strong id="almost-sure-tool-metric-band">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Tail-event probability at n = 20</span>
          <strong id="almost-sure-tool-metric-20">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Tail-event probability at n = 100</span>
          <strong id="almost-sure-tool-metric-100">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Exact finite-horizon theory at n = 100</span>
          <strong id="almost-sure-tool-metric-theory">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Interpretation</span>
          <strong id="almost-sure-tool-metric-mode">-</strong>
        </div>
      </div>
      <div class="probability-tool__notes" id="almost-sure-tool-notes"></div>
      <div class="probability-tool__error" id="almost-sure-tool-error" hidden></div>
    </section>
  </div>
  <section class="probability-tool__panel probability-tool__panel--charts">
    <div class="probability-tool__charts">
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Tail-event probability from n to N</h3>
          <p>This is the finite-horizon analogue of the definition: the probability that the path will leave the band again at some future time.</p>
        </div>
        <div id="almost-sure-tool-tail-chart"></div>
      </article>
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Jump heatmap across sample paths</h3>
          <p>Each row is one simulated path. Orange cells mark jumps that leave the band; pale cells stay inside it.</p>
        </div>
        <div id="almost-sure-tool-path-chart"></div>
      </article>
    </div>
    <div class="probability-tool__table-wrap">
      <table class="probability-tool__table">
        <thead>
          <tr>
            <th>Cutoff n</th>
            <th>Simulated tail probability</th>
            <th>Exact finite-horizon probability</th>
          </tr>
        </thead>
        <tbody id="almost-sure-tool-table-body"></tbody>
      </table>
    </div>
  </section>
</div>

#### How to read the same 20 sample paths

To see the difference between convergence in probability and almost sure convergence, set the simulator to the same choices in both examples:

1. set `Displayed sample paths = 20`
2. keep the same `delta`
3. keep the same horizon `N`
4. switch only the jump probability from `1/n^2` to `1/n`

Then read the two charts in two different directions.

##### Read columns for convergence in probability

Pick one column, say the column for time $n=100$. Looking down that column asks:

<div>$$\Pr\{|X_{100}-0|>\delta\}.$$</div>

If only a small fraction of rows are orange in that column, then the sequence is close to the limit with high probability at that particular time. This is the convergence-in-probability question: at one large date, how many paths are far away?

Both `1/n^2` and `1/n` look good from this column viewpoint, because the chance of a jump at any fixed large $n$ is small in both examples.

##### Read rows for almost sure convergence

Now pick one row and scan to the right. This asks:

<div>$$\text{Does this one path eventually stop leaving the band?}$$</div>

This is the almost-sure question. We are no longer looking at one date across many paths. We are looking at one path across many future dates.

With jump probability `1/n^2`, most rows eventually become entirely pale after some point. That means each path has a last jump, so after that last jump it stays inside the band forever.

With jump probability `1/n`, orange cells keep reappearing farther to the right on many rows. Even though each single future column has only a small orange share, there are so many future chances to jump that a typical path does not settle down forever.

##### The picture to keep in mind

The simplest memory aid is:

1. convergence in probability reads the picture column by column
2. almost sure convergence reads the picture row by row

So:

1. “large $n$ columns are mostly pale” suggests convergence in probability
2. “most rows are eventually all pale from some point onward” suggests almost sure convergence

That is why `1/n` can converge in probability without converging almost surely: every large column looks mostly fine, but many rows still contain infinitely many orange returns.

### Uniform convergence in probability and complete convergence

Up to this point the sequence has not been indexed by an additional parameter. If instead $x_n(\theta)$ is indexed by $\theta \in \Theta$, then the note defines uniform convergence in probability by

<div>$$\lim_{n\to\infty}\Pr\left\{\sup_{\theta\in\Theta}|x_n(\theta)-x(\theta)|<\varepsilon\right\}=1.$$</div>

An even stronger notion is complete convergence. We say that

<div>$$x_n \xrightarrow{c} x$$</div>

if for every $\delta>0$,

<div>$$\sum_{n=0}^{\infty}\Pr\{|x_n-x|>\delta\}<\infty.$$</div>

#### How to understand uniform convergence in probability

For ordinary convergence in probability, we fix one parameter value $\theta$ and ask whether $x_n(\theta)$ is close to $x(\theta)$ with high probability. Uniform convergence in probability is stronger because it asks for the whole graph to be close at once.

The key random quantity is

<div>$$\sup_{\theta\in\Theta}|x_n(\theta)-x(\theta)|.$$</div>

So the right mental picture is not one point on the graph, but the largest vertical gap between the random curve $x_n(\theta)$ and the target curve $x(\theta)$ over all $\theta\in\Theta$.

#### Numerical simulation tour: uniform convergence in probability

The two examples below show the main contrast:

1. a shrinking common shock, where the entire graph moves together and the sup distance really goes to zero
2. a moving spike, where each fixed $\theta$ looks fine, but somewhere on the graph there is always a large spike, so the sup distance never shrinks

<div class="probability-tool" id="uniform-probability-tool">
  <div class="probability-tool__grid">
    <section class="probability-tool__panel">
      <p class="probability-tool__eyebrow">Interactive Monte Carlo</p>
      <h3>Uniform convergence simulator</h3>
      <p id="uniform-probability-tool-example-copy">This tool tracks the probability that the entire random graph leaves a uniform band around the target function.</p>
      <div class="probability-tool__field">
        <label for="uniform-probability-tool-example">Example</label>
        <select id="uniform-probability-tool-example">
          <option value="common-shock" selected>Shrinking common shock</option>
          <option value="moving-spike">Moving spike</option>
        </select>
        <p>The first example converges uniformly in probability. The second converges pointwise in probability but not uniformly.</p>
      </div>
      <div class="probability-tool__field">
        <label for="uniform-probability-tool-delta">Tolerance delta</label>
        <input id="uniform-probability-tool-delta" type="number" min="0.05" step="0.05" value="0.30">
        <p>The simulator estimates <code>Pr(sup_theta |x_n(theta) - x(theta)| &gt; delta)</code>.</p>
      </div>
      <div class="probability-tool__field">
        <label for="uniform-probability-tool-reps">Monte Carlo repetitions</label>
        <input id="uniform-probability-tool-reps" type="number" min="500" max="12000" step="500" value="3000">
        <p>More repetitions make the probability curve smoother.</p>
      </div>
      <div class="probability-tool__field">
        <label for="uniform-probability-tool-snapshot">Snapshot sample size</label>
        <select id="uniform-probability-tool-snapshot"></select>
        <p>The function chart on the right uses this sample size when drawing example curves over <code>theta in [0,1]</code>.</p>
      </div>
      <div class="probability-tool__actions">
        <button type="button" class="probability-tool__button" id="uniform-probability-tool-run">Run simulation</button>
        <button type="button" class="probability-tool__button probability-tool__button--ghost" id="uniform-probability-tool-reset">Reset preset</button>
      </div>
    </section>
    <section class="probability-tool__panel probability-tool__panel--results">
      <p class="probability-tool__eyebrow">Current Run</p>
      <h3>What the sup error says</h3>
      <div class="probability-tool__metrics">
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Target function</span>
          <strong id="uniform-probability-tool-metric-target">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Uniform band</span>
          <strong id="uniform-probability-tool-metric-band">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Uniform miss probability at smallest n</span>
          <strong id="uniform-probability-tool-metric-small">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Uniform miss probability at largest n</span>
          <strong id="uniform-probability-tool-metric-large">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Exact theory at largest n</span>
          <strong id="uniform-probability-tool-metric-theory">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Interpretation</span>
          <strong id="uniform-probability-tool-metric-mode">-</strong>
        </div>
      </div>
      <div class="probability-tool__notes" id="uniform-probability-tool-notes"></div>
      <div class="probability-tool__error" id="uniform-probability-tool-error" hidden></div>
    </section>
  </div>
  <section class="probability-tool__panel probability-tool__panel--charts">
    <div class="probability-tool__charts">
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Uniform miss probability versus n</h3>
          <p>The curve tracks the event that the entire graph leaves the band somewhere over <code>theta in [0,1]</code>.</p>
        </div>
        <div id="uniform-probability-tool-tail-chart"></div>
      </article>
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Function draws at one sample size</h3>
          <p>The dark line is the target <code>x(theta)=theta</code>. The shaded strip is the uniform band, and the colored curves are simulated realizations.</p>
        </div>
        <div id="uniform-probability-tool-function-chart"></div>
      </article>
    </div>
    <div class="probability-tool__table-wrap">
      <table class="probability-tool__table">
        <thead>
          <tr>
            <th>Sample size n</th>
            <th>Simulated uniform miss probability</th>
            <th>Exact uniform miss probability</th>
          </tr>
        </thead>
        <tbody id="uniform-probability-tool-table-body"></tbody>
      </table>
    </div>
  </section>
</div>

#### How to understand complete convergence

Complete convergence asks for more than the individual probabilities

<div>$$\Pr\{|x_n-x|>\delta\}$$</div>

to go to zero. It asks whether they are summable over time. So the right question is:

<div>$$\sum_{n=1}^{\infty}\Pr\{|x_n-x|>\delta\} < \infty?$$</div>

If the total probability budget is finite, then large deviations are so rare across the whole sequence that they can only matter finitely often. This is why complete convergence implies almost sure convergence.

#### Numerical simulation tour: complete convergence

The family below keeps the jump size fixed at `1` but changes the jump probability to `1 / n^p`. For every `p > 0`, the one-period miss probability goes to zero, so we still have convergence in probability. But complete convergence happens only when `p > 1`, because only then does

<div>$$\sum_{n=1}^{\infty}\frac{1}{n^p}$$</div>

converge.

<div class="probability-tool" id="complete-convergence-tool">
  <div class="probability-tool__grid">
    <section class="probability-tool__panel">
      <p class="probability-tool__eyebrow">Interactive Monte Carlo</p>
      <h3>Complete convergence simulator</h3>
      <p id="complete-convergence-tool-example-copy">This tool tracks both the miss probability at each n and the cumulative partial sums that define complete convergence.</p>
      <div class="probability-tool__field">
        <label for="complete-convergence-tool-exponent">Exponent p</label>
        <input id="complete-convergence-tool-exponent" type="number" min="0.20" max="3.00" step="0.10" value="1.20">
        <p>The threshold is at <code>p = 1</code>: above it the probability series converges, at or below it the series diverges.</p>
      </div>
      <div class="probability-tool__field">
        <label for="complete-convergence-tool-delta">Tolerance delta</label>
        <input id="complete-convergence-tool-delta" type="number" min="0.05" max="1.50" step="0.05" value="0.50">
        <p>The jump size is <code>1</code>, so choosing <code>delta &lt; 1</code> makes the complete-convergence threshold visible.</p>
      </div>
      <div class="probability-tool__field">
        <label for="complete-convergence-tool-horizon">Partial-sum horizon N</label>
        <input id="complete-convergence-tool-horizon" type="number" min="100" max="1500" step="100" value="600">
        <p>The cumulative chart computes <code>sum_{n=1}^N Pr(|X_n| &gt; delta)</code> up to this horizon.</p>
      </div>
      <div class="probability-tool__field">
        <label for="complete-convergence-tool-reps">Monte Carlo repetitions</label>
        <input id="complete-convergence-tool-reps" type="number" min="500" max="4000" step="500" value="2500">
        <p>Simulation is used to estimate the probabilities alongside the exact `1 / n^p` benchmark.</p>
      </div>
      <div class="probability-tool__actions">
        <button type="button" class="probability-tool__button" id="complete-convergence-tool-run">Run simulation</button>
        <button type="button" class="probability-tool__button probability-tool__button--ghost" id="complete-convergence-tool-reset">Reset preset</button>
      </div>
    </section>
    <section class="probability-tool__panel probability-tool__panel--results">
      <p class="probability-tool__eyebrow">Current Run</p>
      <h3>What the series says</h3>
      <div class="probability-tool__metrics">
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Target limit</span>
          <strong id="complete-convergence-tool-metric-target">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Exponent p</span>
          <strong id="complete-convergence-tool-metric-exponent">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Miss probability at n = 20</span>
          <strong id="complete-convergence-tool-metric-20">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Miss probability at largest n</span>
          <strong id="complete-convergence-tool-metric-large">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Exact partial sum up to N</span>
          <strong id="complete-convergence-tool-metric-sum">-</strong>
        </div>
        <div class="probability-tool__metric">
          <span class="probability-tool__metric-label">Interpretation</span>
          <strong id="complete-convergence-tool-metric-mode">-</strong>
        </div>
      </div>
      <div class="probability-tool__notes" id="complete-convergence-tool-notes"></div>
      <div class="probability-tool__error" id="complete-convergence-tool-error" hidden></div>
    </section>
  </div>
  <section class="probability-tool__panel probability-tool__panel--charts">
    <div class="probability-tool__charts">
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Miss probability versus n</h3>
          <p>This is the one-period deviation probability <code>Pr(|X_n - 0| &gt; delta)</code>.</p>
        </div>
        <div id="complete-convergence-tool-prob-chart"></div>
      </article>
      <article class="probability-tool__chart-card">
        <div class="probability-tool__chart-head">
          <h3>Cumulative partial sums</h3>
          <p>This chart accumulates the probabilities over time. Complete convergence means the exact curve levels off instead of drifting upward forever.</p>
        </div>
        <div id="complete-convergence-tool-sum-chart"></div>
      </article>
    </div>
    <div class="probability-tool__table-wrap">
      <table class="probability-tool__table">
        <thead>
          <tr>
            <th>Sample size n</th>
            <th>Simulated miss probability</th>
            <th>Exact miss probability</th>
            <th>Exact cumulative sum</th>
          </tr>
        </thead>
        <tbody id="complete-convergence-tool-table-body"></tbody>
      </table>
    </div>
  </section>
</div>

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
