import { Card } from "@heroui/react";

import { PERFORMANCE_SERIES } from "@/lib/data/dashboard";

export function PerformanceChart() {
  const max = Math.max(...PERFORMANCE_SERIES.map((p) => Math.max(p.views, p.clicks * 6)));
  const width = 640;
  const height = 220;
  const pad = 24;

  const toX = (i: number) =>
    pad + (i * (width - pad * 2)) / Math.max(1, PERFORMANCE_SERIES.length - 1);
  const toY = (v: number) => height - pad - (v / max) * (height - pad * 2);

  const viewsPath = PERFORMANCE_SERIES.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.views)}`).join(
    " ",
  );
  const clicksPath = PERFORMANCE_SERIES.map(
    (p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.clicks * 6)}`,
  ).join(" ");

  return (
    <Card className="nexus-card gap-4" id="analytics">
      <Card.Header>
        <Card.Title>Performance Overview</Card.Title>
        <Card.Description>Views and clicks over the last 7 days</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="mb-3 flex gap-4 text-xs">
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#629BF8]" /> Views
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#82B0F9]/80" /> Clicks (scaled)
          </span>
        </div>
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full min-w-[320px]">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = pad + t * (height - pad * 2);
              return (
                <line
                  key={t}
                  x1={pad}
                  x2={width - pad}
                  y1={y}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                />
              );
            })}
            <path d={viewsPath} fill="none" stroke="#629BF8" strokeWidth="3" strokeLinecap="round" />
            <path
              d={clicksPath}
              fill="none"
              stroke="#82B0F9"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            {PERFORMANCE_SERIES.map((p, i) => (
              <g key={p.label}>
                <circle cx={toX(i)} cy={toY(p.views)} r="4" fill="#629BF8" />
                <text
                  x={toX(i)}
                  y={height - 6}
                  textAnchor="middle"
                  className="fill-muted text-[11px]"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </Card.Content>
    </Card>
  );
}
