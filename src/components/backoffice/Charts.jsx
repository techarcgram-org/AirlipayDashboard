'use client';

function normalizeSeries(values) {
  return Array.isArray(values) && values.length ? values : [0, 0];
}

function pointsFor(series, width, height, min, max, padding) {
  const range = max - min || 1;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  return series.map((value, index) => {
    const x = padding.left + (index / Math.max(1, series.length - 1)) * plotWidth;
    const y = padding.top + plotHeight - ((value - min) / range) * plotHeight;
    return [x, y];
  });
}

function linePath(points) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
}

function areaPath(points, baseline) {
  if (!points.length) return '';
  const last = points[points.length - 1];
  const first = points[0];
  return `${linePath(points)} L${last[0].toFixed(1)} ${baseline.toFixed(1)} L${first[0].toFixed(1)} ${baseline.toFixed(1)} Z`;
}

export function Sparkline({
  data = [],
  width = 84,
  height = 32,
  color = 'var(--chart-deposit)',
  fill = true,
  className = '',
}) {
  const series = normalizeSeries(data);
  const min = Math.min(...series);
  const max = Math.max(...series);
  const points = pointsFor(series, width, height, min, max, { top: 3, right: 2, bottom: 3, left: 1 });
  const path = linePath(points);
  const last = points[points.length - 1];
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {fill ? <path d={areaPath(points, height - 2)} fill={color} opacity="0.1" /> : null}
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {last ? <circle cx={last[0]} cy={last[1]} r="2.2" fill={color} /> : null}
    </svg>
  );
}

export function AreaChart({
  primary = [],
  secondary = [],
  labels = [],
  height = 250,
  ariaLabel = 'Cash movement chart',
  className = '',
}) {
  const seriesA = normalizeSeries(primary);
  const seriesB = normalizeSeries(secondary);
  const all = [...seriesA, ...seriesB];
  const rawMax = Math.max(...all, 1);
  const rawMin = Math.min(...all, 0);
  const max = rawMax + (rawMax - rawMin) * 0.08;
  const min = Math.max(0, rawMin - (rawMax - rawMin) * 0.1);
  const width = 720;
  const padding = { top: 14, right: 12, bottom: 24, left: 52 };
  const plotHeight = height - padding.top - padding.bottom;
  const baseline = padding.top + plotHeight;
  const pointsA = pointsFor(seriesA, width, height, min, max, padding);
  const pointsB = pointsFor(seriesB, width, height, min, max, padding);
  const grid = [0, 1, 2, 3, 4];
  const yMax = max || 1;
  const xLabels = labels.length
    ? labels
    : ['24 Sep', '30 Sep', '07 Oct', '14 Oct', '21 Oct'];

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="none"
        style={{ display: 'block', minHeight: 190 }}
      >
        {grid.map((index) => {
          const y = padding.top + (plotHeight * index) / 4;
          const value = yMax - ((yMax - min) * index) / 4;
          return (
            <g key={index}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="var(--chart-grid)"
                strokeDasharray={index === 4 ? '0' : '3 5'}
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={y + 3}
                textAnchor="end"
                fill="var(--chart-axis)"
                fontSize="10"
                fontFamily="var(--font-inter), Inter, sans-serif"
              >
                {index === 4 ? '0' : `${Math.round(value / 1_000_000)}M`}
              </text>
            </g>
          );
        })}
        <path d={areaPath(pointsB, baseline)} fill="var(--chart-payout)" opacity="0.1" />
        <path d={areaPath(pointsA, baseline)} fill="var(--chart-deposit)" opacity="0.12" />
        <path
          d={linePath(pointsB)}
          fill="none"
          stroke="var(--chart-payout)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={linePath(pointsA)}
          fill="none"
          stroke="var(--chart-deposit)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {pointsA.slice(-1).map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="4"
            fill="var(--surface)"
            stroke="var(--chart-deposit)"
            strokeWidth="2.2"
          />
        ))}
        {xLabels.map((label, index) => {
          const x = padding.left + (index / Math.max(1, xLabels.length - 1)) * (width - padding.left - padding.right);
          return (
            <text
              key={label + index}
              x={x}
              y={height - 5}
              textAnchor={index === 0 ? 'start' : index === xLabels.length - 1 ? 'end' : 'middle'}
              fill="var(--chart-axis)"
              fontSize="10"
              fontFamily="var(--font-inter), Inter, sans-serif"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function LegendDot({ color = 'var(--chart-deposit)', children }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
      {children}
    </span>
  );
}
