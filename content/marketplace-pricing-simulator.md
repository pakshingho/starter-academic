---
title: Marketplace Pricing Simulator
date: 2026-03-14
type: page
math: true
draft: false
---

<p class="marketplace-pricing-tool__subtitle" role="doc-subtitle">Elasticity estimation for pricing systems and marketplace supply-demand equilibrium modeling for Uber, DoorDash, and Airbnb-style platforms.</p>

Use this simulator to connect demand curves, price elasticity, promotion impact, dynamic pricing, matching frictions, and market-clearing equilibrium in one place.

<div class="marketplace-pricing-tool" id="marketplace-pricing-tool">
  <div class="marketplace-pricing-tool__grid">
    <section class="marketplace-pricing-tool__panel">
      <div class="marketplace-pricing-tool__panel-head">
        <h2>Scenario Setup</h2>
        <p>Choose a marketplace preset and stress-test your price, promotion, and supply assumptions.</p>
      </div>
      <div class="marketplace-pricing-tool__section">
        <div class="marketplace-pricing-tool__field">
          <label for="mp-marketplace">Marketplace preset</label>
          <select id="mp-marketplace">
            <option value="ride" selected>Ride-hailing (Uber-like)</option>
            <option value="delivery">Delivery marketplace (DoorDash-like)</option>
            <option value="rental">Short-term rentals (Airbnb-like)</option>
          </select>
          <p>Presets change the default assumptions and interpretation text while keeping the same underlying model.</p>
        </div>
      </div>
      <div class="marketplace-pricing-tool__section">
        <h3>Demand and promotion</h3>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-reference-price">Reference price</label>
          <input id="mp-reference-price" type="number" min="0.01" step="0.01" value="22.00">
          <p>A baseline gross consumer price such as average fare, delivery basket fee, or nightly rate.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-current-price">Current gross price</label>
          <input id="mp-current-price" type="number" min="0.01" step="0.01" value="24.00">
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-baseline-demand">Baseline daily demand</label>
          <input id="mp-baseline-demand" type="number" min="1" step="1" value="18000">
          <p>Use rides per day, orders per day, or booked nights per day depending on the marketplace.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-price-elasticity">Absolute price elasticity</label>
          <input id="mp-price-elasticity" type="number" min="0.05" step="0.05" value="1.35">
          <p>In a log-log model, this is the magnitude of the elasticity. The simulator reports it with a negative sign.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-promo-depth">Promotion depth</label>
          <input id="mp-promo-depth" type="number" min="0" max="80" step="1" value="0">
          <p>Percent discount, subsidy, or coupon applied to the consumer-facing price.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-promo-halo">Incremental lift from a 10% promotion</label>
          <input id="mp-promo-halo" type="number" min="0" max="50" step="0.5" value="3.0">
          <p>Captures extra conversion beyond the pure price effect, such as urgency, merchandising, or reminder effects.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-demand-shock">Demand shock</label>
          <input id="mp-demand-shock" type="number" min="-90" max="250" step="1" value="12">
          <p>Percent shift from weather, seasonality, rush hour, events, or holidays.</p>
        </div>
      </div>
      <div class="marketplace-pricing-tool__section">
        <h3>Supply, matching, and take rate</h3>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-reference-payout">Reference supplier payout</label>
          <input id="mp-reference-payout" type="number" min="0.01" step="0.01" value="15.00">
          <p>Average payout per trip, order, or booked night used to anchor the supply curve.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-baseline-supply">Baseline daily supply capacity</label>
          <input id="mp-baseline-supply" type="number" min="1" step="1" value="17000">
          <p>Think active driver hours converted into trips, dasher capacity, or bookable host nights.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-supply-elasticity">Supply elasticity</label>
          <input id="mp-supply-elasticity" type="number" min="0.05" step="0.05" value="1.10">
          <p>Higher values imply supply comes online more quickly when payouts improve.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-take-rate">Platform take rate</label>
          <input id="mp-take-rate" type="number" min="1" max="95" step="1" value="25">
          <p>Percent of gross price retained by the platform before supplier payout.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-matching-efficiency">Matching efficiency</label>
          <input id="mp-matching-efficiency" type="number" min="30" max="100" step="1" value="92">
          <p>Accounts for geographic frictions, batching, acceptance behavior, and other matching losses.</p>
        </div>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-supply-shock">Supply shock</label>
          <input id="mp-supply-shock" type="number" min="-90" max="250" step="1" value="-4">
          <p>Use this for regulation, weather, host blocking, or driver availability shocks.</p>
        </div>
      </div>
      <div class="marketplace-pricing-tool__section">
        <h3>Supplier incentives</h3>
        <div class="marketplace-pricing-tool__field">
          <label for="mp-incentive-mode">Incentive model</label>
          <select id="mp-incentive-mode">
            <option value="none" selected>No explicit supplier incentive</option>
            <option value="per-unit">Per-unit incentive</option>
            <option value="threshold">Threshold bonus / guaranteed earnings</option>
          </select>
          <p>Switch between a simple per-trip or per-order top-up and a richer quest / guarantee approximation.</p>
        </div>
        <div class="marketplace-pricing-tool__field" id="group-mp-per-unit-incentive">
          <label for="mp-per-unit-incentive">Per-unit incentive</label>
          <input id="mp-per-unit-incentive" type="number" min="0" step="0.25" value="0.00">
          <p>Extra payout per completed trip, order, or booked night paid on top of the base supplier payout.</p>
        </div>
        <div class="marketplace-pricing-tool__field" id="group-mp-eligible-share" hidden>
          <label for="mp-eligible-share">Eligible supply share</label>
          <input id="mp-eligible-share" type="number" min="0" max="100" step="1" value="70">
          <p>Percent of suppliers expected to see and respond to the quest or guaranteed-earnings program.</p>
        </div>
        <div class="marketplace-pricing-tool__field" id="group-mp-quest-threshold" hidden>
          <label for="mp-quest-threshold">Quest threshold</label>
          <input id="mp-quest-threshold" type="number" min="1" step="1" value="60">
          <p>Completed units needed to unlock the quest bonus in the reduced-form approximation.</p>
        </div>
        <div class="marketplace-pricing-tool__field" id="group-mp-quest-bonus" hidden>
          <label for="mp-quest-bonus">Quest bonus</label>
          <input id="mp-quest-bonus" type="number" min="0" step="1" value="150">
          <p>Lump-sum supplier bonus associated with hitting the target.</p>
        </div>
        <div class="marketplace-pricing-tool__field" id="group-mp-attainment-probability" hidden>
          <label for="mp-attainment-probability">Expected attainment probability</label>
          <input id="mp-attainment-probability" type="number" min="0" max="100" step="1" value="60">
          <p>Percent probability that an eligible supplier treats the quest as attainable enough to respond.</p>
        </div>
        <div class="marketplace-pricing-tool__field" id="group-mp-guaranteed-floor" hidden>
          <label for="mp-guaranteed-floor">Guaranteed payout floor</label>
          <input id="mp-guaranteed-floor" type="number" min="0" step="0.25" value="18.00">
          <p>Minimum effective payout per completed unit. The model only applies a top-up when base payout falls below this floor.</p>
        </div>
      </div>
      <div class="marketplace-pricing-tool__actions">
        <button type="button" class="marketplace-pricing-tool__button" id="mp-share">Copy shareable link</button>
        <button type="button" class="marketplace-pricing-tool__button marketplace-pricing-tool__button--ghost" id="mp-reset">Reset preset</button>
        <span class="marketplace-pricing-tool__share-status" id="mp-share-status" aria-live="polite"></span>
      </div>
    </section>
    <section class="marketplace-pricing-tool__panel marketplace-pricing-tool__panel--results">
      <div class="marketplace-pricing-tool__panel-head">
        <h2>Model Outputs</h2>
        <p>These are directional planning metrics. In production, validate them with experiments, switchbacks, or defensible quasi-experimental variation.</p>
      </div>
      <div class="marketplace-pricing-tool__metrics">
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Demand at current price</span>
          <strong id="mp-metric-demand">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Increment from promotion</span>
          <strong id="mp-metric-promo">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Point elasticity</span>
          <strong id="mp-metric-elasticity">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Fill rate at current price</span>
          <strong id="mp-metric-fill">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Supply gap at current price</span>
          <strong id="mp-metric-gap">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Tightness ratio</span>
          <strong id="mp-metric-tightness">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Equilibrium price</span>
          <strong id="mp-metric-eq-price">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Equilibrium completed volume</span>
          <strong id="mp-metric-eq-volume">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Clear-market multiplier</span>
          <strong id="mp-metric-surge">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Gross platform revenue</span>
          <strong id="mp-metric-revenue">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Supplier payout incl. incentives</span>
          <strong id="mp-metric-payout">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Effective supplier incentive</span>
          <strong id="mp-metric-incentive-rate">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Incentive cost at equilibrium</span>
          <strong id="mp-metric-incentive-cost">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Net platform revenue</span>
          <strong id="mp-metric-net-revenue">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Incremental supply from incentives</span>
          <strong id="mp-metric-incremental-supply">-</strong>
        </div>
        <div class="marketplace-pricing-tool__metric">
          <span class="marketplace-pricing-tool__metric-label">Market state</span>
          <strong id="mp-metric-state">-</strong>
        </div>
      </div>
      <div class="marketplace-pricing-tool__summary" id="mp-summary"></div>
      <div class="marketplace-pricing-tool__error" id="mp-error" hidden></div>
    </section>
  </div>

  <section class="marketplace-pricing-tool__panel marketplace-pricing-tool__panel--charts">
    <div class="marketplace-pricing-tool__charts">
      <article class="marketplace-pricing-tool__chart-card">
        <div class="marketplace-pricing-tool__chart-head">
          <h3>Demand Curve</h3>
          <p>Shows how the price assumption and promotion change expected demand at a market-day level.</p>
        </div>
        <div id="mp-demand-chart"></div>
      </article>
      <article class="marketplace-pricing-tool__chart-card">
        <div class="marketplace-pricing-tool__chart-head">
          <h3>Supply-Demand Equilibrium</h3>
          <p>Market clearing occurs when promoted demand meets effective supply after take rate, matching frictions, and any supplier incentive program.</p>
        </div>
        <div id="mp-equilibrium-chart"></div>
      </article>
    </div>
    <div class="marketplace-pricing-tool__table-wrap">
      <table class="marketplace-pricing-tool__table">
        <thead>
          <tr>
            <th>Gross price</th>
            <th>Demand</th>
            <th>Effective supply</th>
            <th>Imbalance</th>
            <th>Completed volume</th>
            <th>Net platform revenue</th>
          </tr>
        </thead>
        <tbody id="mp-ladder-body"></tbody>
      </table>
    </div>
  </section>

  <section class="marketplace-pricing-tool__panel marketplace-pricing-tool__panel--details">
    <h2>How to use this simulator</h2>
    <ul>
      <li>Start with a local market-hour or market-day baseline rather than a platform-wide average.</li>
      <li>Change price elasticity and promotion lift separately so you can tell whether coupons are shifting real demand or just discounting infra-marginal users.</li>
      <li>Use the per-unit incentive mode for clean counterfactuals, then pressure-test the threshold / guarantee mode when operations teams actually run quests or earnings floors.</li>
      <li>Read the equilibrium price as a market-clearing benchmark, not a universal pricing recommendation.</li>
      <li>For Uber and DoorDash, tightness usually appears as ETAs, batching, and cancellations. For Airbnb, it shows up as occupancy, booking lead time, and host availability.</li>
    </ul>
  </section>
</div>

## Elasticity estimation for pricing systems

### 1. Demand curves

For pricing systems, a practical starting point is a log-log demand model:

$$
\log Q_t = \alpha - \epsilon_d \log P_t + \beta \, \mathrm{Promo}_t + X_t^\top \gamma + u_t
$$

where $Q_t$ is demand, $P_t$ is consumer price, $\epsilon_d$ is the own-price elasticity, and $X_t$ includes controls such as geography, hour of week, weather, events, inventory, and competitor conditions.

In practice:

- Uber-style markets often estimate demand at the city-hour or zone-hour level and include rain, commute windows, airport flows, and special events.
- DoorDash-style markets often work at the market-hour or store-hour level and control for basket composition, restaurant availability, ETA, and fee mix.
- Airbnb-style markets often use listing-day or market-day panels with lead time, seasonality, local events, and occupancy controls.

The simulator uses a constant-elasticity demand curve:

$$
D(P, d) = D_0 \left(\frac{P(1-d)}{P_0}\right)^{-\epsilon_d} \left(1 + h \cdot \frac{d}{0.10}\right) (1 + s_D)
$$

where $d$ is promotion depth, $h$ is the extra lift from a 10% promotion beyond the mechanical price cut, and $s_D$ is a demand shock.

### 2. Price elasticity

The point elasticity is

$$
\frac{\partial Q}{\partial P} \cdot \frac{P}{Q}
$$

and in the log-log specification it is simply the coefficient on $\log P$.

Applied guidance:

- Use randomized price experiments when feasible. That is the cleanest way to separate willingness to pay from correlated market conditions.
- When experiments are impossible, use quasi-experimental variation such as tax changes, weather-driven supply shocks, or cost pass-through that moves price but not demand directly.
- Estimate elasticity by segment. Riders with urgent trips, diners during dinner rush, and travelers booking months ahead can have very different elasticities.

### 3. Promotion impact

Promotion impact is not just price elasticity in disguise. A coupon or subsidy can change ranking, salience, urgency, and conversion even after controlling for the net price. A useful regression is:

$$
\log Q_t = \alpha - \epsilon_d \log P_t + \theta \, \mathrm{Discount}_t + \phi \, \mathrm{Merchandising}_t + X_t^\top \gamma + u_t
$$

What to watch:

- Randomize promos or keep holdout groups so you can measure incremental lift instead of gross redemptions.
- Separate short-run conversion lift from longer-run habit formation or cannibalization.
- For DoorDash-like systems, track whether promos pull forward orders from later time slots.
- For Airbnb-like systems, promotions can interact with lead time and occupancy, so estimate by booking window.

## Marketplace supply-demand equilibrium modeling

### Supply response

On marketplaces, supply responds to payout rather than the full consumer price. A simple supply curve is

$$
S(P) = S_0 \left(\frac{(1-\tau)P}{W_0}\right)^{\epsilon_s} (1 + s_S)
$$

where $\tau$ is the platform take rate, $W_0$ is a reference payout, $\epsilon_s$ is the supply elasticity, and $s_S$ is a supply shock.

### Adding supply-side incentives

For a simple per-unit incentive, the effective supplier payout becomes

$$
W(P, I_u) = (1-\tau)P + I_u
$$

where $I_u$ is an extra payout per completed trip, order, or booked night.

For a threshold bonus or guaranteed-earnings regime, the simulator converts the program into an expected per-completed-unit equivalent:

$$
I_{\mathrm{eff}}(P) = \rho \left[q \frac{B}{T} + \max \left(0, G - (1-\tau)P \right)\right]
$$

where $\rho$ is the eligible supplier share, $q$ is the expected attainment probability, $B$ is the quest bonus, $T$ is the threshold, and $G$ is the guaranteed payout floor.

The incentive-augmented supply curve is therefore

$$
S(P, I) = S_0 \left(\frac{(1-\tau)P + I_{\mathrm{eff}}(P)}{W_0}\right)^{\epsilon_s} (1 + s_S)
$$

This is a reduced-form approximation. Real quest and guarantee programs are path-dependent, but converting them into expected per-unit equivalents makes the trade-off between consumer pricing and supplier incentives easier to reason about.

The simulator then applies a matching-efficiency term $m$ to reflect geographic mismatch, acceptance behavior, batching, and routing losses:

$$
\widetilde{S}(P) = m \cdot S(P)
$$

### Dynamic pricing

Dynamic pricing on platforms like Uber or DoorDash is usually trying to reduce excess demand, protect service quality, and improve fill rate. In reduced form, you can think of it as nudging price upward when demand exceeds effective supply:

$$
P_{t+1} = P_t \left[1 + \lambda \frac{D_t - \widetilde{S}_t}{\max(D_t, 1)}\right]
$$

where $\lambda$ controls how aggressively the pricing system responds.

### Matching and equilibrium

Completed transactions are limited by the short side of the market:

$$
M_t = \min \{D_t, \widetilde{S}_t\}
$$

and market-clearing equilibrium solves

$$
D(P^\ast, d) = \widetilde{S}(P^\ast, I)
$$

for the equilibrium price $P^\ast$.

For the platform, gross revenue and incentive-adjusted net revenue are

$$
R_t^{\mathrm{gross}} = \tau P_t M_t, \qquad
R_t^{\mathrm{net}} = \tau P_t M_t - C_t^{\mathrm{incentives}}
$$

where the simulator approximates incentive cost as completed-volume times the effective per-unit incentive equivalent.

Interpretation by platform:

- Uber: equilibrium is about balancing rider requests and available driver capacity while keeping ETAs and cancellations under control.
- DoorDash: equilibrium combines consumer fees, promotions, dasher pay, and batching efficiency to keep order fulfillment healthy.
- Airbnb: equilibrium is slower moving because supply responds through host availability and listing participation rather than minute-level labor supply.

## Marketplace examples

| Platform | Demand side | Supply side | Key pricing levers | Typical equilibrium metric |
| --- | --- | --- | --- | --- |
| Uber | Rider trip requests | Driver online time and acceptance | Base fare, surge, driver incentives | Fill rate, ETA, cancellation risk |
| DoorDash | Consumer orders | Dasher capacity and restaurant throughput | Delivery fee, small-order fee, promos, dasher pay | Unassigned orders, ETA, on-time rate |
| Airbnb | Guest booking demand | Host listing availability and bookable nights | Nightly price, discounts, stay rules | Occupancy, ADR, booking lead time |

## Practical workflow

1. Estimate demand elasticity using experiments or quasi-experimental price variation.
2. Estimate promotion lift separately from price effects.
3. Estimate supply response to payouts and incentives.
4. Calibrate matching efficiency using fill rate, ETA, or occupancy data.
5. Simulate equilibrium before shipping pricing or promo changes platform-wide.

This page is deliberately simple: it is a planning model for reasoning about direction and magnitude, not a replacement for production forecasting or causal identification.

## References and further reading

These references inform the conceptual framing, formulas, and marketplace examples on this page. The simulator defaults are still illustrative rather than calibrated to any one paper or platform.

### Platform economics and equilibrium

- [Rochet, J.-C., and Tirole, J. (2003). *Platform Competition in Two-Sided Markets*. Journal of the European Economic Association.](https://doi.org/10.1162/154247603322493212)
- [Armstrong, M. (2006). *Competition in Two-Sided Markets*. RAND Journal of Economics. Open-access version via UCL Discovery.](https://discovery.ucl.ac.uk/4324/)

### Demand curves, elasticity, and promotion impact

- [Cohen, P., Hahn, R., Hall, J., Levitt, S., and Metcalfe, R. (2016). *Using Big Data to Estimate Consumer Surplus: The Case of Uber*. NBER Working Paper 22627.](https://www.nber.org/papers/w22627)
- [Bajari, P., Nekipelov, D., Ryan, S. P., and Yang, M. (2015). *Demand Estimation with Machine Learning and Model Combination*. NBER Working Paper 20955.](https://www.nber.org/papers/w20955)
- [Dubé, J.-P. H., Fang, Z., Fong, N., and Luo, X. (2016). *Competitive Price Targeting with Smartphone Coupons*. NBER Working Paper 22067.](https://www.nber.org/papers/w22067)

### Dynamic pricing, matching, and marketplace supply

- [Castillo, J. C., Knoepfle, D., and Weyl, E. G. (2017). *Surge Pricing Solves the Wild Goose Chase*. Microsoft Research / ACM EC.](https://www.microsoft.com/en-us/research/publication/surge-pricing-solves-wild-goose-chase/)
- [Yan, C., Zhu, H., Korolko, N., and Woodard, D. (2020). *Dynamic Pricing and Matching in Ride-Hailing Platforms*. Uber Engineering summary with paper link.](https://www.uber.com/blog/research/dynamic-pricing-and-matching-in-ride-hailing-platforms/)
- [Chen, M. K., Chevalier, J. A., Rossi, P. E., and Oehlsen, E. (2017). *The Value of Flexible Work: Evidence from Uber Drivers*. NBER Working Paper 23296.](https://www.nber.org/papers/w23296)
- [DoorDash Engineering (2021). *Managing Supply and Demand Balance Through Machine Learning*.](https://careersatdoordash.com/blog/managing-supply-and-demand-balance-through-machine-learning/)
- [DoorDash Engineering (2026). *Smarter promotions with causal machine learning*.](https://careersatdoordash.com/blog/doordash-smarter-promotions-with-causal-machine-learning/)

### Airbnb-style flexible supply and pricing

- [Farronato, C., and Fradkin, A. (2018). *The Welfare Effects of Peer Entry in the Accommodation Market: The Case of Airbnb*. NBER Working Paper 24361.](https://www.nber.org/papers/w24361)
- [Airbnb Resource Center (2023). *What is Smart Pricing?*](https://www.airbnb.com/resources/hosting-homes/a/what-is-smart-pricing-594)
- [Airbnb Resource Center (2024). *Using Airbnb pricing tools*.](https://www.airbnb.com/resources/hosting-homes/a/using-airbnb-pricing-tools-707)
