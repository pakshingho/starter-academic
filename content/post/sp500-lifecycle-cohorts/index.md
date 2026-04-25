---
title: Lifecycle investment simulation across 200 birth cohorts
date: 2026-04-25
draft: false
summary: Interactive lifecycle growth curves for monthly $1 investing by birth cohort (1826-2025).
---

This simulation tracks **200 people**, one born in each year from **1826 to 2025**.

- Start investing at age **25**.
- Stop at age **65** (or hold through **December 2025** if not yet retired).
- Uses annual returns derived from source: **fallback_slickcharts_annual_total_return**.
- Market data coverage in this run: **1926 to 2025**.
- For cohorts whose labor-force entry starts before the first available market year, simulation starts at that first available year.

## Cohort outcomes at retirement/end date (monthly $1 investing)

<div id="cohort-summary-chart" style="width:100%;height:500px"></div>

### Variant: cohort outcomes by ending portfolio value

<div id="cohort-summary-value-chart" style="width:100%;height:500px"></div>

Download: [Monthly cohort summary CSV](sp500_lifecycle_returns.csv).

## Interactive stacked lifecycle curves — monthly $1 investing

Hover with a cursor (desktop) or press a point (mobile touch) to view each point's **birth year**, **age**, and **portfolio value**.

<div id="monthly-lifecycle-chart" style="width:100%;height:680px"></div>

<script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
<script>
async function renderSummaryChart() {
  const response = await fetch('sp500_lifecycle_summary.json');
  const payload = await response.json();

  const x = payload.points.map((p) => p.birth_year);
  const y = payload.points.map((p) => p.cumulative_return_pct);
  const text = payload.points.map((p) =>
    `Birth year: ${p.birth_year}<br>Months investing: ${p.months_investing}<br>Total contributed: $${p.total_contributed.toFixed(2)}<br>Ending value: $${p.ending_value.toFixed(2)}<br>Cumulative return: ${p.cumulative_return_pct.toFixed(2)}%`
  );

  const trace = {
    x,
    y,
    text,
    hovertemplate: '%{text}<extra></extra>',
    mode: 'lines+markers',
    line: {width: 2},
    marker: {size: 6},
    name: 'Cohort return',
  };

  const layout = {
    title: 'Cohort outcomes by birth year (monthly $1 lifecycle investing)',
    xaxis: {title: 'Birth year'},
    yaxis: {title: 'Cumulative return (%)'},
    hovermode: 'closest',
    template: 'plotly_white',
    showlegend: false,
    margin: {l: 70, r: 20, t: 60, b: 60},
  };

  Plotly.newPlot('cohort-summary-chart', [trace], layout, {responsive: true, displayModeBar: true});
}

async function renderSummaryValueChart() {
  const response = await fetch('sp500_lifecycle_summary.json');
  const payload = await response.json();

  const x = payload.points.map((p) => p.birth_year);
  const y = payload.points.map((p) => p.ending_value);
  const text = payload.points.map((p) =>
    `Birth year: ${p.birth_year}<br>Months investing: ${p.months_investing}<br>Total contributed: $${p.total_contributed.toFixed(2)}<br>Ending value: $${p.ending_value.toFixed(2)}`
  );

  const trace = {
    x,
    y,
    text,
    hovertemplate: '%{text}<extra></extra>',
    mode: 'lines+markers',
    line: {width: 2},
    marker: {size: 6},
    name: 'Ending portfolio value',
  };

  const layout = {
    title: 'Cohort ending portfolio value by birth year (monthly $1 lifecycle investing)',
    xaxis: {title: 'Birth year'},
    yaxis: {title: 'Ending value ($)'},
    hovermode: 'closest',
    template: 'plotly_white',
    showlegend: false,
    margin: {l: 70, r: 20, t: 60, b: 60},
  };

  Plotly.newPlot('cohort-summary-value-chart', [trace], layout, {responsive: true, displayModeBar: true});
}

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

renderSummaryChart();
renderSummaryValueChart();
renderLifecycleChart();
</script>
