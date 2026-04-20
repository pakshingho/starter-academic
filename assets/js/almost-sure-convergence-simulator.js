document.addEventListener("DOMContentLoaded", function () {
  var tool = document.getElementById("almost-sure-tool");
  if (!tool) {
    return;
  }

  var fields = {
    example: document.getElementById("almost-sure-tool-example"),
    delta: document.getElementById("almost-sure-tool-delta"),
    horizon: document.getElementById("almost-sure-tool-horizon"),
    paths: document.getElementById("almost-sure-tool-paths")
  };

  var outputs = {
    exampleCopy: document.getElementById("almost-sure-tool-example-copy"),
    target: document.getElementById("almost-sure-tool-metric-target"),
    band: document.getElementById("almost-sure-tool-metric-band"),
    at20: document.getElementById("almost-sure-tool-metric-20"),
    at100: document.getElementById("almost-sure-tool-metric-100"),
    theory: document.getElementById("almost-sure-tool-metric-theory"),
    mode: document.getElementById("almost-sure-tool-metric-mode"),
    notes: document.getElementById("almost-sure-tool-notes"),
    error: document.getElementById("almost-sure-tool-error"),
    tailChart: document.getElementById("almost-sure-tool-tail-chart"),
    pathChart: document.getElementById("almost-sure-tool-path-chart"),
    tableBody: document.getElementById("almost-sure-tool-table-body")
  };

  var buttons = {
    run: document.getElementById("almost-sure-tool-run"),
    reset: document.getElementById("almost-sure-tool-reset")
  };

  var presets = {
    summable: {
      label: "Jump probability 1 / n^2",
      copy: "Each X_n equals 0 most of the time, but with probability 1 / n^2 it jumps to n. Because those probabilities are summable, typical paths only jump finitely many times.",
      defaultDelta: 0.5,
      defaultHorizon: 1000,
      defaultPaths: 20,
      modeLabel: "Almost sure convergence",
      jumpProbability: function (n) {
        return 1 / (n * n);
      },
      buildNote: function (reps, displayHorizon, horizon) {
        return "<p><strong>Summable jump probabilities.</strong> The series <code>sum 1 / n^2</code> is finite, so by Borel-Cantelli only finitely many jumps occur almost surely.</p>" +
          "<p>This run used <strong>" + reps.toLocaleString("en-US") + "</strong> Monte Carlo paths and shows the first <strong>" + displayHorizon + "</strong> periods in the heatmap. As the cutoff <code>n</code> moves right, the probability of ever leaving the band again falls toward zero.</p>" +
          (horizon >= 1000 ? "" : "<p>Using a larger horizon makes the eventual-stability idea even clearer, because the simulator can look farther into the future.</p>");
      }
    },
    nonsummable: {
      label: "Jump probability 1 / n",
      copy: "Now the one-period miss probability still shrinks, so X_n converges in probability to 0. But the probabilities 1 / n are not summable, so independent jumps keep returning along typical paths.",
      defaultDelta: 0.5,
      defaultHorizon: 1000,
      defaultPaths: 20,
      modeLabel: "Convergence in probability only",
      jumpProbability: function (n) {
        return 1 / n;
      },
      buildNote: function (reps, displayHorizon, horizon) {
        return "<p><strong>Non-summable jump probabilities.</strong> Here <code>sum 1 / n</code> diverges. Each single-period miss becomes rare, but that is not enough to guarantee eventual stability of whole paths.</p>" +
          "<p>This run used <strong>" + reps.toLocaleString("en-US") + "</strong> Monte Carlo paths and shows the first <strong>" + displayHorizon + "</strong> periods in the heatmap. For moderate cutoffs <code>n</code>, the chance of seeing another future jump often stays high when the horizon is large.</p>" +
          (horizon >= 500 ? "" : "<p>Raise the horizon to see the failure of almost sure convergence more clearly. The finite-horizon tail event becomes much more persistent.</p>");
      }
    }
  };

  var runCounter = 0;

  function showError(message) {
    outputs.error.hidden = false;
    outputs.error.textContent = message;
  }

  function clearError() {
    outputs.error.hidden = true;
    outputs.error.textContent = "";
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
    return {
      uniform: mulberry32(seed)
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

  function exactTailProbability(exampleKey, cutoff, delta, horizon) {
    var start = Math.max(cutoff, Math.floor(delta) + 1);

    if (start > horizon) {
      return 0;
    }

    if (exampleKey === "summable") {
      return clamp(1 - (((start - 1) * (horizon + 1)) / (start * horizon)), 0, 1);
    }

    return clamp(1 - ((start - 1) / horizon), 0, 1);
  }

  function calculateRepetitions(horizon, displayPaths) {
    if (horizon <= 1500) {
      return Math.max(displayPaths, 2600);
    }

    if (horizon <= 3000) {
      return Math.max(displayPaths, 2200);
    }

    return Math.max(displayPaths, 1800);
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
    var values = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000].filter(function (value) {
      return value <= horizon;
    });

    if (values.indexOf(horizon) === -1) {
      values.push(horizon);
    }

    return uniqueTicks(values.sort(function (a, b) {
      return a - b;
    }));
  }

  function buildTailChart(rows) {
    var chartRows = sampleRowsForChart(rows);
    var width = 560;
    var height = 300;
    var padding = { top: 18, right: 18, bottom: 42, left: 58 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var logMin = Math.log(chartRows[0].n);
    var logMax = Math.log(chartRows[chartRows.length - 1].n);
    var yTicks = [0, 0.25, 0.5, 0.75, 1];
    var xTicks = uniqueTicks([1, 2, 5, 10, 20, 50, 100, Math.round(rows[rows.length - 1].n / 2), rows[rows.length - 1].n].filter(function (value) {
      return value >= 1 && value <= rows[rows.length - 1].n;
    }));

    function xScale(value) {
      return padding.left + ((Math.log(value) - logMin) / Math.max(logMax - logMin, 0.0001)) * plotWidth;
    }

    function yScale(value) {
      return padding.top + plotHeight - value * plotHeight;
    }

    var grid = yTicks.map(function (tick) {
      var y = yScale(tick);

      return "<line x1=\"" + padding.left + "\" y1=\"" + y.toFixed(2) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + y.toFixed(2) + "\" class=\"probability-tool__chart-grid\"></line>" +
        "<text x=\"" + (padding.left - 10) + "\" y=\"" + (y + 4).toFixed(2) + "\" class=\"probability-tool__axis-label\">" + formatProbability(tick) + "</text>";
    }).join("");

    var xLabels = xTicks.map(function (value) {
      var x = xScale(value);

      return "<text x=\"" + x.toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + value + "</text>";
    }).join("");

    var simulatedPoints = chartRows.map(function (row) {
      return { x: row.n, y: row.simulated };
    });
    var theoryPoints = chartRows.map(function (row) {
      return { x: row.n, y: row.theory };
    });
    var circles = simulatedPoints.map(function (point) {
      return "<circle cx=\"" + xScale(point.x).toFixed(2) + "\" cy=\"" + yScale(point.y).toFixed(2) + "\" r=\"3.4\" fill=\"#0f766e\"></circle>";
    }).join("");

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Finite-horizon tail-event probability as a function of the cutoff n\">" +
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
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#2563eb\"></span>Exact finite-horizon theory</span>" +
      "</div>";
  }

  function buildPathChart(paths, displayHorizon) {
    var width = 560;
    var height = Math.max(220, 82 + paths.length * 16);
    var padding = { top: 18, right: 18, bottom: 38, left: 44 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var cellWidth = plotWidth / Math.max(displayHorizon, 1);
    var cellHeight = plotHeight / Math.max(paths.length, 1);
    var labelStep = paths.length <= 12 ? 2 : 3;
    var xTicks = uniqueTicks([1, 2, 5, 10, 20, 50, 100, displayHorizon].filter(function (value) {
      return value >= 1 && value <= displayHorizon;
    }));
    var yLabels = paths.map(function (_, index) {
      return index + 1;
    }).filter(function (value, index, all) {
      return value === 1 || value === all.length || index % labelStep === 0;
    });

    function xScale(value) {
      return padding.left + (value - 1) * cellWidth;
    }

    function yScale(value) {
      return padding.top + (value - 1) * cellHeight;
    }

    var cells = paths.map(function (row, rowIndex) {
      return row.map(function (cell, columnIndex) {
        return "<rect x=\"" + xScale(columnIndex + 1).toFixed(2) + "\" y=\"" + yScale(rowIndex + 1).toFixed(2) + "\" width=\"" + Math.max(cellWidth - 0.45, 0.75).toFixed(2) + "\" height=\"" + Math.max(cellHeight - 0.55, 1.25).toFixed(2) + "\" fill=\"" + (cell ? "#f97316" : "rgba(15, 118, 110, 0.10)") + "\"></rect>";
      }).join("");
    }).join("");

    var xLabels = xTicks.map(function (value) {
      return "<text x=\"" + (xScale(value) + cellWidth / 2).toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + value + "</text>";
    }).join("");

    var yAxisLabels = yLabels.map(function (value) {
      return "<text x=\"" + (padding.left - 10) + "\" y=\"" + (yScale(value) + cellHeight * 0.65).toFixed(2) + "\" class=\"probability-tool__axis-label\">" + value + "</text>";
    }).join("");

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Heatmap of jump times across simulated sample paths\">" +
      "<rect x=\"" + padding.left + "\" y=\"" + padding.top + "\" width=\"" + plotWidth.toFixed(2) + "\" height=\"" + plotHeight.toFixed(2) + "\" fill=\"rgba(255,255,255,0.16)\" stroke=\"rgba(15, 23, 42, 0.10)\"></rect>" +
      cells +
      xLabels +
      yAxisLabels +
      "</svg>" +
      "<div class=\"probability-tool__legend\">" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:rgba(15, 118, 110, 0.18)\"></span>No jump outside the band</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#f97316\"></span>Jump outside the band</span>" +
      "</div>";
  }

  function simulate(exampleKey, delta, horizon, displayPaths, rng) {
    var preset = presets[exampleKey];
    var reps = calculateRepetitions(horizon, displayPaths);
    var target = 0;
    var displayHorizon = Math.min(horizon, 120);
    var heatmapPaths = [];
    var tailCounts = [];
    var rep;
    var time;

    for (time = 0; time <= horizon; time += 1) {
      tailCounts.push(0);
    }

    for (rep = 0; rep < reps; rep += 1) {
      var violations = [];
      var seenFutureViolation = false;

      for (time = 0; time <= horizon; time += 1) {
        violations.push(false);
      }

      for (time = 1; time <= horizon; time += 1) {
        var violation = time > delta && rng.uniform() < preset.jumpProbability(time);
        violations[time] = violation;
      }

      if (heatmapPaths.length < displayPaths) {
        heatmapPaths.push(violations.slice(1, displayHorizon + 1));
      }

      for (time = horizon; time >= 1; time -= 1) {
        if (violations[time]) {
          seenFutureViolation = true;
        }

        if (seenFutureViolation) {
          tailCounts[time] += 1;
        }
      }
    }

    var fullRows = [];
    for (time = 1; time <= horizon; time += 1) {
      fullRows.push({
        n: time,
        simulated: tailCounts[time] / reps,
        theory: exactTailProbability(exampleKey, time, delta, horizon)
      });
    }

    return {
      target: target,
      reps: reps,
      displayHorizon: displayHorizon,
      heatmapPaths: heatmapPaths,
      fullRows: fullRows,
      tableRows: tableCutoffs(horizon).map(function (cutoff) {
        return fullRows[cutoff - 1];
      }),
      note: preset.buildNote(reps, displayHorizon, horizon)
    };
  }

  function render(result, exampleKey, delta, horizon) {
    var rows = result.fullRows;
    var row20 = rows[Math.min(19, rows.length - 1)];
    var row100 = rows[Math.min(99, rows.length - 1)];
    var preset = presets[exampleKey];

    outputs.target.textContent = formatNumber(result.target);
    outputs.band.textContent = "[" + formatNumber(result.target - delta) + ", " + formatNumber(result.target + delta) + "]";
    outputs.at20.textContent = formatPercent(row20.simulated);
    outputs.at100.textContent = formatPercent(row100.simulated);
    outputs.theory.textContent = formatPercent(row100.theory);
    outputs.mode.textContent = preset.modeLabel;
    outputs.notes.innerHTML =
      "<p><strong>" + preset.label + ".</strong> The metric at cutoff <code>n</code> is the probability of at least one future violation somewhere between <code>n</code> and <code>N = " + horizon + "</code>.</p>" +
      result.note;
    outputs.tailChart.innerHTML = buildTailChart(rows);
    outputs.pathChart.innerHTML = buildPathChart(result.heatmapPaths, result.displayHorizon);
    outputs.tableBody.innerHTML = result.tableRows.map(function (row) {
      var highlightClass = row.n === 100 ? " class=\"probability-tool__table-row--highlight\"" : "";
      return "<tr" + highlightClass + ">" +
        "<td>" + row.n + "</td>" +
        "<td>" + formatProbability(row.simulated) + "</td>" +
        "<td>" + formatProbability(row.theory) + "</td>" +
        "</tr>";
    }).join("");
  }

  function applyPreset(exampleKey) {
    var preset = presets[exampleKey];

    outputs.exampleCopy.textContent = preset.copy;
    fields.delta.value = preset.defaultDelta.toFixed(2);
    fields.horizon.value = String(preset.defaultHorizon);
    fields.paths.value = String(preset.defaultPaths);
  }

  function runSimulation() {
    var exampleKey = fields.example.value;
    var delta = Number(fields.delta.value);
    var horizon = Number(fields.horizon.value);
    var displayPaths = Number(fields.paths.value);
    var result;

    clearError();

    if (!(delta > 0)) {
      showError("Choose a positive tolerance delta.");
      return;
    }

    if (!(horizon >= 100 && horizon <= 5000)) {
      showError("Choose a horizon N between 100 and 5,000.");
      return;
    }

    if (!(displayPaths >= 8 && displayPaths <= 36)) {
      showError("Choose between 8 and 36 displayed sample paths.");
      return;
    }

    runCounter += 1;
    result = simulate(exampleKey, delta, horizon, displayPaths, createRng(20260419 + runCounter * 131));
    render(result, exampleKey, delta, horizon);
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
});
