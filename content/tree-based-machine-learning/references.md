---
title: 7. References and Further Study
linktitle: 7. References and Further Study
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
menu:
  tree-based-machine-learning:
    identifier: chapter-references
    weight: 9
weight: 9
---

Use these references to deepen specific topics after working through the handbook.

### Core documentation

- [scikit-learn: Decision Trees](https://scikit-learn.org/stable/modules/tree.html)
- [scikit-learn: Ensemble Methods](https://scikit-learn.org/stable/modules/ensemble.html)
- [scikit-learn: Permutation Feature Importance](https://scikit-learn.org/stable/modules/permutation_importance.html)
- [XGBoost documentation](https://xgboost.readthedocs.io/en/stable/)
- [LightGBM documentation](https://lightgbm.readthedocs.io/en/stable/)
- [CatBoost documentation](https://catboost.ai/docs/)

### Foundational reading

- [Random Forests](https://doi.org/10.1023/A:1010933404324)
  Leo Breiman's original random forest paper.
- [Extremely randomized trees](https://doi.org/10.1007/s10994-006-6226-1)
  The original ExtraTrees paper by Geurts, Ernst, and Wehenkel.
- [Greedy Function Approximation: A Gradient Boosting Machine](https://doi.org/10.1214/aos/1013203451)
  Jerome Friedman's classic gradient boosting paper.
- [Understanding Random Forests: From Theory to Practice](https://arxiv.org/abs/1407.7502)
  A practical and readable reference for tree ensembles, bias-variance intuition, and random forest variants.

### Deep learning versus trees on tabular data

- [Tabular Data: Deep Learning is Not All You Need](https://arxiv.org/abs/2106.03253)
  A useful benchmark-style paper showing that XGBoost often outperformed several deep tabular models on the evaluated datasets while also requiring less tuning effort.
- [Why do tree-based models still outperform deep learning on typical tabular data?](https://proceedings.neurips.cc/paper_files/paper/2022/file/0378c7692da36807bdec87ab043cdadc-Paper-Datasets_and_Benchmarks.pdf)
  A strong reference for the argument that tree-based models remain the default baseline on many medium-sized tabular tasks, and for the more detailed discussion of why tabular neural networks struggle.

### Modern tree libraries

- [XGBoost: A Scalable Tree Boosting System](https://arxiv.org/abs/1603.02754)
- [LightGBM: A Highly Efficient Gradient Boosting Decision Tree](https://proceedings.neurips.cc/paper_files/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html)
- [CatBoost: unbiased boosting with categorical features](https://proceedings.neurips.cc/paper_files/paper/2018/hash/14491b756b3a51daac4124863285549-Abstract.html)

### Topics worth following up

- post-pruning strategies for single trees
- out-of-bag error versus cross-validation
- correlated features and importance instability
- when permutation importance is more trustworthy than impurity importance
- handling categorical features across boosted-tree libraries

### Suggested next step after this course

Take one real tabular workflow from your own work and compare:

- a regularized single tree
- a random forest or ExtraTrees model
- one boosting implementation

Then write down:

- what changed in performance
- what changed in interpretability
- what changed in tuning burden

That comparison usually teaches more than reading another round of definitions.
