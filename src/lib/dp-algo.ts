import type { TreeNode } from "./heap-algo";

export type DpStep = {
  i: number;
  j: number;
  len: number;
  bestK: number;
  bestCost: number;
  sumIJ: number;
  candidates: { k: number; cost: number }[];
};

export type DpResult = {
  n: number;
  table: number[][]; // dp[i][j]
  splits: number[][]; // best k for [i..j]
  steps: DpStep[];
  totalCost: number;
  order: [number, number][]; // chosen optimal merge order (sub-range splits in BFS-ish form)
  tree: TreeNode | null;
  sizes: number[];
};

export function optimalMergeDP(sizes: number[]): DpResult {
  const n = sizes.length;
  if (n === 0) {
    return {
      n: 0,
      table: [],
      splits: [],
      steps: [],
      totalCost: 0,
      order: [],
      tree: null,
      sizes,
    };
  }

  // Prefix sums for fast range sum
  const prefix: number[] = [0];
  for (let i = 0; i < n; i++) prefix.push(prefix[i] + sizes[i]);
  const rangeSum = (i: number, j: number) => prefix[j + 1] - prefix[i];

  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  const split: number[][] = Array.from({ length: n }, () => Array(n).fill(-1));
  const steps: DpStep[] = [];

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      let best = Infinity;
      let bestK = i;
      const sumIJ = rangeSum(i, j);
      const candidates: { k: number; cost: number }[] = [];
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + sumIJ;
        candidates.push({ k, cost });
        if (cost < best) {
          best = cost;
          bestK = k;
        }
      }
      dp[i][j] = best;
      split[i][j] = bestK;
      steps.push({ i, j, len, bestK, bestCost: best, sumIJ, candidates });
    }
  }

  // Reconstruct tree
  let id = 0;
  const buildTree = (i: number, j: number): TreeNode => {
    if (i === j) return { id: id++, value: sizes[i] };
    const k = split[i][j];
    const left = buildTree(i, k);
    const right = buildTree(k + 1, j);
    return { id: id++, value: left.value + right.value, left, right };
  };
  const tree = buildTree(0, n - 1);

  // Order of merges (post-order: merge children before parent)
  const order: [number, number][] = [];
  const collect = (i: number, j: number) => {
    if (i === j) return;
    const k = split[i][j];
    collect(i, k);
    collect(k + 1, j);
    order.push([i, k]); // merged ranges [i..k] and [k+1..j]
  };
  collect(0, n - 1);

  return {
    n,
    table: dp,
    splits: split,
    steps,
    totalCost: dp[0][n - 1],
    order,
    tree,
    sizes,
  };
}
