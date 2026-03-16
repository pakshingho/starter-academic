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

### When to use a z-test versus a t-test

Two common test statistics for mean comparisons are the z-test and the t-test. They are closely related, but they are not interchangeable in every setting.

Use a z-test when:

- the sampling distribution is approximately normal and the population variance is known
- or the sample is large enough that the standard normal approximation is acceptable
- or you are working with proportions, where z-based approximations are common in large-sample experiments

Use a t-test when:

- you are testing a mean and the population variance is unknown
- the sample is not especially large
- you estimate uncertainty using the sample standard deviation rather than a known population value

The main idea is simple:

- z-tests treat the scale of uncertainty as known
- t-tests account for the extra uncertainty from estimating that scale from the sample itself

That is why the t-distribution has heavier tails than the standard normal. It is more cautious, especially in smaller samples.

In formulas, the classic one-sample statistics look like:

$$
z = \frac{\bar X - \mu_0}{\sigma / \sqrt{n}}
\qquad
\text{and}
\qquad
t = \frac{\bar X - \mu_0}{s / \sqrt{n}}
$$

where $\sigma$ is the population standard deviation and $s$ is the sample standard deviation.

In practice:

- for many large-scale online experiments on proportions, z-based tests are common
- for smaller-sample mean comparisons, t-tests are usually the safer default
- as sample size grows, the t-test and z-test often become numerically very similar

The main mistake to avoid is using a z-test out of habit when the variance is unknown and the sample is small. In that setting, a t-test is usually the more defensible choice.

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

### Sample size requirements and minimum detectable effect

Before launching an experiment, you should ask a simple question:

- how much traffic do we need before this test can realistically detect an effect we care about?

That is a sample-size question. If the experiment is too small, even a real improvement may look indistinguishable from noise.

The key inputs are:

- significance level $\alpha$
- desired power, often $1-\beta$
- baseline rate or variance
- the minimum detectable effect (MDE), meaning the smallest effect worth detecting

The MDE is especially important. If you set it too small, sample requirements can become impractically large. If you set it too large, the test may miss effects that actually matter.

For a balanced two-group experiment on a proportion metric, a common rough approximation for the required sample size per group is:

$$
n \approx
\frac{
2\left(z_{1-\alpha/2} + z_{1-\beta}\right)^2 p(1-p)
}{
\delta^2
}
$$

where:

- $p$ is the baseline conversion rate
- $\delta$ is the absolute lift you want to detect

This formula captures the main intuition:

- smaller effects need much larger samples
- noisier metrics need larger samples
- higher confidence and higher power both require more data

As a concrete example, a 0.2 percentage-point lift can require far more traffic than a 2 percentage-point lift, even when everything else stays the same.

### Practical sample-size guidance

- decide the MDE from business value, not wishful thinking
- estimate sample size before launch instead of after seeing weak results
- remember that guardrail metrics often need their own power analysis
- expect segment-level reads to need much more traffic than the headline result

In practice, sample size is part of experiment design, not a formality. It determines whether the test can answer the question it was meant to answer.

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
