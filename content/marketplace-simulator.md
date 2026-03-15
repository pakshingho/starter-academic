---
title: Marketplace Simulator
date: 2026-03-14
type: page
math: true
draft: false
---

Simulate a simple two-sided marketplace with linear demand, linear supply, and a platform take rate.

In this demo, buyers pay a transaction price, sellers receive a net payout after fees, and the platform keeps the wedge. Shift demand, seller costs, or the fee rate to see how equilibrium, revenue, and welfare move.

<div class="marketplace-tool" id="marketplace-tool">
  <div class="marketplace-tool__toolbar">
    <div class="marketplace-tool__preset-group" role="group" aria-label="Marketplace presets">
      <button type="button" class="marketplace-tool__preset" data-marketplace-preset="balanced">Balanced</button>
      <button type="button" class="marketplace-tool__preset" data-marketplace-preset="promo">Promo lift</button>
      <button type="button" class="marketplace-tool__preset" data-marketplace-preset="supply-crunch">Supply crunch</button>
      <button type="button" class="marketplace-tool__preset" data-marketplace-preset="high-fee">High fee</button>
    </div>
    <button type="button" class="marketplace-tool__button marketplace-tool__button--ghost" id="marketplace-tool-reset">Reset</button>
  </div>

  <div class="marketplace-tool__grid">
    <section class="marketplace-tool__panel">
      <div class="marketplace-tool__panel-head">
        <h2>Inputs</h2>
        <p>Set baseline demand and supply, then introduce shocks or a larger fee wedge.</p>
      </div>

      <div class="marketplace-tool__field">
        <label for="mp-demand-intercept">Demand intercept</label>
        <input id="mp-demand-intercept" type="number" min="10" max="400" step="1" value="120">
        <p>Buyer willingness to pay at zero quantity.</p>
      </div>

      <div class="marketplace-tool__field">
        <label for="mp-demand-slope">Demand slope</label>
        <input id="mp-demand-slope" type="number" min="0.05" max="10" step="0.05" value="0.80">
        <p>How quickly buyer willingness to pay falls as quantity grows.</p>
      </div>

      <div class="marketplace-tool__field">
        <label for="mp-supply-intercept">Supply intercept</label>
        <input id="mp-supply-intercept" type="number" min="0" max="300" step="1" value="20">
        <p>Seller reservation payout at zero quantity.</p>
      </div>

      <div class="marketplace-tool__field">
        <label for="mp-supply-slope">Supply slope</label>
        <input id="mp-supply-slope" type="number" min="0.05" max="10" step="0.05" value="0.55">
        <p>How much higher seller payout must be to unlock more supply.</p>
      </div>

      <div class="marketplace-tool__field">
        <label for="mp-take-rate">Platform take rate</label>
        <input id="mp-take-rate" type="number" min="0" max="80" step="1" value="18">
        <p>Percent of the transaction price retained by the platform.</p>
      </div>

      <div class="marketplace-tool__field">
        <label for="mp-demand-shock">Demand shock</label>
        <input id="mp-demand-shock" type="number" min="-60" max="100" step="1" value="0">
        <p>Percent lift or drop in buyer willingness to pay, for example from ranking or promotion changes.</p>
      </div>

      <div class="marketplace-tool__field">
        <label for="mp-seller-cost-shock">Seller cost shock</label>
        <input id="mp-seller-cost-shock" type="number" min="-40" max="120" step="1" value="0">
        <p>Absolute upward or downward shift in seller cost, payout requirement, or logistics burden.</p>
      </div>
    </section>

    <section class="marketplace-tool__panel marketplace-tool__panel--results">
      <div class="marketplace-tool__panel-head">
        <h2>Market outcome</h2>
        <p>The chart is drawn in buyer-price space. Sellers receive the net payout after the fee wedge.</p>
      </div>

      <div class="marketplace-tool__chart-card">
        <svg class="marketplace-tool__chart" id="marketplace-chart" viewBox="0 0 640 420" role="img" aria-label="Marketplace equilibrium chart"></svg>
        <div class="marketplace-tool__legend" aria-hidden="true">
          <span class="marketplace-tool__legend-item"><span class="marketplace-tool__legend-swatch marketplace-tool__legend-swatch--demand"></span>Demand</span>
          <span class="marketplace-tool__legend-item"><span class="marketplace-tool__legend-swatch marketplace-tool__legend-swatch--supply"></span>Fee-adjusted supply</span>
          <span class="marketplace-tool__legend-item"><span class="marketplace-tool__legend-swatch marketplace-tool__legend-swatch--benchmark"></span>No-fee benchmark</span>
        </div>
      </div>

      <div class="marketplace-tool__metrics">
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Equilibrium quantity</span>
          <strong id="mp-metric-quantity">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Buyer price</span>
          <strong id="mp-metric-buyer-price">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Seller payout</span>
          <strong id="mp-metric-seller-payout">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Fee wedge</span>
          <strong id="mp-metric-fee-wedge">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Gross merchandise value</span>
          <strong id="mp-metric-gmv">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Platform revenue</span>
          <strong id="mp-metric-platform-revenue">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Consumer surplus</span>
          <strong id="mp-metric-consumer-surplus">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Seller surplus</span>
          <strong id="mp-metric-seller-surplus">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Total surplus</span>
          <strong id="mp-metric-total-surplus">-</strong>
        </div>
        <div class="marketplace-tool__metric">
          <span class="marketplace-tool__metric-label">Deadweight loss vs zero fee</span>
          <strong id="mp-metric-deadweight-loss">-</strong>
        </div>
      </div>

      <div class="marketplace-tool__notes" id="marketplace-tool-notes"></div>
      <div class="marketplace-tool__error" id="marketplace-tool-error" hidden></div>
    </section>
  </div>

  <section class="marketplace-tool__panel marketplace-tool__panel--details">
    <h2>What this demo is good for</h2>
    <ul>
      <li>Building intuition for how a take rate creates a wedge between buyer price and seller payout</li>
      <li>Testing whether a demand lift or seller cost shock expands or shrinks trade</li>
      <li>Comparing platform revenue against quantity loss and deadweight loss</li>
      <li>Explaining marketplace tradeoffs to product, pricing, or economics teams</li>
    </ul>
    <p>This is a static partial-equilibrium toy model. It does not include matching frictions, capacity constraints, inventory dynamics, quality selection, multi-homing, or strategic responses over time.</p>
  </section>
</div>

## How the simulator works

The simulator uses linear inverse demand and supply:

$$
P_b(Q) = a(1 + \delta) - bQ
$$

$$
P_s(Q) = c + \kappa + dQ
$$

where:

- $P_b(Q)$ is the buyer-facing transaction price
- $P_s(Q)$ is the seller payout required to supply quantity $Q$
- $a$ and $b$ control demand level and steepness
- $c$ and $d$ control supply level and steepness
- $\delta$ is the demand shock
- $\kappa$ is the seller cost shock

If the platform keeps a take rate $\tau$, sellers receive:

$$
P_s = (1 - \tau) P_b
$$

So equilibrium solves:

$$
(1 - \tau)\left[a(1 + \delta) - bQ^\ast\right] = c + \kappa + dQ^\ast
$$

which gives:

$$
Q^\ast = \frac{(1 - \tau)a(1 + \delta) - (c + \kappa)}{d + (1 - \tau)b}
$$

Once $Q^\ast$ is known, the simulator computes the buyer price, seller payout, GMV, platform revenue, and surplus measures. It also compares the outcome with a zero-fee benchmark to estimate deadweight loss.
