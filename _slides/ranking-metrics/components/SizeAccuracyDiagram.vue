<template>
<svg width="1280.0" height="736.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460"  >
  <defs>
    <marker id="svg_102be3_arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="currentColor" />
    </marker>
  </defs>

  <!-- Base Layer: Always Visible -->
  <g id="svg_102be3_base_query">
    <!-- Query Box -->
    <rect x="20" y="175" width="180" height="110" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="2.5" />
    <text x="110" y="225" font-family="'Avenir Next', sans-serif" font-size="16px" font-weight="bold" text-anchor="middle" fill="currentColor">Expected Count</text>
    <text x="110" y="255" font-family="'Avenir Next', sans-serif" font-size="28px" font-weight="bold" text-anchor="middle" fill="#2196f3">5</text>
  </g>

  <!-- Row 1: Case 1 and its evaluation (Step 1) -->
  <g v-click="1" id="svg_102be3_row1_step_1">
    <!-- Connector from Query to Case 1 -->
    <path d="M 200 230 C 230 230, 230 62, 260 62" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_102be3_arrow)" />
    
    <!-- Case 1 Box -->
    <rect x="270" y="20" width="220" height="85" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="45" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 1: Actual = 5</text>
    <text x="285" y="70" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">Difference: 0</text>

    <!-- Connector from Case 1 to Score 1 -->
    <path d="M 490 62 L 540 62" fill="none" stroke="#4caf50" stroke-width="2.5" marker-end="url(#svg_102be3_arrow)" />
    <rect x="270" y="20" width="220" height="85" rx="10" ry="10" fill="none" stroke="#4caf50" stroke-width="3" />

    <!-- Score 1 Card -->
    <rect x="550" y="20" width="230" height="85" rx="10" ry="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" />
    <text x="665" y="48" font-family="'Avenir Next', sans-serif" font-size="12px" font-weight="bold" fill="#2e7d32" text-anchor="middle">Diff Norm = 0 / 5 = 0.0</text>
    <text x="665" y="70" font-family="'Avenir Next', sans-serif" font-size="16px" font-weight="bold" fill="#1b5e20" text-anchor="middle">Score = 1.00</text>
  </g>

  <!-- Row 2: Case 2 and its evaluation (Step 2) -->
  <g v-click="2" id="svg_102be3_row2_step_2">
    <!-- Connector from Query to Case 2 -->
    <path d="M 200 230 C 230 230, 230 167, 260 167" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_102be3_arrow)" />

    <!-- Case 2 Box -->
    <rect x="270" y="125" width="220" height="85" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="150" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 2: Actual = 10</text>
    <text x="285" y="175" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#ff9800" font-weight="bold">Difference: +5</text>

    <!-- Connector from Case 2 to Score 2 -->
    <path d="M 490 167 L 540 167" fill="none" stroke="#ff9800" stroke-width="2.5" marker-end="url(#svg_102be3_arrow)" />
    <rect x="270" y="125" width="220" height="85" rx="10" ry="10" fill="none" stroke="#ff9800" stroke-width="3" />

    <!-- Score 2 Card -->
    <rect x="550" y="125" width="230" height="85" rx="10" ry="10" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" />
    <text x="665" y="153" font-family="'Avenir Next', sans-serif" font-size="12px" font-weight="bold" fill="#ef6c00" text-anchor="middle">Diff Norm = 5 / 5 = 1.0</text>
    <text x="665" y="175" font-family="'Avenir Next', sans-serif" font-size="16px" font-weight="bold" fill="#e65100" text-anchor="middle">Score = 0.50</text>
  </g>

  <!-- Row 3: Case 3 and its evaluation (Step 3) -->
  <g v-click="3" id="svg_102be3_row3_step_3">
    <!-- Connector from Query to Case 3 -->
    <path d="M 200 230 C 230 230, 230 272, 260 272" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_102be3_arrow)" />

    <!-- Case 3 Box -->
    <rect x="270" y="230" width="220" height="85" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="255" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 3: Actual = 2</text>
    <text x="285" y="280" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#fbc02d" font-weight="bold">Difference: -3</text>

    <!-- Connector from Case 3 to Score 3 -->
    <path d="M 490 272 L 540 272" fill="none" stroke="#fbc02d" stroke-width="2.5" marker-end="url(#svg_102be3_arrow)" />
    <rect x="270" y="230" width="220" height="85" rx="10" ry="10" fill="none" stroke="#fbc02d" stroke-width="3" />

    <!-- Score 3 Card -->
    <rect x="550" y="230" width="230" height="85" rx="10" ry="10" fill="#fffde7" stroke="#fbc02d" stroke-width="2" />
    <text x="665" y="258" font-family="'Avenir Next', sans-serif" font-size="12px" font-weight="bold" fill="#f57f17" text-anchor="middle">Diff Norm = 3 / 5 = 0.6</text>
    <text x="665" y="280" font-family="'Avenir Next', sans-serif" font-size="16px" font-weight="bold" fill="#f57f17" text-anchor="middle">Score = 0.63</text>
  </g>

  <!-- Row 4: Case 4 and its evaluation (Step 4) -->
  <g v-click="4" id="svg_102be3_row4_step_4">
    <!-- Connector from Query to Case 4 -->
    <path d="M 200 230 C 230 230, 230 377, 260 377" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_102be3_arrow)" />

    <!-- Case 4 Box -->
    <rect x="270" y="335" width="220" height="85" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="360" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 4: Actual = 0</text>
    <text x="285" y="385" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#f44336" font-weight="bold">Difference: -5</text>

    <!-- Connector from Case 4 to Score 4 -->
    <path d="M 490 377 L 540 377" fill="none" stroke="#f44336" stroke-width="2.5" marker-end="url(#svg_102be3_arrow)" />
    <rect x="270" y="335" width="220" height="85" rx="10" ry="10" fill="none" stroke="#f44336" stroke-width="3" />

    <!-- Score 4 Card -->
    <rect x="550" y="335" width="230" height="85" rx="10" ry="10" fill="#ffebee" stroke="#c62828" stroke-width="2" />
    <text x="665" y="363" font-family="'Avenir Next', sans-serif" font-size="12px" font-weight="bold" fill="#c62828" text-anchor="middle">Special Rule: Actual = 0</text>
    <text x="665" y="385" font-family="'Avenir Next', sans-serif" font-size="16px" font-weight="bold" fill="#b71c1c" text-anchor="middle">Score = 0.00</text>
  </g>
</svg>
</template>
