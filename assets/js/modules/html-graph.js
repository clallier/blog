/**
 * Dynamic HTML Graph Connection engine using LeaderLine.
 *
 * Scans the DOM for custom `<line-connector>` elements and connects their referenced
 * start/end nodes using responsive SVG-based leader lines.
 */

export class HtmlGraphConnector {
  /**
   * Initializes the connector.
   *
   * @param {Object} [options] - Configuration options.
   * @param {string} [options.cdnUrl] - URL to load the LeaderLine library from.
   */
  constructor(options = {}) {
    this.cdnUrl = options.cdnUrl || 'https://cdn.jsdelivr.net/npm/leader-line-new/leader-line.min.js';
    this.lines = [];
    this.resizeObserver = null;
  }

  /**
   * Scans the document and initializes all connections.
   *
   * @returns {Promise<void>} Resolves when leader-line is loaded and lines are created.
   */
  async init() {
    const graphs = document.querySelectorAll('.html-graph');
    if (graphs.length === 0) return;
    try {
      await this._loadLeaderLine();
      graphs.forEach(graph => this._initGraph(graph));
      this._setupRepositionListeners();
      this._setupDetailsListeners();
    } catch (error) {
      console.error('Failed to initialize HtmlGraphConnector:', error);
    }
  }

  /**
   * Destroys all current connections and cleans up event listeners.
   */
  destroy() {
    this.lines.forEach(line => {
      try {
        line.remove();
      } catch (e) {
        // Line might have been already removed or DOM node detached
      }
    });
    this.lines = [];

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    window.removeEventListener('resize', this._repositionAll);
    document.removeEventListener('scroll', this._repositionAll, true);
  }

  /**
   * Dynamically loads the LeaderLine library if not already present.
   *
   * @private
   * @returns {Promise<void>}
   */
  _loadLeaderLine() {
    if (window.LeaderLine) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = this.cdnUrl;
      script.async = true;
      script.onload = () => {
        if (window.LeaderLine) resolve();
        else reject(new Error('LeaderLine loaded but undefined'));
      };
      script.onerror = () => reject(new Error(`Failed to load ${this.cdnUrl}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Initializes a single html-graph container, setting up step controls if needed.
   *
   * High level role: Scans a graph container for line connectors and step descriptions, 
   * initiates connection lines, and instantiates the control header.
   *
   * Args:
   *   graphEl (HTMLElement): The graph container element.
   *
   * Returns:
   *   void
   *
   * Errors:
   *   None
   *
   * Example:
   *   this._initGraph(document.querySelector('.html-graph'));
   */
  _initGraph(graphEl) {
    const connectors = Array.from(graphEl.querySelectorAll('line-connector'));
    const defaultColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--minima-brand-color-light')
      .trim() || '#ff71ce';
    const linesWithStep = [];
    connectors.forEach(el => {
      const line = this._connectElement(el, defaultColor);
      const step = el.getAttribute('step');
      if (line && step !== null) {
        linesWithStep.push({ line, step: parseInt(step, 10) });
      }
    });

    const descriptions = {};
    graphEl.querySelectorAll('step-description').forEach(el => {
      const stepAttr = el.getAttribute('step');
      const step = stepAttr !== null ? parseInt(stepAttr, 10) : 1;
      const text = el.getAttribute('text') || el.innerHTML;
      descriptions[step] = text.trim();
    });

    if (linesWithStep.length > 0 || Object.keys(descriptions).length > 0) {
      this._setupStepControls(graphEl, linesWithStep, descriptions);
    }
  }

  /**
   * Resolves a target element by ID or CSS selector.
   *
   * @param {string} target - The selector or element ID.
   * @returns {HTMLElement|null} The resolved element, or null.
   */
  _getTarget(target) {
    if (!target) return null;
    return document.getElementById(target) || document.querySelector(target);
  }

  /**
   * Coerces a string attribute value to boolean, float, or string.
   *
   * @param {string} val - The string attribute value.
   * @returns {boolean|number|string} The coerced value.
   */
  _coerceValue(val) {
    if (typeof val === 'string' && val.startsWith('var(')) {
      const varName = val.match(/var\(([^)]+)\)/)?.[1];
      if (varName) {
        return getComputedStyle(document.documentElement).getPropertyValue(varName.trim()).trim() || val;
      }
    }
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (!isNaN(val) && val.trim() !== '') return parseFloat(val);
    return val;
  }

  /**
   * Parses all HTML attributes of a `<line-connector>` element into LeaderLine options.
   *
   * Excludes control attributes (e.g. from, to, start, end, label, dash) and HTML standard attributes.
   *
   * @param {HTMLElement} el - The `<line-connector>` element.
   * @param {string} defaultColor - The fallback color.
   * @returns {Object} The compiled options object.
   */
  _parseOptions(el, defaultColor) {
    const EXCLUDED = new Set(['from', 'to', 'anim', 'class', 'id', 'style', 'start', 'end', 'step']);
    const options = {
      color: el.getAttribute('color') || defaultColor,
      size: parseFloat(el.getAttribute('size') || '2')
    };
    const toCamel = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());
    for (const attr of el.attributes) {
      if (EXCLUDED.has(attr.name)) continue;
      const key = attr.name === 'label' ? 'middleLabel' : toCamel(attr.name);
      options[key] = this._coerceValue(attr.value);
    }
    return options;
  }

  /**
   * Connects a single line-connector element.
   *
   * @param {HTMLElement} el - The `<line-connector>` element.
   * @param {string} defaultColor - The fallback color.
   * @returns {Object|null} The created LeaderLine instance, or null.
   */
  _connectElement(el, defaultColor) {
    const startEl = this._getTarget(el.getAttribute('start'));
    const endEl = this._getTarget(el.getAttribute('end'));
    if (!startEl || !endEl) {
      console.warn(`Connection targets not found: ${el.getAttribute('start')} -> ${el.getAttribute('end')}`);
      return null;
    }
    const options = Object.assign(this._parseOptions(el, defaultColor), { start: startEl, end: endEl });
    if (el.hasAttribute('anim') && el.getAttribute('anim') !== 'false') {
      options.dash = { animation: true, len: 8, gap: 6 };
    }
    if (el.hasAttribute('step')) {
      options.hide = true;
    }
    try {
      const line = new window.LeaderLine(options);
      this.lines.push(line);
      return line;
    } catch (e) {
      console.warn(`Failed to connect:`, e);
      return null;
    }
  }

  /**
   * Creates the control DOM structure for step-by-step navigation.
   *
   * High level role: Instantiates and structures the DOM elements required
   * for step-by-step navigation controls.
   *
   * Args:
   *   None
   *
   * Returns:
   *   Object: Contains the controls container, buttons, and indicator elements.
   *
   * Errors:
   *   None
   *
   * Example:
   *   const { controls, btnPrev, btnNext, indicator } = this._createControls();
   */
  _createControls() {
    const controls = document.createElement('div');
    controls.className = 'graph-controls';
    const btnPrev = document.createElement('button');
    btnPrev.innerHTML = '&lt; Prev';
    const indicator = document.createElement('span');
    indicator.className = 'step-indicator';
    const btnNext = document.createElement('button');
    btnNext.innerHTML = 'Next &gt;';
    controls.appendChild(btnPrev);
    controls.appendChild(indicator);
    controls.appendChild(btnNext);
    return { controls, btnPrev, btnNext, indicator };
  }

  /**
   * Binds step update events and updates visibility.
   *
   * High level role: Binds interactive click event listeners to the prev/next buttons
   * to cycle through step indexes, toggle visibility of graph lines accordingly, and update
   * the step description panel content with optional MathJax typesetting.
   *
   * Args:
   *   params (Object): Setup parameters.
   *   params.btnPrev (HTMLButtonElement): Prev navigation button.
   *   params.btnNext (HTMLButtonElement): Next navigation button.
   *   params.indicator (HTMLSpanElement): Text span showing current step.
   *   params.steps (number[]): Unique sorted list of steps.
   *   params.linesWithStep (Array<Object>): Association of lines and steps.
   *   params.descriptions (Object): Key-value store of step to string description.
   *   params.descriptionPanel (HTMLDivElement|null): Div element to render description.
   *
   * Returns:
   *   void
   *
   * Errors:
   *   Does not raise exceptions directly; logs standard DOM errors if elements are invalid.
   *
   * Example:
   *   _bindControls({ btnPrev, btnNext, indicator, steps, linesWithStep, descriptions, descriptionPanel });
   */
  _bindControls({ btnPrev, btnNext, indicator, steps, linesWithStep, descriptions, descriptionPanel }) {
    let index = 0;
    const update = (newIndex) => {
      index = (newIndex + steps.length) % steps.length;
      const currentStep = steps[index];
      linesWithStep.forEach(({ line, step }) => {
        if (step === currentStep) {
          line._isActiveStep = true;
        } else {
          line._isActiveStep = false;
        }
      });
      this._repositionAll();
      if (indicator) {
        indicator.textContent = `Step ${currentStep} / ${steps[steps.length - 1]}`;
      }

      if (descriptionPanel) {
        descriptionPanel.style.opacity = '0';
        descriptionPanel.style.transform = 'translateY(5px)';
        setTimeout(() => {
          descriptionPanel.innerHTML = descriptions[currentStep] || '';
          descriptionPanel.style.opacity = '1';
          descriptionPanel.style.transform = 'translateY(0)';
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([descriptionPanel]).catch(err => console.warn(err));
          }
        }, 150);
      }
    };
    if (btnPrev) btnPrev.addEventListener('click', () => update(index - 1));
    if (btnNext) btnNext.addEventListener('click', () => update(index + 1));
    update(0);
  }

  /**
   * Sets up step-by-step navigation controls and descriptions for a graph container.
   *
   * High level role: Inserts controls wrapper and step details panel above the graph elements.
   *
   * Args:
   *   graphEl (HTMLElement): The graph container.
   *   linesWithStep (Array<Object>): Array of { line, step } objects.
   *   descriptions (Object): Key-value store of step to description.
   *
   * Returns:
   *   void
   *
   * Errors:
   *   None
   *
   * Example:
   *   this._setupStepControls(graphEl, linesWithStep, descriptions);
   */
  _setupStepControls(graphEl, linesWithStep, descriptions) {
    const steps = Array.from(new Set(linesWithStep.map(item => item.step))).sort((a, b) => a - b);
    const finalSteps = steps.length > 0 ? steps : [1];

    let btnPrev = null;
    let btnNext = null;
    let indicator = null;

    if (finalSteps.length > 1) {
      const { controls, btnPrev: bp, btnNext: bn, indicator: ind } = this._createControls();
      btnPrev = bp;
      btnNext = bn;
      indicator = ind;
      graphEl.insertBefore(controls, graphEl.firstChild);
    }

    let descriptionPanel = null;
    if (Object.keys(descriptions).length > 0) {
      const wrapper = document.createElement('div');
      wrapper.className = 'graph-step-description-wrapper';
      
      descriptionPanel = document.createElement('div');
      descriptionPanel.className = 'graph-step-description';
      
      wrapper.appendChild(descriptionPanel);
      graphEl.appendChild(wrapper);
    }

    this._bindControls({ btnPrev, btnNext, indicator, steps: finalSteps, linesWithStep, descriptions, descriptionPanel });
  }

  /**
   * Sets up listeners for scroll, resize, and layout shifts to reposition lines.
   *
   * @private
   */
  _setupRepositionListeners() {
    this._repositionAll = this._repositionAll.bind(this);

    // Watch window resize
    window.addEventListener('resize', this._repositionAll, { passive: true });

    // Watch scroll events in capturing phase to catch overflow container scrolls
    document.addEventListener('scroll', this._repositionAll, { capture: true, passive: true });

    // Watch size changes on the nodes themselves to catch dynamic layouts
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this._repositionAll());
      const elementsToObserve = new Set();
      this.lines.forEach(line => {
        if (line.start) elementsToObserve.add(line.start);
        if (line.end) elementsToObserve.add(line.end);
      });
      elementsToObserve.forEach(el => this.resizeObserver.observe(el));
    }
  }

  /**
   * Repositions all currently active lines.
   *
   * @private
   */
  _repositionAll() {
    this.lines.forEach(line => {
      try {
        if (!line.start || !line.end) return;

        const isHiddenByParent = line.start.closest('details:not([open])') !== null ||
                                 line.start.getBoundingClientRect().width === 0;

        // A line is allowed to be visible if it is not hidden by a closed details parent,
        // and it is the active step (or has no step controls)
        const shouldBeVisible = !isHiddenByParent && (line._isActiveStep !== false);

        if (shouldBeVisible) {
          if (line._hiddenByDetails !== false) {
            line.show('none');
            line._hiddenByDetails = false;
          }
          line.position();
        } else {
          if (line._hiddenByDetails !== true) {
            line.hide('none');
            line._hiddenByDetails = true;
          }
        }
      } catch (e) {
        // Silently handle if element is detached
      }
    });
  }

  /**
   * Listens to toggle events on all details elements to reposition/hide lines.
   *
   * @private
   */
  _setupDetailsListeners() {
    document.querySelectorAll('details').forEach(details => {
      details.addEventListener('toggle', () => {
        requestAnimationFrame(() => {
          this._repositionAll();
        });
      });
    });
  }
}

// Auto-run when layout is fully loaded and settled
const runConnector = () => {
  const connector = new HtmlGraphConnector();
  connector.init().then(() => {
    // Fire a deferred reposition to catch late layout adjustments
    setTimeout(() => {
      connector._repositionAll();
    }, 300);
  });
};

if (document.readyState === 'complete') {
  runConnector();
} else {
  window.addEventListener('load', runConnector);
}
