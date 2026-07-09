<template>
<svg width="1280.0" height="736.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460"  >
  <defs>
    <marker id="svg_b2224d_arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="currentColor" />
    </marker>
  </defs>

  <!-- Base Layer: Always Visible -->
  <g id="svg_b2224d_base_query">
    <!-- Query Box -->
    <rect x="30" y="185" width="160" height="90" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="2.5" />
    <text x="110" y="225" font-family="'Avenir Next', sans-serif" font-size="16px" font-weight="bold" text-anchor="middle" fill="currentColor">Query</text>
    <text x="110" y="250" font-family="'Avenir Next', sans-serif" font-size="18px" font-weight="bold" text-anchor="middle" fill="#2196f3">"item1"</text>
  </g>

  <!-- Row 1: Case 1 and its evaluation (Step 1) -->
  <g v-click="1" id="svg_b2224d_row1_step_1">
    <!-- Connector from Query to Case 1 -->
    <path d="M 190 230 C 220 230, 220 90, 260 90" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_b2224d_arrow)" />

    <!-- Case 1 Box -->
    <rect x="270" y="35" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="60" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="currentColor">Case 1: Top Results</text>
    <text x="285" y="85" font-family="'Avenir Next', sans-serif" font-size="14px" fill="#4caf50" font-weight="bold">1. item1 ✓ (Relevant)</text>
    <text x="285" y="105" font-family="'Avenir Next', sans-serif" font-size="14px" fill="currentColor" opacity="0.6">2. item2</text>
    <text x="285" y="125" font-family="'Avenir Next', sans-serif" font-size="14px" fill="currentColor" opacity="0.6">3. item3</text>

    <!-- Solid connector from Case 1 to RR 1 -->
    <path d="M 490 90 L 550 90" fill="none" stroke="#4caf50" stroke-width="2.5" marker-end="url(#svg_b2224d_arrow)" />
    
    <!-- Bold Green Border for Case 1 -->
    <rect x="270" y="35" width="220" height="110" rx="10" ry="10" fill="none" stroke="#4caf50" stroke-width="3" />

    <!-- RR 1 Card -->
    <rect x="560" y="35" width="210" height="110" rx="10" ry="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" />
    <text x="665" y="65" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="#2e7d32" text-anchor="middle">First Rank = 1</text>
    <text x="665" y="95" font-family="'Avenir Next', sans-serif" font-size="18px" font-weight="bold" fill="#1b5e20" text-anchor="middle">RR = 1/1 = 1.0</text>
  </g>

  <!-- Row 2: Case 2 and its evaluation (Step 2) -->
  <g v-click="2" id="svg_b2224d_row2_step_2">
    <!-- Connector from Query to Case 2 -->
    <path d="M 190 230 L 260 230" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_b2224d_arrow)" />

    <!-- Case 2 Box -->
    <rect x="270" y="175" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="200" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="currentColor">Case 2: Top Results</text>
    <text x="285" y="225" font-family="'Avenir Next', sans-serif" font-size="14px" fill="currentColor" opacity="0.6">1. item2</text>
    <text x="285" y="245" font-family="'Avenir Next', sans-serif" font-size="14px" fill="#ff9800" font-weight="bold">2. item1 ✓ (Relevant)</text>
    <text x="285" y="265" font-family="'Avenir Next', sans-serif" font-size="14px" fill="currentColor" opacity="0.6">3. item3</text>

    <!-- Solid connector from Case 2 to RR 2 -->
    <path d="M 490 230 L 550 230" fill="none" stroke="#ff9800" stroke-width="2.5" marker-end="url(#svg_b2224d_arrow)" />

    <!-- Bold Orange Border for Case 2 -->
    <rect x="270" y="175" width="220" height="110" rx="10" ry="10" fill="none" stroke="#ff9800" stroke-width="3" />

    <!-- RR 2 Card -->
    <rect x="560" y="175" width="210" height="110" rx="10" ry="10" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" />
    <text x="665" y="205" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="#ef6c00" text-anchor="middle">First Rank = 2</text>
    <text x="665" y="235" font-family="'Avenir Next', sans-serif" font-size="18px" font-weight="bold" fill="#e65100" text-anchor="middle">RR = 1/2 = 0.5</text>
  </g>

  <!-- Row 3: Case 3 and its evaluation (Step 3) -->
  <g v-click="3" id="svg_b2224d_row3_step_3">
    <!-- Connector from Query to Case 3 -->
    <path d="M 190 230 C 220 230, 220 370, 260 370" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_b2224d_arrow)" />

    <!-- Case 3 Box -->
    <rect x="270" y="315" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="340" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="currentColor">Case 3: Top Results</text>
    <text x="285" y="365" font-family="'Avenir Next', sans-serif" font-size="14px" fill="currentColor" opacity="0.6">1. item2</text>
    <text x="285" y="385" font-family="'Avenir Next', sans-serif" font-size="14px" fill="currentColor" opacity="0.6">2. item3</text>
    <text x="285" y="405" font-family="'Avenir Next', sans-serif" font-size="14px" fill="#f44336" font-weight="bold">3. item4 ✗ (Irrelevant)</text>

    <!-- Solid connector from Case 3 to RR 3 -->
    <path d="M 490 370 L 550 370" fill="none" stroke="#f44336" stroke-width="2.5" marker-end="url(#svg_b2224d_arrow)" />

    <!-- Bold Red Border for Case 3 -->
    <rect x="270" y="315" width="220" height="110" rx="10" ry="10" fill="none" stroke="#f44336" stroke-width="3" />

    <!-- RR 3 Card -->
    <rect x="560" y="315" width="210" height="110" rx="10" ry="10" fill="#ffebee" stroke="#c62828" stroke-width="2" />
    <text x="665" y="345" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="#c62828" text-anchor="middle">First Rank = N/A</text>
    <text x="665" y="375" font-family="'Avenir Next', sans-serif" font-size="18px" font-weight="bold" fill="#b71c1c" text-anchor="middle">RR = 0.0</text>
  </g>
</svg>
</template>
