---
title: 1. Probability and Uncertainty
linktitle: 1. Probability
toc: false
type: docs
date: 2026-03-15
lastmod: 2026-03-15
draft: false
math: true
menu:
  data-science-foundations:
    identifier: chapter-probability
    weight: 3
weight: 3
---

Probability gives you a language for uncertainty. In data science, that matters because observed data is noisy, incomplete, and usually only one sample from a much larger process.

### The few ideas that matter most

You do not need every theorem on day one. You do need these core ideas:

- events and probabilities
- random variables
- expectation and variance
- conditional probability
- independence
- a few common distributions

### Random variables, expectation, and variance

A random variable is a numeric quantity whose value is uncertain before observation.

Expectation tells you the long-run average value:

$$
\mathbb{E}[X] =
\sum_x x P(X=x)
\quad \text{or} \quad
\int x f_X(x)\,dx
$$

Variance tells you how spread out the values are around the mean:

$$
\mathrm{Var}(X) = \mathbb{E}\left[(X - \mathbb{E}[X])^2\right]
$$

In practice:

- expected value is useful for forecasting average outcomes
- variance is useful for understanding risk, volatility, and uncertainty

### Conditional probability and Bayes' rule

Conditional probability answers questions of the form: what is the chance of event $A$ after learning that event $B$ happened?

$$
P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}
$$

This is Bayes' rule. It matters whenever you update beliefs using evidence, such as:

- fraud risk after a suspicious pattern is detected
- disease probability after a test result
- click or conversion probability after observing user behavior

The most common mistake here is forgetting base rates. A rare event can still be unlikely even after a seemingly strong signal.

![A quick map from data-generating story to useful probability tools](/media/handbooks/data-science/probability-map.svg)

### The law of total probability

If a population can be broken into mutually exclusive groups $B_1, \dots, B_k$, then:

$$
P(A) = \sum_{i=1}^{k} P(A \mid B_i)P(B_i)
$$

This is a useful mental model for segmented systems. A global rate is often just a weighted combination of subgroup rates.

### Independence is stronger than "not obviously related"

Two events are independent if knowing one does not change the probability of the other:

$$
P(A \cap B) = P(A)P(B)
$$

In real datasets, true independence is rarer than people think. Shared causes, selection effects, and time trends create dependence easily.

Conditional independence is also important. Two variables that look related overall may become independent after conditioning on the right context, and the reverse can also happen.

### Counting: when order matters and when it does not

Many probability questions reduce to counting possible outcomes.

If order matters, use permutations:

$$
{}_nP_k = \frac{n!}{(n-k)!}
$$

If order does not matter, use combinations:

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

This shows up in sampling, password-style problems, card draws, and simple simulation logic.

### Distributions worth recognizing

| Distribution | Use it when | Typical example |
| --- | --- | --- |
| Bernoulli / Binomial | outcome is yes or no | converted or not, clicked or not |
| Poisson | counting events in a fixed interval | support tickets per hour |
| Normal | many small effects add together | measurement noise, aggregated averages |
| Exponential | time until an event | wait time until arrival |

You do not need to memorize every PDF. What matters more is recognizing the data-generating story behind the variable.

### One important correction people miss

For a continuous random variable, the value of the PDF at a point is not itself a probability. Probability comes from area under the density curve across an interval.

That small distinction prevents a lot of conceptual confusion later.

### Chapter takeaway

Probability matters less as a collection of tricks and more as a habit of mind:

- ask what is uncertain
- ask what is being conditioned on
- ask whether the average, the spread, or the tails matter most

Next: [Statistics and Experiments](../statistics-and-experiments/).
