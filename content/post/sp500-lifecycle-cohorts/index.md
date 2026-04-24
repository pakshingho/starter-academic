---
title: Lifecycle investment simulation across 100 birth cohorts
date: 2026-04-24
draft: false
summary: Simulate $1/month S&P 500 investing for cohorts born in each year from 1926 through 2025.
---

This simulation tracks **100 people**, one born in each year from **1926 to 2025**.

- Each person invests **$1 every month** once they enter the labor force at age **25**.
- They continue until retirement at age **65**.
- If they are younger than 65 by **December 2025**, they are treated as still holding through December 2025.
- We use annual S&P 500 total returns (1926-2025) and convert each year into a constant monthly growth rate for a simple monthly approximation.

![Lifecycle S&P 500 cohort returns](sp500_lifecycle_returns.svg)

Download the cohort-level output: [CSV](sp500_lifecycle_returns.csv).
