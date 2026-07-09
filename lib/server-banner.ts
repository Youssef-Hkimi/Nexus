/**
 * Cinematic mock server banners.
 * These are layered SVG scenes so the hero looks like a real banner image,
 * not a flat magenta gradient.
 */

export function getServerBannerUrl(slug: string, hue: string): string {
  const h = Number(hue) || 220;

  // Per-server color stories (realistic community vibes)
  const themes: Record<string, { bg: string; a: string; b: string; c: string; d: string }> = {
    "lofi-girl": {
      bg: "#1a1b2e",
      a: "#2d3a6b",
      b: "#5b4b8a",
      c: "#e8a87c",
      d: "#f7d794",
    },
    "nexus-hub": {
      bg: "#0f172a",
      a: "#1e3a5f",
      b: "#629BF8",
      c: "#82B0F9",
      d: "#c7e0ff",
    },
    reactflux: {
      bg: "#0b1220",
      a: "#0e7490",
      b: "#22d3ee",
      c: "#38bdf8",
      d: "#a5f3fc",
    },
    minecraft: {
      bg: "#0f1a12",
      a: "#14532d",
      b: "#22c55e",
      c: "#86efac",
      d: "#fbbf24",
    },
    "anime-soul": {
      bg: "#1a1024",
      a: "#4c1d95",
      b: "#ec4899",
      c: "#f472b6",
      d: "#fde68a",
    },
    "study-together": {
      bg: "#111827",
      a: "#1e3a5f",
      b: "#3b82f6",
      c: "#93c5fd",
      d: "#e0e7ff",
    },
    "cozy-corner": {
      bg: "#1c1410",
      a: "#7c2d12",
      b: "#ea580c",
      c: "#fdba74",
      d: "#fef3c7",
    },
    "valorant-hub": {
      bg: "#140a0f",
      a: "#7f1d1d",
      b: "#ef4444",
      c: "#fca5a5",
      d: "#fee2e2",
    },
    midjourney: {
      bg: "#12081f",
      a: "#581c87",
      b: "#a855f7",
      c: "#e879f9",
      d: "#f5d0fe",
    },
  };

  const t =
    themes[slug] ??
    ({
      bg: `hsl(${h} 35% 10%)`,
      a: `hsl(${h} 45% 22%)`,
      b: `hsl(${h} 55% 42%)`,
      c: `hsl(${(h + 30) % 360} 60% 55%)`,
      d: `hsl(${(h + 50) % 360} 70% 70%)`,
    } as const);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="520" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bg}"/>
      <stop offset="45%" stop-color="${t.a}"/>
      <stop offset="100%" stop-color="${t.bg}"/>
    </linearGradient>
    <radialGradient id="orb1" cx="20%" cy="35%" r="45%">
      <stop offset="0%" stop-color="${t.b}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${t.b}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb2" cx="78%" cy="30%" r="40%">
      <stop offset="0%" stop-color="${t.c}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${t.c}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb3" cx="55%" cy="75%" r="35%">
      <stop offset="0%" stop-color="${t.d}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${t.d}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>

  <rect width="1600" height="520" fill="url(#sky)"/>
  <rect width="1600" height="520" fill="url(#orb1)"/>
  <rect width="1600" height="520" fill="url(#orb2)"/>
  <rect width="1600" height="520" fill="url(#orb3)"/>

  <!-- Soft light blooms kept in upper/mid area so the bottom stays rich, not washed -->
  <circle cx="260" cy="150" r="120" fill="${t.b}" opacity="0.2" filter="url(#soft)"/>
  <circle cx="1280" cy="120" r="150" fill="${t.c}" opacity="0.18" filter="url(#soft)"/>
  <circle cx="820" cy="200" r="140" fill="${t.d}" opacity="0.1" filter="url(#soft)"/>

  <!-- Dark terrain/foreground for depth — stays dark, no pale band -->
  <path d="M0 400 C280 340, 520 430, 800 370 S 1300 320, 1600 360 L1600 520 L0 520 Z" fill="${t.a}" opacity="0.5"/>
  <path d="M0 440 C320 400, 560 470, 860 420 S 1280 380, 1600 430 L1600 520 L0 520 Z" fill="${t.bg}" opacity="0.75"/>

  <g opacity="0.3" stroke="${t.c}" stroke-width="1.2" fill="none">
    <path d="M120 280 C280 220, 420 300, 600 240"/>
    <path d="M720 200 C920 160, 1100 230, 1320 170"/>
  </g>

  <g fill="#ffffff">
    <circle cx="180" cy="90" r="1.4" opacity="0.55"/>
    <circle cx="340" cy="140" r="1.1" opacity="0.4"/>
    <circle cx="520" cy="70" r="1.6" opacity="0.5"/>
    <circle cx="760" cy="110" r="1.2" opacity="0.45"/>
    <circle cx="980" cy="80" r="1.5" opacity="0.5"/>
    <circle cx="1180" cy="130" r="1.1" opacity="0.4"/>
    <circle cx="1400" cy="95" r="1.7" opacity="0.55"/>
    <circle cx="250" cy="210" r="1" opacity="0.3"/>
    <circle cx="1100" cy="200" r="1.2" opacity="0.35"/>
    <circle cx="640" cy="160" r="1" opacity="0.35"/>
  </g>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
