<template>
<svg width="1280.0" height="736.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460"  >
  <defs>
    <marker id="svg_83a524_arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="currentColor" />
    </marker>
  </defs>

  <!-- Base Layer: Always Visible -->
  <g id="svg_83a524_base_query">
    <!-- Expected Box -->
    <rect x="20" y="30" width="200" height="110" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7" />
    <text x="120" y="55" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" text-anchor="middle" fill="currentColor">Expected Relevant</text>
    <text x="120" y="80" font-family="'Avenir Next', sans-serif" font-size="13px" text-anchor="middle" fill="#2196f3" font-weight="bold">item1, item2, item3</text>
    <text x="120" y="100" font-family="'Avenir Next', sans-serif" font-size="12px" text-anchor="middle" fill="currentColor" opacity="0.6">(3 relevant items)</text>

    <!-- Retrieved Box -->
    <rect x="20" y="170" width="200" height="260" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="2.5" />
    <text x="120" y="195" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" text-anchor="middle" fill="currentColor">Retrieved Candidates</text>
    <text x="120" y="225" font-family="'Avenir Next', sans-serif" font-size="13px" text-anchor="middle" fill="#4caf50" font-weight="bold">1. item1 ✓</text>
    <text x="120" y="250" font-family="'Avenir Next', sans-serif" font-size="13px" text-anchor="middle" fill="#f44336" font-weight="bold">2. item4 ✗</text>
    <text x="120" y="275" font-family="'Avenir Next', sans-serif" font-size="13px" text-anchor="middle" fill="#4caf50" font-weight="bold">3. item2 ✓</text>
    <text x="120" y="300" font-family="'Avenir Next', sans-serif" font-size="13px" text-anchor="middle" fill="#f44336" font-weight="bold">4. item5 ✗</text>
    <text x="120" y="325" font-family="'Avenir Next', sans-serif" font-size="13px" text-anchor="middle" fill="#4caf50" font-weight="bold">5. item3 ✓</text>
    <text x="120" y="350" font-family="'Avenir Next', sans-serif" font-size="13px" text-anchor="middle" fill="#f44336" font-weight="bold">6. item6 ✗</text>
  </g>

  <!-- Row 1: Cutoff K=3 and Score K=3 (Step 1) -->
  <g v-click="1" id="svg_83a524_row1_step_1">
    <path d="M 220 250 C 240 250, 240 135, 260 135" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_83a524_arrow)" />
    
    <!-- Cutoff @ K=3 Box -->
    <rect x="270" y="80" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="105" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Cutoff @ K = 3</text>
    <text x="285" y="130" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">1. item1 ✓</text>
    <text x="285" y="150" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#f44336" font-weight="bold">2. item4 ✗</text>
    <text x="285" y="170" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">3. item2 ✓</text>

    <!-- Connector to Score K=3 -->
    <path d="M 490 135 L 530 135" fill="none" stroke="#ff9800" stroke-width="2.5" marker-end="url(#svg_83a524_arrow)" />
    <rect x="270" y="80" width="220" height="110" rx="10" ry="10" fill="none" stroke="#ff9800" stroke-width="3" />
    
    <!-- Score K=3 Card -->
    <rect x="540" y="80" width="240" height="110" rx="10" ry="10" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" />
    <text x="660" y="110" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="#ef6c00" text-anchor="middle">Precision@3 = 2/3 = 67%</text>
    <text x="660" y="140" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="#ef6c00" text-anchor="middle">Recall@3 = 2/3 = 67%</text>
  </g>

  <!-- Row 2: Cutoff K=5 and Score K=5 (Step 2) -->
  <g v-click="2" id="svg_83a524_row2_step_2">
    <path d="M 220 350 C 240 350, 240 315, 260 315" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_83a524_arrow)" />
    
    <!-- Cutoff @ K=5 Box -->
    <rect x="270" y="260" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="285" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Cutoff @ K = 5</text>
    <text x="285" y="310" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">1. item1 ✓, 3. item2 ✓</text>
    <text x="285" y="330" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#f44336" font-weight="bold">2. item4 ✗, 4. item5 ✗</text>
    <text x="285" y="350" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">5. item3 ✓</text>

    <!-- Connector to Score K=5 -->
    <path d="M 490 315 L 530 315" fill="none" stroke="#4caf50" stroke-width="2.5" marker-end="url(#svg_83a524_arrow)" />
    <rect x="270" y="260" width="220" height="110" rx="10" ry="10" fill="none" stroke="#4caf50" stroke-width="3" />
    
    <!-- Score K=5 Card -->
    <rect x="540" y="260" width="240" height="110" rx="10" ry="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" />
    <text x="660" y="290" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="#2e7d32" text-anchor="middle">Precision@5 = 3/5 = 60%</text>
    <text x="660" y="320" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="#2e7d32" text-anchor="middle">Recall@5 = 3/3 = 100%</text>
  </g>
</svg>
</template>
