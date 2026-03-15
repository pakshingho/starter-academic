---
title: 9. References and Further Study
linktitle: 9. References and Further Study
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
menu:
  tabular-machine-learning:
    identifier: chapter-references
    weight: 11
weight: 11
---

Use these references to deepen specific topics after working through the handbook.

### Core learning resources

- [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- [Dive into Deep Learning](https://d2l.ai/)
- [NLTK documentation](https://www.nltk.org/)
- [Amazon SageMaker documentation](https://docs.aws.amazon.com/sagemaker/)

### Good follow-on topics

- calibration and threshold selection
- feature importance and interpretability
- temporal validation for forecasting-style tabular tasks
- probability estimation and decision analysis
- monitoring, drift, and retraining policy

### Modern benchmarks and foundation models

- [TabArena live leaderboard](https://tabarena.ai/)
  The most useful live reference for current tabular performance comparisons. As of March 14, 2026, its public no-imputation / lite / all-tasks / all-datasets board lists `RealTabPFN-v2.5 (tuned + ensembled)` at Elo `1648`, `AutoGluon 1.4 (extreme, 4h)` at `1640`, and strong tuned-plus-ensembled tree baselines like `LightGBM` (`1440`), `CatBoost` (`1414`), and `XGBoost` (`1387`). Use the live board for the latest ranking because these results can change over time.
- [TabArena](https://github.com/autogluon/tabarena)
  A living benchmark for tabular machine learning that focuses on realistic evaluation, curated datasets, multiple splits, and strong tuning practices. It is a useful reference point for understanding how serious tabular comparisons are increasingly done.
- [TabPFN and Prior Labs documentation](https://docs.priorlabs.ai/)
  TabPFN is a tabular foundation model family trained on large amounts of synthetic data so it can learn reusable tabular patterns and perform strong prediction with very little task-specific tuning. It is worth knowing because it changes what a strong modern baseline can look like.
- [TabPFN-2.5](https://priorlabs.ai/tabpfn)
  TabPFN-2.5 is the newer generation in that family. It extends the same synthetic pre-training idea to larger tabular settings and is worth tracking as part of the current movement toward foundation-model-style workflows for structured data.
- [TabPFN-TS](https://github.com/PriorLabs/tabpfn-time-series)
  TabPFN-TS adapts the TabPFN approach to time series forecasting by reframing forecasting as a tabular regression problem and combining the model with lightweight feature engineering for zero-shot forecasting tasks.

### AutoML libraries and platforms

- [AutoGluon Tabular](https://auto.gluon.ai/stable/api/autogluon.tabular.TabularPredictor.fit.html)
  A strong practical choice for tabular AutoML when you want competitive baselines, ensembles, and a relatively compact Python API.
- [FLAML AutoML](https://microsoft.github.io/FLAML/docs/reference/automl/automl/)
  A lightweight AutoML library designed around efficient search and explicit time-budget control.
- [auto-sklearn](https://automl.github.io/auto-sklearn/master/manual.html)
  A scikit-learn-oriented AutoML system that is especially natural if your workflow already centers on sklearn pipelines and conventions.
- [H2O AutoML](https://docs.h2o.ai/h2o/latest-stable/h2o-r/docs/reference/h2o.automl.html)
  A leaderboard-style AutoML system that trains multiple model families and stacked ensembles inside the H2O ecosystem.

### Benchmark references for AutoML vs baselines

- [AMLB: an AutoML Benchmark](https://jmlr.org/papers/v25/22-0493.html)
  A strong starting reference for comparing major AutoML systems against each other. The benchmark compares 9 AutoML frameworks across 71 classification tasks and 33 regression tasks, and evaluates not just accuracy but also inference-time trade-offs and framework failures.
- [AutoGluon-Tabular: Robust and Accurate AutoML for Structured Data](https://arxiv.org/abs/2003.06505)
  Useful when you want a direct framework comparison involving AutoGluon, H2O, auto-sklearn, TPOT, AutoWEKA, and Google AutoML Tables on 50 classification and regression tasks from Kaggle and the OpenML AutoML Benchmark.
- [Auto-Sklearn 2.0: Hands-free AutoML via Meta-Learning](https://arxiv.org/abs/2007.04074)
  Useful for understanding how a modern auto-sklearn variant compares with earlier auto-sklearn and other popular AutoML frameworks on 39 benchmark datasets under time constraints.
- [FLAML: A Fast and Lightweight AutoML Library](https://proceedings.mlsys.org/paper_files/paper/2021/hash/92cc227532d17e56e07902b254dfad10-Abstract.html)
  Especially useful when the comparison question is not only accuracy but also budget efficiency, since the paper emphasizes equal-budget and low-compute comparisons against other AutoML libraries.
- [H2O AutoML: Scalable Automatic Machine Learning](https://www.automl.org/wp-content/uploads/2020/07/AutoML_2020_paper_61.pdf)
  Useful for understanding the H2O AutoML design itself and for tracing how it was positioned relative to other open-source AutoML systems in OpenML benchmark-style evaluations.
- [TabArena: A Living Benchmark for Machine Learning on Tabular Data](https://arxiv.org/abs/2506.16791)
  Particularly useful when you want to compare strong modern methods against tuned non-AutoML baselines such as CatBoost, LightGBM, XGBoost, Random Forest, and newer deep or foundation models. This is a better reference than older AutoML-only benchmarks when the question is how AutoML-style workflows compare with today’s strongest tree-based methods.

For comparisons among tools that are not all shown on the same public live board, combine the live TabArena leaderboard with the framework-specific benchmark papers above. That gives a better picture than relying on any single leaderboard snapshot alone.

### Topic-specific further reading

- [An overview of gradient descent optimization algorithms](https://ruder.io/optimizing-gradient-descent/)
- [Understanding Random Forests: From Theory to Practice](https://arxiv.org/abs/1407.7502)
- [Interpretable Machine Learning](https://christophm.github.io/interpretable-ml-book/)

### Suggested next step after this course

After finishing this short course, a natural next move is to take one workflow from your own work and rewrite it using the checklist below:

- target and decision
- split strategy
- metric choice
- preprocessing pipeline
- baseline model
- stronger comparison model
- risk and monitoring notes

That exercise usually turns passive understanding into applied competence much faster than reading more theory.
