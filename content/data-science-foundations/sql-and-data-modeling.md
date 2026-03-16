---
title: 4. SQL and Data Modeling
linktitle: 4. SQL
toc: false
type: docs
date: 2026-03-15
lastmod: 2026-03-15
draft: false
menu:
  data-science-foundations:
    identifier: chapter-sql
    weight: 6
weight: 6
---

SQL is still one of the highest-leverage skills in data science. Even when modeling is the end goal, most of the work starts with defining the right table, extracting the right rows, and aggregating at the right grain.

### Start with the grain

Before writing any query, answer this question:

- what does one row represent?

That single habit prevents many common mistakes.

Examples of grain:

- one row per order
- one row per user-day
- one row per device event
- one row per experiment assignment

If you do not know the grain, you do not know what `COUNT(*)` means.

### The core SQL building blocks

The minimum useful set is:

- `SELECT`
- `FROM` and `JOIN`
- `WHERE`
- `GROUP BY`
- `HAVING`
- `ORDER BY`
- common table expressions with `WITH`
- window functions such as `ROW_NUMBER`, `RANK`, `LAG`, and rolling aggregates

### Read queries in the order the data changes

A practical mental model is:

1. choose tables and joins
2. filter rows
3. group or partition
4. compute aggregates or window functions
5. select final columns
6. sort or limit for presentation

That order is often more useful than memorizing surface syntax.

### Joins are where many metric bugs are born

| Join type | Keeps what | Common use |
| --- | --- | --- |
| inner join | only matching rows from both sides | compare entities with complete matches |
| left join | all rows from the left table | preserve a base population even when related records are missing |
| full join | everything from both sides | reconciliation and coverage checks |

The biggest pitfall is accidental duplication. If one user has many events, joining `users` to `events` changes the row count. Metrics such as conversion rate or retention can become wrong unless you aggregate back to the correct grain.

### CTEs and window functions

CTEs help break a problem into readable stages. Window functions help compare rows without collapsing them.

A simple example:

```sql
WITH daily_orders AS (
  SELECT
    order_date,
    COUNT(*) AS orders
  FROM fact_orders
  GROUP BY order_date
)
SELECT
  order_date,
  orders,
  AVG(orders) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS rolling_7d_avg
FROM daily_orders
ORDER BY order_date;
```

This keeps the daily rows while adding a rolling average for context.

### Data modeling basics

The most important schema concepts for early-career data science are:

- primary keys: uniquely identify rows
- foreign keys: link related tables
- fact tables: store events or measurements
- dimension tables: store descriptive attributes

Normalization reduces redundancy and improves consistency. Denormalization can improve read performance and ease downstream analysis. Neither is always right; the right choice depends on the system and workload.

### What matters more than advanced database theory

For most fresh graduates, these habits matter more than knowing distributed database slogans:

- define the grain explicitly
- know which table is the source of truth
- check for duplicates and null join keys
- verify row counts before and after joins
- validate metrics on a small slice before trusting a large query

### Chapter takeaway

Strong SQL is less about clever syntax and more about disciplined thinking about tables, grain, joins, and business definitions.

Next: [Coding Habits for Data Work](../coding-habits-for-data-work/).
