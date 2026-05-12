document.addEventListener("DOMContentLoaded", function () {
  var tool = document.getElementById("boundary-asymptotics-tool");
  if (!tool) {
    return;
  }

  var sampleSizes = [25, 50, 100, 250, 500, 1000];
  var upperBound = 1.5;

  var fields = {
    scenario: document.getElementById("boundary-asymptotics-tool-scenario"),
    reps: document.getElementById("boundary-asymptotics-tool-reps"),
    snapshot: document.getElementById("boundary-asymptotics-tool-snapshot")
  };

  var outputs = {
    copy: document.getElementById("boundary-asymptotics-tool-copy"),
    scenario: document.getElementById("boundary-asymptotics-tool-metric-scenario"),
    boundary: document.getElementById("boundary-asymptotics-tool-metric-boundary"),
    infeasible: document.getElementById("boundary-asymptotics-tool-metric-infeasible"),
    mean: document.getElementById("boundary-asymptotics-tool-metric-mean"),
    sd: document.getElementById("boundary-asymptotics-tool-metric-sd"),
    limit: document.getElementById("boundary-asymptotics-tool-metric-limit"),
    notes: document.getElementById("boundary-asymptotics-tool-notes"),
    error: document.getElementById("boundary-asymptotics-tool-error"),
    massChart: document.getElementById("boundary-asymptotics-tool-mass-chart"),
    histogram: document.getElementById("boundary-asymptotics-tool-histogram"),
    tableBody: document.getElementById("boundary-asymptotics-tool-table-body")
  };

  var buttons = {
    run: document.getElementById("boundary-asymptotics-tool-run"),
    reset: document.getElementById("boundary-asymptotics-tool-reset")
  };

  var presets = {
    boundary: {
      label: "Boundary: beta0 = 0",
      beta0: 0,
      defaultReps: 4000,
      defaultSnapshot: 250,
      limitMass: 0.5,
      limitMean: 1 / Math.sqrt(2 * Math.PI),
      limitSd: Math.sqrt(0.5 - 1 / (2 * Math.PI)),
      copy: "The true value is the lower boundary. The projection max(0, beta-tilde) is binding whenever the unconstrained slope is negative.",
      note:
        "<p><strong>Boundary case.</strong> The unconstrained local estimator is approximately standard normal, but the feasible local set is <code>[0, infinity)</code>. Negative local movements are projected to zero.</p>" +
        "<p>The table should settle near a boundary-hit probability of one half. That is the point mass in the limit <code>max(Z, 0)</code>.</p>",
      limitLabel: "max(Z, 0); mass at 0 = 50%"
    },
    interior: {
      label: "Interior: beta0 = 0.5",
      beta0: 0.5,
      defaultReps: 4000,
      defaultSnapshot: 250,
      limitMass: 0,
      limitMean: 0,
      limitSd: 1,
      copy: "The true value is safely inside the parameter space. The projection almost never binds once n is moderately large.",
      note:
        "<p><strong>Interior case.</strong> The constraint is locally irrelevant, so the constrained and unconstrained estimators have the same first-order normal limit.</p>" +
        "<p>This is the control experiment: removing the active boundary removes the spike at zero.</p>",
      limitLabel: "N(0, 1); no point mass"
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

  function formatProbability(value) {
    if (!isFinite(value)) {
      return "-";
    }

    if (value > 0 && value < 0.0001) {
      return "<0.0001";
    }

    return value.toFixed(4);
  }

  function formatPercent(value) {
    if (!isFinite(value)) {
      return "-";
    }

    return (100 * value).toFixed(2) + "%";
  }

  function formatNumber(value) {
    if (!isFinite(value)) {
      return "-";
    }

    if (Math.abs(value) >= 100) {
      return value.toFixed(0);
    }

    if (Math.abs(value) >= 10) {
      return value.toFixed(1);
    }

    return value.toFixed(3);
  }

  function mulberry32(seed) {
    var state = seed >>> 0;

    return function () {
      var t;

      state = (state + 0x6D2B79F5) >>> 0;
      t = Math.imul(state ^ (state >>> 15), 1 | state);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);

      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createRng(seed) {
    var uniform = mulberry32(seed);
    var spare = null;

    return {
      normal: function () {
        var u1;
        var u2;
        var radius;
        var angle;
        var value;

        if (spare !== null) {
          value = spare;
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

  function normalPdf(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  function average(values) {
    if (!values.length) {
      return 0;
    }

    return values.reduce(function (sum, value) {
      return sum + value;
    }, 0) / values.length;
  }

  function standardDeviation(values) {
    var mean = average(values);
    var variance;

    if (values.length < 2) {
      return 0;
    }

    variance = values.reduce(function (sum, value) {
      return sum + Math.pow(value - mean, 2);
    }, 0) / (values.length - 1);

    return Math.sqrt(variance);
  }

  function updateSnapshotOptions(preferredValue) {
    var selected = String(preferredValue || 250);

    fields.snapshot.innerHTML = sampleSizes.map(function (size) {
      var selectedAttr = String(size) === selected ? " selected" : "";
      return "<option value=\"" + size + "\"" + selectedAttr + ">" + size + "</option>";
    }).join("");
  }

  function applyPreset(key) {
    var preset = presets[key];

    outputs.copy.textContent = preset.copy;
    fields.reps.value = String(preset.defaultReps);
    updateSnapshotOptions(preset.defaultSnapshot);
  }

  function simulateOneSample(n, beta0, rng) {
    var sumXX = 0;
    var sumXU = 0;
    var i;
    var x;
    var u;
    var betaUnconstrained;
    var betaConstrained;

    for (i = 0; i < n; i += 1) {
      x = rng.normal();
      u = rng.normal();
      sumXX += x * x;
      sumXU += x * u;
    }

    betaUnconstrained = beta0 + sumXU / Math.max(sumXX, 1e-12);
    betaConstrained = Math.min(upperBound, Math.max(0, betaUnconstrained));

    return {
      unconstrained: betaUnconstrained,
      constrained: betaConstrained,
      scaledConstrained: Math.sqrt(n) * (betaConstrained - beta0),
      scaledUnconstrained: Math.sqrt(n) * (betaUnconstrained - beta0)
    };
  }

  function simulateScenario(preset, reps, snapshotN, rng) {
    var rows = [];
    var snapshot = null;

    sampleSizes.forEach(function (n) {
      var boundaryHits = 0;
      var infeasible = 0;
      var scaledValues = [];
      var unconstrainedValues = [];
      var rep;
      var draw;

      for (rep = 0; rep < reps; rep += 1) {
        draw = simulateOneSample(n, preset.beta0, rng);

        if (draw.constrained <= 1e-12) {
          boundaryHits += 1;
        }

        if (draw.unconstrained < 0) {
          infeasible += 1;
        }

        scaledValues.push(draw.scaledConstrained);

        if (n === snapshotN) {
          unconstrainedValues.push(draw.scaledUnconstrained);
        }
      }

      rows.push({
        n: n,
        boundaryMass: boundaryHits / reps,
        limitMass: preset.limitMass,
        infeasibleShare: infeasible / reps,
        mean: average(scaledValues),
        sd: standardDeviation(scaledValues)
      });

      if (n === snapshotN) {
        snapshot = {
          n: n,
          scaledValues: scaledValues,
          unconstrainedValues: unconstrainedValues,
          boundaryMass: boundaryHits / reps,
          infeasibleShare: infeasible / reps,
          mean: average(scaledValues),
          sd: standardDeviation(scaledValues)
        };
      }
    });

    return {
      rows: rows,
      snapshot: snapshot || {
        n: rows[0].n,
        scaledValues: [],
        unconstrainedValues: [],
        boundaryMass: rows[0].boundaryMass,
        infeasibleShare: rows[0].infeasibleShare,
        mean: rows[0].mean,
        sd: rows[0].sd
      }
    };
  }

  function buildSeriesPath(points, xScale, yScale) {
    return points.map(function (point, index) {
      return (index === 0 ? "M" : "L") + xScale(point.x).toFixed(2) + " " + yScale(point.y).toFixed(2);
    }).join(" ");
  }

  function buildMassChart(rows) {
    var width = 560;
    var height = 300;
    var padding = { top: 18, right: 18, bottom: 42, left: 58 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var logMin = Math.log(rows[0].n);
    var logMax = Math.log(rows[rows.length - 1].n);
    var maxY = Math.max(0.08, rows.reduce(function (currentMax, row) {
      return Math.max(currentMax, row.boundaryMass, row.limitMass);
    }, 0) * 1.12);

    function xScale(value) {
      return padding.left + ((Math.log(value) - logMin) / Math.max(logMax - logMin, 0.0001)) * plotWidth;
    }

    function yScale(value) {
      return padding.top + plotHeight - (value / maxY) * plotHeight;
    }

    var yTicks = [0, maxY / 4, maxY / 2, (3 * maxY) / 4, maxY];
    var grid = yTicks.map(function (tick) {
      var y = yScale(tick);

      return "<line x1=\"" + padding.left + "\" y1=\"" + y.toFixed(2) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + y.toFixed(2) + "\" class=\"probability-tool__chart-grid\"></line>" +
        "<text x=\"" + (padding.left - 10) + "\" y=\"" + (y + 4).toFixed(2) + "\" class=\"probability-tool__axis-label\">" + formatProbability(tick) + "</text>";
    }).join("");
    var xLabels = rows.map(function (row) {
      var x = xScale(row.n);

      return "<text x=\"" + x.toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + row.n + "</text>";
    }).join("");
    var simulatedPoints = rows.map(function (row) {
      return { x: row.n, y: row.boundaryMass };
    });
    var limitPoints = rows.map(function (row) {
      return { x: row.n, y: row.limitMass };
    });
    var circles = simulatedPoints.map(function (point) {
      return "<circle cx=\"" + xScale(point.x).toFixed(2) + "\" cy=\"" + yScale(point.y).toFixed(2) + "\" r=\"4\" fill=\"#0f766e\"></circle>";
    }).join("");

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Boundary hit probability as a function of sample size\">" +
      "<line x1=\"" + padding.left + "\" y1=\"" + (height - padding.bottom) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      "<line x1=\"" + padding.left + "\" y1=\"" + padding.top + "\" x2=\"" + padding.left + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      grid +
      "<path d=\"" + buildSeriesPath(simulatedPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#0f766e\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>" +
      "<path d=\"" + buildSeriesPath(limitPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-dasharray=\"7 6\"></path>" +
      circles +
      xLabels +
      "</svg>" +
      "<div class=\"probability-tool__legend\">" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#0f766e\"></span>Simulated boundary mass</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#2563eb\"></span>Limit prediction</span>" +
      "</div>";
  }

  function buildHistogram(snapshot, preset) {
    var values = snapshot.scaledValues;
    var width = 560;
    var height = 300;
    var padding = { top: 18, right: 18, bottom: 42, left: 58 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var xMin = preset.beta0 === 0 ? -3 : -3.5;
    var xMax = 3.5;
    var binCount = 28;
    var binWidth = (xMax - xMin) / binCount;
    var counts = new Array(binCount).fill(0);
    var i;
    var binIndex;
    var bars;
    var maxProb;
    var normalPoints;

    values.forEach(function (value) {
      if (value < xMin || value > xMax) {
        return;
      }

      binIndex = Math.min(binCount - 1, Math.max(0, Math.floor((value - xMin) / binWidth)));
      counts[binIndex] += 1;
    });

    maxProb = counts.reduce(function (currentMax, count) {
      return Math.max(currentMax, count / Math.max(values.length, 1));
    }, 0);
    maxProb = Math.max(maxProb, 0.08);

    for (i = 0; i <= 120; i += 1) {
      var xValue = xMin + (i / 120) * (xMax - xMin);
      var yValue = normalPdf(xValue) * binWidth;

      maxProb = Math.max(maxProb, yValue);
    }

    maxProb *= 1.12;

    function xScale(value) {
      return padding.left + ((value - xMin) / Math.max(xMax - xMin, 0.0001)) * plotWidth;
    }

    function yScale(value) {
      return padding.top + plotHeight - (value / maxProb) * plotHeight;
    }

    bars = counts.map(function (count, index) {
      var probability = count / Math.max(values.length, 1);
      var left = xMin + index * binWidth;
      var right = left + binWidth;
      var barX = xScale(left) + 1;
      var barY = yScale(probability);
      var barWidth = Math.max(xScale(right) - xScale(left) - 2, 1);
      var barHeight = Math.max(height - padding.bottom - barY, 0);
      var isZeroBin = left <= 0 && right > 0;
      var fill = isZeroBin && preset.beta0 === 0 ? "#f97316" : "#0f766e";

      return "<rect x=\"" + barX.toFixed(2) + "\" y=\"" + barY.toFixed(2) + "\" width=\"" + barWidth.toFixed(2) + "\" height=\"" + barHeight.toFixed(2) + "\" fill=\"" + fill + "\" opacity=\"0.78\"></rect>";
    }).join("");

    normalPoints = [];
    for (i = 0; i <= 120; i += 1) {
      var x = xMin + (i / 120) * (xMax - xMin);
      normalPoints.push({ x: x, y: normalPdf(x) * binWidth });
    }

    var yTicks = [0, maxProb / 2, maxProb];
    var grid = yTicks.map(function (tick) {
      var y = yScale(tick);

      return "<line x1=\"" + padding.left + "\" y1=\"" + y.toFixed(2) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + y.toFixed(2) + "\" class=\"probability-tool__chart-grid\"></line>" +
        "<text x=\"" + (padding.left - 10) + "\" y=\"" + (y + 4).toFixed(2) + "\" class=\"probability-tool__axis-label\">" + formatProbability(tick) + "</text>";
    }).join("");
    var xTicks = [-3, -2, -1, 0, 1, 2, 3];
    var xLabels = xTicks.map(function (tick) {
      return "<text x=\"" + xScale(tick).toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + tick + "</text>";
    }).join("");
    var infeasibleRegion = preset.beta0 === 0
      ? "<rect x=\"" + padding.left + "\" y=\"" + padding.top + "\" width=\"" + Math.max(xScale(0) - padding.left, 0).toFixed(2) + "\" height=\"" + plotHeight + "\" fill=\"rgba(249, 115, 22, 0.08)\"></rect>"
      : "";

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Histogram of scaled constrained estimates\">" +
      infeasibleRegion +
      "<line x1=\"" + padding.left + "\" y1=\"" + (height - padding.bottom) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      "<line x1=\"" + padding.left + "\" y1=\"" + padding.top + "\" x2=\"" + padding.left + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      grid +
      bars +
      "<path d=\"" + buildSeriesPath(normalPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-dasharray=\"7 6\"></path>" +
      "<line x1=\"" + xScale(0).toFixed(2) + "\" y1=\"" + padding.top + "\" x2=\"" + xScale(0).toFixed(2) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-target\"></line>" +
      xLabels +
      "</svg>" +
      "<div class=\"probability-tool__legend\">" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#0f766e\"></span>Constrained estimator</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#f97316\"></span>Boundary pile-up bin</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#2563eb\"></span>Normal benchmark</span>" +
      "</div>";
  }

  function render(result, preset, reps, snapshotN) {
    var selectedRow = result.rows.filter(function (row) {
      return row.n === snapshotN;
    })[0] || result.rows[result.rows.length - 1];

    outputs.scenario.textContent = preset.label;
    outputs.boundary.textContent = formatPercent(result.snapshot.boundaryMass);
    outputs.infeasible.textContent = formatPercent(result.snapshot.infeasibleShare);
    outputs.mean.textContent = formatNumber(result.snapshot.mean);
    outputs.sd.textContent = formatNumber(result.snapshot.sd);
    outputs.limit.textContent = preset.limitLabel;
    outputs.notes.innerHTML =
      "<p>This run used <strong>" + reps.toLocaleString("en-US") + "</strong> Monte Carlo repetitions. The histogram is drawn at <strong>n = " + snapshotN + "</strong>.</p>" +
      preset.note +
      "<p>At the selected sample size, the simulated mean is <strong>" + formatNumber(selectedRow.mean) + "</strong> and the simulated standard deviation is <strong>" + formatNumber(selectedRow.sd) + "</strong>. The limiting benchmark has mean <strong>" + formatNumber(preset.limitMean) + "</strong> and standard deviation <strong>" + formatNumber(preset.limitSd) + "</strong>.</p>";
    outputs.massChart.innerHTML = buildMassChart(result.rows);
    outputs.histogram.innerHTML = buildHistogram(result.snapshot, preset);
    outputs.tableBody.innerHTML = result.rows.map(function (row) {
      var highlightClass = row.n === snapshotN ? " class=\"probability-tool__table-row--highlight\"" : "";

      return "<tr" + highlightClass + ">" +
        "<td>" + row.n + "</td>" +
        "<td>" + formatProbability(row.boundaryMass) + "</td>" +
        "<td>" + formatProbability(row.limitMass) + "</td>" +
        "<td>" + formatNumber(row.mean) + "</td>" +
        "<td>" + formatNumber(row.sd) + "</td>" +
        "</tr>";
    }).join("");
  }

  function runSimulation() {
    var preset = presets[fields.scenario.value];
    var reps = Number(fields.reps.value);
    var snapshotN = Number(fields.snapshot.value);
    var rng;
    var result;

    clearError();

    if (!(reps >= 500 && reps <= 10000)) {
      showError("Choose repetitions between 500 and 10,000.");
      return;
    }

    if (sampleSizes.indexOf(snapshotN) === -1) {
      showError("Choose a histogram sample size from the menu.");
      return;
    }

    runCounter += 1;
    rng = createRng(20260512 + runCounter * 101);
    result = simulateScenario(preset, reps, snapshotN, rng);
    render(result, preset, reps, snapshotN);
  }

  fields.scenario.addEventListener("change", function () {
    applyPreset(fields.scenario.value);
    runSimulation();
  });

  fields.snapshot.addEventListener("change", runSimulation);
  buttons.run.addEventListener("click", runSimulation);
  buttons.reset.addEventListener("click", function () {
    applyPreset(fields.scenario.value);
    runSimulation();
  });

  updateSnapshotOptions(250);
  applyPreset(fields.scenario.value);
  runSimulation();
});
