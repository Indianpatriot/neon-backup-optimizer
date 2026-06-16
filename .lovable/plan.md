## Goal
Replace the static "Complexity Comparison" section (#8) in `src/routes/index.tsx` with a fully dynamic, input-size-driven **Empirical Complexity Analysis** section, keeping the neon cyber-tech aesthetic and not touching any other section's functionality.

## Scope
- File edited: `src/routes/index.tsx` (only the static comparison block at the end of the Detailed Complexity Analysis area).
- No backend, no schema changes, no new dependencies (Recharts + Framer Motion already in use).
- Greedy / DP algorithm files (`src/lib/heap-algo.ts`, `src/lib/dp-algo.ts`) reused as-is for the live benchmark.

## New section structure (renders in place of the old static one)

1. **Section header** — "Empirical Complexity Analysis" with neon heading + short intro.

2. **Input-size control card**
   - Slider (1–1000) + synced numeric input + quick preset chips: 5, 10, 50, 100, 500, 1000.
   - Single `n` state drives every chart and the benchmark.
   - Warning banners:
     - `n > 100`: "Dynamic Programming may become computationally expensive for large inputs due to O(n³) complexity."
     - `n > 200`: switch DP runtime to an *estimated* value (formula-based, scaled from a small calibration run) and label the DP card "Estimated" to prevent freeze.

3. **Time Complexity Growth Comparison (LineChart)**
   - Data points generated for `x = 1..n` using `x * log2(x)` and `x³`.
   - Two glowing lines (Greedy cyan, DP magenta/purple), legend, animated draw-in, custom neon tooltip showing `Input Size / Greedy Cost / DP Cost`.
   - Y-axis log scale toggle for readability at large n.

4. **Space Complexity Growth Comparison (LineChart)**
   - Same x range, `f(x)=x` (Greedy) vs `f(x)=x²` (DP), same neon styling + tooltip (`Input Size / Greedy Memory / DP Memory`).

5. **Actual Runtime Benchmark card**
   - "Run Comparison" button generates a random backup-size array of length `n`, runs `optimalMerge` and (when allowed) `optimalMergeDP`, times each with `performance.now()`.
   - Two live cards: Greedy time, DP time (or "Estimated" badge when n>200).
   - Ratio card: "DP is ~X× slower than Greedy".
   - Loading spinner during execution; uses `requestAnimationFrame` + `setTimeout` to keep UI responsive.

6. **Educational explanation card** — "Why does DP grow faster?" with the Greedy vs DP reasoning bullets requested.

## Technical notes
- All chart data memoized with `useMemo` keyed on `n` so updates are instant when slider/input changes.
- Tooltip is a custom component styled with the existing glassmorphism + neon border tokens.
- DP estimation when skipped: `greedyMs * (n³ / (n log₂ n))` scaled from the measured greedy run for an honest projection; clearly labeled.
- Framer Motion `motion.div` for card mount + value transitions; existing color tokens reused (no hardcoded colors).
- Old static comparison table/verdict markup removed; nothing else in the file is touched.

## Out of scope
- Greedy/DP algorithm internals, other sections (Simulator, Theory, Detailed Complexity steps), routing, styling tokens.
