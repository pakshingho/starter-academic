---
title: A/B Test Sample Size Calculator
date: 2026-03-10
type: page
draft: false
---

Estimate sample size and runtime for an A/B or multi-arm conversion experiment using a fixed-horizon normal approximation.

<div class="experiment-tool" id="experiment-tool">
  <div class="experiment-tool__grid">
    <section class="experiment-tool__panel">
      <h2>Inputs</h2>
      <div class="experiment-tool__field">
        <label for="baseline-rate">Baseline conversion rate</label>
        <input id="baseline-rate" type="number" min="0.01" max="99.99" step="0.01" value="8.00">
        <p>Percent of users who convert in control.</p>
      </div>
      <div class="experiment-tool__field">
        <label for="mde-relative">Minimum detectable effect</label>
        <input id="mde-relative" type="number" min="0.1" step="0.1" value="5.0">
        <p>Relative lift percent, such as <code>5</code> for a 5% lift.</p>
      </div>
      <div class="experiment-tool__field">
        <label for="alpha">Significance level alpha</label>
        <input id="alpha" type="number" min="0.001" max="0.20" step="0.001" value="0.05">
      </div>
      <div class="experiment-tool__field">
        <label for="power">Power</label>
        <input id="power" type="number" min="0.50" max="0.99" step="0.01" value="0.80">
      </div>
      <div class="experiment-tool__field">
        <label for="test-sidedness">Test direction</label>
        <select id="test-sidedness">
          <option value="two-sided" selected>Two-sided</option>
          <option value="one-sided">One-sided</option>
        </select>
        <p>Use one-sided only when decreases are not decision-relevant and the direction is fixed in advance.</p>
      </div>
      <div class="experiment-tool__field">
        <label for="daily-users">Daily eligible users</label>
        <input id="daily-users" type="number" min="1" step="1" value="25000">
      </div>
      <div class="experiment-tool__field">
        <label for="traffic-split">Traffic sent to experiment</label>
        <input id="traffic-split" type="number" min="1" max="100" step="1" value="100">
        <p>Percent of total daily eligible users included in the experiment.</p>
      </div>
      <div class="experiment-tool__field">
        <label for="variants">Number of variants</label>
        <input id="variants" type="number" min="2" max="8" step="1" value="2">
        <p>Total arms including control.</p>
      </div>
      <div class="experiment-tool__field">
        <label for="control-share">Control traffic share</label>
        <input id="control-share" type="number" min="5" max="95" step="1" value="50">
        <p>Percent of experiment traffic allocated to control. Remaining traffic is split evenly across treatment arms.</p>
      </div>
    </section>
    <section class="experiment-tool__panel experiment-tool__panel--results">
      <h2>Outputs</h2>
      <div class="experiment-tool__metrics">
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Absolute MDE</span>
          <strong id="metric-absolute-mde">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Treatment rate at MDE</span>
          <strong id="metric-treatment-rate">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Sample per variant</span>
          <strong id="metric-sample-per-variant">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Control sample</span>
          <strong id="metric-control-sample">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Each treatment sample</span>
          <strong id="metric-treatment-sample">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Total sample</span>
          <strong id="metric-total-sample">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Runtime</span>
          <strong id="metric-runtime-days">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Control users per day</span>
          <strong id="metric-control-users-day">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Each treatment users per day</span>
          <strong id="metric-treatment-users-day">-</strong>
        </div>
      </div>
      <div class="experiment-tool__notes" id="experiment-tool-notes">
        <p>This calculator uses a fixed-horizon two-sided test for differences in conversion rates with equal traffic allocation across variants.</p>
      </div>
      <div class="experiment-tool__error" id="experiment-tool-error" hidden></div>
    </section>
  </div>
  <section class="experiment-tool__panel experiment-tool__panel--details">
    <h2>What this is good for</h2>
    <ul>
      <li>Rough planning for A/B tests and multi-arm conversion experiments</li>
      <li>Comparing how baseline rate and MDE change runtime</li>
      <li>Checking whether your traffic volume makes a test feasible</li>
    </ul>
    <p>This first version does not handle sequential testing, CUPED variance reduction, clustered assignment, heterogeneous treatment effects, or ratio metrics.</p>
  </section>

</div>

## Formula and assumptions

Let $p_1$ be the baseline conversion rate and $p_2 = p_1 + \Delta$ be the treatment rate at the minimum detectable effect. Let $w_c$ be the control traffic share and $w_t$ be the traffic share for each treatment arm.

The calculator uses the normal approximation for a fixed-horizon test of two proportions with unequal allocation:

$$
\mathrm{SE}_0 = \sqrt{\bar{p}(1-\bar{p})\left(\frac{1}{n_c} + \frac{1}{n_t}\right)}, \qquad
\mathrm{SE}_1 = \sqrt{\frac{p_1(1-p_1)}{n_c} + \frac{p_2(1-p_2)}{n_t}}
$$

where $\bar{p} = (p_1 + p_2)/2$. For planning, it solves

$$
\Delta = z_{1-\alpha^\ast} \mathrm{SE}_0 + z_{\mathrm{power}} \mathrm{SE}_1
$$

for the required treatment-arm sample size $n_t$, using the allocation relationship $n_c / n_t = w_c / w_t$.

- $\alpha^\ast = \alpha / 2$ for a two-sided test and $\alpha^\ast = \alpha$ for a one-sided test before any multiple-comparison correction.
- When there are multiple treatment arms, the calculator applies a Bonferroni adjustment across treatment-versus-control comparisons.
- Traffic is assumed independent and identically distributed across users.
- Runtime assumes stable daily traffic and no ramp schedule.
