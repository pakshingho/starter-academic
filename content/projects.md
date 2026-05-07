---
title: Projects
date: 2026-02-24
type: page
---

Projects, tools, and technical notes from my work across causal inference, experimentation, forecasting, marketplace economics, recommender systems, and applied machine learning.

The common thread is decision quality: clarifying the question, making assumptions visible, choosing methods that fit the design, and turning analysis into reusable tools or teaching materials.

<nav class="projects-toc" aria-label="Projects table of contents">
  <div class="projects-toc__title">On this page</div>
  <a href="#project-themes">Project Themes</a>
  <a href="#selected-amazon-project-portfolio">Selected Amazon Project Portfolio</a>
  <a href="#flagship-decision-tools">Flagship Decision Tools</a>
  <a href="#technical-handbooks">Technical Handbooks</a>
  <a href="#code-and-research-archive">Code and Research Archive</a>
</nav>

## Project Themes

- **Methods:** causal inference, experimentation, forecasting, recommender systems, marketplace economics, and applied machine learning.
- **Decision focus:** metric design, trade-offs, uncertainty, and how model outputs change actions.
- **Reusable systems:** tools, handbooks, and frameworks that help teams reason more consistently.
- **Communication:** materials designed for data scientists, product leaders, economists, engineers, and senior decision-makers.

## Selected Amazon Project Portfolio

These summaries translate internal project work into public-facing descriptions focused on problem, method, and decision impact.

### Forecasting Ecosystem and Scalable Forecasting Architecture

Designed a modular forecasting vision for a rapidly expanding logistics network with many markets, planning horizons, demand channels, and operational grains. The architecture connected global and grouped modeling, hierarchical reconciliation, probabilistic forecasts, anomaly detection, forecastability diagnostics, and error-interpretation modules into a coherent forecasting ecosystem.

**Why it matters:** Forecasting systems become hard to maintain when each use case grows as a separate model. A modular ecosystem makes forecasting more scalable, interpretable, and easier for planning, operations, and technology teams to extend.

### ForecastLLM for Forecasting Pipeline Orchestration

Designed an LLM-driven approach for automating the construction, orchestration, and maintenance of forecasting pipeline modules. The work treated forecasting as a modular system that could be assembled and steered through agentic workflows across target definition, feature generation, model selection, backtesting, diagnostics, monitoring, and reporting.

This work was written up as the internal conference paper **One Scientist to Rule Them All: ForecastLLM's Novel Approach to Time Series Forecasting**, accepted to Amazon Machine Learning Conference (AMLC) in March 2023 and Economist Summit in October 2024.

**Why it matters:** Forecasting teams often bottleneck on repeated pipeline construction and maintenance. LLM orchestration can help scale forecasting coverage without every new use case requiring the same level of scientist bandwidth.

### Node-Level Capacity Forecasting for Logistics Planning

Built direct node-level forecasting approaches for package volume, stop visits, and cube-related demand across delivery and sortation operations. The work moved beyond noisy bottom-up aggregation by using ensemble models, hierarchical signals, robust outlier handling, and operationally meaningful grains for capacity procurement and routing.

**Why it matters:** Capacity planning decisions depend on the shape of demand, not only total volume. Forecasts at the right operational grain help teams allocate vehicles, labor, and space with less waste and fewer last-minute adjustments.

### Reactive Forecasting for Routing and Day-of Operations

Developed live-order and live-manifest forecasting systems for routing and pickup decisions across multiple geographies. The models incorporated high-frequency demand signals, shipper-specific cutoff behavior, time-zone complexity, carryover effects, holiday patterns, forecast combinations, and percentile forecasts for operational risk management.

This work was later written up as the internal conference paper **Ensemble Causal Nowcasting for First-Mile Shipment Pickup Counts**, accepted to Amazon Machine Learning Conference (AMLC) in March 2023 and Economist Summit in October 2024.

**Why it matters:** Day-of operations need forecasts that can update as new information arrives. Reactive forecasting turns live signals into routing and capacity decisions when waiting for a slower planning cycle would be too late.

### Demand Definition, Forecastability, and Decision Framing

Redesigned demand definitions for pickup go/no-go decisions and built forecastability diagnostics to explain when demand is smooth, intermittent, erratic, or lumpy. This included translating statistical properties into visual and operational language that planners could use when interpreting forecast errors and model limits.

**Why it matters:** Some demand patterns are intrinsically difficult to forecast. Defining the target correctly and explaining forecastability prevents teams from over-trusting noisy estimates or optimizing the wrong metric.

### Forecast Reliability, Data Quality, and Operational Monitoring

Improved forecasting operations through pipeline deep dives, quality checks, unit-test design, alerting recommendations, and shipment-history correction logic. The work focused on catching data and model issues earlier, reducing manual investigation burden, and making production forecasts more reliable for downstream users.

**Why it matters:** A forecast is only useful if the system around it is dependable. Reliability work protects planning decisions from silent data errors, stale pipelines, and avoidable model-output failures.

### Forecast-to-Cost Simulation and Planning Trade-Offs

Connected planning forecasts with cost simulation to evaluate how under-forecasting, over-forecasting, and percentile buffers affect operational cost. The analysis showed why a simple accuracy metric is not always enough: cost impact can be asymmetric, and the best forecast for a decision may depend on risk tolerance and operational constraints.

**Why it matters:** Forecasting should be evaluated against the decision it supports. Cost-aware simulation helps teams choose forecast percentiles, buffers, and planning rules that reflect business trade-offs rather than metric optimization alone.

### Employee Services Operations Forecasting

Built granular ensemble forecasting workflows for high-volume operations outside logistics, including transaction and ticket-volume planning. The work combined time-series models, external drivers, automation, database delivery, and feasibility analysis when the requested forecasting target was not aligned with operational staffing decisions.

**Why it matters:** Useful forecasting sometimes means recommending a different target or data collection process. This work combined modeling with product judgment about what signal should drive planning.

### Financial-Market Event Study Framework

Developed a reusable econometric framework for evaluating how external events changed company, peer, and sector performance. The framework combined event-window design, asset and sector portfolio construction, abnormal-return estimation, CAPM and Fama-French benchmarks, user-specified multifactor models, statistical testing, and visualization into a repeatable workflow.

The work was applied to major public events and strategic announcements to separate market-wide movement from event-specific changes in expected performance.

**Why it matters:** Event studies are valuable when teams need a fast external read on an ambiguous shock. A reusable framework turns financial-market reactions into a structured decision input for planning, benchmarking, and investment trade-offs.

### Forward-Looking Market Signals for Forecasting and Risk Attribution

Built analyses that tested whether stock returns, volatility indices, sector portfolios, and peer movements could improve demand forecast interpretation and risk monitoring. The work connected forward-looking market data with forecast-error analysis, confidence-interval reasoning, time-varying beta estimation, sensitivity attribution, and peer/sector decomposition.

This created a way to compare internal forecasts with an outside market signal, identify where market expectations were moving before operating metrics fully changed, and explain whether performance changes were company-specific, sector-driven, or market-wide.

**Why it matters:** During shocks, operational history can lag reality. Forward-looking market signals provide an independent lens for forecast calibration, risk review, and scenario planning.

## Flagship Decision Tools

### Causal Inference Method Selector

[Open project](/causal-inference-method-selector/)

An interactive decision-support tool for choosing causal inference methods from the structure of the problem rather than from a memorized list of estimators. The selector starts with the study design, identification strategy, and business objective, then surfaces viable methods, assumptions, diagnostics, and robustness checks.

It covers randomized experiments, switchbacks, CUPED, noncompliance, heterogeneous treatment effects, mediation, matching, propensity weighting, doubly robust estimation, difference-in-differences, event studies, interrupted time series, synthetic control, regression discontinuity, instrumental variables, and double machine learning.

**Why it matters:** In applied causal inference, the estimator is only useful after the design and assumptions are clear. The selector keeps method choice tied to identification, diagnostics, and robustness checks.

### Marketplace Pricing Simulator

[Open project](/marketplace-pricing-simulator/)

A richer marketplace simulator connecting demand curves, price elasticity, promotion depth, demand shocks, supplier payout, supply elasticity, take rate, matching efficiency, supplier incentives, and dynamic surge behavior. The presets mirror Uber, DoorDash, and Airbnb-style operating environments while keeping the underlying model transparent.

The tool supports both static equilibrium reasoning and a dynamic control view where shocks, surge, supply response, fill rate, and incentive policy interact over time.

**Why it matters:** Pricing and incentive decisions in marketplaces depend on both sides of the market. The simulator makes those interactions concrete enough to reason about promotions, supply response, matching quality, and platform revenue together.

### Marketplace Simulator

[Open project](/marketplace-simulator/)

A compact two-sided marketplace model with linear demand, linear supply, and a platform take rate. It visualizes how fees create a wedge between buyer price and seller payout, then reports equilibrium quantity, GMV, platform revenue, consumer surplus, seller surplus, total surplus, and deadweight loss.

The model is deliberately simple enough to teach from, but complete enough to expose the central trade-offs behind marketplace monetization and welfare.

**Why it matters:** A simple equilibrium model is useful for teaching take-rate trade-offs. It keeps the core mechanism visible while still showing revenue, surplus, quantity, and welfare effects.

### A/B Test Sample Size Calculator

[Open project](/experimentation-calculator/)

A planning tool for fixed-horizon A/B and multi-arm conversion experiments. It translates baseline rate, minimum detectable effect, significance level, power, traffic allocation, number of variants, and daily eligible users into required sample size and expected runtime.

The calculator is intentionally practical: it helps teams ask whether an experiment is feasible before launch, whether the target effect is decision-relevant, and how traffic allocation changes the cost of learning.

**Why it matters:** Experiment planning sets the cost and credibility of learning before launch. This tool makes the trade-offs behind power, MDE, traffic, and runtime explicit.

## Technical Handbooks

### Economics of Digital Platforms

[Open notes](/economics-of-digital-platforms/)

A chapter-based set of notes on network effects, platform design, trust, monetization, customer value, marketing ROI, regulation, and strategy. The material links platform economics with product and measurement questions that come up in online marketplaces, ads, growth, subscriptions, and multi-sided products.

**Why it matters:** Platform metrics are shaped by incentives, trust, pricing, market thickness, and regulation. These notes connect those forces to measurement and product decisions.

### Understanding Recommender Systems

[Open handbook](/recommender-systems/)

A chapter-based guide to recommender systems for data scientists, spanning problem framing, feedback types, candidate generation, ranking, matrix factorization, two-tower architectures, contextual and hybrid recommenders, deep models, offline evaluation, online evaluation, and production concerns.

The handbook treats recommender systems as product systems, not just model families. It connects recommendation surfaces, feedback loops, negative sampling, retrieval/ranking architecture, and evaluation design.

**Why it matters:** Recommender systems are product systems, not only model families. The guide keeps modeling choices connected to surfaces, feedback loops, ranking architecture, and evaluation design.

### Data Science Foundations for New Grads

[Open handbook](/data-science-foundations/)

A compact handbook on the minimum practical knowledge needed to contribute credibly as a new data scientist: uncertainty, statistics, experiments, machine learning basics, SQL, data modeling, coding habits, product metrics, and end-to-end case thinking.

It is built around reliability: knowing what question is being asked, what each row means, how uncertainty enters the decision, and how to communicate recommendations with assumptions intact.

**Why it matters:** Reliable data science starts with habits that are easy to overlook: knowing the grain of the data, reasoning about uncertainty, checking metrics, and communicating assumptions clearly.

### Applied Machine Learning for Tabular Data

[Open handbook](/tabular-machine-learning/)

A practical short course on how tabular ML projects are scoped, built, evaluated, and improved. It covers problem framing, target definition, leakage, data quality, train/validation/test design, metrics, feature engineering, preprocessing, pipelines, KNN, trees, linear models, boosting, neural networks, and AutoML.

The emphasis is on judgment: when to start with simple baselines, how to evaluate honestly, and how to avoid modeling choices that look impressive but fail under real operating conditions.

**Why it matters:** Many high-value business problems still live in structured data. The course focuses on the places tabular ML often fails first: framing, leakage, evaluation, feature handling, and baseline discipline.

### Decision Trees and Ensemble Methods in Machine Learning

[Open handbook](/tree-based-machine-learning/)

A focused course on decision trees, bagging, random forests, ExtraTrees, feature importance, proximities, boosting, XGBoost, LightGBM, and CatBoost. The course explains why tree-based methods remain a strong default for many structured-data problems, especially when mixed features, nonlinear interactions, and interpretability all matter.

It also stresses the limits of feature importance, the bias-variance trade-off, tuning risk, and the practical question of when deep learning is not the right default for tabular data.

**Why it matters:** Tree ensembles are practical, powerful, and easy to misuse. This guide keeps the mechanics close to applied concerns such as tuning, feature importance, stability, and when deep learning is not the best default.

## Code and Research Archive

These older public repositories and notes are useful context for the broader arc of my work. I would treat them as supporting evidence rather than the headline portfolio.

### Occupation Classification

[View repository](https://github.com/pakshingho/Occupation-Classification)

Applied classification modeling with structured labor-market data, using occupation and skill information from the O*NET ecosystem.

### ESG

[View repository](https://github.com/pakshingho/ESG)

Research and analysis around ESG, CSR, sustainability, and finance-oriented data questions.

### Practical Reinforcement Learning

[View repository](https://github.com/pakshingho/Practical-Reinforcement-Learning-HSE)

Practical reinforcement learning notebooks and exercises focused on policy learning and sequential decision-making.
