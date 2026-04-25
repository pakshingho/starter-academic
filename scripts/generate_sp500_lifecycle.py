#!/usr/bin/env python3
"""Generate lifecycle S&P 500 cohort simulation assets (1826-2025 births)."""

from __future__ import annotations

import csv
import datetime as dt
import json
import math
from dataclasses import dataclass
from pathlib import Path

START_BIRTH_YEAR = 1826
END_BIRTH_YEAR = 2025
LABOR_FORCE_AGE = 25
RETIREMENT_AGE = 65
SIMULATION_END = dt.date(2025, 12, 31)
BASE_INDEX_LEVEL = 100.0
MARKET_DATA_START = dt.date(1926, 1, 1)

# Source used to populate values: https://www.slickcharts.com/sp500/returns
# (S&P 500 total returns by year, 1926-2025).
ANNUAL_TOTAL_RETURNS = {
    1926: 0.1162, 1927: 0.3749, 1928: 0.4361, 1929: -0.0842, 1930: -0.2490,
    1931: -0.4334, 1932: -0.0819, 1933: 0.5399, 1934: -0.0144, 1935: 0.4767,
    1936: 0.3392, 1937: -0.3503, 1938: 0.3112, 1939: -0.0041, 1940: -0.0978,
    1941: -0.1159, 1942: 0.2034, 1943: 0.2590, 1944: 0.1975, 1945: 0.3644,
    1946: -0.0807, 1947: 0.0571, 1948: 0.0550, 1949: 0.1879, 1950: 0.3171,
    1951: 0.2402, 1952: 0.1837, 1953: -0.0099, 1954: 0.5262, 1955: 0.3156,
    1956: 0.0656, 1957: -0.1078, 1958: 0.4336, 1959: 0.1196, 1960: 0.0047,
    1961: 0.2689, 1962: -0.0873, 1963: 0.2280, 1964: 0.1648, 1965: 0.1245,
    1966: -0.1006, 1967: 0.2398, 1968: 0.1106, 1969: -0.0850, 1970: 0.0401,
    1971: 0.1431, 1972: 0.1898, 1973: -0.1466, 1974: -0.2647, 1975: 0.3720,
    1976: 0.2384, 1977: -0.0718, 1978: 0.0656, 1979: 0.1844, 1980: 0.3242,
    1981: -0.0491, 1982: 0.2155, 1983: 0.2256, 1984: 0.0627, 1985: 0.3173,
    1986: 0.1867, 1987: 0.0525, 1988: 0.1661, 1989: 0.3169, 1990: -0.0310,
    1991: 0.3047, 1992: 0.0762, 1993: 0.1008, 1994: 0.0132, 1995: 0.3758,
    1996: 0.2296, 1997: 0.3336, 1998: 0.2858, 1999: 0.2104, 2000: -0.0910,
    2001: -0.1189, 2002: -0.2210, 2003: 0.2868, 2004: 0.1088, 2005: 0.0491,
    2006: 0.1579, 2007: 0.0549, 2008: -0.3700, 2009: 0.2646, 2010: 0.1506,
    2011: 0.0211, 2012: 0.1600, 2013: 0.3239, 2014: 0.1369, 2015: 0.0138,
    2016: 0.1196, 2017: 0.2183, 2018: -0.0438, 2019: 0.3149, 2020: 0.1840,
    2021: 0.2871, 2022: -0.1811, 2023: 0.2629, 2024: 0.2502, 2025: 0.1788,
}


@dataclass
class CohortResult:
    birth_year: int
    labor_force_start_month: dt.date
    start_month: dt.date
    end_month: dt.date
    months_investing: int
    total_contributed: float
    ending_value: float
    return_multiple: float
    cumulative_return_pct: float


def month_iter(start_month: dt.date, end_month: dt.date):
    cursor = start_month
    while cursor <= end_month:
        yield cursor
        if cursor.month == 12:
            cursor = dt.date(cursor.year + 1, 1, 1)
        else:
            cursor = dt.date(cursor.year, cursor.month + 1, 1)


def build_monthly_index() -> dict[dt.date, float]:
    monthly_prices: dict[dt.date, float] = {}
    level = BASE_INDEX_LEVEL

    for year in range(min(ANNUAL_TOTAL_RETURNS), max(ANNUAL_TOTAL_RETURNS) + 1):
        annual_ret = ANNUAL_TOTAL_RETURNS[year]
        monthly_growth = math.pow(1.0 + annual_ret, 1.0 / 12.0)

        for month in range(1, 13):
            month_key = dt.date(year, month, 1)
            monthly_prices[month_key] = level
            level *= monthly_growth

    return monthly_prices


def age_in_years(birth_year: int, month: dt.date) -> float:
    return (month.year - birth_year) + (month.month - 1) / 12.0


def simulate(monthly_prices: dict[dt.date, float]) -> tuple[list[CohortResult], list[dict[str, object]]]:
    results: list[CohortResult] = []
    curves: list[dict[str, object]] = []

    for birth_year in range(START_BIRTH_YEAR, END_BIRTH_YEAR + 1):
        labor_force_start_month = dt.date(birth_year + LABOR_FORCE_AGE, 1, 1)
        start_month = max(labor_force_start_month, MARKET_DATA_START)
        scheduled_end = dt.date(birth_year + RETIREMENT_AGE, 12, 1)
        end_month = min(scheduled_end, dt.date(SIMULATION_END.year, SIMULATION_END.month, 1))

        x_vals: list[float] = []
        y_vals: list[float] = []
        text_vals: list[str] = []

        if start_month > end_month:
            results.append(
                CohortResult(
                    birth_year,
                    labor_force_start_month,
                    start_month,
                    end_month,
                    0,
                    0.0,
                    0.0,
                    0.0,
                    0.0,
                )
            )
            curves.append({"birth_year": birth_year, "x": x_vals, "y": y_vals, "text": text_vals})
            continue

        shares = 0.0
        months = 0
        for month in month_iter(start_month, end_month):
            shares += 1.0 / monthly_prices[month]
            months += 1
            value = shares * monthly_prices[month]
            age = age_in_years(birth_year, month)

            x_vals.append(round(age, 4))
            y_vals.append(round(value, 4))
            text_vals.append(
                f"Birth year: {birth_year}<br>Age: {age:.2f}<br>Value: ${value:.2f}"
            )

        ending_value = shares * monthly_prices[end_month]
        contributed = float(months)
        return_multiple = ending_value / contributed
        cumulative_return_pct = (return_multiple - 1.0) * 100.0

        results.append(
            CohortResult(
                birth_year=birth_year,
                labor_force_start_month=labor_force_start_month,
                start_month=start_month,
                end_month=end_month,
                months_investing=months,
                total_contributed=contributed,
                ending_value=ending_value,
                return_multiple=return_multiple,
                cumulative_return_pct=cumulative_return_pct,
            )
        )
        curves.append({"birth_year": birth_year, "x": x_vals, "y": y_vals, "text": text_vals})

    return results, curves


def write_csv(results: list[CohortResult], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.writer(fh)
        writer.writerow([
            "birth_year", "labor_force_start_month", "start_month", "end_month", "months_investing", "total_contributed",
            "ending_value", "return_multiple", "cumulative_return_pct",
        ])
        for r in results:
            writer.writerow([
                r.birth_year,
                r.labor_force_start_month.isoformat(),
                r.start_month.isoformat(),
                r.end_month.isoformat(),
                r.months_investing,
                f"{r.total_contributed:.2f}",
                f"{r.ending_value:.6f}",
                f"{r.return_multiple:.6f}",
                f"{r.cumulative_return_pct:.2f}",
            ])


def write_curve_json(curves: list[dict[str, object]], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "meta": {
            "birth_year_start": START_BIRTH_YEAR,
            "birth_year_end": END_BIRTH_YEAR,
            "labor_force_age": LABOR_FORCE_AGE,
            "retirement_age": RETIREMENT_AGE,
            "simulation_end": SIMULATION_END.isoformat(),
            "frequency": "monthly",
            "contribution_per_period": 1.0,
        },
        "series": curves,
    }
    output_path.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")


def write_summary_json(results: list[CohortResult], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "meta": {
            "birth_year_start": START_BIRTH_YEAR,
            "birth_year_end": END_BIRTH_YEAR,
            "simulation_end": SIMULATION_END.isoformat(),
        },
        "points": [
            {
                "birth_year": r.birth_year,
                "months_investing": r.months_investing,
                "cumulative_return_pct": round(r.cumulative_return_pct, 4),
                "ending_value": round(r.ending_value, 4),
                "total_contributed": round(r.total_contributed, 4),
            }
            for r in results
        ],
    }
    output_path.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")


def write_svg(results: list[CohortResult], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    width, height = 1200, 700
    margin = {"left": 90, "right": 30, "top": 40, "bottom": 80}
    plot_w = width - margin["left"] - margin["right"]
    plot_h = height - margin["top"] - margin["bottom"]

    xs = [r.birth_year for r in results]
    ys = [r.cumulative_return_pct for r in results]
    min_y, max_y = min(ys), max(ys)
    pad = (max_y - min_y) * 0.08 if max_y > min_y else 1.0
    min_y -= pad
    max_y += pad

    def x_to_px(x: float) -> float:
        return margin["left"] + (x - xs[0]) / (xs[-1] - xs[0]) * plot_w

    def y_to_px(y: float) -> float:
        return margin["top"] + (max_y - y) / (max_y - min_y) * plot_h

    points = " ".join(f"{x_to_px(r.birth_year):.2f},{y_to_px(r.cumulative_return_pct):.2f}" for r in results)

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<style>text{font-family:Arial,sans-serif;fill:#111827}.title{font-size:24px;font-weight:700}.axis{font-size:13px}.small{font-size:12px;fill:#4b5563}</style>',
        f'<rect width="{width}" height="{height}" fill="white"/>',
        f'<text x="{width/2}" y="30" text-anchor="middle" class="title">Lifecycle S&amp;P 500 returns by birth year (1926-2025)</text>',
        f'<line x1="{margin["left"]}" y1="{height-margin["bottom"]}" x2="{width-margin["right"]}" y2="{height-margin["bottom"]}" stroke="#111827"/>',
        f'<line x1="{margin["left"]}" y1="{margin["top"]}" x2="{margin["left"]}" y2="{height-margin["bottom"]}" stroke="#111827"/>',
        f'<polyline points="{points}" fill="none" stroke="#2563eb" stroke-width="2.5"/>',
        f'<text x="{width/2}" y="{height-20}" text-anchor="middle" class="axis">Birth year</text>',
        f'<text transform="translate(25 {height/2}) rotate(-90)" text-anchor="middle" class="axis">Cumulative return (%)</text>',
    ]

    output_path.write_text("\n".join(out + ["</svg>"]), encoding="utf-8")


def write_post(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        """---
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

<div id="cohort-summary-chart" style="width:100%;height:500px"></div>

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
renderLifecycleChart();
</script>
""",
        encoding="utf-8",
    )


def main() -> None:
    out_dir = Path("content/post/sp500-lifecycle-cohorts")
    monthly_prices = build_monthly_index()
    results, curves = simulate(monthly_prices)
    write_csv(results, out_dir / "sp500_lifecycle_returns.csv")
    write_svg(results, out_dir / "sp500_lifecycle_returns.svg")
    write_summary_json(results, out_dir / "sp500_lifecycle_summary.json")
    write_curve_json(curves, out_dir / "monthly_lifecycle_curves.json")
    write_post(out_dir / "index.md")


if __name__ == "__main__":
    main()
