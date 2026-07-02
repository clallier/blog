---
layout: page
title: "CSS Regression Test Page"
permalink: /test/
---

This page renders mockups of your blog components and runs native JavaScript assertions on their computed styles to ensure that refactoring to CSS Cascade Layers does not alter the layout or visual appearance.

<div id="test-dashboard">
  <h2>Test Results</h2>
  <ul id="test-results-list" style="list-style: none; padding-left: 0;"></ul>
</div>

<hr>

<h2>Component Mockups (Used for Testing)</h2>

<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px;">
  <h3>1. Post Item Card</h3>
  <div class="post-list" id="test-post-list">
    <div class="post-item" id="test-post-item">
      <a class="post-card" id="test-post-card-link" href="#">
        <div class="post-card-content">
          <img class="post-img" id="test-post-img" src="{{ '/assets/img/favicon.png' | relative_url }}">
          <div class="post-text">
            <span class="post-meta">Machine Learning</span>
            <h3 class="post-title" id="test-post-title">Test Post Title</h3>
          </div>
        </div>
      </a>
    </div>
    <div class="post-item" id="test-post-item-2">
      <a class="post-card" href="#">
        <div class="post-card-content">
          <img class="post-img" src="{{ '/assets/img/favicon.png' | relative_url }}">
          <div class="post-text">
            <span class="post-meta">Game Development</span>
            <h3 class="post-title">Second Mockup Post</h3>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px;">
  <h3>2. CV elements</h3>
  <img class="cv-avatar" id="test-cv-avatar" src="{{ '/assets/img/favicon.png' | relative_url }}">
  <img class="cv-logo" id="test-cv-logo" src="{{ '/assets/img/favicon.png' | relative_url }}">
  <div style="clear: both;"></div>
</div>

<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px; position: relative;" id="test-dropdown-wrapper">
  <h3>3. Dropdown Menu Content</h3>
  <div style="display: flex; justify-content: flex-end; width: 100%;">
    <details class="nav-dropdown" id="test-nav-dropdown" open>
      <summary class="dropdown-toggle">Personal ▾</summary>
      <div class="nav-dropdown-content" id="test-nav-dropdown-content" style="display: block; position: absolute; box-shadow: none;">
        <a href="#">🌱 Personal &amp; Academic Feed</a>
        <a href="#">📄 Resume</a>
      </div>
    </details>
  </div>
</div>

<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px;">
  <h3>4. Collapsible Element</h3>
  <details class="custom-collapsible" id="test-custom-collapsible">
    <summary class="custom-collapsible-summary">
      <span class="custom-collapsible-title">Test Summary Title</span>
      <span class="custom-collapsible-icon"></span>
    </summary>
  </details>
</div>

<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px;">
  <h3>5. HTML/CSS Connected Graphs</h3>
  <div class="html-graph" id="test-html-graph">
    <div class="graph-node" id="test-graph-node">
      <span class="graph-node-title">Node A</span>
      <span class="graph-node-content">Description</span>
    </div>
    <div class="graph-controls" id="test-graph-controls">
      <button>◀</button>
      <span class="step-indicator">Step 1</span>
      <button>▶</button>
    </div>
  </div>
</div>

<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px;">
  <h3>6. Flex Footer</h3>
  <div class="footer-grid" id="test-footer-grid">
    <div class="footer-description">
      <p>Test description</p>
    </div>
    <div class="footer-contact" id="test-footer-contact">
      <p>Contact details</p>
    </div>
  </div>
</div>

<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px;">
  <h3>7. Article Post Content</h3>
  <div class="post-content" id="test-post-content">
    <p id="test-post-paragraph">This paragraph should be justified in layout formatting.</p>
    <blockquote id="test-post-blockquote">This is a custom blockquote.</blockquote>
    <img id="test-post-content-img" src="{{ '/assets/img/favicon.png' | relative_url }}">
    
    <!-- Mock MathJax block equation container -->
    <mjx-container display="true" id="test-math-block">
      <span class="mjx-math">E = mc^2</span>
    </mjx-container>
    
    <!-- Mock MathJax inline math node with background color readability override -->
    <mjx-container id="test-math-inline-container">
      <span style="background-color: var(--minima-code-background-color);" id="test-math-inline-node">x^2</span>
    </mjx-container>
  </div>
</div>

<!-- Mock site navigation elements to verify container queries -->
<div class="test-container" style="padding: 20px; border: 1px dashed #ccc; margin-bottom: 20px;">
  <h3>8. Navigation Menu</h3>
  <header class="site-header">
    <nav class="site-nav" id="test-site-nav">
      <input type="checkbox" id="nav-trigger" class="nav-trigger" checked>
      <div class="trigger" id="test-nav-trigger-menu">
        <div class="nav-items" id="test-nav-items">
          <a class="nav-link" href="#">Test Link 1</a>
        </div>
      </div>
    </nav>
  </header>
</div>

<script>
window.addEventListener('load', function() {
  const resultsList = document.getElementById('test-results-list');
  
  // Custom checking assert
  function assert(name, element, property, expectedValue) {
    if (!element) {
      logResult(name, false, "Element not found");
      return;
    }
    const computed = window.getComputedStyle(element)[property];
    const passed = computed === expectedValue || computed.includes(expectedValue);
    logResult(name, passed, `Expected: ${expectedValue}, Got: ${computed}`);
  }

  function assertFontSize(name, element, expectedRem) {
    assertRem(name, element, "font-size", expectedRem);
  }

  function assertRem(name, element, property, expectedRem) {
    if (!element) {
      logResult(name, false, "Element not found");
      return;
    }
    const computedPx = parseFloat(window.getComputedStyle(element)[property]);
    const rootPx = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]) || 16;
    const expectedPx = expectedRem * rootPx;
    const passed = Math.abs(computedPx - expectedPx) <= 1.5; // permit rounding tolerance
    logResult(name, passed, `Expected: ~${expectedPx}px (${expectedRem}rem), Got: ${computedPx}px`);
  }

  function logResult(name, passed, message) {
    const li = document.createElement('li');
    li.style.padding = '8px';
    li.style.margin = '4px 0';
    li.style.borderRadius = '4px';
    li.style.fontWeight = 'bold';
    if (passed) {
      li.style.backgroundColor = 'rgba(76, 175, 80, 0.15)';
      li.style.color = '#2e7d32';
      li.innerHTML = `🟢 PASS: ${name} (${message})`;
    } else {
      li.style.backgroundColor = 'rgba(244, 67, 54, 0.15)';
      li.style.color = '#c62828';
      li.innerHTML = `🔴 FAIL: ${name} (${message})`;
    }
    resultsList.appendChild(li);
  }

  // Define Baseline Visual Assertions
  assert("Post List Layout Grid", document.getElementById('test-post-list'), "display", "grid");
  
  // Grid columns check: should have a calculated value or fraction
  const gridCol = window.getComputedStyle(document.getElementById('test-post-list'))["grid-template-columns"];
  logResult("Post List columns template", gridCol !== "none", `Got columns: ${gridCol}`);
  
  assert("Post Item rounded corners", document.getElementById('test-post-item'), "border-radius", "12px");
  assert("Post Card link underlines removal", document.getElementById('test-post-card-link'), "text-decoration", "none");
  
  // Transition check: check that the transition includes all or 0.3s transition duration
  const trans = window.getComputedStyle(document.getElementById('test-post-item'))["transition"];
  logResult("Post Item transition settings", trans.includes("all") || trans.includes("0.3s"), `Got transition: ${trans}`);
  
  assert("Post Image width constraint", document.getElementById('test-post-img'), "width", "80px");
  assert("Post Image height constraint", document.getElementById('test-post-img'), "height", "80px");
  assert("Post Title color override", document.getElementById('test-post-title'), "color", "rgb");
  assertFontSize("Post Title font size override", document.getElementById('test-post-title'), 1.25);
  
  // Font weight check: handles either numeric "700" or keyword "bold" depending on browser engine
  const fw = window.getComputedStyle(document.getElementById('test-post-title'))["font-weight"];
  logResult("Post Title bold font weight", fw === "700" || fw === "bold", `Got font-weight: ${fw}`);

  assert("CV Avatar rounded circle", document.getElementById('test-cv-avatar'), "border-radius", "50%");
  assert("CV Logo margin alignment", document.getElementById('test-cv-logo'), "margin-right", "8px");
  
  // CV Logo height check (1.5625rem)
  assertRem("CV Logo height constraint", document.getElementById('test-cv-logo'), "height", 1.5625);
  
  assert("Dropdown Content rounded corners", document.getElementById('test-nav-dropdown-content'), "border-radius", "6px");
  assert("Collapsible Element border radius", document.getElementById('test-custom-collapsible'), "border-radius", "8px");
  
  // Collapsible Icon checks
  const icon = document.querySelector('#test-custom-collapsible .custom-collapsible-icon');
  assertRem("Collapsible Icon width constraint", icon, "width", 0.5);
  assertRem("Collapsible Icon right border thickness", icon, "border-right-width", 0.125);
  
  // Graph Component assertions
  assert("Graph layout flexbox", document.getElementById('test-html-graph'), "display", "flex");
  assert("Graph Node border radius", document.getElementById('test-graph-node'), "border-radius", "8px");
  assert("Graph Controls rounded capsule", document.getElementById('test-graph-controls'), "border-radius", "30px");

  // Footer Layout assertions
  assert("Footer layout flexbox", document.getElementById('test-footer-grid'), "display", "flex");
  assert("Footer layout justify center", document.getElementById('test-footer-grid'), "justify-content", "center");
  assert("Footer description text alignment center", document.getElementById('test-footer-contact'), "text-align", "center");
  assertRem("Footer grid top padding check", document.getElementById('test-footer-grid'), "padding-top", 1.875);

  // Post Content assertions
  assert("Post paragraph justified text", document.getElementById('test-post-paragraph'), "text-align", "justify");
  assert("Post blockquote rounded corners", document.getElementById('test-post-blockquote'), "border-radius", "16px"); // 1rem = 16px
  assert("Post content image display block", document.getElementById('test-post-content-img'), "display", "block");

  // MathJax assertions
  assert("MathJax display block overflow auto", document.getElementById('test-math-block'), "overflow-x", "auto");
  
  // MathJax inline background style override
  const inlineBg = window.getComputedStyle(document.getElementById('test-math-inline-node'))["background-color"];
  logResult("MathJax inline background color check", inlineBg !== "rgba(0, 0, 0, 0)" && inlineBg !== "transparent", `Got inline background: ${inlineBg}`);

  // Responsive Navigation container query assertions
  const isDesktop = window.innerWidth >= 600;
  if (isDesktop) {
    assert("Desktop Site Nav items layout flex", document.getElementById('test-nav-items'), "display", "flex");
    
    // Check right-edge bounds boundary alignment
    const contentRect = document.getElementById('test-nav-dropdown-content').getBoundingClientRect();
    const wrapperRect = document.getElementById('test-dropdown-wrapper').getBoundingClientRect();
    const isWithinBounds = contentRect.right <= wrapperRect.right + 2; // tolerating minor pixel offset
    logResult("Dropdown menu content stays fully inside screen boundary", isWithinBounds, `Content right: ${contentRect.right}px, Wrapper right limit: ${wrapperRect.right}px`);
  } else {
    // If mobile, #nav-trigger is checked, so the trigger wrapper should display flex
    assert("Mobile Menu dropdown trigger display flex", document.getElementById('test-nav-trigger-menu'), "display", "flex");
    assertRem("Mobile Menu top offset", document.getElementById('test-nav-trigger-menu'), "top", 2.5);
  }
});
</script>
