// Helper to ensure argument is an Array
function ensureArray(val) {
  if (Array.isArray(val)) return val
  if (val instanceof Set) return Array.from(val)
  if (val && typeof val[Symbol.iterator] === 'function') return Array.from(val)
  return []
}

// Helper to ensure argument is a Set
function ensureSet(val) {
  if (val instanceof Set) return val
  if (Array.isArray(val)) return new Set(val)
  if (val && typeof val[Symbol.iterator] === 'function') return new Set(val)
  return new Set()
}

/**
 * Computes the Reciprocal Rank (RR) for a list of retrieved items given the expected relevant items.
 * @param {string[]|Set|Iterable} retrievedVal - List of retrieved item titles.
 * @param {Set<string>|string[]|Iterable} expectedVals - Set of expected relevant item titles.
 * @returns {number} Reciprocal Rank score (between 0 and 1).
 */
export function calculateRR(retrievedVal, expectedVals) {
  const retrieved = ensureArray(retrievedVal)
  const expected = ensureSet(expectedVals)
  for (let i = 0; i < retrieved.length; i++) {
    if (expected.has(retrieved[i])) {
      return 1 / (i + 1)
    }
  }
  return 0
}

/**
 * Computes the Precision for a list of retrieved items.
 * @param {string[]|Set|Iterable} retrievedVal - List of retrieved item titles.
 * @param {Set<string>|string[]|Iterable} expectedVals - Set of expected relevant item titles.
 * @returns {number} Precision score.
 */
export function calculatePrecision(retrievedVal, expectedVals) {
  const retrieved = ensureArray(retrievedVal)
  const expected = ensureSet(expectedVals)
  if (retrieved.length === 0) return 0
  let tp = 0
  for (let i = 0; i < retrieved.length; i++) {
    if (expected.has(retrieved[i])) tp++
  }
  return tp / retrieved.length
}

/**
 * Computes the Recall for a list of retrieved items.
 * @param {string[]|Set|Iterable} retrievedVal - List of retrieved item titles.
 * @param {Set<string>|string[]|Iterable} expectedVals - Set of expected relevant item titles.
 * @returns {number} Recall score.
 */
export function calculateRecall(retrievedVal, expectedVals) {
  const retrieved = ensureArray(retrievedVal)
  const expected = ensureSet(expectedVals)
  if (expected.size === 0) return 0
  let tp = 0
  for (let i = 0; i < retrieved.length; i++) {
    if (expected.has(retrieved[i])) tp++
  }
  return tp / expected.size
}

/**
 * Computes the Average Precision (AP) for retrieved items.
 * @param {string[]|Set|Iterable} retrievedVal - List of retrieved item titles.
 * @param {Set<string>|string[]|Iterable} expectedVals - Set of expected relevant item titles.
 * @returns {number} Average Precision score.
 */
export function calculateAP(retrievedVal, expectedVals) {
  const retrieved = ensureArray(retrievedVal)
  const expected = ensureSet(expectedVals)
  if (expected.size === 0) return 0
  let hits = 0
  let score = 0
  for (let i = 0; i < retrieved.length; i++) {
    if (expected.has(retrieved[i])) {
      hits++
      score += hits / (i + 1)
    }
  }
  return score / expected.size
}

/**
 * Computes Normalized Discounted Cumulative Gain (NDCG).
 * @param {string[]|Set|Iterable} retrievedVal - List of retrieved item titles.
 * @param {Object.<string, number>} expectedVals - Map of item titles to relevance grades.
 * @returns {number} NDCG score.
 */
export function calculateNDCG(retrievedVal, expectedVals) {
  const retrieved = ensureArray(retrievedVal)
  const expected = expectedVals || {}
  let dcg = 0
  for (let i = 0; i < retrieved.length; i++) {
    const rel = expected[retrieved[i]] || 0
    dcg += rel / Math.log2(i + 2)
  }

  const ideal = Object.values(expected).sort((a, b) => b - a)
  let idcg = 0
  for (let i = 0; i < ideal.length; i++) {
    idcg += ideal[i] / Math.log2(i + 2)
  }

  return idcg > 0 ? dcg / idcg : 0
}

/**
 * Computes the F1 Score.
 * @param {string[]|Set|Iterable} retrievedVal - List of retrieved item titles.
 * @param {Set<string>|string[]|Iterable} expectedVals - Set of expected relevant item titles.
 * @returns {number} F1 Score.
 */
export function calculateF1(retrievedVal, expectedVals) {
  const p = calculatePrecision(retrievedVal, expectedVals)
  const r = calculateRecall(retrievedVal, expectedVals)
  return p + r > 0 ? (2 * p * r) / (p + r) : 0
}

export function calculateSizeAccuracy(retrievedVal, expectedVals) {
  const retrieved = ensureArray(retrievedVal)
  const expected = ensureSet(expectedVals)
  const rSize = retrieved.length
  const eSize = expected.size
  if (rSize === 0 && eSize === 0) return 1
  if ((rSize > 0 && eSize === 0) || (eSize > 0 && rSize === 0)) return 0
  const diffNorm = Math.abs(eSize - rSize) / Math.max(eSize, 1)
  return 1 / (1 + diffNorm)
}


export function runSelfTests() {
  console.log("%c[InteractivePlayground] Running Metrics Verification Suite...", "color: #38bdf8; font-weight: bold;")

  const assert = (testName, actual, expected) => {
    const passed = Math.abs(actual - expected) < 1e-4
    if (passed) {
      console.log(`%c✓ ${testName} passed. (Result: ${actual.toFixed(3)})`, "color: #34d399;")
    } else {
      console.error(`✗ ${testName} FAILED! Expected ${expected.toFixed(3)}, but got ${actual.toFixed(3)}`)
    }
  }

  // 1. Test Reciprocal Rank
  assert("RR: First hit at rank 2", calculateRR(['A', 'B', 'C'], ['B']), 0.5)
  assert("RR: First hit at rank 1", calculateRR(['A', 'B', 'C'], ['A']), 1)
  assert("RR: all hits but rank 2 missing", calculateRR(['A', 'C'], ['A', 'B', 'C']), 1)
  assert("RR: all hits but 1 FP at rank 1", calculateRR(['B', 'A', 'C'], ['A', 'C']), 0.5)
  assert("RR: No hits", calculateRR(['A', 'B', 'C'], ['D']), 0)

  // 2. Test Average Precision (AP)
  assert("AP: Hits at 1 and 3", calculateAP(['A', 'B', 'C'], ['A', 'C']), ((1 / 1) + (2 / 3)) / 2)

  // 3. Test NDCG
  assert("NDCG: Perfect Order", calculateNDCG(['A', 'B'], { A: 3, B: 2 }), 1.0)
  assert("NDCG: Swapped Order", calculateNDCG(['B', 'A'], { A: 3, B: 2 }), (2 / Math.log2(2) + 3 / Math.log2(3)) / (3 / Math.log2(2) + 2 / Math.log2(3)))

  // 4. Test Precision, Recall, F1
  assert("Precision: 2 hits out of 3 retrieved", calculatePrecision(['A', 'B', 'C'], ['A', 'C', 'D']), 2 / 3)
  assert("Recall: 2 hits out of 3 expected", calculateRecall(['A', 'B', 'C'], ['A', 'C', 'D']), 2 / 3)
  assert("F1: Harmonic mean of 2/3 and 2/3", calculateF1(['A', 'B', 'C'], ['A', 'C', 'D']), 2 / 3)

  // 5. Test Size Accuracy
  assert("Size Accuracy: equal size", calculateSizeAccuracy(['A', 'B'], ['A', 'C']), 1.0)
  assert("Size Accuracy: half size", calculateSizeAccuracy(['A'], ['A', 'B']), 1 / 1.5)
  assert("Size Accuracy: double size", calculateSizeAccuracy(['A', 'B'], ['A']), 0.5)
  assert("Size Accuracy: one empty", calculateSizeAccuracy(['A'], []), 0.0)
  assert("Size Accuracy: both empty", calculateSizeAccuracy([], []), 1.0)
}