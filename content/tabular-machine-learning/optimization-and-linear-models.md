---
title: 6. Optimization and Linear Models
linktitle: 6. Optimization
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tabular-machine-learning:
    identifier: chapter-optimization
    weight: 8
weight: 8
---

Optimization is the engine underneath most machine learning. Even if you never derive gradients by hand, you should still understand what is being minimized and why.

### Learning goals

- understand objective functions and gradient descent at a conceptual level
- connect optimization to linear and logistic regression
- see why regularization matters

### Objective functions

Training a model usually means choosing parameters that minimize an error or loss function.

In compact form, many supervised-learning problems look like:

$$
\min_{\theta} L(\theta)
=
\min_{\theta} \frac{1}{n}\sum_{i=1}^{n} \ell\left(y_i, f_{\theta}(x_i)\right)
$$

Conceptually, the model asks:

- How wrong am I right now?
- In which direction should I adjust my parameters to become less wrong?

This turns model fitting into an optimization problem.

### Gradient descent intuition

Gradient descent is an iterative way to reduce the loss.

The rough picture is:

1. start with an initial parameter setting
2. measure the slope of the loss surface
3. move in the direction that lowers the loss
4. repeat until improvement becomes small or a stopping rule is reached

That is the core idea behind a wide range of models, not just neural networks.

The canonical update is:

$$
\theta^{(t+1)} = \theta^{(t)} - \eta \nabla_{\theta} L\left(\theta^{(t)}\right)
$$

where $\eta$ is the learning rate.

### Linear regression

Linear regression predicts a numeric outcome as a weighted combination of input features.

It is most useful when:

- interpretability matters
- the signal is reasonably smooth
- you want a strong baseline for numerical prediction

Even when the world is not perfectly linear, linear regression is often worth fitting because it clarifies direction, magnitude, and baseline difficulty.

The basic model and squared-error loss are:

$$
\hat y = \beta_0 + x^\top \beta,
\qquad
L(\beta) = \frac{1}{n}\sum_{i=1}^{n} \left(y_i - \beta_0 - x_i^\top \beta\right)^2
$$

### From linear to logistic regression

Classification needs outputs that behave like probabilities or decisions, not unrestricted numbers. Logistic regression adapts the linear idea by transforming the output through a sigmoid-like mapping and optimizing a classification-appropriate loss.

This makes logistic regression a foundational model for binary classification:

- simple
- interpretable
- often surprisingly competitive

The usual probability mapping is:

$$
\mathbb{P}(y=1 \mid x) = \sigma(\beta_0 + x^\top \beta),
\qquad
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

### Regularization

Regularization adds a penalty for overly large or overly flexible parameter values.

Its main job is to reduce overfitting and improve generalization.

A useful intuition:

- without regularization, a model may memorize quirks
- with too much regularization, a model may become too rigid

Good regularization is not about making a model smaller for its own sake. It is about trading a little training fit for better out-of-sample behavior.

Two classic regularized objectives are:

$$
L_{\mathrm{ridge}}(\beta) = L(\beta) + \lambda \lVert \beta \rVert_2^2,
\qquad
L_{\mathrm{lasso}}(\beta) = L(\beta) + \lambda \lVert \beta \rVert_1
$$

### Why these models still matter

Linear and logistic regression remain valuable because they:

- train quickly
- establish strong baselines
- offer interpretability
- force clean thinking about features and assumptions

They also provide the conceptual bridge to more advanced optimization-based models.

| Model | Core output | Strength | Typical limitation |
| --- | --- | --- | --- |
| Linear regression | numeric prediction | fast, interpretable baseline | misses nonlinear structure |
| Logistic regression | class probability | strong calibrated baseline for binary tasks | decision boundary is linear in feature space |
| Ridge regression | shrunk linear coefficients | stable when features are correlated | does not do feature selection directly |
| Lasso regression | sparse linear coefficients | can simplify wide feature sets | unstable when strong predictors are highly correlated |

### Chapter takeaway

Optimization is easier to understand when you connect it to familiar models first. Linear and logistic regression are ideal for building that intuition.

### Practice

Write down one problem where you would begin with logistic regression before trying a tree or neural network. Explain why.

Then continue to [Boosting, Neural Networks, and AutoML](../boosting-neural-networks-and-automl/).
