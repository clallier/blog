<template>
<svg width="1280.0" height="736.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460"  >
  <defs>
    <marker id="svg_25c804_arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="currentColor" />
    </marker>
  </defs>

  <!-- Base Layer: Always Visible -->
  <g id="svg_25c804_base_query">
    <!-- Query Box -->
    <rect x="20" y="175" width="180" height="110" rx="12" ry="12" fill="none" stroke="currentColor" stroke-width="2.5" />
    <text x="110" y="210" font-family="'Avenir Next', sans-serif" font-size="16px" font-weight="bold" text-anchor="middle" fill="currentColor">Expected Set</text>
    <text x="110" y="235" font-family="'Avenir Next', sans-serif" font-size="14px" text-anchor="middle" fill="#2196f3" font-weight="bold">item1</text>
    <text x="110" y="255" font-family="'Avenir Next', sans-serif" font-size="14px" text-anchor="middle" fill="#2196f3" font-weight="bold">item2</text>
    <text x="110" y="275" font-family="'Avenir Next', sans-serif" font-size="14px" text-anchor="middle" fill="#2196f3" font-weight="bold">item3</text>
  </g>

  <!-- Row 1: Case 1 and its evaluation (Step 1) -->
  <g v-click="1" id="svg_25c804_row1_step_1">
    <!-- Connector from Query to Case 1 -->
    <path d="M 200 230 C 230 230, 230 90, 260 90" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_25c804_arrow)" />
    
    <!-- Case 1 Box -->
    <rect x="270" y="35" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="60" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 1: All Correct</text>
    <text x="285" y="85" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#4caf50" font-weight="bold">✓ [item1, item2, item3]</text>
    <text x="285" y="105" font-family="'Avenir Next', sans-serif" font-size="12px" fill="currentColor" opacity="0.6">No missed, no extra</text>

    <!-- Solid connector from Case 1 to E1 -->
    <path d="M 490 90 L 540 90" fill="none" stroke="#4caf50" stroke-width="2.5" marker-end="url(#svg_25c804_arrow)" />
    
    <!-- Bold Green Border for Case 1 -->
    <rect x="270" y="35" width="220" height="110" rx="10" ry="10" fill="none" stroke="#4caf50" stroke-width="3" />

    <!-- E1 Card -->
    <rect x="550" y="35" width="230" height="110" rx="10" ry="10" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" />
    <text x="665" y="60" font-family="'Avenir Next', sans-serif" font-size="12px" font-weight="bold" fill="#2e7d32" text-anchor="middle">TP=3, FP=0, FN=0</text>
    <text x="665" y="80" font-family="'Avenir Next', sans-serif" font-size="12px" fill="#2e7d32" text-anchor="middle">P = 1.00, R = 1.00</text>
    <text x="665" y="105" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="#1b5e20" text-anchor="middle">F1 Score = 1.00</text>
  </g>

  <!-- Row 2: Case 2 and its evaluation (Step 2) -->
  <g v-click="2" id="svg_25c804_row2_step_2">
    <!-- Connector from Query to Case 2 -->
    <path d="M 200 230 L 260 230" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_25c804_arrow)" />

    <!-- Case 2 Box -->
    <rect x="270" y="175" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="200" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 2: Extra / Wrong</text>
    <text x="285" y="225" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#ff9800" font-weight="bold">[item1, item2, item4 ✗]</text>
    <text x="285" y="245" font-family="'Avenir Next', sans-serif" font-size="12px" fill="currentColor" opacity="0.6">Missed: item3</text>

    <!-- Solid connector from Case 2 to E2 -->
    <path d="M 490 230 L 540 230" fill="none" stroke="#ff9800" stroke-width="2.5" marker-end="url(#svg_25c804_arrow)" />

    <!-- Bold Orange Border for Case 2 -->
    <rect x="270" y="175" width="220" height="110" rx="10" ry="10" fill="none" stroke="#ff9800" stroke-width="3" />

    <!-- E2 Card -->
    <rect x="550" y="175" width="230" height="110" rx="10" ry="10" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" />
    <text x="665" y="200" font-family="'Avenir Next', sans-serif" font-size="12px" font-weight="bold" fill="#ef6c00" text-anchor="middle">TP=2, FP=1, FN=1</text>
    <text x="665" y="220" font-family="'Avenir Next', sans-serif" font-size="12px" fill="#ef6c00" text-anchor="middle">P = 0.67, R = 0.67</text>
    <text x="665" y="245" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="#e65100" text-anchor="middle">F1 Score = 0.67</text>
  </g>

  <!-- Row 3: Case 3 and its evaluation (Step 3) -->
  <g v-click="3" id="svg_25c804_row3_step_3">
    <!-- Connector from Query to Case 3 -->
    <path d="M 200 230 C 230 230, 230 370, 260 370" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#svg_25c804_arrow)" />

    <!-- Case 3 Box -->
    <rect x="270" y="315" width="220" height="110" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8" />
    <text x="285" y="340" font-family="'Avenir Next', sans-serif" font-size="14px" font-weight="bold" fill="currentColor">Case 3: Missing Item</text>
    <text x="285" y="365" font-family="'Avenir Next', sans-serif" font-size="13px" fill="#fbc02d" font-weight="bold">[item1, item2]</text>
    <text x="285" y="385" font-family="'Avenir Next', sans-serif" font-size="12px" fill="currentColor" opacity="0.6">Missed: item3</text>

    <!-- Solid connector from Case 3 to E3 -->
    <path d="M 490 370 L 540 370" fill="none" stroke="#fbc02d" stroke-width="2.5" marker-end="url(#svg_25c804_arrow)" />

    <!-- Bold Yellow Border for Case 3 -->
    <rect x="270" y="315" width="220" height="110" rx="10" ry="10" fill="none" stroke="#fbc02d" stroke-width="3" />

    <!-- E3 Card -->
    <rect x="550" y="315" width="230" height="110" rx="10" ry="10" fill="#fffde7" stroke="#fbc02d" stroke-width="2" />
    <text x="665" y="340" font-family="'Avenir Next', sans-serif" font-size="12px" font-weight="bold" fill="#f57f17" text-anchor="middle">TP=2, FP=0, FN=1</text>
    <text x="665" y="360" font-family="'Avenir Next', sans-serif" font-size="12px" fill="#f57f17" text-anchor="middle">P = 1.00, R = 0.67</text>
    <text x="665" y="385" font-family="'Avenir Next', sans-serif" font-size="15px" font-weight="bold" fill="#f57f17" text-anchor="middle">F1 Score = 0.80</text>
  </g>
</svg>
</template>
