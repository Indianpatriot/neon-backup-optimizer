export type MergeStep = {
  picked: [number, number];
  merged: number;
  heapBefore: number[];
  heapAfter: number[];
  runningCost: number;
};

export type MergeResult = {
  steps: MergeStep[];
  totalCost: number;
  tree: TreeNode | null;
};

export type TreeNode = {
  id: number;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
};

// Simple min-heap via sort (n is small for visualization)
export function optimalMerge(sizes: number[]): MergeResult {
  if (sizes.length === 0) return { steps: [], totalCost: 0, tree: null };
  let id = 0;
  let nodes: TreeNode[] = sizes.map((v) => ({ id: id++, value: v }));
  const steps: MergeStep[] = [];
  let totalCost = 0;

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.value - b.value);
    const heapBefore = nodes.map((n) => n.value);
    const a = nodes.shift()!;
    const b = nodes.shift()!;
    const mergedValue = a.value + b.value;
    totalCost += mergedValue;
    const merged: TreeNode = { id: id++, value: mergedValue, left: a, right: b };
    nodes.push(merged);
    const heapAfter = [...nodes].sort((x, y) => x.value - y.value).map((n) => n.value);
    steps.push({
      picked: [a.value, b.value],
      merged: mergedValue,
      heapBefore,
      heapAfter,
      runningCost: totalCost,
    });
  }

  return { steps, totalCost, tree: nodes[0] ?? null };
}
