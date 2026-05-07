---
title: Projects
date: 2026-02-24
type: page
---

Projects, tools, and technical notes from my work across causal inference, experimentation, forecasting, marketplace economics, recommender systems, and applied machine learning.

The common thread is decision quality: clarifying the question, making assumptions visible, choosing methods that fit the design, and turning analysis into reusable tools or teaching materials.

## Project Themes

- **Methods:** causal inference, experimentation, forecasting, recommender systems, marketplace economics, and applied machine learning.
- **Decision focus:** metric design, trade-offs, uncertainty, and how model outputs change actions.
- **Reusable systems:** tools, handbooks, and frameworks that help teams reason more consistently.
- **Communication:** materials designed for data scientists, product leaders, economists, engineers, and senior decision-makers.

## Flagship Decision Tools

### Causal Inference Method Selector

[Open project](/causal-inference-method-selector/)

An interactive decision-support tool for choosing causal inference methods from the structure of the problem rather than from a memorized list of estimators. The selector starts with the study design, identification strategy, and business objective, then surfaces viable methods, assumptions, diagnostics, and robustness checks.

It covers randomized experiments, switchbacks, CUPED, noncompliance, heterogeneous treatment effects, mediation, matching, propensity weighting, doubly robust estimation, difference-in-differences, event studies, interrupted time series, synthetic control, regression discontinuity, instrumental variables, and double machine learning.

**Why it matters:** In applied causal inference, the estimator is only useful after the design and assumptions are clear. The selector keeps method choice tied to identification, diagnostics, and robustness checks.

### A/B Test Sample Size Calculator

[Open project](/experimentation-calculator/)

A planning tool for fixed-horizon A/B and multi-arm conversion experiments. It translates baseline rate, minimum detectable effect, significance level, power, traffic allocation, number of variants, and daily eligible users into required sample size and expected runtime.

The calculator is intentionally practical: it helps teams ask whether an experiment is feasible before launch, whether the target effect is decision-relevant, and how traffic allocation changes the cost of learning.

**Why it matters:** Experiment planning sets the cost and credibility of learning before launch. This tool makes the trade-offs behind power, MDE, traffic, and runtime explicit.

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

## Technical Handbooks

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

### Economics of Digital Platforms

[Open notes](/economics-of-digital-platforms/)

A chapter-based set of notes on network effects, platform design, trust, monetization, customer value, marketing ROI, regulation, and strategy. The material links platform economics with product and measurement questions that come up in online marketplaces, ads, growth, subscriptions, and multi-sided products.

**Why it matters:** Platform metrics are shaped by incentives, trust, pricing, market thickness, and regulation. These notes connect those forces to measurement and product decisions.

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
