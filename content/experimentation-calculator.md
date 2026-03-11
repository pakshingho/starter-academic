---
title: Experimentation Calculator
date: 2026-03-10
type: page
draft: false
---

Estimate sample size and runtime for a two-variant conversion experiment using a standard normal approximation.

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
          <span class="experiment-tool__metric-label">Total sample</span>
          <strong id="metric-total-sample">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Runtime</span>
          <strong id="metric-runtime-days">-</strong>
        </div>
        <div class="experiment-tool__metric">
          <span class="experiment-tool__metric-label">Users per variant per day</span>
          <strong id="metric-users-per-variant-day">-</strong>
        </div>
      </div>

      <div class="experiment-tool__notes" id="experiment-tool-notes">
        <p>This calculator assumes a fixed-horizon two-sided z-test for differences in conversion rates with equal traffic allocation across variants.</p>
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
