---
title: Projects
date: 2026-02-24
type: page
---

This page collects public projects, tools, and technical writing that show how I approach Staff Data Scientist and technical leadership work: frame ambiguous decisions, choose credible methods, build reusable decision systems, and explain trade-offs clearly to product, business, and engineering partners.

My strongest fit is in roles where causal inference, experimentation, forecasting, marketplace economics, recommender systems, and applied machine learning need to move from analysis into repeatable decision-making.

## What These Projects Show

- **Technical depth:** causal inference, experimentation, forecasting, recommender systems, marketplace economics, and applied machine learning.
- **Product judgment:** emphasis on decision quality, metric design, trade-offs, and how model outputs change actions.
- **Leadership leverage:** reusable tools, handbooks, and frameworks that help teams reason more consistently.
- **Communication range:** materials designed for data scientists, product leaders, economists, engineers, and senior decision-makers.

## Flagship Decision Tools

### Causal Inference Method Selector

[Open project](/causal-inference-method-selector/)

An interactive decision-support tool for choosing causal inference methods from the structure of the problem rather than from a memorized list of estimators. The selector starts with the study design, identification strategy, and business objective, then surfaces viable methods, assumptions, diagnostics, and robustness checks.

It covers randomized experiments, switchbacks, CUPED, noncompliance, heterogeneous treatment effects, mediation, matching, propensity weighting, doubly robust estimation, difference-in-differences, event studies, interrupted time series, synthetic control, regression discontinuity, instrumental variables, and double machine learning.

**What it signals:** Staff-level causal inference work is often less about naming an estimator and more about helping teams avoid false certainty. This project shows how I turn a messy methodological choice into a shared operating system for product and business decisions.

### A/B Test Sample Size Calculator

[Open project](/experimentation-calculator/)

A planning tool for fixed-horizon A/B and multi-arm conversion experiments. It translates baseline rate, minimum detectable effect, significance level, power, traffic allocation, number of variants, and daily eligible users into required sample size and expected runtime.

The calculator is intentionally practical: it helps teams ask whether an experiment is feasible before launch, whether the target effect is decision-relevant, and how traffic allocation changes the cost of learning.

**What it signals:** Good experimentation leadership starts upstream of the p-value. This project demonstrates the kind of planning discipline needed to protect teams from underpowered tests, overlong experiments, and noisy decision cycles.

### Marketplace Pricing Simulator

[Open project](/marketplace-pricing-simulator/)

A richer marketplace simulator connecting demand curves, price elasticity, promotion depth, demand shocks, supplier payout, supply elasticity, take rate, matching efficiency, supplier incentives, and dynamic surge behavior. The presets mirror Uber, DoorDash, and Airbnb-style operating environments while keeping the underlying model transparent.

The tool supports both static equilibrium reasoning and a dynamic control view where shocks, surge, supply response, fill rate, and incentive policy interact over time.

**What it signals:** Marketplace decisions require more than a metric readout. This project shows how I connect economics, causal intuition, operational constraints, and product levers into a model that can support pricing, incentives, growth, and marketplace-quality discussions.

### Marketplace Simulator

[Open project](/marketplace-simulator/)

A compact two-sided marketplace model with linear demand, linear supply, and a platform take rate. It visualizes how fees create a wedge between buyer price and seller payout, then reports equilibrium quantity, GMV, platform revenue, consumer surplus, seller surplus, total surplus, and deadweight loss.

The model is deliberately simple enough to teach from, but complete enough to expose the central trade-offs behind marketplace monetization and welfare.

**What it signals:** Technical leaders need to create shared intuition, not just sophisticated models. This simulator is a communication artifact for aligning product, finance, policy, and data science partners around the same economic mechanism.

## Technical Handbooks and Enablement

### Understanding Recommender Systems

[Open handbook](/recommender-systems/)

A chapter-based guide to recommender systems for data scientists, spanning problem framing, feedback types, candidate generation, ranking, matrix factorization, two-tower architectures, contextual and hybrid recommenders, deep models, offline evaluation, online evaluation, and production concerns.

The handbook treats recommender systems as product systems, not just model families. It connects recommendation surfaces, feedback loops, negative sampling, retrieval/ranking architecture, and evaluation design.

**What it signals:** Staff-level recommender work requires judgment across modeling, infrastructure, user experience, metrics, and long-term marketplace health. This project demonstrates my ability to organize that system-level reasoning for other practitioners.

### Data Science Foundations for New Grads

[Open handbook](/data-science-foundations/)

A compact handbook on the minimum practical knowledge needed to contribute credibly as a new data scientist: uncertainty, statistics, experiments, machine learning basics, SQL, data modeling, coding habits, product metrics, and end-to-end case thinking.

It is built around reliability: knowing what question is being asked, what each row means, how uncertainty enters the decision, and how to communicate recommendations with assumptions intact.

**What it signals:** Technical leadership includes raising the floor for a team. This project shows mentorship instincts, standards-setting, and the ability to translate senior judgment into teachable operating principles.

### Applied Machine Learning for Tabular Data

[Open handbook](/tabular-machine-learning/)

A practical short course on how tabular ML projects are scoped, built, evaluated, and improved. It covers problem framing, target definition, leakage, data quality, train/validation/test design, metrics, feature engineering, preprocessing, pipelines, KNN, trees, linear models, boosting, neural networks, and AutoML.

The emphasis is on judgment: when to start with simple baselines, how to evaluate honestly, and how to avoid modeling choices that look impressive but fail under real operating conditions.

**What it signals:** Many high-value business problems still live in structured data. This project demonstrates practical ML leadership for production-adjacent settings where trust, evaluation quality, and maintainability matter.

### Decision Trees and Ensemble Methods in Machine Learning

[Open handbook](/tree-based-machine-learning/)

A focused course on decision trees, bagging, random forests, ExtraTrees, feature importance, proximities, boosting, XGBoost, LightGBM, and CatBoost. The course explains why tree-based methods remain a strong default for many structured-data problems, especially when mixed features, nonlinear interactions, and interpretability all matter.

It also stresses the limits of feature importance, the bias-variance trade-off, tuning risk, and the practical question of when deep learning is not the right default for tabular data.

**What it signals:** I can go deep on model mechanics while keeping the applied decision in view. That combination is important for technical leadership because model choice affects credibility, maintainability, and stakeholder trust.

### Economics of Digital Platforms

[Open notes](/economics-of-digital-platforms/)

A chapter-based set of notes on network effects, platform design, trust, monetization, customer value, marketing ROI, regulation, and strategy. The material links platform economics with product and measurement questions that come up in online marketplaces, ads, growth, subscriptions, and multi-sided products.

**What it signals:** Senior data science work in technology often sits inside platform incentives. These notes show the economic lens I bring to product metrics, pricing, growth, trust, and policy-sensitive decisions.

## Forecasting, NLP, and Model Understanding

### Macro Forecasting with Machine Learning

[Read project note](/post/macro-forecasting-with-machine-learning/)

A research-oriented technical note on machine learning for macroeconomic forecasting, including penalized regression, supervised factor models, nowcasting, and applications in central-bank and IMF-style forecasting settings.

**What it signals:** Forecasting leadership requires both statistical rigor and decision context. This project shows how I connect modern ML methods with econometric forecasting problems where uncertainty, horizon, and interpretability matter.

### Transformer Models for Time Series Forecasting

[Read project note](/post/transformer-models-for-time-series-forecasting/)

A technical walkthrough of transformer-based methods for time series forecasting, including sequence modeling, multi-horizon prediction, attention-based architectures, and Temporal Fusion Transformer-style ideas.

**What it signals:** I can evaluate newer modeling families without losing sight of forecasting fundamentals, interpretability, and operational use.

### NLP in Economics and Finance

[Read project note](/post/nlp-in-finance/)

A curated technical note on how NLP can extract signal from economic and financial text, including corporate disclosures, news, narrative data, and text-based forecasting.

**What it signals:** This connects my economics background with modern unstructured-data methods, especially for domains where text is a meaningful source of market, firm, or macro signal.

### Machine Learning and Deep Learning Interpretability

[Read project note](/post/machine-learning-interpretability/)

Notes on interpretability and explainability, including Shapley-value-based reasoning and practical resources for understanding model behavior.

**What it signals:** Senior data scientists need to make model outputs legible enough for decisions, review, and governance. This project reflects my bias toward models that can be inspected, challenged, and communicated.

### Transformer Explained and Visualized

[Read project note](/post/transformer-explained-visualized/)

A visual and conceptual explainer for transformer architecture, self-attention, and related deep learning ideas.

**What it signals:** Technical leaders often need to teach complex methods quickly. This project shows my ability to translate advanced ML concepts into accessible explanations.

## Code and Research Archive

These older public repositories and notes are useful context for the broader arc of my work. I would treat them as supporting evidence rather than the headline portfolio.

### A/B Testing

[View repository](https://github.com/pakshingho/AB-Testing)

Experimentation workflows and analysis notebooks focused on treatment-effect evaluation, statistical reasoning, and practical A/B testing analysis.

### Occupation Classification

[View repository](https://github.com/pakshingho/Occupation-Classification)

Applied classification modeling with structured labor-market data, using occupation and skill information from the O*NET ecosystem.

### ESG

[View repository](https://github.com/pakshingho/ESG)

Research and analysis around ESG, CSR, sustainability, and finance-oriented data questions.

### Practical Reinforcement Learning

[View repository](https://github.com/pakshingho/Practical-Reinforcement-Learning-HSE)

Practical reinforcement learning notebooks and exercises focused on policy learning and sequential decision-making.

## How I Think About Project Impact

The common thread across these projects is not a single technique. It is a way of working:

- start from the decision, not the dataset;
- identify what would make the estimate credible;
- choose methods that fit the design and operating constraints;
- build tools that make repeated decisions easier;
- communicate assumptions, uncertainty, and trade-offs plainly.

That is the kind of data science leadership I aim to bring to Staff Data Scientist, Applied Scientist, and technical lead roles.
