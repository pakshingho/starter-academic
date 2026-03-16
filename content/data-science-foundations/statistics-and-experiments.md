---
title: 2. Statistics and Experiments
linktitle: 2. Statistics
toc: false
type: docs
date: 2026-03-15
lastmod: 2026-03-15
draft: false
math: true
menu:
  data-science-foundations:
    identifier: chapter-statistics
    weight: 4
weight: 4
---

Statistics is how we turn noisy samples into defensible claims. In applied data science, that usually means estimating uncertainty, testing ideas carefully, and deciding whether an observed change is worth acting on.

### Sampling variability is the default

Two samples from the same process will not look identical. That is normal, not a bug.

This is why data scientists need more than point estimates. A metric without uncertainty can be actively misleading.

### Law of large numbers and central limit theorem

The law of large numbers says that sample averages stabilize as sample size grows.

The central limit theorem says that, under common conditions, the sampling distribution of the sample mean becomes approximately normal as the sample gets large enough:

$$
\bar X \approx \mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right)
$$

That approximation powers confidence intervals and many standard hypothesis tests.

Important caveat: the CLT is not magic. Heavy dependence, extreme tails, or tiny samples can make the approximation poor.

### Confidence intervals

A confidence interval gives a plausible range for an unknown parameter:

$$
\hat \theta \pm z_{\alpha/2}\,\mathrm{SE}(\hat \theta)
$$

The practical purpose is not ritual. It is to show both effect size and uncertainty in the same answer.

### Hypothesis testing

The usual workflow is:

1. state a null and alternative hypothesis
2. choose a test statistic
3. compute a p-value or confidence interval
4. compare the evidence with your decision threshold

What a p-value does mean:

- how surprising the observed result would be if the null model were true

What a p-value does not mean:

- the probability that the null hypothesis is true
- the probability that the result will replicate
- proof that the effect matters in practice

### Type I error, Type II error, and power

- Type I error: false alarm
- Type II error: missed real effect
- Power: probability of detecting a real effect of meaningful size

Good experimentation is not only about keeping Type I error small. It is also about making sure the experiment is capable of detecting the effect size you actually care about.

### A/B testing as a disciplined workflow

In product and growth settings, the most common experimental pattern is randomized comparison between treatment and control.

![A practical flow for designing and reading experiments](/media/handbooks/data-science/experiment-lifecycle.svg)

For a difference in proportions, a common standard error is:

$$
\mathrm{SE}(\hat p_T - \hat p_C) =
\sqrt{
\frac{\hat p_T(1-\hat p_T)}{n_T}
+
\frac{\hat p_C(1-\hat p_C)}{n_C}
}
$$

That estimate helps you judge whether a measured conversion lift is large relative to ordinary noise.

### What to decide before launching an experiment

- the unit of randomization
- the primary success metric
- guardrail metrics such as latency, cancellations, abuse, or support load
- the minimum effect size worth shipping
- the analysis window and stopping rule

If these are vague before launch, the interpretation often becomes vague after launch too.

### Common mistakes in real experiments

| Failure mode | Why it matters |
| --- | --- |
| peeking too early | repeated looks inflate false positives unless handled correctly |
| multiple testing | some "wins" appear by chance when enough metrics or variants are checked |
| sample ratio mismatch | treatment assignment or logging may be broken |
| novelty effects | short-term excitement may not represent steady-state behavior |
| interference | one user's treatment can affect another user's outcome |

### Bonferroni correction and multiple testing

If you test many hypotheses at once, the chance of at least one false positive rises. That is why a result can look significant in one metric or segment even when nothing real changed.

The Bonferroni correction is the simplest adjustment:

$$
\alpha_{\text{per test}} = \frac{\alpha_{\text{family}}}{m}
$$

where $m$ is the number of hypotheses being tested.

For example, if you want a family-wise error rate of $0.05$ across 5 tests, you would judge each individual test against $0.01$ instead of $0.05$.

You can think about it in two equivalent ways:

- divide the acceptable error budget by the number of tests
- or multiply each p-value by the number of tests and compare the adjusted value to the original threshold

Why this matters in experimentation:

- comparing many product metrics increases the chance of a spurious win
- slicing results across many segments can create noisy "discoveries"
- testing many variants at once makes naive interpretation too optimistic

The main downside is that Bonferroni is conservative. It reduces false positives, but it also makes real effects harder to detect, especially when the number of tests is large or when many tests are correlated.

So the practical rule is:

- use Bonferroni when the number of tests is modest and you want a simple, cautious adjustment
- avoid treating it as a substitute for pre-registering a primary metric and limiting unnecessary comparisons

### Statistical significance is not business significance

With large enough sample sizes, tiny effects can look statistically convincing while still being irrelevant to the business. The reverse can also happen: a meaningful effect may fail to reach significance because the experiment was underpowered.

Good judgment requires both questions:

- Is the signal real enough?
- Is the signal large enough to matter?

### Chapter takeaway

A strong data scientist does not treat statistics as ceremony. They use it to separate noise from signal, and to avoid making confident decisions from fragile evidence.

Next: [Machine Learning Essentials](../machine-learning-essentials/).
