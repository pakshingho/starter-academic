document.addEventListener("DOMContentLoaded", function () {
  initUniformProbabilityTool();
  initCompleteConvergenceTool();

  function initUniformProbabilityTool() {
    var tool = document.getElementById("uniform-probability-tool");
    if (!tool) {
      return;
    }

    var fields = {
      example: document.getElementById("uniform-probability-tool-example"),
      delta: document.getElementById("uniform-probability-tool-delta"),
      reps: document.getElementById("uniform-probability-tool-reps"),
      snapshot: document.getElementById("uniform-probability-tool-snapshot")
    };

    var outputs = {
      exampleCopy: document.getElementById("uniform-probability-tool-example-copy"),
      target: document.getElementById("uniform-probability-tool-metric-target"),
      band: document.getElementById("uniform-probability-tool-metric-band"),
      small: document.getElementById("uniform-probability-tool-metric-small"),
      large: document.getElementById("uniform-probability-tool-metric-large"),
      theory: document.getElementById("uniform-probability-tool-metric-theory"),
      mode: document.getElementById("uniform-probability-tool-metric-mode"),
      notes: document.getElementById("uniform-probability-tool-notes"),
      error: document.getElementById("uniform-probability-tool-error"),
      probabilityChart: document.getElementById("uniform-probability-tool-tail-chart"),
      functionChart: document.getElementById("uniform-probability-tool-function-chart"),
      tableBody: document.getElementById("uniform-probability-tool-table-body")
    };

    var buttons = {
      run: document.getElementById("uniform-probability-tool-run"),
      reset: document.getElementById("uniform-probability-tool-reset")
    };

    var presets = {
      "common-shock": {
        label: "Shrinking common shock",
        copy: "Here every theta shares the same random shock. The whole graph shifts up or down together by an amount of order 1 / sqrt(n), so the sup error is just the size of that common shift.",
        defaultDelta: 0.3,
        defaultReps: 3000,
        defaultSnapshot: 100,
        sampleSizes: [5, 10, 20, 50, 100, 250, 500],
        interpretation: "Uniform convergence in probability",
        pointwiseSummary: "Pointwise and uniform both hold.",
        theory: function (n, delta) {
          return 2 * (1 - normalCdf(delta * Math.sqrt(n)));
        },
        simulate: function (reps, delta, sampleSizes, snapshotN, rng) {
          var rows = [];
          var nIndex;
          var rep;
          var draws = [];

          for (nIndex = 0; nIndex < sampleSizes.length; nIndex += 1) {
            var n = sampleSizes[nIndex];
            var misses = 0;

            for (rep = 0; rep < reps; rep += 1) {
              var shock = rng.normal() / Math.sqrt(n);
              if (Math.abs(shock) > delta) {
                misses += 1;
              }
            }

            rows.push({
              n: n,
              simulated: misses / reps,
              theory: 2 * (1 - normalCdf(delta * Math.sqrt(n)))
            });
          }

          for (rep = 0; rep < 4; rep += 1) {
            draws.push({
              kind: "shift",
              shift: rng.normal() / Math.sqrt(snapshotN)
            });
          }

          return {
            rows: rows,
            draws: draws,
            note:
              "<p><strong>Uniform closeness really holds.</strong> Because every theta shares the same shrinking shock, the whole curve fits inside the band once the shock is small enough.</p>" +
              "<p>At the snapshot sample size, each colored line is just a near-parallel copy of the target line. That is the picture of uniform convergence: the entire graph moves into the band together.</p>"
          };
        }
      },
      "moving-spike": {
        label: "Moving spike",
        copy: "This example hides a narrow spike at a random location. At any fixed theta, the spike hits less and less often, but somewhere on the graph there is always a unit-sized bump.",
        defaultDelta: 0.3,
        defaultReps: 3000,
        defaultSnapshot: 100,
        sampleSizes: [5, 10, 20, 50, 100, 250, 500],
        interpretation: "Pointwise only, not uniform",
        pointwiseSummary: "Pointwise in probability holds, but uniform convergence fails.",
        theory: function (n, delta) {
          return delta < 1 ? 1 : 0;
        },
        simulate: function (reps, delta, sampleSizes, snapshotN, rng) {
          var rows = sampleSizes.map(function (n) {
            return {
              n: n,
              simulated: delta < 1 ? 1 : 0,
              theory: delta < 1 ? 1 : 0
            };
          });
          var draws = [];
          var rep;

          for (rep = 0; rep < 4; rep += 1) {
            draws.push({
              kind: "spike",
              center: rng.uniform(),
              halfWidth: 1 / snapshotN
            });
          }

          return {
            rows: rows,
            draws: draws,
            note:
              "<p><strong>The spike keeps uniform convergence from happening.</strong> For each fixed theta, the chance that the spike hits that one point is about <code>2 / n</code>, so pointwise convergence in probability still holds.</p>" +
              "<p>But the sup error looks across all theta at once. Since there is always some theta right under the spike, the uniform miss probability stays at <strong>1</strong> whenever <code>delta &lt; 1</code>.</p>"
          };
        }
      }
    };

    function updateSnapshotOptions(exampleKey, preferredValue) {
      var preset = presets[exampleKey];
      var selected = String(preferredValue || preset.defaultSnapshot);

      fields.snapshot.innerHTML = preset.sampleSizes.map(function (size) {
        var selectedAttr = String(size) === selected ? " selected" : "";
        return "<option value=\"" + size + "\"" + selectedAttr + ">" + size + "</option>";
      }).join("");
    }

    function applyPreset(exampleKey) {
      var preset = presets[exampleKey];

      outputs.exampleCopy.textContent = preset.copy;
      fields.delta.value = preset.defaultDelta.toFixed(2);
      fields.reps.value = String(preset.defaultReps);
      updateSnapshotOptions(exampleKey, preset.defaultSnapshot);
    }

    function render(result, preset, delta, snapshotN, reps) {
      var rows = result.rows;

      outputs.target.textContent = "x(theta) = theta";
      outputs.band.textContent = "sup_theta |x_n(theta) - theta| <= " + formatNumber(delta);
      outputs.small.textContent = formatPercent(rows[0].simulated);
      outputs.large.textContent = formatPercent(rows[rows.length - 1].simulated);
      outputs.theory.textContent = formatPercent(rows[rows.length - 1].theory);
      outputs.mode.textContent = preset.interpretation;
      outputs.notes.innerHTML =
        "<p><strong>" + preset.label + ".</strong> This run used <strong>" + reps.toLocaleString("en-US") + "</strong> repetitions and the function snapshot is drawn at <strong>n = " + snapshotN + "</strong>.</p>" +
        "<p><strong>Pointwise summary.</strong> " + preset.pointwiseSummary + "</p>" +
        result.note;
      outputs.probabilityChart.innerHTML = buildDualSeriesChart(rows, {
        xMode: "log",
        yMax: 1,
        ariaLabel: "Uniform miss probability as a function of sample size",
        theoryLabel: "Exact theory"
      });
      outputs.functionChart.innerHTML = buildUniformFunctionChart(result.draws, delta);
      outputs.tableBody.innerHTML = rows.map(function (row) {
        var highlightClass = row.n === snapshotN ? " class=\"probability-tool__table-row--highlight\"" : "";
        return "<tr" + highlightClass + ">" +
          "<td>" + row.n + "</td>" +
          "<td>" + formatProbability(row.simulated) + "</td>" +
          "<td>" + formatProbability(row.theory) + "</td>" +
          "</tr>";
      }).join("");
    }

    function runSimulation() {
      var preset = presets[fields.example.value];
      var delta = Number(fields.delta.value);
      var reps = Number(fields.reps.value);
      var snapshotN = Number(fields.snapshot.value);
      var result;

      clearError(outputs.error);

      if (!(delta > 0)) {
        showError(outputs.error, "Choose a positive tolerance delta.");
        return;
      }

      if (!(reps >= 500 && reps <= 12000)) {
        showError(outputs.error, "Choose repetitions between 500 and 12,000.");
        return;
      }

      if (!snapshotN) {
        showError(outputs.error, "Choose a snapshot sample size.");
        return;
      }

      result = preset.simulate(
        reps,
        delta,
        preset.sampleSizes,
        snapshotN,
        createRng(20260419 + Math.round(delta * 100) + reps + snapshotN)
      );
      render(result, preset, delta, snapshotN, reps);
    }

    fields.example.addEventListener("change", function () {
      applyPreset(fields.example.value);
      runSimulation();
    });

    buttons.run.addEventListener("click", runSimulation);

    buttons.reset.addEventListener("click", function () {
      applyPreset(fields.example.value);
      runSimulation();
    });

    applyPreset(fields.example.value);
    runSimulation();
  }

  function initCompleteConvergenceTool() {
    var tool = document.getElementById("complete-convergence-tool");
    if (!tool) {
      return;
    }

    var fields = {
      exponent: document.getElementById("complete-convergence-tool-exponent"),
      delta: document.getElementById("complete-convergence-tool-delta"),
      horizon: document.getElementById("complete-convergence-tool-horizon"),
      reps: document.getElementById("complete-convergence-tool-reps")
    };

    var outputs = {
      target: document.getElementById("complete-convergence-tool-metric-target"),
      exponent: document.getElementById("complete-convergence-tool-metric-exponent"),
      at20: document.getElementById("complete-convergence-tool-metric-20"),
      large: document.getElementById("complete-convergence-tool-metric-large"),
      sum: document.getElementById("complete-convergence-tool-metric-sum"),
      mode: document.getElementById("complete-convergence-tool-metric-mode"),
      notes: document.getElementById("complete-convergence-tool-notes"),
      error: document.getElementById("complete-convergence-tool-error"),
      probabilityChart: document.getElementById("complete-convergence-tool-prob-chart"),
      sumChart: document.getElementById("complete-convergence-tool-sum-chart"),
      tableBody: document.getElementById("complete-convergence-tool-table-body")
    };

    var buttons = {
      run: document.getElementById("complete-convergence-tool-run"),
      reset: document.getElementById("complete-convergence-tool-reset")
    };

    var defaults = {
      exponent: 1.2,
      delta: 0.5,
      horizon: 600,
      reps: 2500
    };

    function applyDefaults() {
      fields.exponent.value = defaults.exponent.toFixed(2);
      fields.delta.value = defaults.delta.toFixed(2);
      fields.horizon.value = String(defaults.horizon);
      fields.reps.value = String(defaults.reps);
    }

    function simulate(exponent, delta, horizon, reps, rng) {
      var rows = [];
      var cumulativeSimulated = 0;
      var cumulativeTheory = 0;
      var n;
      var rep;

      for (n = 1; n <= horizon; n += 1) {
        var exactProb = delta < 1 ? Math.pow(n, -exponent) : 0;
        var misses = 0;

        for (rep = 0; rep < reps; rep += 1) {
          if (rng.uniform() < exactProb) {
            misses += 1;
          }
        }

        cumulativeSimulated += misses / reps;
        cumulativeTheory += exactProb;
        rows.push({
          n: n,
          simulated: misses / reps,
          theory: exactProb,
          simulatedSum: cumulativeSimulated,
          theorySum: cumulativeTheory
        });
      }

      return rows;
    }

    function render(rows, exponent, delta, horizon, reps) {
      var row20 = rows[Math.min(19, rows.length - 1)];
      var lastRow = rows[rows.length - 1];
      var cumulativeRows = rows.map(function (row) {
        return {
          n: row.n,
          simulated: row.simulatedSum,
          theory: row.theorySum
        };
      });
      var summary;

      if (delta >= 1) {
        summary = "Trivial at this delta";
      } else if (exponent > 1) {
        summary = "Complete convergence";
      } else {
        summary = "Not complete convergence";
      }

      outputs.target.textContent = "0";
      outputs.exponent.textContent = formatNumber(exponent);
      outputs.at20.textContent = formatProbability(row20.theory);
      outputs.large.textContent = formatProbability(lastRow.theory);
      outputs.sum.textContent = formatNumber(lastRow.theorySum);
      outputs.mode.textContent = summary;
      outputs.notes.innerHTML = buildCompleteNotes(exponent, delta, horizon, reps, lastRow.theorySum);
      outputs.probabilityChart.innerHTML = buildDualSeriesChart(sampleRowsForChart(rows), {
        xMode: "log",
        yMax: Math.max(rows[0].theory * 1.08, 0.05),
        ariaLabel: "Miss probability as a function of sample size for complete convergence example",
        theoryLabel: "Exact 1 / n^p"
      });
      outputs.sumChart.innerHTML = buildDualSeriesChart(sampleRowsForChart(cumulativeRows), {
        xMode: "linear",
        ariaLabel: "Cumulative sum of miss probabilities as a function of sample size",
        theoryLabel: "Exact cumulative sum"
      });
      outputs.tableBody.innerHTML = tableCutoffs(horizon).map(function (cutoff) {
        var row = rows[cutoff - 1];
        return "<tr>" +
          "<td>" + row.n + "</td>" +
          "<td>" + formatProbability(row.simulated) + "</td>" +
          "<td>" + formatProbability(row.theory) + "</td>" +
          "<td>" + formatNumber(row.theorySum) + "</td>" +
          "</tr>";
      }).join("");
    }

    function runSimulation() {
      var exponent = Number(fields.exponent.value);
      var delta = Number(fields.delta.value);
      var horizon = Number(fields.horizon.value);
      var reps = Number(fields.reps.value);
      var rows;

      clearError(outputs.error);

      if (!(exponent > 0)) {
        showError(outputs.error, "Choose an exponent p greater than 0.");
        return;
      }

      if (!(delta > 0)) {
        showError(outputs.error, "Choose a positive tolerance delta.");
        return;
      }

      if (!(horizon >= 100 && horizon <= 1500)) {
        showError(outputs.error, "Choose a horizon N between 100 and 1,500.");
        return;
      }

      if (!(reps >= 500 && reps <= 4000)) {
        showError(outputs.error, "Choose repetitions between 500 and 4,000.");
        return;
      }

      rows = simulate(
        exponent,
        delta,
        horizon,
        reps,
        createRng(20260419 + Math.round(exponent * 100) + Math.round(delta * 100) + horizon + reps)
      );
      render(rows, exponent, delta, horizon, reps);
    }

    buttons.run.addEventListener("click", runSimulation);

    buttons.reset.addEventListener("click", function () {
      applyDefaults();
      runSimulation();
    });

    applyDefaults();
    runSimulation();
  }

  function buildCompleteNotes(exponent, delta, horizon, reps, partialSum) {
    if (delta >= 1) {
      return "<p><strong>Delta is larger than the jump size.</strong> Since the process only jumps by exactly <code>1</code>, no observation leaves the band at this delta and the probability series is identically zero.</p>";
    }

    if (exponent > 1) {
      return "<p><strong>Summable probabilities.</strong> This run used <strong>" + reps.toLocaleString("en-US") + "</strong> repetitions, and the exact partial sum through <strong>N = " + horizon + "</strong> is <strong>" + formatNumber(partialSum) + "</strong>.</p>" +
        "<p>Because <code>p &gt; 1</code>, the exact cumulative curve should flatten out as the horizon grows. That leveling-off is the visual meaning of complete convergence.</p>";
    }

    return "<p><strong>Non-summable probabilities.</strong> This run used <strong>" + reps.toLocaleString("en-US") + "</strong> repetitions, and the exact partial sum through <strong>N = " + horizon + "</strong> is already <strong>" + formatNumber(partialSum) + "</strong>.</p>" +
      "<p>Because <code>p &lt;= 1</code>, the cumulative exact curve keeps rising instead of flattening. The probabilities still go to zero term by term, but not fast enough for complete convergence.</p>";
  }

  function buildUniformFunctionChart(draws, delta) {
    var width = 560;
    var height = 300;
    var padding = { top: 18, right: 18, bottom: 42, left: 44 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var colors = ["#0f766e", "#2563eb", "#ea580c", "#be185d"];
    var yMin = -delta;
    var yMax = 1 + delta;
    var targetPoints = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    var i;

    draws.forEach(function (draw) {
      if (draw.kind === "shift") {
        yMin = Math.min(yMin, draw.shift);
        yMax = Math.max(yMax, 1 + draw.shift);
      } else {
        yMax = Math.max(yMax, 2);
      }
    });

    yMin -= 0.08 * Math.max(yMax - yMin, 1);
    yMax += 0.08 * Math.max(yMax - yMin, 1);

    function xScale(value) {
      return padding.left + value * plotWidth;
    }

    function yScale(value) {
      return padding.top + plotHeight - ((value - yMin) / Math.max(yMax - yMin, 0.0001)) * plotHeight;
    }

    var bandTop = [];
    var bandBottom = [];
    for (i = 0; i <= 60; i += 1) {
      var theta = i / 60;
      bandTop.push({ x: theta, y: theta + delta });
      bandBottom.push({ x: theta, y: theta - delta });
    }

    var bandPath = buildSeriesPath(bandTop, xScale, yScale) + " " +
      bandBottom.slice().reverse().map(function (point) {
        return "L" + xScale(point.x).toFixed(2) + " " + yScale(point.y).toFixed(2);
      }).join(" ") + " Z";
    var xTicks = [0, 0.5, 1];
    var yTicks = uniqueTicks([yMin, 0, 0.5, 1, 1.5, 2, yMax].map(function (value) {
      return Number(value.toFixed(2));
    })).filter(function (value) {
      return value >= yMin && value <= yMax;
    });
    var xLabels = xTicks.map(function (value) {
      return "<text x=\"" + xScale(value).toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + formatNumber(value) + "</text>";
    }).join("");
    var yLabels = yTicks.map(function (value) {
      return "<text x=\"" + (padding.left - 10) + "\" y=\"" + (yScale(value) + 4).toFixed(2) + "\" class=\"probability-tool__axis-label\">" + formatNumber(value) + "</text>";
    }).join("");
    var curves = draws.map(function (draw, index) {
      return "<path d=\"" + buildUniformDrawPath(draw, xScale, yScale) + "\" fill=\"none\" stroke=\"" + colors[index % colors.length] + "\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>";
    }).join("");

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Function draws showing uniform convergence behavior at one sample size\">" +
      "<line x1=\"" + padding.left + "\" y1=\"" + (height - padding.bottom) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      "<line x1=\"" + padding.left + "\" y1=\"" + padding.top + "\" x2=\"" + padding.left + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      "<path d=\"" + bandPath + "\" class=\"probability-tool__chart-band\"></path>" +
      "<path d=\"" + buildSeriesPath(targetPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#111827\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>" +
      curves +
      xLabels +
      yLabels +
      "</svg>" +
      "<div class=\"probability-tool__legend\">" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:rgba(15, 118, 110, 0.12)\"></span>Uniform band</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#111827\"></span>Target line</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#2563eb\"></span>Sample draws</span>" +
      "</div>";
  }

  function buildUniformDrawPath(draw, xScale, yScale) {
    if (draw.kind === "shift") {
      return buildSeriesPath([
        { x: 0, y: draw.shift },
        { x: 1, y: 1 + draw.shift }
      ], xScale, yScale);
    }

    var left = clamp(draw.center - draw.halfWidth, 0, 1);
    var right = clamp(draw.center + draw.halfWidth, 0, 1);
    var points = [
      { x: 0, y: 0 },
      { x: left, y: left },
      { x: left, y: left + 1 },
      { x: draw.center, y: draw.center + 1 },
      { x: right, y: right + 1 },
      { x: right, y: right },
      { x: 1, y: 1 }
    ];

    return buildSeriesPath(points, xScale, yScale);
  }

  function buildDualSeriesChart(rows, options) {
    var width = 560;
    var height = 300;
    var padding = { top: 18, right: 18, bottom: 42, left: 58 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var maxY = rows.reduce(function (currentMax, row) {
      return Math.max(currentMax, row.simulated, row.theory);
    }, 0);
    var yMax = typeof options.yMax === "number" ? Math.max(options.yMax, maxY) : Math.max(maxY * 1.08, 0.05);
    var xMin = rows[0].n;
    var xMax = rows[rows.length - 1].n;
    var xTicks;

    function xScale(value) {
      if (options.xMode === "linear") {
        return padding.left + ((value - xMin) / Math.max(xMax - xMin, 0.0001)) * plotWidth;
      }

      return padding.left + ((Math.log(value) - Math.log(xMin)) / Math.max(Math.log(xMax) - Math.log(xMin), 0.0001)) * plotWidth;
    }

    function yScale(value) {
      return padding.top + plotHeight - (value / Math.max(yMax, 0.0001)) * plotHeight;
    }

    xTicks = options.xMode === "linear"
      ? uniqueTicks([1, 2, 5, 10, 20, 50, 100, Math.round(xMax / 2), xMax].filter(function (value) {
          return value >= xMin && value <= xMax;
        }))
      : uniqueTicks([1, 2, 5, 10, 20, 50, 100, 250, 500, 1000, xMax].filter(function (value) {
          return value >= xMin && value <= xMax;
        }));

    var yTicks = [0, yMax / 4, yMax / 2, (3 * yMax) / 4, yMax];
    var grid = yTicks.map(function (tick) {
      var y = yScale(tick);

      return "<line x1=\"" + padding.left + "\" y1=\"" + y.toFixed(2) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + y.toFixed(2) + "\" class=\"probability-tool__chart-grid\"></line>" +
        "<text x=\"" + (padding.left - 10) + "\" y=\"" + (y + 4).toFixed(2) + "\" class=\"probability-tool__axis-label\">" + formatProbabilityTick(tick, yMax) + "</text>";
    }).join("");
    var xLabels = xTicks.map(function (value) {
      return "<text x=\"" + xScale(value).toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + value + "</text>";
    }).join("");
    var simulatedPoints = rows.map(function (row) {
      return { x: row.n, y: row.simulated };
    });
    var theoryPoints = rows.map(function (row) {
      return { x: row.n, y: row.theory };
    });
    var circles = simulatedPoints.map(function (point) {
      return "<circle cx=\"" + xScale(point.x).toFixed(2) + "\" cy=\"" + yScale(point.y).toFixed(2) + "\" r=\"3.4\" fill=\"#0f766e\"></circle>";
    }).join("");

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"" + options.ariaLabel + "\">" +
      "<line x1=\"" + padding.left + "\" y1=\"" + (height - padding.bottom) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      "<line x1=\"" + padding.left + "\" y1=\"" + padding.top + "\" x2=\"" + padding.left + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      grid +
      "<path d=\"" + buildSeriesPath(simulatedPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#0f766e\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>" +
      "<path d=\"" + buildSeriesPath(theoryPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-dasharray=\"7 6\"></path>" +
      circles +
      xLabels +
      "</svg>" +
      "<div class=\"probability-tool__legend\">" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#0f766e\"></span>Simulated</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#2563eb\"></span>" + options.theoryLabel + "</span>" +
      "</div>";
  }

  function sampleRowsForChart(rows) {
    var horizon = rows[rows.length - 1].n;
    var count = 90;
    var cutoffs = [1, 2, 5, 10, 20, 50, 100, horizon];
    var i;

    for (i = 0; i < count; i += 1) {
      var share = count === 1 ? 0 : i / (count - 1);
      cutoffs.push(Math.round(Math.exp(Math.log(1) + share * Math.log(horizon))));
    }

    return uniqueTicks(cutoffs.map(function (value) {
      return clamp(value, 1, horizon);
    }).sort(function (a, b) {
      return a - b;
    })).map(function (value) {
      return rows[value - 1];
    });
  }

  function tableCutoffs(horizon) {
    var values = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 1500].filter(function (value) {
      return value <= horizon;
    });

    if (values.indexOf(horizon) === -1) {
      values.push(horizon);
    }

    return uniqueTicks(values.sort(function (a, b) {
      return a - b;
    }));
  }

  function formatProbabilityTick(value, maxY) {
    if (maxY >= 5) {
      return formatNumber(value);
    }

    return formatProbability(value);
  }

  function showError(node, message) {
    node.hidden = false;
    node.textContent = message;
  }

  function clearError(node) {
    node.hidden = true;
    node.textContent = "";
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function formatProbability(value) {
    if (!isFinite(value)) {
      return "—";
    }

    if (value < 0.0001) {
      return "<0.0001";
    }

    return value.toFixed(4);
  }

  function formatPercent(value) {
    if (!isFinite(value)) {
      return "—";
    }

    return (value * 100).toFixed(2) + "%";
  }

  function formatNumber(value) {
    if (!isFinite(value)) {
      return "—";
    }

    if (Math.abs(value) >= 100) {
      return value.toFixed(0);
    }

    if (Math.abs(value) >= 10) {
      return value.toFixed(1);
    }

    return value.toFixed(2);
  }

  function normalCdf(x) {
    var sign = x < 0 ? -1 : 1;
    var absX = Math.abs(x) / Math.sqrt(2);
    var t = 1 / (1 + 0.3275911 * absX);
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

    return 0.5 * (1 + sign * erf);
  }

  function mulberry32(seed) {
    var state = seed >>> 0;

    return function () {
      state = (state + 0x6D2B79F5) >>> 0;
      var t = Math.imul(state ^ (state >>> 15), 1 | state);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);

      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createRng(seed) {
    var uniform = mulberry32(seed);
    var spare = null;

    return {
      uniform: uniform,
      normal: function () {
        var u1;
        var u2;
        var radius;
        var angle;

        if (spare !== null) {
          var value = spare;
          spare = null;
          return value;
        }

        u1 = Math.max(uniform(), 1e-12);
        u2 = uniform();
        radius = Math.sqrt(-2 * Math.log(u1));
        angle = 2 * Math.PI * u2;
        spare = radius * Math.sin(angle);

        return radius * Math.cos(angle);
      }
    };
  }

  function uniqueTicks(values) {
    return values.filter(function (value, index, all) {
      return all.indexOf(value) === index;
    });
  }

  function buildSeriesPath(points, xScale, yScale) {
    return points.map(function (point, index) {
      return (index === 0 ? "M" : "L") + xScale(point.x).toFixed(2) + " " + yScale(point.y).toFixed(2);
    }).join(" ");
  }
});
