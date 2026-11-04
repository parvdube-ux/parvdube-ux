const fs = require('fs');

const cx = 400;
const cy = 240;
const r_in = 95;
const r_out = 190;
const gap_deg = 3.0;

const wedges = [
  { title: 'AI & AGENTS', sub: 'Gemini & LLMs', mid: -90, icon: '🤖' },
  { title: 'LANGUAGES', sub: 'Python, JS, C++', mid: -45, icon: '🗡️' },
  { title: 'FRONTEND', sub: 'React & Next.js', mid: 0, icon: '🔫' },
  { title: 'BACKEND', sub: 'Node & Express', mid: 45, icon: '💣' },
  { title: 'DATABASES', sub: 'MongoDB & SQL', mid: 90, icon: '🏦' },
  { title: 'DEV TOOLS', sub: 'Git, Claude, Postman', mid: 135, icon: '🕶️' },
  { title: 'DEVOPS', sub: 'CI/CD & K8s', mid: 180, icon: '☁️' },
  { title: 'CORE CS', sub: 'DSA & OOP Logic', mid: 225, icon: '🧠' }
];

const paths = [];
const text_nodes = [];

wedges.forEach((w, i) => {
  const a1 = (w.mid - 22.5 + gap_deg / 2) * (Math.PI / 180);
  const a2 = (w.mid + 22.5 - gap_deg / 2) * (Math.PI / 180);
  
  const x1_in = cx + r_in * Math.cos(a1);
  const y1_in = cy + r_in * Math.sin(a1);
  const x2_in = cx + r_in * Math.cos(a2);
  const y2_in = cy + r_in * Math.sin(a2);
  const x1_out = cx + r_out * Math.cos(a1);
  const y1_out = cy + r_out * Math.sin(a1);
  const x2_out = cx + r_out * Math.cos(a2);
  const y2_out = cy + r_out * Math.sin(a2);

  const r_text = (r_in + r_out) / 2;
  const mid_rad = w.mid * (Math.PI / 180);
  const tx = cx + r_text * Math.cos(mid_rad);
  const ty = cy + r_text * Math.sin(mid_rad);

  const d = `M ${x1_in.toFixed(1)} ${y1_in.toFixed(1)} L ${x1_out.toFixed(1)} ${y1_out.toFixed(1)} A ${r_out} ${r_out} 0 0 1 ${x2_out.toFixed(1)} ${y2_out.toFixed(1)} L ${x2_in.toFixed(1)} ${y2_in.toFixed(1)} A ${r_in} ${r_in} 0 0 0 ${x1_in.toFixed(1)} ${y1_in.toFixed(1)} Z`;
  paths.push({ i, title: w.title, d, mid: w.mid });
  text_nodes.push({ i, title: w.title, sub: w.sub, icon: w.icon, tx, ty, mid: w.mid });
});

let scanlines = '';
for (let y = 0; y < 480; y += 24) {
  scanlines += `    <line x1="0" y1="${y}" x2="800" y2="${y}" />\n`;
}

let wedgeElements = '';
paths.forEach(p => {
  wedgeElements += `    <path d="${p.d}" class="wedge-idle" />\n`;
});

let textElements = '';
text_nodes.forEach(t => {
  textElements += `  <g text-anchor="middle">
    <text x="${t.tx.toFixed(1)}" y="${(t.ty - 4).toFixed(1)}" font-size="16">${t.icon}</text>
    <text x="${t.tx.toFixed(1)}" y="${(t.ty + 13).toFixed(1)}" fill="#ffffff" font-size="9" font-weight="900" class="hud-title">${t.title}</text>
  </g>\n`;
});

const cards = [
  { title: "AI & AGENTIC", sub: "Google Gemini & LLMs", power: "99%", trait: "BOUNDED / AUDITED", icon: "🤖", cls: "card-0" },
  { title: "CORE LANGUAGES", sub: "Python • JS • C++ • Java", power: "98%", trait: "MULTI-PARADIGM", icon: "🗡️", cls: "card-1" },
  { title: "FRONTEND ARSENAL", sub: "React • Next.js • Tailwind", power: "95%", trait: "RESPONSIVE / SCSS", icon: "🔫", cls: "card-2" },
  { title: "BACKEND HEAVY", sub: "Node.js • Express • REST", power: "99%", trait: "ENTERPRISE RBAC", icon: "💣", cls: "card-3" },
  { title: "SAFE CRACKERS", sub: "MongoDB • Aggregations", power: "96%", trait: "PIPELINE LOGIC", icon: "🏦", cls: "card-4" },
  { title: "DEV GEAR", sub: "Git • Postman • Claude", power: "95%", trait: "RAPID DISPATCH", icon: "🕶️", cls: "card-5" },
  { title: "DEVOPS & CLOUD", sub: "CI/CD • Kubernetes • Docker", power: "90%", trait: "CONTAINER OPS", icon: "☁️", cls: "card-6" },
  { title: "CORE FOUNDATIONS", sub: "DSA • OOP • System Logic", power: "97%", trait: "HIGH EFFICIENCY", icon: "🧠", cls: "card-7" },
];

let centerCards = '';
cards.forEach(c => {
  centerCards += `  <g class="${c.cls}" text-anchor="middle">
    <text x="${cx}" y="${cy - 38}" font-size="24">${c.icon}</text>
    <text x="${cx}" y="${cy - 15}" fill="#00f0ff" font-size="11" font-weight="900" class="hud-title" filter="url(#neonBlur)">${c.title}</text>
    <text x="${cx}" y="${cy + 2}" fill="#ffffff" font-size="8.5" font-weight="bold" class="hud-mono">${c.sub}</text>
    <rect x="${cx - 55}" y="${cy + 16}" width="110" height="7" rx="3.5" fill="#130623" stroke="#ff007f" stroke-width="0.8" />
    <rect x="${cx - 54}" y="${cy + 17}" width="95" height="5" rx="2.5" fill="#00f0ff" />
    <text x="${cx}" y="${cy + 38}" fill="#ffd700" font-size="7.5" font-weight="900" class="hud-title">EFFICIENCY: ${c.power} // ${c.trait}</text>
  </g>\n`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="480">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#19062b" />
      <stop offset="60%" stop-color="#0c0316" />
      <stop offset="100%" stop-color="#05010a" />
    </radialGradient>

    <!-- Center Hub Gradient -->
    <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a0845" />
      <stop offset="85%" stop-color="#120320" />
      <stop offset="100%" stop-color="#07010d" />
    </radialGradient>

    <!-- Active Glowing Gradient -->
    <linearGradient id="activeWedgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff007f" />
      <stop offset="50%" stop-color="#ff00bb" />
      <stop offset="100%" stop-color="#00f0ff" />
    </linearGradient>

    <!-- Neon Glow Filter -->
    <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur1" />
      <feGaussianBlur stdDeviation="2" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <style>
      .hud-title {
        font-family: 'Impact', 'Arial Black', sans-serif;
        text-transform: uppercase;
        letter-spacing: 3px;
      }
      .hud-mono {
        font-family: 'Consolas', 'Courier New', monospace;
      }
      .wedge-idle {
        fill: #130623;
        stroke: #391157;
        stroke-width: 1.5;
        transition: all 0.3s ease;
      }

      /* 16s Animation Timeline: 8 items x 2s each */
      @keyframes cycleSlots {
        0%, 12% { transform: rotate(0deg); }
        12.5%, 24.5% { transform: rotate(45deg); }
        25%, 37% { transform: rotate(90deg); }
        37.5%, 49.5% { transform: rotate(135deg); }
        50%, 62% { transform: rotate(180deg); }
        62.5%, 74.5% { transform: rotate(225deg); }
        75%, 87% { transform: rotate(270deg); }
        87.5%, 99.5% { transform: rotate(315deg); }
        100% { transform: rotate(360deg); }
      }

      /* Center Display Opacity Animations */
      @keyframes showCard0 { 0%, 12% { opacity: 1; } 12.5%, 100% { opacity: 0; } }
      @keyframes showCard1 { 0%, 12% { opacity: 0; } 12.5%, 24.5% { opacity: 1; } 25%, 100% { opacity: 0; } }
      @keyframes showCard2 { 0%, 24.5% { opacity: 0; } 25%, 37% { opacity: 1; } 37.5%, 100% { opacity: 0; } }
      @keyframes showCard3 { 0%, 37% { opacity: 0; } 37.5%, 49.5% { opacity: 1; } 50%, 100% { opacity: 0; } }
      @keyframes showCard4 { 0%, 49.5% { opacity: 0; } 50%, 62% { opacity: 1; } 62.5%, 100% { opacity: 0; } }
      @keyframes showCard5 { 0%, 62% { opacity: 0; } 62.5%, 74.5% { opacity: 1; } 75%, 100% { opacity: 0; } }
      @keyframes showCard6 { 0%, 74.5% { opacity: 0; } 75%, 87% { opacity: 1; } 87.5%, 100% { opacity: 0; } }
      @keyframes showCard7 { 0%, 87% { opacity: 0; } 87.5%, 99.5% { opacity: 1; } 100% { opacity: 0; } }

      .selector-pointer {
        transform-origin: ${cx}px ${cy}px;
        animation: cycleSlots 16s cubic-bezier(0.68, -0.2, 0.265, 1.2) infinite;
      }
      .card-0 { animation: showCard0 16s infinite; }
      .card-1 { animation: showCard1 16s infinite; }
      .card-2 { animation: showCard2 16s infinite; }
      .card-3 { animation: showCard3 16s infinite; }
      .card-4 { animation: showCard4 16s infinite; }
      .card-5 { animation: showCard5 16s infinite; }
      .card-6 { animation: showCard6 16s infinite; }
      .card-7 { animation: showCard7 16s infinite; }

      @keyframes radarSweep {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .radar {
        transform-origin: ${cx}px ${cy}px;
        animation: radarSweep 6s linear infinite;
      }
    </style>
  </defs>

  <!-- Frame Background -->
  <rect width="800" height="480" rx="14" fill="url(#bgGrad)" stroke="#ff007f" stroke-width="2" />
  
  <!-- Subtle Grid Scanlines -->
  <g stroke="#ff007f" stroke-width="0.5" opacity="0.12">
${scanlines}  </g>

  <!-- Top Title HUD -->
  <g text-anchor="middle">
    <rect x="230" y="14" width="340" height="26" rx="5" fill="#0c0217" stroke="#00f0ff" stroke-width="1.2" />
    <text x="400" y="32" fill="#00f0ff" font-size="12" font-weight="900" class="hud-title" letter-spacing="4">
      [TAB] GTA WEAPON WHEEL // ARSENAL SELECT
    </text>
  </g>

  <!-- Background Decorative Rings -->
  <circle cx="${cx}" cy="${cy}" r="${r_out + 12}" fill="none" stroke="#2b0a42" stroke-width="1.5" stroke-dasharray="6,4" />
  <circle cx="${cx}" cy="${cy}" r="${r_in - 10}" fill="none" stroke="#00f0ff" stroke-width="1" opacity="0.3" />

  <!-- Idle Wedges -->
  <g id="wedges">
${wedgeElements}  </g>

  <!-- Dynamic Active Wedge Selector (Rotates smoothly around the center) -->
  <g class="selector-pointer">
    <!-- Active wedge pointing at top (-90deg), rotated by keyframes -->
    <path d="${paths[0].d}" fill="url(#activeWedgeGrad)" stroke="#00f0ff" stroke-width="3" filter="url(#intenseGlow)" opacity="0.95" />
    <!-- Yellow Sight / Reticle Pip -->
    <circle cx="${cx}" cy="${cy - r_out - 6}" r="4.5" fill="#ffd700" filter="url(#neonBlur)" />
  </g>

  <!-- Radar line sweep for extra GTA/military HUD effect -->
  <g class="radar" opacity="0.25">
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r_out}" stroke="#00f0ff" stroke-width="2" />
  </g>

  <!-- Wedge Icons & Labels -->
${textElements}
  <!-- Center Circular Hub -->
  <circle cx="${cx}" cy="${cy}" r="${r_in - 12}" fill="url(#centerGrad)" stroke="#ff007f" stroke-width="2.5" />
  <circle cx="${cx}" cy="${cy}" r="${r_in - 16}" fill="none" stroke="#00f0ff" stroke-width="0.8" opacity="0.5" stroke-dasharray="4,3" />

  <!-- Center Weapon Cards (Animated by CSS Opacity) -->
${centerCards}
  <!-- Bottom HUD Status Prompt -->
  <g text-anchor="middle">
    <rect x="200" y="440" width="400" height="26" rx="5" fill="#0a0212" stroke="#ff007f" stroke-width="1" />
    <text x="400" y="457" fill="#ff2a85" font-size="10" font-weight="bold" class="hud-title" letter-spacing="2">
      ★ PARV DUBE // 5-STAR WEAPON SPECIALIST ★
    </text>
  </g>
</svg>
`;

fs.writeFileSync('C:/Users/DELL/.gemini/antigravity/scratch/gta6-portfolio-readme/assets/weapon-wheel.svg', svg, 'utf-8');
console.log('Successfully generated assets/weapon-wheel.svg!');
