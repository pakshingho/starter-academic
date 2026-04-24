#!/usr/bin/env python3
"""Generate lifecycle S&P 500 cohort return simulation (1926-2025 births).

Uses annual total returns and converts them to constant monthly growth factors
within each year for a simple monthly DCA approximation.
"""

from __future__ import annotations

import csv
import datetime as dt
import math
from dataclasses import dataclass
from pathlib import Path

START_BIRTH_YEAR = 1926
END_BIRTH_YEAR = 2025
LABOR_FORCE_AGE = 25
RETIREMENT_AGE = 65
SIMULATION_END = dt.date(2025, 12, 31)
BASE_INDEX_LEVEL = 100.0

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


def simulate(monthly_prices: dict[dt.date, float]) -> list[CohortResult]:
    results: list[CohortResult] = []

    for birth_year in range(START_BIRTH_YEAR, END_BIRTH_YEAR + 1):
        start_month = dt.date(birth_year + LABOR_FORCE_AGE, 1, 1)
        scheduled_end = dt.date(birth_year + RETIREMENT_AGE, 12, 1)
        end_month = min(scheduled_end, dt.date(SIMULATION_END.year, SIMULATION_END.month, 1))

        if start_month > end_month:
            results.append(CohortResult(birth_year, start_month, end_month, 0, 0.0, 0.0, 0.0, 0.0))
            continue

        shares = 0.0
        months = 0
        for month in month_iter(start_month, end_month):
            shares += 1.0 / monthly_prices[month]
            months += 1

        ending_value = shares * monthly_prices[end_month]
        contributed = float(months)
        return_multiple = ending_value / contributed
        cumulative_return_pct = (return_multiple - 1.0) * 100.0

        results.append(
            CohortResult(
                birth_year=birth_year,
                start_month=start_month,
                end_month=end_month,
                months_investing=months,
                total_contributed=contributed,
                ending_value=ending_value,
                return_multiple=return_multiple,
                cumulative_return_pct=cumulative_return_pct,
            )
        )

    return results


def write_csv(results: list[CohortResult], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.writer(fh)
        writer.writerow([
            "birth_year", "start_month", "end_month", "months_investing", "total_contributed",
            "ending_value", "return_multiple", "cumulative_return_pct",
        ])
        for r in results:
            writer.writerow([
                r.birth_year,
                r.start_month.isoformat(),
                r.end_month.isoformat(),
                r.months_investing,
                f"{r.total_contributed:.2f}",
                f"{r.ending_value:.6f}",
                f"{r.return_multiple:.6f}",
                f"{r.cumulative_return_pct:.2f}",
            ])


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

    x_ticks = [1926, 1940, 1960, 1980, 2000, 2025]
    y_ticks = 6

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
        '<style>text{font-family:Arial,sans-serif;fill:#111827}.title{font-size:24px;font-weight:700}.axis{font-size:13px}.small{font-size:12px;fill:#4b5563}</style>',
        f'<rect width="{width}" height="{height}" fill="white"/>',
        f'<text x="{width/2}" y="30" text-anchor="middle" class="title">Lifecycle S&amp;P 500 returns by birth year (1926-2025)</text>',
    ]

    for i in range(y_ticks + 1):
        y_val = min_y + (max_y - min_y) * i / y_ticks
        y_px = y_to_px(y_val)
        out.append(f'<line x1="{margin["left"]}" y1="{y_px:.2f}" x2="{width-margin["right"]}" y2="{y_px:.2f}" stroke="#e5e7eb"/>')
        out.append(f'<text x="{margin["left"]-10}" y="{y_px+4:.2f}" text-anchor="end" class="axis">{y_val:.0f}%</text>')

    for tick in x_ticks:
        x_px = x_to_px(tick)
        out.append(f'<line x1="{x_px:.2f}" y1="{margin["top"]}" x2="{x_px:.2f}" y2="{height-margin["bottom"]}" stroke="#f3f4f6"/>')
        out.append(f'<text x="{x_px:.2f}" y="{height-margin["bottom"]+25}" text-anchor="middle" class="axis">{tick}</text>')

    out.append(f'<line x1="{margin["left"]}" y1="{height-margin["bottom"]}" x2="{width-margin["right"]}" y2="{height-margin["bottom"]}" stroke="#111827"/>')
    out.append(f'<line x1="{margin["left"]}" y1="{margin["top"]}" x2="{margin["left"]}" y2="{height-margin["bottom"]}" stroke="#111827"/>')
    out.append(f'<polyline points="{points}" fill="none" stroke="#2563eb" stroke-width="2.5"/>')
    out.append(f'<text x="{width/2}" y="{height-20}" text-anchor="middle" class="axis">Birth year</text>')
    out.append(f'<text transform="translate(25 {height/2}) rotate(-90)" text-anchor="middle" class="axis">Cumulative return (%)</text>')
    out.append(f'<text x="{margin["left"]}" y="{height-45}" class="small">Assumptions: $1/month from age {LABOR_FORCE_AGE}, retire at {RETIREMENT_AGE} or hold through Dec 2025; annual returns smoothed to monthly.</text>')
    out.append('</svg>')

    output_path.write_text("\n".join(out), encoding="utf-8")


def write_post(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        """---
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
""",
        encoding="utf-8",
    )


def main() -> None:
    results = simulate(build_monthly_index())
    out_dir = Path("content/post/sp500-lifecycle-cohorts")
    write_csv(results, out_dir / "sp500_lifecycle_returns.csv")
    write_svg(results, out_dir / "sp500_lifecycle_returns.svg")
    write_post(out_dir / "index.md")


if __name__ == "__main__":
    main()
