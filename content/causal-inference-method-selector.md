---
title: Causal Inference Method Selector
date: 2026-03-11
type: page
draft: false
---

<p class="causal-tool__subtitle" role="doc-subtitle">How to choose a causal inference method: the basics.</p>

Choose causal inference methods from study design, identification strategy, and business objective.

This tool uses a decision-tree backbone centered on identification structure, but it returns multiple viable methods with assumptions and follow-up checks rather than forcing a single branch.

<figure class="causal-tool__hero-figure">
  <picture>
    <source media="(max-width: 767px)" srcset="/media/tools/causal-method-selector-overview-mobile.svg">
    <img src="/media/tools/causal-method-selector-overview.svg" alt="Overview flowchart for choosing causal inference methods across experiments, observational designs, thresholds, instruments, and rollout settings.">
  </picture>
  <figcaption>Overview map for the selector. The interactive tool below expands each branch into method recommendations, package suggestions, and exportable robustness checklists.</figcaption>
</figure>

<div class="causal-tool" id="causal-tool">
  <div class="causal-tool__grid">
    <section class="causal-tool__panel">
      <div class="causal-tool__panel-head">
        <h2>Study Setup</h2>
        <p>Answer the questions that matter for identification. The tool will adapt the later questions to your design.</p>
      </div>
      <div class="causal-tool__section">
        <div class="causal-tool__field">
          <label for="ci-design">Data design</label>
          <select id="ci-design">
            <option value="experimental" selected>Experimental or randomized data</option>
            <option value="observational">Observational or non-randomized data</option>
          </select>
          <p>Start with whether treatment assignment was randomized or not.</p>
        </div>
        <div class="causal-tool__field">
          <label for="ci-goal">Primary goal</label>
          <select id="ci-goal"></select>
          <p>Pick the main causal question, not every downstream analysis you may run later.</p>
        </div>
      </div>
      <div class="causal-tool__section">
        <h3>Design Signals</h3>
        <div class="causal-tool__field" id="group-pre-period">
          <label for="ci-pre-period">Pre-treatment outcome history available?</label>
          <select id="ci-pre-period">
            <option value="yes">Yes</option>
            <option value="no" selected>No</option>
          </select>
          <p>Examples: pre-period spend, trips, clicks, or repeated baseline outcome measurements.</p>
        </div>
        <div class="causal-tool__field" id="group-randomization-issue">
          <label for="ci-randomization-issue">Randomization quality</label>
          <select id="ci-randomization-issue">
            <option value="none" selected>Looks valid</option>
            <option value="minor">Minor imbalance or attrition</option>
            <option value="severe">Serious imbalance or treatment leakage</option>
          </select>
          <p>Use this only for experimental settings.</p>
        </div>
        <div class="causal-tool__field" id="group-interference">
          <label for="ci-interference">Interference or marketplace spillovers across units?</label>
          <select id="ci-interference">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
          </select>
          <p>Examples: shared driver supply, seller liquidity, auction budgets, inventory competition, or social-network spillovers.</p>
        </div>
        <div class="causal-tool__field" id="group-noncompliance">
          <label for="ci-noncompliance">Assignment and treatment received differ?</label>
          <select id="ci-noncompliance">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
          </select>
          <p>Example: assigned users do not always adopt the feature, or encouragement differs from uptake.</p>
        </div>
        <div class="causal-tool__field" id="group-panel-data">
          <label for="ci-panel-data">Repeated outcomes over time?</label>
          <select id="ci-panel-data">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
          </select>
          <p>Needed for methods such as difference-in-differences, interrupted time series, and synthetic control.</p>
        </div>
        <div class="causal-tool__field" id="group-staggered-policy">
          <label for="ci-staggered-policy">Policy rollout staggered across units or time?</label>
          <select id="ci-staggered-policy">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div class="causal-tool__field" id="group-single-unit">
          <label for="ci-single-unit">Single treated market, unit, or region?</label>
          <select id="ci-single-unit">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
          </select>
          <p>Examples: one city launch, one state regulation, one platform-wide intervention.</p>
        </div>
        <div class="causal-tool__field" id="group-threshold">
          <label for="ci-threshold">Known score cutoff, threshold, or eligibility rule?</label>
          <select id="ci-threshold">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
          </select>
          <p>Examples: age cutoff, credit score threshold, policy eligibility boundary.</p>
        </div>
        <div class="causal-tool__field" id="group-instrument">
          <label for="ci-instrument">Plausible instrument or natural experiment available?</label>
          <select id="ci-instrument">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
            <option value="uncertain">Uncertain</option>
          </select>
          <p>The instrument must shift treatment strongly and affect the outcome only through treatment.</p>
        </div>
        <div class="causal-tool__field" id="group-confounders">
          <label for="ci-confounders">How well are key confounders observed?</label>
          <select id="ci-confounders">
            <option value="observed" selected>Most key confounders are observed</option>
            <option value="partial">Only partially observed</option>
            <option value="unobserved">Important confounders likely unobserved</option>
          </select>
        </div>
        <div class="causal-tool__field" id="group-overlap">
          <label for="ci-overlap">Overlap / common support</label>
          <select id="ci-overlap">
            <option value="good" selected>Good overlap</option>
            <option value="weak">Weak overlap</option>
            <option value="unknown">Unknown</option>
          </select>
          <p>If treated and untreated units barely overlap in covariate space, many adjustment methods become unstable.</p>
        </div>
        <div class="causal-tool__field" id="group-high-dimensional">
          <label for="ci-high-dimensional">Many features or flexible nuisance models needed?</label>
          <select id="ci-high-dimensional">
            <option value="no" selected>No</option>
            <option value="yes">Yes</option>
          </select>
          <p>Think high-cardinality features, rich user history, text, or many confounders.</p>
        </div>
      </div>
      <div class="causal-tool__actions">
        <button type="button" class="causal-tool__button" id="causal-tool-share">Copy shareable link</button>
        <button type="button" class="causal-tool__button causal-tool__button--ghost" id="causal-tool-reset">Reset</button>
        <span class="causal-tool__share-status" id="causal-tool-share-status" aria-live="polite"></span>
      </div>
    </section>
    <section class="causal-tool__panel causal-tool__panel--results">
      <div class="causal-tool__panel-head">
        <h2>Recommended Methods</h2>
        <p>The tool shows a primary recommendation, strong fallbacks, and identification warnings.</p>
      </div>
      <div class="causal-tool__path" id="causal-tool-path"></div>
      <div class="causal-tool__brief" id="causal-tool-summary"></div>
      <div class="causal-tool__warning" id="causal-tool-warning" hidden></div>
      <div class="causal-tool__results" id="causal-tool-results"></div>
    </section>
  </div>
  <section class="causal-tool__panel causal-tool__panel--details">
    <h2>Why this is not a rigid one-path decision tree</h2>
    <ul>
      <li>Many applied problems support more than one defensible method.</li>
      <li>Identification assumptions matter more than the algorithm name.</li>
      <li>Practitioners often need a primary method plus a robustness check, not a single branch answer.</li>
      <li>The best workflow is usually design first, estimator second, diagnostics third.</li>
    </ul>
    <p>This selector therefore uses a decision-tree backbone but returns method cards with fit, assumptions, and what to validate next.</p>
  </section>
</div>

## Methods covered

- Randomized experiment analysis with covariate adjustment
- Switchback experiments for interference-heavy marketplaces or networks
- CUPED / pre-period variance reduction
- CACE / instrumental variables for noncompliance
- Heterogeneous treatment effect models such as causal forests, uplift models, and meta-learners
- Mediation analysis
- Matching and propensity-score weighting
- Doubly robust estimators such as AIPW and double machine learning
- Difference-in-differences and event-study style designs
- Interrupted time series and synthetic control
- Regression discontinuity design
- Instrumental variables for observational settings
