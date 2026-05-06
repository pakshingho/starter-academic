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

### 2.1.1 Convergence in r-th mean

The note next introduces a stronger mode of convergence based on moments. The basic tool is the indicator function

<div>$$I(x \in A)=
\begin{cases}
1, & \text{if } x \in A,\\
0, & \text{if } x \notin A.
\end{cases}$$</div>

For any event $A$, its expectation is just the probability of that event:

<div>$$E\{I(x \in A)\}=\Pr\{x \in A\}.$$</div>

This observation leads directly to Markov's inequality. For any $r>0$,

<div>$$\Pr\{\lvert x\rvert>\delta\}\le \frac{E\{\lvert x\rvert^r\}}{\delta^r}, \qquad \delta>0,$$</div>

provided $E|x|^r<\infty$.

When $r=2$, this becomes the familiar Chebyshev inequality.

#### Definition

Assume that $E|x_n|^r<\infty$ and $E|x|^r<\infty$. We say that $x_n$ converges to $x$ in $r$-th mean, written

<div>$$x_n \xrightarrow{L^r} x,$$</div>

if

<div>$$\lim_{n\to\infty} E\{\lvert x_n-x\rvert^r\}=0.$$</div>

When $r=2$, this is called mean-square convergence.

#### Relation to convergence in probability

For any $r>0$,

<div>$$x_n \xrightarrow{L^r} x \implies x_n \xrightarrow{P} x.$$</div>

Indeed, by Markov's inequality,

<div>$$\Pr\{\lvert x_n-x\rvert>\delta\}\le \delta^{-r}E\{\lvert x_n-x\rvert^r\}.$$</div>

So if the $r$-th moments of the errors go to zero, then the probabilities of large deviations must also go to zero.

#### Higher-order mean convergence implies lower-order mean convergence

Let $s>r>0$. Then

<div>$$x_n \xrightarrow{L^s} x \implies x_n \xrightarrow{L^r} x.$$</div>

The note proves this with Jensen's inequality. Using the convex function $g(v)=v^{s/r}$, we obtain

<div>$$(E\{\lvert x_n-x\rvert^r\})^{s/r}\le E\{(\lvert x_n-x\rvert^r)^{s/r}\}=E\{\lvert x_n-x\rvert^s\}.$$</div>

Hence if the right-hand side goes to zero, then $E|x_n-x|^r$ must also go to zero.

#### Consistency in r-th mean

An estimator $\hat\theta_n$ is $r$-th mean consistent for $\theta$ if

<div>$$E_\theta\{\lvert \hat\theta_n-\theta\rvert^r\}\to 0 \qquad \text{for all } \theta.$$</div>

The note records the following useful implication for $r\ge 1$:

<div>$$\text{$r$-th mean consistency} \implies \text{asymptotic unbiasedness}.$$</div>

The argument is short:

<div>$$\lvert E_\theta(\hat\theta_n)-\theta\rvert \le E_\theta\{\lvert \hat\theta_n-\theta\rvert\}\le \bigl(E_\theta\{\lvert \hat\theta_n-\theta\rvert^r\}\bigr)^{1/r}\to 0.$$</div>

So moment convergence is strong enough to force the bias to vanish asymptotically.

#### Remark

If

<div>$$x_n \xrightarrow{L^r} c,$$</div>

and $g$ is continuous, then

<div>$$g(x_n)\xrightarrow{P}g(c).$$</div>

But this does not imply

<div>$$g(x_n)\xrightarrow{L^r}g(c).$$</div>

The reason is that $E|g(x_n)|^r$ may fail to exist or may fail to stay under control even when $x_n$ itself converges in $r$-th mean.

### 2.1.2 Conditions for convergence in r-th mean

Many statistics used in econometrics can be written as functions of sample averages. The random variables being averaged do not have to be iid. The next result gives a useful condition for checking convergence in second mean.

#### A second-mean condition for averages

Let $\lbrace x_i:i\ge 1\rbrace$ be a sequence of $m\times 1$ random vectors such that

<div>$$E(x_i)=\mu_i,$$</div>

and

<div>$$\operatorname{Cov}(x_i,x_j)
=E\{(x_i-\mu_i)(x_j-\mu_j)^\prime\}
=R_{ij}.$$</div>

Define

<div>$$\bar x-\bar\mu
\equiv
\frac{1}{n}\sum_{i=1}^n (x_i-\mu_i).$$</div>

Then

<div>$$\bar x-\bar\mu \xrightarrow{L^2}0
\quad\Longleftrightarrow\quad
\frac{1}{n^2}\sum_{i,j=1}^n \operatorname{tr}(R_{ij})\to 0.$$</div>

The proof is a direct second-moment calculation:

<div>$$E\{\|\bar x-\bar\mu\|^2\}
=E\{\operatorname{tr}[(\bar x-\bar\mu)(\bar x-\bar\mu)^\prime]\}.$$</div>

Using the definition of $\bar x-\bar\mu$,

<div>$$E\{\|\bar x-\bar\mu\|^2\}
=\operatorname{tr}\left[
\frac{1}{n^2}\sum_{i,j=1}^n
E\{(x_i-\mu_i)(x_j-\mu_j)^\prime\}
\right]
=\frac{1}{n^2}\sum_{i,j=1}^n\operatorname{tr}(R_{ij}).$$</div>

Thus the average converges to zero in second mean exactly when this average covariance trace goes to zero.

#### Example: Chebyshev's weak law

Suppose $x_i$ is scalar, $E x_i=\mu_i=0$, and

<div>$$R_{ij}=\sigma_i^2 I(i=j).$$</div>

Then the second-mean condition becomes

<div>$$\frac{1}{n^2}\sum_{i=1}^n \sigma_i^2\to 0.$$</div>

Hence

<div>$$\frac{1}{n}\sum_{i=1}^n x_i \xrightarrow{L^2}0
\quad\Longrightarrow\quad
\frac{1}{n}\sum_{i=1}^n x_i \xrightarrow{P}0.$$</div>

This holds under homoskedasticity, where $\sigma_i^2=\sigma^2$ for all $i$. It also holds if $\sigma_i^2=\sigma^2 i^\alpha$ with $\alpha<1$. It fails, however, if the variance grows linearly, for example $\sigma_i^2=\sigma^2 i$.

#### Linear processes

Let $\lbrace e_i\rbrace$ be a sequence of $m\times 1$ random vectors satisfying

<div>$$E(e_i)=0,\qquad E(e_i e_j^\prime)=S I(i=j),\qquad S>0.$$</div>

Let $\lbrace A_j\rbrace$ be a sequence of $m\times m$ nonrandom matrices such that

<div>$$\sum_{j=0}^{\infty}\|A_j\|<\infty.$$</div>

If

<div>$$v_i=\sum_{j=0}^{\infty}A_j e_{i-j},$$</div>

then $v_i$ is called a linear process.

Important examples include:

1. Stationary autoregressive processes of order $p$:

   <div>$$v_i=\sum_{j=1}^p C_j v_{i-j}+e_i,$$</div>

   with stationarity condition

   <div>$$\left|I_m-\sum_{j=1}^p C_j z^j\right|\neq 0
   \qquad \text{for } |z|\le 1.$$</div>

2. Moving-average processes of order $q$:

   <div>$$v_i=\sum_{j=0}^q D_j e_{i-j}.$$</div>

3. Autoregressive moving-average processes:

   <div>$$v_i=\sum_{j=1}^p C_jv_{i-j}+\sum_{j=0}^q D_j e_{i-j},$$</div>

   with the same autoregressive stationarity condition.

#### Autocovariance structure for linear processes

If $v_i$ is a linear process, then for $j\ge i$,

<div>$$E(v_i v_j^\prime)=\sum_{k=0}^{\infty}A_k S A_{k+j-i}^\prime.$$</div>

For $j<i$, the covariance follows by transposition:

<div>$$E(v_i v_j^\prime)=\sum_{k=0}^{\infty}A_{k+i-j} S A_k^\prime.$$</div>

The note also records the useful boundedness condition

<div>$$\lim_{n\to\infty}\sup
\frac{1}{n}\sum_{i,j=1}^n
\|E(v_i v_j^\prime)\|<\infty.$$</div>

The proof uses absolute summability of the coefficient matrices. For $j\ge i$,

<div>$$E(v_i v_j^\prime)
=E\left[
\left(\sum_{k=0}^{\infty}A_k e_{i-k}\right)
\left(\sum_{\ell=0}^{\infty}A_\ell e_{j-\ell}\right)^\prime
\right]
=\sum_{k=0}^{\infty}A_k S A_{k+j-i}^\prime.$$</div>

Then

<div>$$\frac{1}{n}\sum_{i,j=1}^n\|E(v_i v_j^\prime)\|
\le
2\|S\|
\left(\sum_{k=0}^{\infty}\|A_k\|\right)^2
<\infty.$$</div>

This bounded average covariance is the key input for applying the second-mean averaging theorem.

#### Example: multiple regression with nonstochastic regressors

Consider

<div>$$y_i=z_i^\prime\beta+u_i,$$</div>

where $y_i$ and $u_i$ are scalars, $z_i$ is nonstochastic, $\max_i\lVert z_i\rVert<\infty$, and $u_i$ is homoskedastic and possibly a linear process.

Set $v_i=z_i u_i$. Then

<div>$$R_{ij}=z_i z_j^\prime E(u_i u_j).$$</div>

Thus

<div>$$\begin{aligned}
\frac{1}{n^2}\sum_{i,j=1}^n\operatorname{tr}(R_{ij})
&\le
\frac{1}{n^2}\sum_{i,j=1}^n
|\operatorname{tr}(z_i z_j^\prime)|\,|E(u_i u_j)|\\
&=
\frac{1}{n^2}\sum_{i,j=1}^n
|z_j^\prime z_i|\,|E(u_i u_j)|\\
&\le
\frac{1}{n}\max_i\|z_i\|^2
\cdot
\frac{1}{n}\sum_{i,j=1}^n |E(u_i u_j)|
\to 0.
\end{aligned}$$</div>

The final convergence follows from the boundedness of the regressors and the covariance bound for linear processes. Hence

<div>$$\frac{1}{n}\sum_{i=1}^n z_i u_i \xrightarrow{L^2}0.$$</div>

If

<div>$$\widehat M=\frac{1}{n}Z^\prime Z \to M>0,$$</div>

then the least-squares estimator satisfies

<div>$$\hat\beta_n-\beta
=\widehat M^{-1}\frac{1}{n}\sum_{i=1}^n z_i u_i
\xrightarrow{L^2}0.$$</div>

#### Example: multiple regression with stochastic regressors

Now suppose

<div>$$y_i=\beta^\prime z_i+u_i,$$</div>

where $z_i$ is stochastic and

<div>$$\widehat M=\frac{1}{n}\sum_{i=1}^n z_i z_i^\prime \xrightarrow{P} M
=E(z_i z_i^\prime)>0.$$</div>

The disturbances need not be independent of the regressors, but assume the conditional moment restrictions

<div>$$E(u_i\mid z_i)=0,$$</div>

and

<div>$$E(u_i u_j\mid z_i,z_j)=\sigma^2 I(i=j).$$</div>

Again set $v_i=z_i u_i$. Then

<div>$$R_{ij}
=E(z_i z_j^\prime u_i u_j)
=E\{z_i z_j^\prime E(u_i u_j\mid z_i,z_j)\}
=\sigma^2 E(z_i z_j^\prime) I(i=j).$$</div>

Therefore

<div>$$\frac{1}{n^2}\sum_{i,j=1}^n\operatorname{tr}(R_{ij})
=
\frac{\sigma^2}{n^2}\sum_{i=1}^n\operatorname{tr}\{E(z_i z_i^\prime)\}
=
\frac{\sigma^2}{n}\operatorname{tr}(M)
\to 0.$$</div>

By the second-mean averaging theorem,

<div>$$\frac{1}{n}\sum_{i=1}^n z_i u_i \xrightarrow{L^2}0,$$</div>

and hence this average also converges to zero in probability. Since $\widehat M^{-1}\xrightarrow{P}M^{-1}$,

<div>$$\hat\beta_n-\beta
=\widehat M^{-1}\frac{1}{n}\sum_{i=1}^n z_i u_i
\xrightarrow{P}0.$$</div>

The conditional moment restrictions are automatically satisfied if the sequences $\lbrace u_i\rbrace$ and $\lbrace z_i\rbrace$ are mutually independent. The condition $\widehat M\xrightarrow{P}M$ is also satisfied, for example, if $z_i z_i^\prime$ is uncorrelated with common finite second moments; a sufficient iid condition is $E|z_i|^4<\infty$.

The note emphasizes that these assumptions can be written as conditional moments:

<div>$$E(y_i\mid z_i)=\beta^\prime z_i,$$</div>

and

<div>$$\operatorname{Cov}(y_i,y_j\mid z_i,z_j)=\sigma^2 I(i=j).$$</div>

#### Uniform integrability

The second-mean arguments above are convenient, but sometimes only first moments are available. This is especially important for heavy-tailed random variables. Uniform integrability provides a useful condition for convergence in first mean.

A sequence $\lbrace x_i:i\ge 1\rbrace$ is uniformly integrable if

<div>$$\lim_{\delta\to\infty}\sup_{i\ge 1}
E\{\lvert x_i\rvert I(\lvert x_i\rvert>\delta)\}=0.$$</div>

The note lists several sufficient conditions for uniform integrability:

1. If

   <div>$$\sup_{i\ge 1}E\{\lvert x_i\rvert^{1+\eta}\}<\infty$$</div>

   for some $\eta>0$, then $\lbrace x_i\rbrace$ is uniformly integrable.

2. If $\lbrace x_i\rbrace$ is identically distributed and $E|x_i|<\infty$, then $\lbrace x_i\rbrace$ is uniformly integrable.

3. If there exists a random variable $x$ with finite first moment such that, for all $k$,

   <div>$$\sup_i\Pr\{|x_i|>k\}\le C\Pr\{|x|>k\},$$</div>

   then $\lbrace x_i\rbrace$ is uniformly integrable.

For condition 1, the proof uses

<div>$$\sup_{i\ge 1}E\{\lvert x_i\rvert I(\lvert x_i\rvert>\delta)\}
\le
\delta^{-\eta}\sup_{i\ge 1}E|x_i|^{1+\eta}
\to 0.$$</div>

For condition 2, identical distribution gives

<div>$$\sup_{i\ge 1}E\{\lvert x_i\rvert I(\lvert x_i\rvert>\delta)\}
=E\{\lvert x_1\rvert I(\lvert x_1\rvert>\delta)\}\to 0.$$</div>

For condition 3, the tail dominance bound implies

<div>$$\sup_{i\ge 1}E\{\lvert x_i\rvert I(\lvert x_i\rvert>\delta)\}
\le
C\left[
\delta\Pr\{|x|>\delta\}
+\int_{\delta}^{\infty}\Pr\{|x|>z\}\,dz
\right]\to 0.$$</div>

Uniform integrability also implies a bounded first-moment condition:

<div>$$\{x_i\}\text{ uniformly integrable}
\quad\Longrightarrow\quad
\sup_i E|x_i|<\infty.$$</div>

Indeed, for any $\varepsilon>0$, choose $\delta_0$ so that

<div>$$\sup_{i\ge 1}E\{|x_i|I(|x_i|>\delta_0)\}<\varepsilon.$$</div>

Then

<div>$$\sup_{i\ge 1}E|x_i|
\le
\sup_{i\ge 1}E\{|x_i|I(|x_i|>\delta_0)\}
+\sup_{i\ge 1}E\{|x_i|I(|x_i|\le \delta_0)\}
\le \varepsilon+\delta_0<\infty.$$</div>

The converse is false. For example, let

<div>$$x_i=
\begin{cases}
i, & \text{with probability } i^{-1},\\
0, & \text{with probability } 1-i^{-1}.
\end{cases}$$</div>

Then $E|x_i|=1$ for every $i$, so the first moments are uniformly bounded. But for every fixed $\delta>0$, some sufficiently large $i$ satisfies

<div>$$E\{|x_i|I(|x_i|>\delta)\}=1,$$</div>

so the sequence is not uniformly integrable.

#### Weak law with independent uniformly integrable variables

Let $\lbrace x_i:i\ge 1\rbrace$ be an independent, uniformly integrable sequence with $E x_i=0$ for all $i$. Then

<div>$$\bar x_n=\frac{1}{n}\sum_{i=1}^n x_i \xrightarrow{L^1}0,$$</div>

and therefore

<div>$$\bar x_n\xrightarrow{P}0.$$</div>

The proof splits each random variable into a truncated part and a tail part:

<div>$$x_i^\prime=x_iI(|x_i|\le \delta),\qquad
x_i^{\prime\prime}=x_iI(|x_i|>\delta),\qquad
x_i=x_i^\prime+x_i^{\prime\prime}.$$</div>

Uniform integrability lets us choose $\delta$ so that

<div>$$\sup_i E|x_i^{\prime\prime}|<\varepsilon.$$</div>

Since $E x_i=0$, we can write

<div>$$\frac{1}{n}\sum_{i=1}^n x_i
=
\frac{1}{n}\sum_{i=1}^n(x_i^\prime-E x_i^\prime)
+
\frac{1}{n}\sum_{i=1}^n(x_i^{\prime\prime}-E x_i^{\prime\prime}).$$</div>

The first term has second moment bounded by $2\delta^2/n$, so it converges to zero in second mean and hence in first mean. For the second term,

<div>$$E\left|
\frac{1}{n}\sum_{i=1}^n(x_i^{\prime\prime}-E x_i^{\prime\prime})
\right|
\le
\frac{2}{n}\sum_{i=1}^nE|x_i^{\prime\prime}|
\le 2\sup_iE|x_i^{\prime\prime}|
<2\varepsilon.$$</div>

Since $\varepsilon$ is arbitrary, the sample average converges to zero in first mean.

Independence can be relaxed to a martingale-difference condition,

<div>$$E(x_i\mid x_j,\;j<i)=0.$$</div>

Also, the zero-mean assumption is not essential: replace $x_i$ by $x_i-E x_i$.

#### Khinchine's weak law and related strong laws

If $\lbrace x_i:i\ge 1\rbrace$ is iid, $E|x_i|<\infty$, and $E x_i=0$, then

<div>$$\frac{1}{n}\sum_{i=1}^n x_i \xrightarrow{P}0.$$</div>

Under the same conditions, Kolmogorov's strong law gives

<div>$$\frac{1}{n}\sum_{i=1}^n x_i \xrightarrow{a.s.}0.$$</div>

If the identically distributed assumption is dropped, stronger moment conditions are needed for the strong law. One sufficient condition is that the independent sequence $\lbrace X_i\rbrace$ satisfies, for some $\delta>0$,

<div>$$\sum_{i=1}^{\infty}\frac{E|X_i|^{1+\delta}}{i^{1+\delta}}<\infty.$$</div>

Then

<div>$$\frac{1}{n}\sum_{i=1}^n (X_i-\mu_i)\xrightarrow{a.s.}0.$$</div>

A simple sufficient condition is $\sup_i E|X_i|^{1+\delta}\le C<\infty$.

#### Example: multiple regression with first moments

Consider again nonstochastic regressors $z_i$ with $\max_i\lVert z_i\rVert<\infty$ and

<div>$$\widehat M=\frac{1}{n}Z^\prime Z\to M>0.$$</div>

Let $\lbrace u_i:i\ge 1\rbrace$ be an independent uniformly integrable sequence with $E u_i=0$. For the least-squares estimator,

<div>$$E\|\hat\beta-\beta\|
=E\left\|\widehat M^{-1}\frac{1}{n}Z^\prime U\right\|
\le
\|\widehat M^{-1}\|
E\left\|\frac{1}{n}Z^\prime U\right\|,$$</div>

and $\lVert\widehat M^{-1}\rVert\to\lVert M^{-1}\rVert<\infty$.

Set $x_i=z_i u_i$. Then $\lbrace x_i\rbrace$ is independent, $E x_i=0$, and

<div>$$\|x_i\|\le \|z_i\|\,|u_i|.$$</div>

Because the regressors are uniformly bounded and $\lbrace u_i\rbrace$ is uniformly integrable,

<div>$$E\{\|x_i\|I(\|x_i\|>\delta)\}
\le
\max_i\|z_i\|
\sup_i E\left\{|u_i|I\left(|u_i|>\frac{\delta}{\max_i\|z_i\|}\right)\right\}
\to 0.$$</div>

Thus $\lbrace x_i\rbrace$ is uniformly integrable, and the weak law for independent uniformly integrable variables gives

<div>$$\frac{1}{n}Z^\prime U\xrightarrow{L^1}0.$$</div>

Therefore

<div>$$\hat\beta\xrightarrow{L^1}\beta.$$</div>

#### Generalized linear processes

Let $\lbrace e_i:-\infty<i<\infty\rbrace$ be an independent uniformly integrable sequence of $m\times 1$ random vectors, with $E e_i=0$. Let $\lbrace A_j\rbrace$ be a sequence of $m\times m$ nonrandom matrices satisfying

<div>$$\sum_{j=0}^{\infty}\|A_j\|<\infty.$$</div>

If

<div>$$v_i=\sum_{j=0}^{\infty}A_j e_{i-j},$$</div>

then $v_i$ is called a generalized linear process.

MA($q$), stationary AR($p$), and stationary ARMA($p,q$) processes are generalized linear processes when the innovations are iid with finite mean.

If $\lbrace x_i:i\ge 1\rbrace$ is a generalized linear process, then

<div>$$\frac{1}{n}\sum_{i=1}^n x_i\xrightarrow{L^1}0.$$</div>

For the proof, take the scalar case for simplicity. Fix $\varepsilon>0$ and choose $N$ so that

<div>$$\sum_{j=N+1}^{\infty}|A_j|<\varepsilon.$$</div>

Then

<div>$$\frac{1}{n}\sum_{i=1}^n x_i
=
\sum_{j=0}^N A_j\left(\frac{1}{n}\sum_{i=1}^n e_{i-j}\right)
+
\sum_{j=N+1}^{\infty}A_j\left(\frac{1}{n}\sum_{i=1}^n e_{i-j}\right).$$</div>

By the weak law for independent uniformly integrable variables,

<div>$$\frac{1}{n}\sum_{i=1}^n e_{i-j}\xrightarrow{L^1}0$$</div>

for each fixed $j$. The finite part therefore becomes arbitrarily small for large $n$. The infinite tail is controlled by absolute summability:

<div>$$\sum_{j=N+1}^{\infty}|A_j|
E\left|\frac{1}{n}\sum_{i=1}^n e_{i-j}\right|
\le
\sup_i E|e_i|\sum_{j=N+1}^{\infty}|A_j|.$$</div>

Since $\sup_iE|e_i|<\infty$ under uniform integrability, the tail can be made arbitrarily small.

### 2.1.3 Conditions for consistency in regression

Consider the linear regression model

<div>$$y_i=z_i^\prime\beta+u_i,\qquad i=1,\dots,n,$$</div>

where $z_i$ is nonstochastic and

<div>$$E(u_i)=0,\qquad E(u_i^2)=\sigma^2,\qquad E(u_i u_j)=0\quad \text{for }i\neq j.$$</div>

Let

<div>$$Q_n=Z^\prime Z=\sum_{i=1}^n z_i z_i^\prime.$$</div>

Earlier sufficient conditions often impose

<div>$$\frac{Q_n}{n}\to M,$$</div>

where $M$ is finite and nonsingular. This is convenient, but it is stronger than necessary. If the regressors trend, $Q_n/n$ may diverge even though least squares remains consistent.

For example, if $z_i=i$ in a scalar regression, then

<div>$$\frac{Q_n}{n}=\frac{1}{n}\sum_{i=1}^n i^2\to\infty.$$</div>

So we need a condition that allows the information matrix to grow at a different rate.

#### Eigenvalue condition

Let $\lambda_{\min}(Q_n)$ denote the smallest eigenvalue of $Q_n$. Under the assumptions above,

<div>$$\hat\beta_n \xrightarrow{L^2}\beta
\quad\Longleftrightarrow\quad
\lambda_{\min}(Q_n)\to\infty.$$</div>

To see this, recall that

<div>$$\hat\beta_n-\beta=(Z^\prime Z)^{-1}Z^\prime U
=Q_n^{-1}\sum_{i=1}^n z_i u_i.$$</div>

Then

<div>$$\begin{aligned}
E\{\|\hat\beta_n-\beta\|^2\}
&=\operatorname{tr}E\{(\hat\beta_n-\beta)(\hat\beta_n-\beta)^\prime\}\\
&=\operatorname{tr}E\left[
Q_n^{-1}
\left(\sum_i z_i u_i\right)
\left(\sum_i z_i u_i\right)^\prime
Q_n^{-1}
\right]\\
&=\sigma^2\operatorname{tr}(Q_n^{-1}).
\end{aligned}$$</div>

Since

<div>$$\operatorname{tr}(Q_n^{-1})
=\sum_{j=1}^k\frac{1}{\lambda_j(Q_n)},$$</div>

this trace goes to zero if and only if every eigenvalue of $Q_n$ diverges, equivalently if $\lambda_{\min}(Q_n)\to\infty$.

The note also records the simple implication

<div>$$\lambda_{\min}(Q_n)\le q_{jj,n},$$</div>

where $q_{jj,n}$ is the $j$-th diagonal element of $Q_n$. Therefore, if $\lambda_{\min}(Q_n)\to\infty$, then every diagonal element $q_{jj,n}$ must also diverge.

#### Variance route to consistency

Another way to see the same idea is through Markov's inequality. If $\eta_n$ has mean $\mu$ and variance $\sigma_n^2$, then

<div>$$\Pr\{|\eta_n-\mu|\ge \kappa\}\le \frac{\sigma_n^2}{\kappa^2}.$$</div>

Thus a sufficient second-moment route to $\eta_n\xrightarrow{P}\mu$ is

<div>$$\sigma_n^2\to 0.$$</div>

For an unbiased estimator $\hat\theta_n$ of $\theta$, this says that

<div>$$E(\hat\theta_n)=\theta,\qquad V(\hat\theta_n)\to 0$$</div>

is enough for consistency. This is only a sufficient route in general, because consistency itself does not require finite moments.

In the least-squares case,

<div>$$E(\hat\beta_n)=\beta,\qquad
V(\hat\beta_n)=\sigma^2(Z^\prime Z)^{-1}=\sigma^2Q_n^{-1}.$$</div>

So a sufficient condition for consistency is

<div>$$Q_n^{-1}\to 0.$$</div>

The standard condition $Q_n/n\to M>0$ implies this because

<div>$$Q_n^{-1}
=n^{-1}\left(\frac{Q_n}{n}\right)^{-1}
\to 0.$$</div>

But the normalization by $n$ is not essential. For example, if

<div>$$\frac{Q_n}{n^{1/2}}\to M>0,$$</div>

then

<div>$$Q_n^{-1}
=n^{-1/2}\left(\frac{Q_n}{n^{1/2}}\right)^{-1}
\to 0.$$</div>

Likewise, it is possible that

<div>$$\frac{Q_n}{n^{1+\delta}}\to M>0$$</div>

for some $\delta>0$. The common requirement behind all of these cases is that $Q_n$ grows enough in every direction.

#### Example: intercept and linear trend

Consider

<div>$$y_i=\alpha+\beta i+u_i.$$</div>

Here $z_i=(1,i)^\prime$, so

<div>$$Q_n=
\begin{pmatrix}
n & \sum_{i=1}^n i\\
\sum_{i=1}^n i & \sum_{i=1}^n i^2
\end{pmatrix}.$$</div>

The least-squares error is

<div>$$
\begin{pmatrix}
\hat\alpha-\alpha\\
\hat\beta-\beta
\end{pmatrix}
=
Q_n^{-1}
\begin{pmatrix}
\sum_{i=1}^n u_i\\
\sum_{i=1}^n i u_i
\end{pmatrix}.
$$</div>

Although $Q_n/n$ does not converge to a finite nonsingular matrix, the smallest eigenvalue of $Q_n$ still diverges. Indeed,

<div>$$\det(Q_n)
=n\sum_{i=1}^n i^2-\left(\sum_{i=1}^n i\right)^2
\asymp n^4,$$</div>

while

<div>$$\operatorname{tr}(Q_n)=n+\sum_{i=1}^n i^2\asymp n^3.$$</div>

Hence the smaller eigenvalue grows on the order of $n$, so $\lambda_{\min}(Q_n)\to\infty$. By the eigenvalue condition,

<div>$$
\begin{pmatrix}
\hat\alpha\\
\hat\beta
\end{pmatrix}
\xrightarrow{L^2}
\begin{pmatrix}
\alpha\\
\beta
\end{pmatrix}.
$$</div>

## 2.2 Stochastic order of magnitude

Stochastic order notation is a compact way to describe large-sample rates. It lets us say more than just

<div>$$x_n\xrightarrow{P}c.$$</div>

For example, instead of saying only that an estimator is consistent, we may want to say that its error is of order $n^{-1/2}$ in probability.

Let $f_n$ be a nonstochastic positive sequence.

### Deterministic order notation

If $x_n$ is nonstochastic, then:

1. $x_n=O(f_n)$ if

   <div>$$\left|\frac{x_n}{f_n}\right|\to c<\infty,$$</div>

   or more generally if $\left|x_n/f_n\right|$ is bounded for all sufficiently large $n$.

2. $x_n=o(f_n)$ if

   <div>$$\left|\frac{x_n}{f_n}\right|\to 0.$$</div>

So $O(f_n)$ means "no larger than the order of $f_n$," while $o(f_n)$ means "smaller than the order of $f_n$."

### Stochastic order notation

If $x_n$ is stochastic, then:

1. $x_n=O_p(f_n)$ if $x_n/f_n$ is bounded in probability. That is, for every $\varepsilon>0$, there exist constants $C>0$ and $n_0$ such that

   <div>$$\Pr\{|x_n|>C f_n\}<\varepsilon
   \qquad \text{for all }n\ge n_0.$$</div>

2. $x_n=o_p(f_n)$ if

   <div>$$\frac{x_n}{f_n}\xrightarrow{P}0.$$</div>

In particular,

<div>$$x_n=o_p(1)\quad\Longleftrightarrow\quad x_n\xrightarrow{P}0.$$</div>

The difference between $O_p(1)$ and $o_p(1)$ is subtle but important. For any $\varepsilon>0$:

1. $O_p(1)$ means $\Pr(|x_n|>C)<\varepsilon$ for some sufficiently large constant $C$.
2. $o_p(1)$ means $\Pr(|x_n|>c)<\varepsilon$ for every fixed $c>0$, once $n$ is large enough.

So $O_p(1)$ means the sequence does not escape to infinity in probability. By contrast, $o_p(1)$ means it collapses to zero in probability.

### Convergence in probability implies boundedness in probability

For any finite constant $c$,

<div>$$x_n\xrightarrow{P}c \quad\Longrightarrow\quad x_n=O_p(1).$$</div>

If $c=0$, this becomes

<div>$$x_n\xrightarrow{P}0 \quad\Longleftrightarrow\quad x_n=o_p(1).$$</div>

To prove the first claim, fix $\delta>0$ and choose $C=|c|+\delta$. Then

<div>$$\Pr\{|x_n|>C\}
\le
\Pr\{|x_n-c|>\delta\}\to 0.$$</div>

Hence $x_n$ is bounded in probability.

### Basic implications

The note records three useful facts.

First,

<div>$$x_n=o_p(f_n)\quad\Longrightarrow\quad x_n=O_p(f_n).$$</div>

Second, if

<div>$$x_n=O_p(f_n)
\qquad\text{and}\qquad
\frac{f_n}{g_n}\to 0,$$</div>

then

<div>$$x_n=o_p(g_n).$$</div>

The idea is that if $x_n$ is no larger than $f_n$ in probability, and $f_n$ itself is negligible relative to $g_n$, then $x_n$ must be negligible relative to $g_n$.

Third, for any $r>0$,

<div>$$x_n=O_p\left((E|x_n|^r)^{1/r}\right).$$</div>

This follows directly from Markov's inequality:

<div>$$\Pr\left\{|x_n|>C(E|x_n|^r)^{1/r}\right\}
\le
\frac{E|x_n|^r}{C^r E|x_n|^r}
=C^{-r}.$$</div>

Choosing $C$ large makes the probability arbitrarily small.

### Algebra of stochastic orders

Let $x_n=O_p(f_n)$ and $y_n=O_p(g_n)$. Then

<div>$$x_ny_n=O_p(f_ng_n),$$</div>

and

<div>$$x_n+y_n=O_p(\max\{f_n,g_n\}).$$</div>

The product result follows from

<div>$$|cd|>ef \quad\Longrightarrow\quad |c|>e\ \text{or}\ |d|>f.$$</div>

If $x_n=O_p(f_n)$ and $y_n=O_p(g_n)$, then for sufficiently large constants $C$ and $D$,

<div>$$\Pr\{|x_ny_n|>CDf_ng_n\}
\le
\Pr\{|x_n|>Cf_n\}+\Pr\{|y_n|>Dg_n\}.$$</div>

The sum result uses the triangle inequality:

<div>$$\Pr\{|x_n+y_n|>(C+D)\max(f_n,g_n)\}
\le
\Pr\{|x_n|>Cf_n\}+\Pr\{|y_n|>Dg_n\}.$$</div>

The same algebra holds with $o_p$ in place of $O_p$. In addition,

<div>$$x_n=O_p(f_n),\qquad y_n=o_p(g_n)
\quad\Longrightarrow\quad
x_ny_n=o_p(f_ng_n).$$</div>

Indeed, for any $\delta>0$, choose $C$ so that $\Pr(|x_n|>Cf_n)$ is small. Then

<div>$$\Pr\{|x_ny_n|>\delta f_ng_n\}
\le
\Pr\{|x_n|>Cf_n\}
+
\Pr\left\{|y_n|>\frac{\delta}{C}g_n\right\},$$</div>

and the second probability goes to zero because $y_n=o_p(g_n)$.

### Example: regression with stochastic regressors

Suppose

<div>$$\widehat M=\frac{1}{n}Z^\prime Z\xrightarrow{P}M>0.$$</div>

Then

<div>$$\widehat M^{-1}\xrightarrow{P}M^{-1},$$</div>

so

<div>$$\widehat M^{-1}=O_p(1).$$</div>

Now take

<div>$$v_i=z_i u_i.$$</div>

Under the conditional homoskedasticity setup used earlier,

<div>$$R_{ij}=E(z_i z_j^\prime)\sigma^2 I(i=j).$$</div>

Therefore

<div>$$\frac{1}{n^2}\sum_{i,j=1}^n\operatorname{tr}(R_{ij})
=\frac{\sigma^2}{n}\operatorname{tr}(M)
=O(n^{-1}).$$</div>

This means

<div>$$E\left\|
\frac{1}{n}\sum_{i=1}^n v_i
\right\|^2
=O(n^{-1}).$$</div>

Using the moment bound above,

<div>$$\frac{1}{n}\sum_{i=1}^n v_i
=\frac{1}{n}Z^\prime U
=O_p(n^{-1/2}).$$</div>

Since

<div>$$\hat\beta-\beta
=\widehat M^{-1}\left(\frac{1}{n}Z^\prime U\right),$$</div>

the algebra of stochastic orders gives

<div>$$\hat\beta-\beta
=O_p(1)\,O_p(n^{-1/2})
=O_p(n^{-1/2}).$$</div>

This is the usual root-$n$ rate statement for least squares under these regularity conditions.

## 2.3 Convergence in distribution

Convergence in distribution is the mode of convergence used to describe limiting distributions. It is weaker than convergence in probability, but it is exactly the right language for central limit theorems, test statistics, and confidence intervals.

For a scalar random variable $X$, write its distribution function as

<div>$$F_X(x)=\Pr(X\le x).$$</div>

For a $k\times 1$ random vector $X$, write its characteristic function as

<div>$$\phi_X(t)=E\{\exp(i t^\prime X)\},\qquad t\in\mathbb R^k.$$</div>

Here $t$ is also a $k\times 1$ vector, so $t^\prime X$ is scalar.

### Definition

We say that $X_n$ converges in distribution to $X$, written

<div>$$X_n\xrightarrow{d}X,$$</div>

if

<div>$$F_{X_n}(x)\to F_X(x)$$</div>

at every continuity point $x$ of $F_X$.

The continuity-point qualification matters. A distribution function can have jumps, as in discrete or mixed distributions, and convergence is not required at those jump points. Distribution functions have at most countably many jumps, so this still pins down the limiting distribution.

### First examples

If $x_1,\ldots,x_n$ are iid with mean $\mu$ and variance $\sigma^2$, then the classical central limit theorem says

<div>$$\frac{1}{\sqrt n}\sum_{i=1}^n\frac{x_i-\mu}{\sigma}
\xrightarrow{d}N(0,1).$$</div>

This is not saying that the standardized sum converges to a fixed number. It is saying that its entire distribution approaches the standard normal distribution.

As a second example, let $X_1,\ldots,X_n$ be iid $U[0,\theta]$, and let

<div>$$Y_n=X_{(n)}=\max_{1\le i\le n}X_i.$$</div>

For $0\le y\le\theta$,

<div>$$F_{Y_n}(y)
=\Pr(Y_n\le y)
=\Pr(X_1\le y,\ldots,X_n\le y)
=\left(\frac{y}{\theta}\right)^n.$$</div>

Thus

<div>$$F_{Y_n}(y)=
\begin{cases}
0, & y<0,\\
\left(y/\theta\right)^n, & 0\le y\le\theta,\\
1, & y>\theta.
\end{cases}$$</div>

The pointwise limit is

<div>$$F_Y(y)=I(y\ge\theta),$$</div>

the distribution function of the degenerate random variable $Y=\theta$. The limit is checked only at continuity points of $F_Y$, meaning $y\ne\theta$.

### Convergence in distribution does not control moments

It is tempting to think that

<div>$$X_n\xrightarrow{d}X$$</div>

should imply convergence of moments. That is false without additional conditions.

Let $X_n$ have distribution function

<div>$$F_n(x)=
\begin{cases}
0, & x<0,\\
1-\frac{1}{n}, & 0\le x<n,\\
1, & x\ge n.
\end{cases}$$</div>

Equivalently,

<div>$$X_n=
\begin{cases}
0, & \text{with probability }1-\frac{1}{n},\\
n, & \text{with probability }\frac{1}{n}.
\end{cases}$$</div>

Then $X_n\xrightarrow{d}0$, because the probability of the large value $n$ goes to zero. But for any integer $k\ge 1$,

<div>$$E(X_n^k)=n^k\frac{1}{n}=n^{k-1}.$$</div>

So the first moment stays equal to one, and higher moments diverge. The limiting random variable is zero, so $E(X^k)=0$. The lesson is that convergence in distribution controls the shape of the distribution at fixed continuity points, not the behavior of far tails.

If $\lbrace |X_n|^k:n\ge 1\rbrace$ is uniformly integrable and $X_n\xrightarrow{d}X$, then the missing tail control is restored and

<div>$$E|X_n|^k\to E|X|^k.$$</div>

Uniform integrability is the condition that prevents a vanishing amount of probability mass from escaping to infinity.

### Equivalent characterizations

For random vectors, convergence in distribution can be characterized through characteristic functions:

<div>$$X_n\xrightarrow{d}X
\quad\Longleftrightarrow\quad
\phi_{X_n}(t)\to\phi_X(t)\quad\text{for every }t\in\mathbb R^k.$$</div>

It can also be characterized through bounded continuous functions:

<div>$$X_n\xrightarrow{d}X
\quad\Longleftrightarrow\quad
E\{g(X_n)\}\to E\{g(X)\}$$</div>

for every bounded continuous function $g$.

This second characterization is often the most intuitive one: if all bounded continuous summaries of the random vectors have convergent expectations, then the distributions themselves converge.

### Cramer-Wold device

Let $X_n$ and $X$ be $k\times 1$ random vectors. Then

<div>$$X_n\xrightarrow{d}X
\quad\Longleftrightarrow\quad
\lambda^\prime X_n\xrightarrow{d}\lambda^\prime X
\quad\text{for every }\lambda\in\mathbb R^k.$$</div>

The scalar projection $\lambda^\prime X_n$ takes the vector $X_n$ and looks at it from one direction. The theorem says that a vector distribution is pinned down by all one-dimensional projections.

The characteristic-function proof is short. If all projections converge, then take $\lambda=t$. For any $t\in\mathbb R^k$,

<div>$$E\{\exp(i t^\prime X_n)\}
\to
E\{\exp(i t^\prime X)\}.$$</div>

Thus $\phi_{X_n}(t)\to\phi_X(t)$ for every $t$, so $X_n\xrightarrow{d}X$. Conversely, if $X_n\xrightarrow{d}X$, then

<div>$$E\{\exp(i v\lambda^\prime X_n)\}
=\phi_{X_n}(v\lambda)
\to
\phi_X(v\lambda)
=E\{\exp(i v\lambda^\prime X)\}$$</div>

for every scalar $v$, so $\lambda^\prime X_n\xrightarrow{d}\lambda^\prime X$.

### Multivariate normality through projections

Write

<div>$$X\sim N_k(\mu,\Sigma),$$</div>

where $X$ and $\mu$ are $k\times 1$ vectors and $\Sigma$ is a positive definite $k\times k$ covariance matrix. Then

<div>$$X\sim N_k(\mu,\Sigma)
\quad\Longleftrightarrow\quad
\lambda^\prime X\sim N(\lambda^\prime\mu,\lambda^\prime\Sigma\lambda)
\quad\text{for every }\lambda\ne 0.$$</div>

This is especially useful for asymptotic normality. To prove

<div>$$X_n\xrightarrow{d}N_k(\mu,\Sigma),$$</div>

it is enough to prove that for every fixed $\lambda$ with $\lambda^\prime\lambda=1$,

<div>$$\lambda^\prime X_n
\xrightarrow{d}
N(\lambda^\prime\mu,\lambda^\prime\Sigma\lambda).$$</div>

This is the usual Cramer-Wold route: reduce the vector result to scalar central limit theorems for arbitrary linear combinations.

### Relation to convergence in probability

For scalar random variables,

<div>$$X_n\xrightarrow{P}X
\quad\Longrightarrow\quad
X_n\xrightarrow{d}X.$$</div>

The proof uses the distribution functions. If $x-\varepsilon$, $x$, and $x+\varepsilon$ are continuity points of $F_X$, then

<div>$$F_X(x-\varepsilon)
\le
\liminf_{n\to\infty}F_{X_n}(x)
\le
\limsup_{n\to\infty}F_{X_n}(x)
\le
F_X(x+\varepsilon).$$</div>

Letting $\varepsilon\downarrow 0$ at a continuity point $x$ gives $F_{X_n}(x)\to F_X(x)$.

If the limit is a constant $c$, the converse is also true:

<div>$$X_n\xrightarrow{d}c
\quad\Longleftrightarrow\quad
X_n\xrightarrow{P}c.$$</div>

Indeed, for any $\varepsilon>0$,

<div>$$\Pr(|X_n-c|>\varepsilon)
\le
F_{X_n}(c-\varepsilon)
+1-F_{X_n}(c+\varepsilon),$$</div>

and the right-hand side converges to $0$ under convergence in distribution to the degenerate random variable $c$.

The same implications hold for vectors:

<div>$$X_n\xrightarrow{P}X
\quad\Longrightarrow\quad
X_n\xrightarrow{d}X,$$</div>

and if $c$ is a fixed $k\times 1$ vector,

<div>$$X_n\xrightarrow{d}c
\quad\Longleftrightarrow\quad
X_n\xrightarrow{P}c.$$</div>

One way to prove the vector case is to apply the scalar result to every projection $\lambda^\prime X_n$ and then use the Cramer-Wold device. For convergence to a constant vector, convergence of each coordinate is enough.

### Continuous mapping theorem

Let $g$ be continuous on the support of $X$. If

<div>$$X_n\xrightarrow{d}X,$$</div>

then

<div>$$g(X_n)\xrightarrow{d}g(X).$$</div>

This is the continuous mapping theorem. It lets us pass limiting distributions through continuous transformations.

For example, if

<div>$$X_n\xrightarrow{d}X\sim N_k(0,I_k),$$</div>

then the map $g(x)=x^\prime x$ gives

<div>$$X_n^\prime X_n\xrightarrow{d}X^\prime X\sim\chi_k^2.$$</div>

### Slutsky-type results

Suppose

<div>$$Y_n\xrightarrow{d}Y,\qquad Z_n\xrightarrow{P}c,$$</div>

where $c$ is a fixed vector or scalar of the appropriate dimension. If $g$ is continuous at points of the form $(y,c)$, then

<div>$$g(Y_n,Z_n)\xrightarrow{d}g(Y,c).$$</div>

Useful special cases are:

1. If $X_n\xrightarrow{d}X$ and $y_n\xrightarrow{P}c$, then

   <div>$$X_n+y_n\xrightarrow{d}X+c.$$</div>

2. If $X_n\xrightarrow{d}X$ and $y_n\xrightarrow{P}c$, then

   <div>$$y_nX_n\xrightarrow{d}cX.$$</div>

3. If $X_n\xrightarrow{d}X$ and $y_n\xrightarrow{P}c\ne 0$, then

   <div>$$y_n^{-1}X_n\xrightarrow{d}c^{-1}X.$$</div>

These are the workhorse tools behind asymptotic distributions of estimators. A random object with a nondegenerate limiting distribution can be combined with another object that converges in probability to a constant.

### Example: least squares with stochastic regressors

Consider

<div>$$Y=Z\beta+U,$$</div>

where $Z$ is random and $\beta$ is $k\times 1$. Define

<div>$$\widehat M=\frac{1}{n}Z^\prime Z,
\qquad
\sqrt n\,\widehat m=\frac{1}{\sqrt n}Z^\prime U.$$</div>

Suppose

<div>$$\widehat M\xrightarrow{P}M>0,
\qquad
\sqrt n\,\widehat m\xrightarrow{d}X\sim N_k(0,\sigma^2M).$$</div>

The least-squares estimator satisfies

<div>$$\sqrt n(\hat\beta-\beta)
=
\left(\frac{Z^\prime Z}{n}\right)^{-1}
\frac{Z^\prime U}{\sqrt n}
=\widehat M^{-1}\sqrt n\,\widehat m.$$</div>

By continuous mapping,

<div>$$\widehat M^{-1}\xrightarrow{P}M^{-1}.$$</div>

Then Slutsky's theorem gives

<div>$$\sqrt n(\hat\beta-\beta)
\xrightarrow{d}
M^{-1}X.$$</div>

Since $X\sim N_k(0,\sigma^2M)$,

<div>$$M^{-1}X\sim N_k(0,\sigma^2M^{-1}).$$</div>

Therefore

<div>$$\sqrt n(\hat\beta-\beta)
\xrightarrow{d}
N_k(0,\sigma^2M^{-1}).$$</div>

This is the asymptotic normality result that turns the stochastic-order rate from section 2.2 into a full limiting distribution.

### Example: large-sample F statistic

Continue with $Y=Z\beta+U$ and test

<div>$$H_0:W\beta=w,$$</div>

where $W$ is a known $q\times k$ matrix with rank $q\le k$, and $w$ is $q\times 1$. Consider

<div>$$F_n
=
\frac{
n(w-W\hat\beta)^\prime
\left(W\widehat M^{-1}W^\prime\right)^{-1}
(w-W\hat\beta)
}{
q\hat\sigma^2
},$$</div>

where

<div>$$\hat\sigma^2=\frac{\hat U^\prime\hat U}{n-k},
\qquad
\hat U=Y-Z\hat\beta.$$</div>

Assume

<div>$$\frac{Z^\prime U}{\sqrt n}\xrightarrow{d}X\sim N_k(0,\sigma^2M),
\qquad
\widehat M=\frac{Z^\prime Z}{n}\xrightarrow{P}M>0,
\qquad
s^2=\frac{U^\prime U}{n}\xrightarrow{P}\sigma^2.$$</div>

Under $H_0$, $w-W\beta=0$, so

<div>$$\sqrt n(w-W\hat\beta)
=
-W\sqrt n(\hat\beta-\beta)
=
-W\widehat M^{-1}\frac{Z^\prime U}{\sqrt n}.$$</div>

The sign does not affect the quadratic form. Also,

<div>$$\hat U^\prime\hat U
=U^\prime U
-\left(\frac{Z^\prime U}{\sqrt n}\right)^\prime
\widehat M^{-1}
\left(\frac{Z^\prime U}{\sqrt n}\right).$$</div>

The second term is $O_p(1)$, so after division by $n-k$ it is $o_p(1)$. Hence

<div>$$\hat\sigma^2\xrightarrow{P}\sigma^2.$$</div>

Applying the continuous mapping theorem and Slutsky's theorem,

<div>$$F_n\xrightarrow{d}
\frac{
X^\prime M^{-1}W^\prime
\left(WM^{-1}W^\prime\right)^{-1}
WM^{-1}X
}{
q\sigma^2
}.$$</div>

Because

<div>$$\frac{1}{\sigma}WM^{-1}X
\sim
N_q(0,WM^{-1}W^\prime),$$</div>

we have

<div>$$\left(WM^{-1}W^\prime\right)^{-1/2}
\frac{WM^{-1}X}{\sigma}
\sim
N_q(0,I_q).$$</div>

Therefore,

<div>$$F_n\xrightarrow{d}\frac{\chi_q^2}{q}.$$</div>

This is an asymptotic result. It is not proved by saying that a finite-sample $F_{q,n-k}$ distribution tends to $\chi_q^2/q$; instead it follows from the limiting behavior of the estimator and variance estimator under weaker large-sample conditions.

### Relationship among modes of convergence

The main implication chain is

<div>$$X_n\xrightarrow{a.s.}X
\quad\Longrightarrow\quad
X_n\xrightarrow{P}X
\quad\Longrightarrow\quad
X_n\xrightarrow{d}X.$$</div>

Also, for $r>0$,

<div>$$X_n\xrightarrow{L^r}X
\quad\Longrightarrow\quad
X_n\xrightarrow{P}X.$$</div>

If the limiting random variable is a constant, then convergence in distribution is equivalent to convergence in probability:

<div>$$X_n\xrightarrow{d}c
\quad\Longleftrightarrow\quad
X_n\xrightarrow{P}c.$$</div>

But in general, convergence in distribution is strictly weaker than convergence in probability. It describes the limiting law, not necessarily whether $X_n$ and $X$ become close on the same probability space.

### Convergence in distribution and stochastic boundedness

If

<div>$$X_n\xrightarrow{d}X,$$</div>

then

<div>$$X_n=O_p(1).$$</div>

To see why, fix $\varepsilon>0$. Choose a continuity point $C>0$ of $F_X$ such that

<div>$$\Pr(|X|>C)<\varepsilon.$$</div>

For all sufficiently large $n$,

<div>$$|F_{X_n}(C)-F_X(C)|<\varepsilon,
\qquad
|F_{X_n}(-C)-F_X(-C)|<\varepsilon.$$</div>

Then

<div>$$\Pr(|X_n|>C)
\le
\Pr(|X|>C)
+|F_{X_n}(C)-F_X(C)|
+|F_{X_n}(-C)-F_X(-C)|
<3\varepsilon.$$</div>

Thus the sequence cannot escape to infinity in probability.

As a useful consequence, if

<div>$$X_n\xrightarrow{d}X,
\qquad
y_n\xrightarrow{P}0,$$</div>

then

<div>$$X_ny_n\xrightarrow{P}0.$$</div>

The reason is exactly the stochastic-order algebra from section 2.2:

<div>$$X_n\xrightarrow{d}X
\quad\Longrightarrow\quad
X_n=O_p(1),$$</div>

while

<div>$$y_n\xrightarrow{P}0
\quad\Longleftrightarrow\quad
y_n=o_p(1).$$</div>

Therefore

<div>$$X_ny_n=O_p(1)o_p(1)=o_p(1).$$</div>

## 2.4 Central limit theorems

## 2.5 Consistency of extremum estimators

- 2.5.1 Central limit theorem for extremum estimators

## 2.6 Central limit theorems for time-series data
