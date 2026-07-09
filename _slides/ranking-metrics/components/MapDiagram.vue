<template>
<svg width="1280.0" height="736.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460"  >
  <defs>
    <marker id="svg_41d3f2_arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="currentColor" />
    </marker>
  </defs>

  <!-- Base Layer: Always Visible -->
  <g id="svg_41d3f2_base_query">
    <!-- Query Box -->
    <rect x="20" y="165" width="180" height="110" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="2.5" />
    <text x="110" y="200" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" text-anchor="middle" fill="currentColor">Expected Relevant</text>
    <text x="110" y="225" font-family="'Avenir Next', sans-serif" font-size="14px" text-anchor="middle" fill="#2196f3" font-weight="bold">item1 ✓</text>
    <text x="110" y="245" font-family="'Avenir Next', sans-serif" font-size="14px" text-anchor="middle" fill="#2196f3" font-weight="bold">item2 ✓</text>
    <text x="110" y="265" font-family="'Avenir Next', sans-serif" font-size="14px" text-anchor="middle" fill="#2196f3" font-weight="bold">item3 ✓</text>
  </g>

  <!-- Row 1: Case 1 and its evaluation (Step 1) -->
  <g v-click="1" id="svg_41d3f2_row1_step_1">
    <!-- Connector from Query to Case 1 -->
    <path d="M 200 220 C 230 220, 230 115, 260 115" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_41d3f2_arrow)" />
    
    <!-- Case 1 Box -->
    <rect x="270" y="45" width="230" height="140" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="70" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 1: Perfect Rank</text>
    <text x="285" y="95" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">1. item1 ✓ (P@1 = 1.00)</text>
    <text x="285" y="120" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">2. item2 ✓ (P@2 = 1.00)</text>
    <text x="285" y="145" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">3. item3 ✓ (P@3 = 1.00)</text>

    <!-- Solid connector from Case 1 to AP 1 -->
    <path d="M 500 115 L 540 115" fill="none" stroke="#4caf50" stroke-width="2.5" marker-end="url(#svg_41d3f2_arrow)" />
    
    <!-- Bold Green Border for Case 1 -->
    <rect x="270" y="45" width="230" height="140" rx="10" ry="10" fill="none" stroke="#4caf50" stroke-width="3" />

    <!-- AP 1 Card -->
    <rect x="550" y="45" width="230" height="140" rx="10" ry="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" />
    <text x="665" y="90" font-family="'Avenir Next', sans-serif" font-size="13px" font-weight="bold" fill="#2e7d32" text-anchor="middle">AP = (1.0 + 1.0 + 1.0)/3</text>
    <text x="665" y="125" font-family="'Avenir Next', sans-serif" font-size="18px" font-weight="bold" fill="#1b5e20" text-anchor="middle">AP = 1.00</text>
  </g>

  <!-- Row 2: Case 2 and its evaluation (Step 2) -->
  <g v-click="2" id="svg_41d3f2_row2_step_2">
    <!-- Connector from Query to Case 2 -->
    <path d="M 200 220 C 230 220, 230 315, 260 315" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_41d3f2_arrow)" />

    <!-- Case 2 Box -->
    <rect x="270" y="245" width="230" height="140" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="270" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 2: Late Relevant Items</text>
    <text x="285" y="295" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">1. item1 ✓ (P@1 = 1.00)</text>
    <text x="285" y="320" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#f44336" font-weight="bold">2. item4 ✗ (P@2 = 0.50)</text>
    <text x="285" y="345" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#ff9800" font-weight="bold">3. item2 ✓ (P@3 = 0.67)</text>

    <!-- Solid connector from Case 2 to AP 2 -->
    <path d="M 500 315 L 540 315" fill="none" stroke="#ff9800" stroke-width="2.5" marker-end="url(#svg_41d3f2_arrow)" />

    <!-- Bold Orange Border for Case 2 -->
    <rect x="270" y="245" width="230" height="140" rx="10" ry="10" fill="none" stroke="#ff9800" stroke-width="3" />

    <!-- AP 2 Card -->
    <rect x="550" y="245" width="230" height="140" rx="10" ry="10" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" />
    <text x="665" y="290" font-family="'Avenir Next', sans-serif" font-size="13px" font-weight="bold" fill="#ef6c00" text-anchor="middle">AP = (1.0 + 0.67)/2</text>
    <text x="665" y="325" font-family="'Avenir Next', sans-serif" font-size="18px" font-weight="bold" fill="#e65100" text-anchor="middle">AP = 0.84</text>
  </g>
</svg>
</template>
