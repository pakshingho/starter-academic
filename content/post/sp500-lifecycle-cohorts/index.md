---
title: Lifecycle investment simulation across 200 birth cohorts
date: 2026-04-25
draft: false
summary: Interactive lifecycle growth curves for monthly $1 investing by birth cohort (1826-2025).
---

This simulation tracks **200 people**, one born in each year from **1826 to 2025**.

- Start investing at age **25**.
- Stop at age **65** (or hold through **December 2025** if not yet retired).
- Uses annual S&P 500 total returns (1926-2025) converted to smooth monthly growth.
- For cohorts whose labor-force entry starts before 1926, the simulation begins at **January 1926** (first available market return year in this dataset).

## Cohort outcomes at retirement/end date (monthly $1 investing)

![Lifecycle S&P 500 cohort returns](sp500_lifecycle_returns.svg)

Download: [Monthly cohort summary CSV](sp500_lifecycle_returns.csv).

## Interactive stacked lifecycle curves — monthly $1 investing

Hover with a cursor (desktop) or press a point (mobile touch) to view each point's **birth year**, **age**, and **portfolio value**.

<div id="monthly-lifecycle-chart" style="width:100%;height:680px"></div>

<script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
<script>
async function renderLifecycleChart() {
  const response = await fetch('monthly_lifecycle_curves.json');
  const payload = await response.json();

  const traces = payload.series.map((s) => ({
    x: s.x,
    y: s.y,
    name: String(s.birth_year),
    text: s.text,
    hovertemplate: '%{text}<extra></extra>',
    mode: 'lines+markers',
    line: {width: 1.2},
    marker: {size: 6, opacity: 0.001},
    opacity: 0.65,
  }));

  const layout = {
    title: '200 cohorts: monthly $1 investing (birth years 1826-2025)',
    xaxis: {title: 'Years since birth (age)'},
    yaxis: {title: 'Portfolio value ($)'},
    hovermode: 'closest',
    hoverdistance: 30,
    spikedistance: 30,
    template: 'plotly_white',
    showlegend: false,
    margin: {l: 70, r: 20, t: 60, b: 60},
  };

  const config = {responsive: true, displayModeBar: true, scrollZoom: true};
  Plotly.newPlot('monthly-lifecycle-chart', traces, layout, config);
}

renderLifecycleChart();
</script>
