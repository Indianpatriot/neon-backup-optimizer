import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Database,
  GitMerge,
  Zap,
  Cpu,
  Network,
  Play,
  RotateCcw,
  Sparkles,
  Plus,
  Minus,
  ArrowRight,
  Activity,
  Layers,
  Binary,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { optimalMerge, type TreeNode } from "@/lib/heap-algo";
import { optimalMergeDP } from "@/lib/dp-algo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Optimal Data Backup Scheduling — ADA Assignment" },
      {
        name: "description",
        content:
          "Interactive neon-themed visualization of the Optimal Data Backup Scheduling problem using Greedy (Min Heap) and Dynamic Programming approaches.",
      },
      { property: "og:title", content: "Optimal Data Backup Scheduling" },
      {
        property: "og:description",
        content:
          "Analysis and Design of Algorithms project — minimize merge cost of incremental backups.",
      },
    ],
  }),
  component: Index,
});

/* ---------- Reusable ---------- */
function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <div className="mb-3 inline-block rounded-full border border-[oklch(0.7_0.22_240/50%)] bg-[oklch(0.2_0.05_270/60%)] px-4 py-1 text-xs font-mono uppercase tracking-[0.3em] neon-text-cyan">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold gradient-text">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-strong rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:neon-border-cyan ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative min-h-screen overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[oklch(0.7_0.22_240/30%)] blur-[120px]" />
        <div className="absolute top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.65_0.27_300/25%)] blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[oklch(0.85_0.18_200/20%)] blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg gradient-neon flex items-center justify-center shadow-[0_0_20px_oklch(0.7_0.22_240/60%)]">
            <Binary className="h-5 w-5 text-background" />
          </div>
          <span className="font-display font-bold tracking-widest text-sm neon-text-cyan">
            ADA.LAB
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <a href="#problem" className="hover:neon-text-cyan transition">Problem</a>
          <a href="#algorithm" className="hover:neon-text-cyan transition">Algorithm</a>
          <a href="#simulate" className="hover:neon-text-cyan transition">Simulate</a>
          <a href="#code" className="hover:neon-text-cyan transition">Code</a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-12 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono uppercase tracking-[0.3em]"
        >
          <Sparkles className="h-3 w-3 neon-text-cyan" />
          <span className="neon-text-cyan">Analysis & Design of Algorithms</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight"
        >
          <span className="gradient-text">Optimal Data</span>
          <br />
          <span className="neon-text-purple animate-neon-pulse">Backup Scheduling</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Determine the optimal order of merging incremental backups to minimize
          overall merge cost — powered by greedy min-heap strategy and analyzed
          against dynamic programming.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button onClick={() => scrollTo("simulate")} className="btn-neon">
            <span className="inline-flex items-center gap-2">
              <Play className="h-4 w-4" /> Start Simulation
            </span>
          </button>
          <button onClick={() => scrollTo("algorithm")} className="btn-neon btn-neon-purple">
            <span className="inline-flex items-center gap-2">
              <Cpu className="h-4 w-4" /> Learn Algorithm
            </span>
          </button>
        </motion.div>

        {/* Animated illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="relative mt-20 mx-auto h-64 w-64 md:h-80 md:w-80"
        >
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute inset-0 rounded-full border border-[oklch(0.75_0.2_220/40%)]" />
            <div className="absolute inset-4 rounded-full border border-[oklch(0.65_0.27_300/30%)]" />
            <div className="absolute inset-8 rounded-full border border-[oklch(0.85_0.18_200/20%)]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-float">
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl gradient-neon flex items-center justify-center shadow-[0_0_60px_oklch(0.7_0.22_240/70%)]">
                <Cloud className="h-16 w-16 md:h-20 md:w-20 text-background" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          {[Database, Layers, Network, Activity].map((Icon, i) => {
            const angle = (i / 4) * Math.PI * 2;
            const r = 130;
            return (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <div
                  className="absolute h-10 w-10 md:h-12 md:w-12 rounded-xl glass-strong neon-border-cyan flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}px - 24px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px - 24px)`,
                  }}
                >
                  <Icon className="h-5 w-5 neon-text-cyan" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Problem ---------- */
function Problem() {
  return (
    <section id="problem" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="01 — Problem" title="What is the Problem?" />
        <div className="grid md:grid-cols-3 gap-6">
          <GlowCard>
            <Cloud className="h-10 w-10 neon-text-cyan mb-4" />
            <h3 className="text-xl font-bold mb-3">Scenario</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A cloud service provider needs to merge multiple incremental
              backups into a single consolidated archive across its
              data-replication pipeline.
            </p>
          </GlowCard>
          <GlowCard>
            <Database className="h-10 w-10 neon-text-purple mb-4" />
            <h3 className="text-xl font-bold mb-3">Cost Model</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each merge operation costs the total size of the merged backups.
              Larger archives, when re-merged repeatedly, amplify cost.
            </p>
          </GlowCard>
          <GlowCard>
            <GitMerge className="h-10 w-10 neon-text-pink mb-4" />
            <h3 className="text-xl font-bold mb-3">Objective</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find the merge order that minimizes total cumulative cost across
              all merge operations.
            </p>
          </GlowCard>
        </div>

        {/* Merge viz */}
        <div className="mt-10 glass-strong rounded-2xl p-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm font-mono">
            {[20, 30, 10, 5].map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg neon-border-cyan bg-[oklch(0.2_0.05_270/60%)]">
                  {v}MB
                </div>
                {i < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="px-5 py-2 rounded-lg neon-border-purple gradient-neon font-bold text-background">
              65MB archive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Algorithm Selection ---------- */
type Algo = "greedy" | "dp" | "complexity";
function AlgorithmSection() {
  const [algo, setAlgo] = useState<Algo>("greedy");

  return (
    <section id="algorithm" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="02 — Approach"
          title="Algorithm Selection"
          subtitle="Switch approaches to compare strategies and complexity."
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <label className="font-mono text-xs uppercase tracking-widest neon-text-cyan">
            Select Approach:
          </label>
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value as Algo)}
            className="px-5 py-3 rounded-lg glass-strong neon-border-cyan font-mono text-sm focus:outline-none cursor-pointer min-w-[280px]"
          >
            <option value="greedy">1. Greedy Approach (Optimal Merge / Huffman)</option>
            <option value="dp">2. Dynamic Programming</option>
            <option value="complexity">3. Complexity Analysis</option>
          </select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={algo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {algo === "greedy" && <GreedyPanel />}
            {algo === "dp" && <DpPanel />}
            {algo === "complexity" && <ComplexityPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function GreedyPanel() {
  const pseudo = `OptimalMerge(sizes[]):
  heap = MinHeap(sizes)
  totalCost = 0
  while heap.size() > 1:
      a = heap.extractMin()
      b = heap.extractMin()
      merged = a + b
      totalCost += merged
      heap.insert(merged)
  return totalCost`;
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <GlowCard>
        <h3 className="text-2xl font-bold neon-text-cyan mb-4">
          Greedy Algorithm — Optimal Merge Pattern
        </h3>
        <p className="text-muted-foreground mb-4">
          Use a <span className="neon-text-cyan">Min Heap / Priority Queue</span>.
          Repeatedly extract and merge the two smallest backups, push the merged
          result back, and accumulate cost.
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="neon-text-purple font-bold">Why it works:</span> The
          greedy choice minimizes local merge cost; smaller items are touched
          most often, so keeping them low in the merge tree minimizes total cost
          — equivalent to Huffman coding.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg p-3 neon-border-cyan">
            <div className="text-xs font-mono uppercase text-muted-foreground">Time</div>
            <div className="text-xl font-bold neon-text-cyan">O(n log n)</div>
          </div>
          <div className="rounded-lg p-3 neon-border-purple">
            <div className="text-xs font-mono uppercase text-muted-foreground">Space</div>
            <div className="text-xl font-bold neon-text-purple">O(n)</div>
          </div>
        </div>
      </GlowCard>
      <GlowCard>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Pseudocode
        </div>
        <pre className="text-xs md:text-sm leading-relaxed rounded-lg bg-[oklch(0.1_0.02_270/80%)] p-4 overflow-x-auto neon-border-cyan">
          <code className="neon-text-cyan">{pseudo}</code>
        </pre>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
          {[5, 10, 20, 30].map((v) => (
            <div key={v} className="px-3 py-1.5 rounded neon-border-purple">
              {v}
            </div>
          ))}
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <div className="px-3 py-1.5 rounded gradient-neon text-background font-bold">
            heap
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

function DpPanel() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <GlowCard>
        <h3 className="text-2xl font-bold neon-text-purple mb-4">
          Dynamic Programming Approach
        </h3>
        <p className="text-muted-foreground mb-4">
          Treat this as an <span className="neon-text-purple">optimal binary
          merge tree</span> problem. Explore all possible split points and store
          overlapping subproblems in a DP table.
        </p>
        <pre className="text-xs leading-relaxed rounded-lg bg-[oklch(0.1_0.02_270/80%)] p-4 overflow-x-auto neon-border-purple">
{`dp[i][j] = min cost to merge sizes[i..j]
for len in 2..n:
  for i in 0..n-len:
    j = i + len - 1
    dp[i][j] = INF
    sumIJ = sum(sizes[i..j])
    for k in i..j-1:
        cost = dp[i][k] + dp[k+1][j] + sumIJ
        dp[i][j] = min(dp[i][j], cost)`}
        </pre>
        <div className="mt-6 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg p-3 neon-border-purple">
            <div className="text-xs font-mono uppercase text-muted-foreground">Time</div>
            <div className="text-xl font-bold neon-text-purple">O(n³)</div>
          </div>
          <div className="rounded-lg p-3 neon-border-cyan">
            <div className="text-xs font-mono uppercase text-muted-foreground">Space</div>
            <div className="text-xl font-bold neon-text-cyan">O(n²)</div>
          </div>
        </div>
      </GlowCard>
      <GlowCard>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
          DP Table (size 5)
        </div>
        <div className="grid grid-cols-5 gap-1 text-xs font-mono">
          {Array.from({ length: 25 }).map((_, i) => {
            const r = Math.floor(i / 5), c = i % 5;
            const filled = c >= r;
            return (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded ${
                  filled
                    ? "neon-border-purple bg-[oklch(0.65_0.27_300/15%)] neon-text-purple"
                    : "border border-[oklch(0.3_0.05_270/40%)] text-muted-foreground/40"
                }`}
              >
                {filled ? Math.floor(Math.random() * 90 + 10) : "·"}
              </div>
            );
          })}
        </div>
        <div className="mt-6 p-4 rounded-lg bg-[oklch(0.2_0.05_270/40%)] border-l-2 border-[oklch(0.85_0.18_200)]">
          <p className="text-sm">
            <span className="neon-text-cyan font-bold">Greedy is preferred:</span>{" "}
            DP explores all merge orders giving O(n³). The greedy/heap approach
            achieves the same optimum at O(n log n) for this problem.
          </p>
        </div>
      </GlowCard>
    </div>
  );
}

function ComplexityPanel() {
  const data = [
    { name: "n=8", greedy: 24, dp: 512 },
    { name: "n=16", greedy: 64, dp: 4096 },
    { name: "n=32", greedy: 160, dp: 32768 },
    { name: "n=64", greedy: 384, dp: 262144 },
    { name: "n=128", greedy: 896, dp: 2097152 },
  ];
  return (
    <GlowCard>
      <h3 className="text-2xl font-bold gradient-text mb-6">
        Complexity Comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[oklch(0.4_0.08_280/40%)] text-left font-mono uppercase text-xs tracking-widest text-muted-foreground">
              <th className="py-3">Technique</th>
              <th className="py-3">Time</th>
              <th className="py-3">Space</th>
              <th className="py-3">Best Use Case</th>
              <th className="py-3">Efficiency</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            <tr className="border-b border-[oklch(0.3_0.05_270/30%)] bg-[oklch(0.7_0.22_240/8%)]">
              <td className="py-4 neon-text-cyan font-bold">
                Greedy ★ Recommended
              </td>
              <td>O(n log n)</td>
              <td>O(n)</td>
              <td>Large-scale backup merges</td>
              <td className="neon-text-cyan">High</td>
            </tr>
            <tr>
              <td className="py-4 neon-text-purple font-bold">Dynamic Programming</td>
              <td>O(n³)</td>
              <td>O(n²)</td>
              <td>Constrained merge ordering</td>
              <td className="text-muted-foreground">Low</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.4 0.08 280 / 30%)" />
            <XAxis dataKey="name" stroke="oklch(0.7 0.04 250)" fontSize={12} />
            <YAxis stroke="oklch(0.7 0.04 250)" fontSize={12} scale="log" domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                background: "oklch(0.15 0.04 270 / 95%)",
                border: "1px solid oklch(0.7 0.22 240 / 60%)",
                borderRadius: 8,
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="greedy" stroke="oklch(0.85 0.18 200)" strokeWidth={3} dot={{ fill: "oklch(0.85 0.18 200)", r: 5 }} />
            <Line type="monotone" dataKey="dp" stroke="oklch(0.7 0.28 340)" strokeWidth={3} dot={{ fill: "oklch(0.7 0.28 340)", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlowCard>
  );
}

/* ---------- Simulator ---------- */
type ExecMode = "greedy" | "dp" | "compare";

function Simulator() {
  const [sizes, setSizes] = useState<number[]>([20, 30, 10, 5]);
  const [mode, setMode] = useState<ExecMode>("greedy");
  const [greedy, setGreedy] = useState<ReturnType<typeof optimalMerge> | null>(null);
  const [dp, setDp] = useState<ReturnType<typeof optimalMergeDP> | null>(null);
  const [greedyTimeMs, setGreedyTimeMs] = useState<number>(0);
  const [dpTimeMs, setDpTimeMs] = useState<number>(0);
  const [revealStep, setRevealStep] = useState(0);
  const [dpReveal, setDpReveal] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateSize = (i: number, v: string) => {
    const n = Math.max(0, parseInt(v) || 0);
    setSizes(sizes.map((s, idx) => (idx === i ? n : s)));
  };

  const calculate = () => {
    const clean = sizes.filter((s) => s > 0);
    setLoading(true);
    setRevealStep(0);
    setDpReveal(0);

    setTimeout(() => {
      let g: ReturnType<typeof optimalMerge> | null = null;
      let d: ReturnType<typeof optimalMergeDP> | null = null;

      if (mode === "greedy" || mode === "compare") {
        const t0 = performance.now();
        g = optimalMerge(clean);
        setGreedyTimeMs(performance.now() - t0);
        setGreedy(g);
      } else {
        setGreedy(null);
      }

      if (mode === "dp" || mode === "compare") {
        const t0 = performance.now();
        d = optimalMergeDP(clean);
        setDpTimeMs(performance.now() - t0);
        setDp(d);
      } else {
        setDp(null);
      }

      setLoading(false);

      // animate greedy steps
      if (g) {
        let i = 0;
        const id = setInterval(() => {
          i++;
          setRevealStep(i);
          if (g && i >= g.steps.length) clearInterval(id);
        }, 600);
      }
      // animate dp steps
      if (d) {
        let i = 0;
        const id = setInterval(() => {
          i++;
          setDpReveal(i);
          if (d && i >= d.steps.length) clearInterval(id);
        }, 500);
      }
    }, 250);
  };

  const reset = () => {
    setSizes([10, 20, 30]);
    setGreedy(null);
    setDp(null);
    setRevealStep(0);
    setDpReveal(0);
  };

  const generate = () => {
    const n = 4 + Math.floor(Math.random() * 3);
    setSizes(Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 5));
    setGreedy(null);
    setDp(null);
    setRevealStep(0);
    setDpReveal(0);
  };

  return (
    <section id="simulate" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="03 — Simulate"
          title="Interactive Merge Simulator"
          subtitle="Pick an execution mode, enter backup sizes (MB), and watch the algorithms run step-by-step."
        />

        {/* Execution Mode Selector */}
        <GlowCard className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <label className="font-mono text-xs uppercase tracking-widest neon-text-cyan whitespace-nowrap">
              › Select Execution Mode
            </label>
            <select
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as ExecMode);
                setGreedy(null);
                setDp(null);
              }}
              className="px-5 py-3 rounded-lg glass-strong neon-border-cyan font-mono text-sm focus:outline-none cursor-pointer w-full md:min-w-[320px] md:w-auto"
            >
              <option value="greedy">1. Greedy Only — O(n log n)</option>
              <option value="dp">2. Dynamic Programming Only — O(n³)</option>
              <option value="compare">3. Compare Both Approaches ★</option>
            </select>
            <div className="flex gap-2 ml-auto">
              {(["greedy", "dp", "compare"] as ExecMode[]).map((m) => (
                <div
                  key={m}
                  className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition ${
                    mode === m
                      ? "gradient-neon text-background font-bold shadow-[0_0_18px_oklch(0.7_0.22_240/60%)]"
                      : "glass border border-[oklch(0.4_0.08_280/30%)] text-muted-foreground"
                  }`}
                >
                  {m === "compare" ? "Both" : m}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold neon-text-cyan font-mono">
              › Enter backup sizes
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSizes([...sizes, 10])}
                className="px-3 py-2 rounded-lg neon-border-cyan text-xs font-mono uppercase tracking-wider hover:bg-[oklch(0.7_0.22_240/15%)] transition flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
              <button
                onClick={() => setSizes(sizes.slice(0, -1))}
                disabled={sizes.length <= 2}
                className="px-3 py-2 rounded-lg neon-border-purple text-xs font-mono uppercase tracking-wider hover:bg-[oklch(0.65_0.27_300/15%)] transition disabled:opacity-30 flex items-center gap-1"
              >
                <Minus className="h-3 w-3" /> Remove
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {sizes.map((s, i) => (
              <div key={i} className="relative">
                <input
                  type="number"
                  value={s}
                  onChange={(e) => updateSize(i, e.target.value)}
                  className="w-20 px-3 py-3 text-center font-mono text-lg neon-border-cyan rounded-lg bg-[oklch(0.15_0.04_270/80%)] focus:outline-none focus:neon-border-purple"
                />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 text-[10px] font-mono bg-background neon-text-cyan">
                  B{i + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={calculate} disabled={loading} className="btn-neon disabled:opacity-60">
              <span className="inline-flex items-center gap-2">
                {loading ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    Running…
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" /> Calculate
                  </>
                )}
              </span>
            </button>
            <button onClick={generate} className="btn-neon btn-neon-purple">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Generate Example
              </span>
            </button>
            <button
              onClick={reset}
              className="px-5 py-3 rounded-lg border border-[oklch(0.4_0.08_280/40%)] hover:neon-border-purple transition text-sm font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </GlowCard>

        {/* Results */}
        {mode === "greedy" && greedy && (
          <GreedyResultPanel result={greedy} revealStep={revealStep} timeMs={greedyTimeMs} />
        )}
        {mode === "dp" && dp && (
          <DpResultPanel result={dp} reveal={dpReveal} timeMs={dpTimeMs} />
        )}
        {mode === "compare" && greedy && dp && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="px-3 py-1.5 inline-block rounded font-mono text-[10px] uppercase tracking-widest neon-border-cyan neon-text-cyan">
                  Left · Greedy
                </div>
                <GreedyResultPanel result={greedy} revealStep={revealStep} timeMs={greedyTimeMs} compact />
              </div>
              <div className="space-y-1">
                <div className="px-3 py-1.5 inline-block rounded font-mono text-[10px] uppercase tracking-widest neon-border-purple neon-text-purple">
                  Right · Dynamic Programming
                </div>
                <DpResultPanel result={dp} reveal={dpReveal} timeMs={dpTimeMs} compact />
              </div>
            </div>
            <CompareSummary greedy={greedy} dp={dp} greedyTimeMs={greedyTimeMs} dpTimeMs={dpTimeMs} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Greedy result ---------- */
function GreedyResultPanel({
  result,
  revealStep,
  timeMs,
  compact = false,
}: {
  result: NonNullable<ReturnType<typeof optimalMerge>>;
  revealStep: number;
  timeMs: number;
  compact?: boolean;
}) {
  const costData = result.steps.slice(0, revealStep).map((s, i) => ({
    step: `S${i + 1}`,
    cost: s.runningCost,
  }));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={compact ? "" : "grid lg:grid-cols-2 gap-6"}
    >
      <GlowCard>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold neon-text-cyan font-mono">› Greedy / Min-Heap</h4>
          <span className="text-[10px] font-mono text-muted-foreground">
            {timeMs.toFixed(3)} ms
          </span>
        </div>
        <div className="space-y-2 font-mono text-sm max-h-[320px] overflow-y-auto pr-2">
          {result.steps.slice(0, revealStep).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 rounded-lg bg-[oklch(0.2_0.05_270/50%)] border-l-2 border-[oklch(0.85_0.18_200)]"
            >
              <span>
                <span className="text-muted-foreground">S{i + 1}:</span>{" "}
                <span className="neon-text-cyan">{s.picked[0]}</span> +{" "}
                <span className="neon-text-cyan">{s.picked[1]}</span> ={" "}
                <span className="neon-text-purple font-bold">{s.merged}</span>
              </span>
              <span className="text-xs text-muted-foreground">Σ {s.runningCost}</span>
            </motion.div>
          ))}
        </div>
        {revealStep >= result.steps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-5 rounded-xl gradient-neon text-center"
          >
            <div className="text-xs uppercase tracking-widest text-background/80 font-mono">
              Total Optimal Cost
            </div>
            <div className="text-4xl font-black text-background">{result.totalCost}</div>
          </motion.div>
        )}
      </GlowCard>
      {!compact && (
        <GlowCard>
          <h4 className="text-lg font-bold neon-text-purple mb-4 font-mono">› Cost accumulation</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.4 0.08 280 / 30%)" />
                <XAxis dataKey="step" stroke="oklch(0.7 0.04 250)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0.04 250)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.15 0.04 270 / 95%)",
                    border: "1px solid oklch(0.65 0.27 300 / 60%)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="cost" fill="oklch(0.65 0.27 300)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6">
            <h5 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Merge Tree
            </h5>
            <div className="overflow-x-auto">
              <TreeView node={result.tree} />
            </div>
          </div>
        </GlowCard>
      )}
    </motion.div>
  );
}

/* ---------- DP result ---------- */
function DpResultPanel({
  result,
  reveal,
  timeMs,
  compact = false,
}: {
  result: NonNullable<ReturnType<typeof optimalMergeDP>>;
  reveal: number;
  timeMs: number;
  compact?: boolean;
}) {
  const lastStep = result.steps[Math.max(0, reveal - 1)];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={compact ? "space-y-6" : "grid lg:grid-cols-2 gap-6"}
    >
      <GlowCard>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold neon-text-purple font-mono">› DP Execution</h4>
          <span className="text-[10px] font-mono text-muted-foreground">
            {timeMs.toFixed(3)} ms
          </span>
        </div>
        <div className="space-y-2 font-mono text-xs max-h-[320px] overflow-y-auto pr-2">
          {result.steps.slice(0, reveal).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-lg bg-[oklch(0.2_0.05_270/50%)] border-l-2 border-[oklch(0.65_0.27_300)]"
            >
              <div className="flex items-center justify-between">
                <span>
                  <span className="text-muted-foreground">dp[{s.i}][{s.j}]</span> ={" "}
                  <span className="neon-text-purple font-bold">{s.bestCost}</span>
                </span>
                <span className="text-[10px] text-muted-foreground">
                  split @ k={s.bestK} · Σ[i..j]={s.sumIJ}
                </span>
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                candidates: {s.candidates.map((c) => `k=${c.k}:${c.cost}`).join(" · ")}
              </div>
            </motion.div>
          ))}
        </div>
        {reveal >= result.steps.length && result.steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-5 rounded-xl gradient-neon text-center"
          >
            <div className="text-xs uppercase tracking-widest text-background/80 font-mono">
              Total Optimal Cost (DP)
            </div>
            <div className="text-4xl font-black text-background">{result.totalCost}</div>
          </motion.div>
        )}
      </GlowCard>
      <GlowCard>
        <h4 className="text-lg font-bold neon-text-cyan mb-4 font-mono">› DP State Matrix</h4>
        <div className="overflow-x-auto">
          <DpTableView result={result} highlight={lastStep ? { i: lastStep.i, j: lastStep.j } : null} />
        </div>
        {!compact && (
          <div className="mt-6">
            <h5 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Optimal Merge Tree (from DP)
            </h5>
            <div className="overflow-x-auto">
              <TreeView node={result.tree} />
            </div>
          </div>
        )}
        <div className="mt-5 p-4 rounded-lg bg-[oklch(0.2_0.05_270/40%)] border-l-2 border-[oklch(0.85_0.18_200)]">
          <p className="text-xs leading-relaxed">
            <span className="neon-text-cyan font-bold">Why DP is slower:</span>{" "}
            For every sub-range [i..j] DP tries every split k → O(n³) work and
            O(n²) memory. Greedy reaches the same optimum in O(n log n).
          </p>
        </div>
      </GlowCard>
    </motion.div>
  );
}

/* ---------- DP Table Visualization ---------- */
function DpTableView({
  result,
  highlight,
}: {
  result: NonNullable<ReturnType<typeof optimalMergeDP>>;
  highlight: { i: number; j: number } | null;
}) {
  const { n, table, sizes } = result;
  return (
    <table className="font-mono text-xs border-separate border-spacing-1">
      <thead>
        <tr>
          <th className="px-2 py-1 text-[10px] text-muted-foreground uppercase">i\j</th>
          {sizes.map((s, j) => (
            <th
              key={j}
              className="px-2 py-1 text-[10px] neon-text-cyan min-w-[44px]"
              title={`size ${s}`}
            >
              {j}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: n }).map((_, i) => (
          <tr key={i}>
            <td className="px-2 py-1 text-[10px] neon-text-cyan">{i}</td>
            {Array.from({ length: n }).map((_, j) => {
              const filled = j >= i && (i === j || table[i][j] > 0);
              const isHi = highlight && highlight.i === i && highlight.j === j;
              return (
                <td
                  key={j}
                  className={`w-11 h-11 text-center rounded transition-all duration-300 ${
                    j < i
                      ? "border border-[oklch(0.3_0.05_270/30%)] text-muted-foreground/40"
                      : i === j
                      ? "neon-border-cyan text-foreground"
                      : filled
                      ? isHi
                        ? "neon-border-purple bg-[oklch(0.65_0.27_300/40%)] neon-text-purple animate-neon-pulse"
                        : "neon-border-purple bg-[oklch(0.65_0.27_300/15%)] neon-text-purple"
                      : "border border-[oklch(0.3_0.05_270/40%)] text-muted-foreground/40"
                  }`}
                >
                  {j < i ? "·" : i === j ? sizes[i] : filled ? table[i][j] : "?"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- Compare summary ---------- */
function CompareSummary({
  greedy,
  dp,
  greedyTimeMs,
  dpTimeMs,
}: {
  greedy: NonNullable<ReturnType<typeof optimalMerge>>;
  dp: NonNullable<ReturnType<typeof optimalMergeDP>>;
  greedyTimeMs: number;
  dpTimeMs: number;
}) {
  const match = greedy.totalCost === dp.totalCost;
  return (
    <GlowCard>
      <h4 className="text-lg font-bold gradient-text mb-4 font-mono">› Side-by-side summary</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono min-w-[480px]">
          <thead>
            <tr className="border-b border-[oklch(0.4_0.08_280/40%)] text-left text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="py-2">Metric</th>
              <th className="py-2 neon-text-cyan">Greedy</th>
              <th className="py-2 neon-text-purple">Dynamic Programming</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[oklch(0.3_0.05_270/30%)]">
              <td className="py-3">Final cost</td>
              <td className="neon-text-cyan font-bold">{greedy.totalCost}</td>
              <td className="neon-text-purple font-bold">{dp.totalCost}</td>
            </tr>
            <tr className="border-b border-[oklch(0.3_0.05_270/30%)]">
              <td className="py-3">Execution time</td>
              <td>{greedyTimeMs.toFixed(3)} ms</td>
              <td>{dpTimeMs.toFixed(3)} ms</td>
            </tr>
            <tr className="border-b border-[oklch(0.3_0.05_270/30%)]">
              <td className="py-3">Time complexity</td>
              <td>O(n log n)</td>
              <td>O(n³)</td>
            </tr>
            <tr className="border-b border-[oklch(0.3_0.05_270/30%)]">
              <td className="py-3">Space complexity</td>
              <td>O(n)</td>
              <td>O(n²)</td>
            </tr>
            <tr>
              <td className="py-3">Result agrees?</td>
              <td colSpan={2} className={match ? "neon-text-cyan" : "text-destructive"}>
                {match ? "✓ Both algorithms produce the same optimal cost." : "✗ Mismatch"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </GlowCard>
  );
}

/* ---------- Tree visualization ---------- */
function TreeView({ node }: { node: TreeNode | null }) {
  if (!node) return null;
  const depth = (n: TreeNode): number =>
    1 + Math.max(n.left ? depth(n.left) : 0, n.right ? depth(n.right) : 0);
  const d = depth(node);
  const width = Math.max(320, Math.pow(2, d) * 50);
  const height = d * 70;

  const positions: {
    x: number;
    y: number;
    value: number;
    isLeaf: boolean;
    parent?: { x: number; y: number };
  }[] = [];

  const walk = (n: TreeNode, x: number, y: number, span: number, parent?: { x: number; y: number }) => {
    positions.push({ x, y, value: n.value, isLeaf: !n.left && !n.right, parent });
    if (n.left) walk(n.left, x - span / 2, y + 70, span / 2, { x, y });
    if (n.right) walk(n.right, x + span / 2, y + 70, span / 2, { x, y });
  };
  walk(node, width / 2, 30, width / 2);

  return (
    <svg width={width} height={height + 30} className="mx-auto">
      {positions.map(
        (p, i) =>
          p.parent && (
            <line
              key={`l${i}`}
              x1={p.parent.x}
              y1={p.parent.y}
              x2={p.x}
              y2={p.y}
              stroke="oklch(0.65 0.27 300 / 60%)"
              strokeWidth={1.5}
            />
          )
      )}
      {positions.map((p, i) => (
        <g key={`n${i}`}>
          <circle
            cx={p.x}
            cy={p.y}
            r={20}
            fill={p.isLeaf ? "oklch(0.18 0.04 270)" : "oklch(0.65 0.27 300 / 30%)"}
            stroke={p.isLeaf ? "oklch(0.85 0.18 200)" : "oklch(0.65 0.27 300)"}
            strokeWidth={1.5}
            style={{ filter: `drop-shadow(0 0 8px ${p.isLeaf ? "oklch(0.85 0.18 200 / 60%)" : "oklch(0.65 0.27 300 / 60%)"})` }}
          />
          <text
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={p.isLeaf ? "oklch(0.85 0.18 200)" : "oklch(0.9 0.1 280)"}
            fontWeight="bold"
          >
            {p.value}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Flow ---------- */
function FlowChart() {
  const steps = [
    "Start",
    "Insert all backups into Min Heap",
    "Extract two smallest files",
    "Merge them (cost = sum)",
    "Add merged backup back to heap",
    "Repeat until one backup remains",
    "Display total cost",
  ];
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="04 — Flow" title="Algorithm Flow" />
        <div className="space-y-4">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-full max-w-md text-center py-4 rounded-xl font-mono text-sm ${
                  i === 0 || i === steps.length - 1
                    ? "gradient-neon text-background font-bold shadow-[0_0_30px_oklch(0.7_0.22_240/50%)]"
                    : "glass-strong neon-border-cyan"
                }`}
              >
                {s}
              </div>
              {i < steps.length - 1 && (
                <div className="my-2 h-8 w-px bg-gradient-to-b from-[oklch(0.85_0.18_200)] to-[oklch(0.65_0.27_300)] shadow-[0_0_8px_oklch(0.7_0.22_240)]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Code tabs ---------- */
const CODE: Record<string, string> = {
  Pseudocode: `OptimalMerge(sizes[]):
    heap = MinHeap(sizes)
    totalCost = 0
    while heap.size() > 1:
        a = heap.extractMin()
        b = heap.extractMin()
        merged = a + b
        totalCost += merged
        heap.insert(merged)
    return totalCost`,
  Python: `import heapq

def optimal_merge(sizes):
    heap = list(sizes)
    heapq.heapify(heap)
    total = 0
    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        merged = a + b
        total += merged
        heapq.heappush(heap, merged)
    return total`,
  Java: `import java.util.PriorityQueue;

public class OptimalMerge {
    public static long merge(int[] sizes) {
        PriorityQueue<Long> pq = new PriorityQueue<>();
        for (int s : sizes) pq.offer((long) s);
        long total = 0;
        while (pq.size() > 1) {
            long a = pq.poll();
            long b = pq.poll();
            long m = a + b;
            total += m;
            pq.offer(m);
        }
        return total;
    }
}`,
  "C++": `#include <queue>
#include <vector>
using namespace std;

long long optimalMerge(vector<int>& sizes) {
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int s : sizes) pq.push(s);
    long long total = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long m = a + b;
        total += m;
        pq.push(m);
    }
    return total;
}`,
};

function CodeTabs() {
  const [tab, setTab] = useState("Pseudocode");
  return (
    <section id="code" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="05 — Code"
          title="Implementation"
          subtitle="The same algorithm, across four languages."
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(CODE).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition ${
                tab === k
                  ? "gradient-neon text-background font-bold shadow-[0_0_20px_oklch(0.7_0.22_240/50%)]"
                  : "glass border border-[oklch(0.4_0.08_280/40%)] hover:neon-border-cyan"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="glass-strong rounded-2xl p-6 neon-border-cyan">
          <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto">
            <code className="neon-text-cyan">{CODE[tab]}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

/* ---------- Complexity callouts ---------- */
function ComplexitySection() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="06 — Analysis" title="Expected Complexity" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Heap Insert", v: "O(log n)", color: "cyan" },
            { label: "Heap Extract Min", v: "O(log n)", color: "purple" },
            { label: "n-1 merges total", v: "O(n log n)", color: "pink" },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-8 text-center neon-border-cyan"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {m.label}
              </div>
              <div
                className={`text-5xl font-black font-mono ${
                  m.color === "cyan"
                    ? "neon-text-cyan"
                    : m.color === "purple"
                    ? "neon-text-purple"
                    : "neon-text-pink"
                } animate-neon-pulse`}
              >
                {m.v}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Educational ---------- */
function Educational() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="07 — Theory" title="Why Greedy Works?" />
        <div className="grid lg:grid-cols-2 gap-6">
          <GlowCard>
            <h3 className="text-xl font-bold neon-text-cyan mb-4">
              Mathematical Intuition
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each backup contributes to total cost <em>depth</em> times, where
              depth is its position in the merge tree. To minimize cost we must
              place <span className="neon-text-purple">larger backups closer to
              the root</span> (fewer re-merges) and smaller backups deeper.
            </p>
            <div className="rounded-lg bg-[oklch(0.1_0.02_270/80%)] p-4 font-mono text-sm neon-border-purple">
              <div className="text-muted-foreground">Total Cost =</div>
              <div className="neon-text-cyan">Σ (size_i × depth_i)</div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Repeatedly merging the two smallest items provably produces this
              optimal Huffman-style tree — the greedy choice is globally optimal.
            </p>
          </GlowCard>
          <GlowCard className="min-w-0">
            <h3 className="text-xl font-bold neon-text-purple mb-4">
              Huffman-style Tree
            </h3>
            <div className="w-full overflow-x-auto">
              <div className="flex justify-center min-w-fit">
                <TreeView node={optimalMerge([5, 10, 20, 30]).tree} />
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison charts ---------- */
function ComparisonCharts() {
  const data = useMemo(() => {
    const sizes = [4, 8, 16, 32, 64, 128, 256];
    return sizes.map((n) => ({
      n: `n=${n}`,
      greedyTime: +(n * Math.log2(n)).toFixed(2),
      dpTime: +(n * n * n).toFixed(2),
      greedyMem: n,
      dpMem: n * n,
    }));
  }, []);
  const tooltipStyle = {
    background: "oklch(0.15 0.04 270 / 95%)",
    border: "1px solid oklch(0.7 0.22 240 / 60%)",
    borderRadius: 8,
    fontFamily: "monospace",
    fontSize: 12,
  } as const;
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="08 — Comparison"
          title="Algorithm Performance Comparison"
          subtitle="Live curves comparing how Greedy and DP scale across input size."
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <GlowCard className="min-w-0">
            <h4 className="text-lg font-bold neon-text-cyan mb-2 font-mono">› Execution speed (log scale)</h4>
            <p className="text-xs text-muted-foreground mb-4">Greedy O(n log n) vs DP O(n³).</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.4 0.08 280 / 30%)" />
                  <XAxis dataKey="n" stroke="oklch(0.7 0.04 250)" fontSize={11} />
                  <YAxis stroke="oklch(0.7 0.04 250)" fontSize={11} scale="log" domain={["auto", "auto"]} allowDataOverflow />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="greedyTime"
                    name="Greedy"
                    stroke="oklch(0.85 0.18 200)"
                    strokeWidth={3}
                    dot={{ fill: "oklch(0.85 0.18 200)", r: 4 }}
                    isAnimationActive
                    animationDuration={1400}
                  />
                  <Line
                    type="monotone"
                    dataKey="dpTime"
                    name="DP"
                    stroke="oklch(0.7 0.28 340)"
                    strokeWidth={3}
                    dot={{ fill: "oklch(0.7 0.28 340)", r: 4 }}
                    isAnimationActive
                    animationDuration={1400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>

          <GlowCard className="min-w-0">
            <h4 className="text-lg font-bold neon-text-purple mb-2 font-mono">› Memory usage</h4>
            <p className="text-xs text-muted-foreground mb-4">Greedy O(n) vs DP O(n²).</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.4 0.08 280 / 30%)" />
                  <XAxis dataKey="n" stroke="oklch(0.7 0.04 250)" fontSize={11} />
                  <YAxis stroke="oklch(0.7 0.04 250)" fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="greedyMem"
                    name="Greedy O(n)"
                    stroke="oklch(0.85 0.18 200)"
                    strokeWidth={3}
                    dot={{ fill: "oklch(0.85 0.18 200)", r: 4 }}
                    isAnimationActive
                    animationDuration={1400}
                  />
                  <Line
                    type="monotone"
                    dataKey="dpMem"
                    name="DP O(n²)"
                    stroke="oklch(0.7 0.28 340)"
                    strokeWidth={3}
                    dot={{ fill: "oklch(0.7 0.28 340)", r: 4 }}
                    isAnimationActive
                    animationDuration={1400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recommendation ---------- */
function Recommendation() {
  const rows = [
    ["Time Complexity", "O(n log n)", "O(n³)"],
    ["Space Complexity", "O(n)", "O(n²)"],
    ["Ease of Implementation", "Simple — min-heap", "Complex — 3 nested loops"],
    ["Scalability", "Excellent (millions of items)", "Poor (n > ~500 impractical)"],
    ["Practical Usage", "Industry standard", "Educational / theoretical"],
  ];
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="09 — Recommendation"
          title="Greedy vs DP — Which One Should We Choose?"
          subtitle="For this problem the greedy / min-heap approach is globally optimal AND dramatically faster. DP is kept for pedagogical comparison only."
        />
        <GlowCard className="min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono min-w-[560px]">
              <thead>
                <tr className="border-b border-[oklch(0.4_0.08_280/40%)] text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="py-3">Feature</th>
                  <th className="py-3 neon-text-cyan">Greedy ★ Recommended</th>
                  <th className="py-3 neon-text-purple">Dynamic Programming</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-[oklch(0.3_0.05_270/30%)]">
                    <td className="py-3 text-muted-foreground">{r[0]}</td>
                    <td className="py-3 neon-text-cyan">{r[1]}</td>
                    <td className="py-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-5 rounded-xl gradient-neon text-background">
            <div className="text-xs uppercase tracking-widest font-mono opacity-80">Verdict</div>
            <div className="mt-1 font-bold">
              Greedy / Min-Heap is the recommended choice — globally optimal at O(n log n).
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}

/* ---------- Detailed Complexity ---------- */
function StepCard({
  index,
  title,
  body,
  formula,
  color = "cyan",
}: {
  index: number;
  title: string;
  body: string;
  formula: string;
  color?: "cyan" | "purple";
}) {
  const accent = color === "cyan" ? "neon-text-cyan" : "neon-text-purple";
  const border =
    color === "cyan"
      ? "border-[oklch(0.75_0.2_200/40%)] shadow-[0_0_25px_oklch(0.7_0.22_220/25%)]"
      : "border-[oklch(0.65_0.27_300/40%)] shadow-[0_0_25px_oklch(0.65_0.27_300/25%)]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`glass rounded-2xl p-5 border ${border}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-9 w-9 rounded-lg flex items-center justify-center font-mono text-sm font-bold ${
            color === "cyan"
              ? "bg-[oklch(0.75_0.2_220/15%)] neon-text-cyan"
              : "bg-[oklch(0.65_0.27_300/15%)] neon-text-purple"
          }`}
        >
          {index}
        </div>
        <h4 className="font-display text-base font-semibold">{title}</h4>
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
      <div className={`mt-4 px-4 py-3 rounded-lg bg-[oklch(0.1_0.02_270/60%)] font-mono text-base ${accent} animate-neon-pulse`}>
        {formula}
      </div>
    </motion.div>
  );
}

function GrowthChart({
  type,
  color,
  label,
}: {
  type: "nlogn" | "n3" | "n" | "n2";
  color: string;
  label: string;
}) {
  const data = useMemo(() => {
    const arr: { n: number; y: number }[] = [];
    for (let n = 1; n <= 50; n++) {
      let y = 0;
      if (type === "nlogn") y = n * Math.log2(Math.max(2, n));
      else if (type === "n3") y = n * n * n;
      else if (type === "n") y = n;
      else if (type === "n2") y = n * n;
      arr.push({ n, y });
    }
    return arr;
  }, [type]);
  return (
    <div className="h-56 w-full">
      <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2">
        {label}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="oklch(0.4 0.08 280 / 20%)" strokeDasharray="3 3" />
          <XAxis dataKey="n" stroke="oklch(0.7 0.04 250)" fontSize={11} />
          <YAxis stroke="oklch(0.7 0.04 250)" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "oklch(0.15 0.04 270 / 95%)",
              border: "1px solid oklch(0.4 0.08 280 / 50%)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function HeapMemoryViz() {
  const heap = [5, 10, 20, 30];
  return (
    <div className="mt-4">
      <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-3">
        Heap Memory Layout — O(n)
      </div>
      <div className="flex flex-wrap gap-3">
        {heap.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="h-16 w-16 rounded-xl glass neon-border-cyan flex flex-col items-center justify-center"
          >
            <div className="text-[9px] font-mono text-muted-foreground">[{i}]</div>
            <div className="neon-text-cyan font-mono font-bold">{v}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 text-xs font-mono text-muted-foreground">
        Total cells = n &nbsp;→&nbsp; <span className="neon-text-cyan">Space = O(n)</span>
      </div>
    </div>
  );
}

function DpMatrixViz() {
  const n = 5;
  return (
    <div className="mt-4">
      <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-3">
        DP Matrix dp[i][j] — O(n²)
      </div>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, maxWidth: 320 }}
      >
        {Array.from({ length: n * n }).map((_, k) => {
          const i = Math.floor(k / n);
          const j = k % n;
          const active = j >= i;
          return (
            <motion.div
              key={k}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: k * 0.02 }}
              className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                active
                  ? "bg-[oklch(0.65_0.27_300/25%)] neon-text-purple border border-[oklch(0.65_0.27_300/50%)]"
                  : "bg-[oklch(0.2_0.04_270/40%)] text-muted-foreground/40 border border-[oklch(0.3_0.05_270/30%)]"
              }`}
            >
              {i},{j}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-3 text-xs font-mono text-muted-foreground">
        Total cells = n × n &nbsp;→&nbsp; <span className="neon-text-purple">Space = O(n²)</span>
      </div>
    </div>
  );
}

function DetailedComplexity() {
  const [timeAlg, setTimeAlg] = useState<"greedy" | "dp">("greedy");
  const [spaceAlg, setSpaceAlg] = useState<"greedy" | "dp">("greedy");
  const [showHeapNote, setShowHeapNote] = useState(false);

  const selectClass =
    "glass-strong rounded-lg px-4 py-2.5 font-mono text-sm neon-border-cyan focus:outline-none cursor-pointer text-foreground";

  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-6xl relative">
        <SectionTitle
          eyebrow="10 — Deep Dive"
          title="Detailed Time & Space Complexity Analysis"
          subtitle="Step-by-step mathematical breakdown of algorithm efficiency"
        />

        {/* TIME COMPLEXITY */}
        <GlowCard className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Module A
              </div>
              <h3 className="font-display text-2xl font-bold gradient-text mt-1">
                Time Complexity Analysis
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Select Time Complexity Analysis
              </label>
              <select
                value={timeAlg}
                onChange={(e) => setTimeAlg(e.target.value as "greedy" | "dp")}
                className={selectClass}
              >
                <option value="greedy">Greedy Algorithm</option>
                <option value="dp">Dynamic Programming</option>
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {timeAlg === "greedy" ? (
              <motion.div
                key="greedy-time"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
              >
                <h4 className="font-display text-xl font-bold neon-text-cyan">
                  Greedy Algorithm Time Complexity
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                  The greedy approach uses a Min Heap to always pick the two smallest
                  backups for merging. We derive its complexity in three precise steps.
                </p>

                <div className="grid md:grid-cols-3 gap-5 mt-6">
                  <StepCard
                    index={1}
                    title="Build Min Heap"
                    body="Insert all n backup sizes into a min heap. Using bottom-up heapify, this can be done in linear time."
                    formula="O(n)"
                  />
                  <StepCard
                    index={2}
                    title="Extract + Merge + Insert"
                    body="Each iteration extracts two minima and reinserts their sum. Each heap op costs O(log n) → 3·O(log n) = O(log n) per step."
                    formula="O(log n) per merge"
                  />
                  <StepCard
                    index={3}
                    title="Repeat n − 1 times"
                    body="We reduce n elements to 1 by performing exactly n − 1 merges. Multiply per-merge cost by iteration count."
                    formula="(n − 1) × O(log n)"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mt-8 p-6 rounded-2xl gradient-neon text-background text-center"
                >
                  <div className="text-xs uppercase tracking-widest font-mono opacity-80">
                    Final Derivation
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold">
                    O(n) + (n − 1) · O(log n)  =  O(n log n)
                  </div>
                </motion.div>

                <div className="mt-8">
                  <button
                    onClick={() => setShowHeapNote((s) => !s)}
                    className="btn-neon"
                  >
                    {showHeapNote ? "Hide" : "Why Min Heap makes it efficient"}
                  </button>
                  <AnimatePresence>
                    {showHeapNote && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 glass rounded-xl p-5 neon-border-cyan">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            A Min Heap maintains the smallest element at the root in
                            O(1) access time, with O(log n) updates. A naive linear
                            scan would cost O(n) per extraction → total O(n²). The
                            heap structure collapses repeated minimum-finding into a
                            logarithmic operation, which is the single optimization
                            that turns this algorithm from quadratic into{" "}
                            <span className="neon-text-cyan font-mono">O(n log n)</span>.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {[7, 3, 12, 5, 9].map((v, i) => (
                              <div
                                key={i}
                                className="h-12 w-12 rounded-lg glass neon-border-cyan flex items-center justify-center font-mono neon-text-cyan"
                              >
                                {v}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 glass rounded-xl p-5">
                  <GrowthChart
                    type="nlogn"
                    color="oklch(0.85 0.18 200)"
                    label="Greedy Runtime Growth — n log n"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dp-time"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <h4 className="font-display text-xl font-bold neon-text-purple">
                  Dynamic Programming Time Complexity
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                  DP computes the optimal merge cost for every sub-range{" "}
                  <span className="font-mono neon-text-purple">dp[i][j]</span> by
                  trying every possible split point k. Three nested loops drive the
                  cost.
                </p>

                <div className="grid md:grid-cols-3 gap-5 mt-6">
                  <StepCard
                    index={1}
                    title="Choose left index i"
                    body="Outer loop iterates over every possible starting position of a sub-range."
                    formula="O(n)"
                    color="purple"
                  />
                  <StepCard
                    index={2}
                    title="Choose right index j"
                    body="Second loop iterates over every possible ending position for the sub-range starting at i."
                    formula="O(n)"
                    color="purple"
                  />
                  <StepCard
                    index={3}
                    title="Try all splits k"
                    body="Inner loop tries every split point k between i and j to find the minimum-cost partition."
                    formula="O(n)"
                    color="purple"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[oklch(0.65_0.27_300)] to-[oklch(0.7_0.28_340)] text-background text-center"
                >
                  <div className="text-xs uppercase tracking-widest font-mono opacity-80">
                    Final Derivation
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold">
                    O(n) × O(n) × O(n)  =  O(n³)
                  </div>
                </motion.div>

                <div className="mt-8 glass rounded-xl p-5 neon-border-purple">
                  <h5 className="font-display text-sm font-bold neon-text-purple mb-2">
                    Why DP becomes expensive
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As n grows, the number of sub-problems grows as n², and each
                    sub-problem evaluates up to n split points. Doubling the input
                    multiplies work by 8×, making DP impractical beyond a few
                    hundred backups.
                  </p>
                </div>

                <div className="mt-8 glass rounded-xl p-5">
                  <GrowthChart
                    type="n3"
                    color="oklch(0.7 0.28 340)"
                    label="DP Runtime Growth — n³"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlowCard>

        {/* SPACE COMPLEXITY */}
        <GlowCard className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Module B
              </div>
              <h3 className="font-display text-2xl font-bold gradient-text mt-1">
                Space Complexity Analysis
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Select Space Complexity Analysis
              </label>
              <select
                value={spaceAlg}
                onChange={(e) => setSpaceAlg(e.target.value as "greedy" | "dp")}
                className={selectClass}
              >
                <option value="greedy">Greedy Algorithm</option>
                <option value="dp">Dynamic Programming</option>
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {spaceAlg === "greedy" ? (
              <motion.div
                key="greedy-space"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
              >
                <h4 className="font-display text-xl font-bold neon-text-cyan">
                  Greedy Algorithm Space Complexity
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                  The greedy method stores only the active heap of unmerged
                  backups, plus a constant number of helper variables.
                </p>

                <div className="grid md:grid-cols-2 gap-5 mt-6">
                  <StepCard
                    index={1}
                    title="Min Heap storage"
                    body="The heap holds up to n elements at peak (initial load), shrinking by one each merge."
                    formula="O(n)"
                  />
                  <StepCard
                    index={2}
                    title="Auxiliary variables"
                    body="Pointers, accumulators, and the running cost use a fixed amount of memory regardless of n."
                    formula="O(1)"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mt-8 p-6 rounded-2xl gradient-neon text-background text-center"
                >
                  <div className="text-xs uppercase tracking-widest font-mono opacity-80">
                    Final Space
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold">O(n)</div>
                </motion.div>

                <div className="glass rounded-xl p-5 mt-8 neon-border-cyan">
                  <HeapMemoryViz />
                </div>

                <div className="mt-8 glass rounded-xl p-5">
                  <GrowthChart
                    type="n"
                    color="oklch(0.85 0.18 200)"
                    label="Greedy Memory Growth — n"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dp-space"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <h4 className="font-display text-xl font-bold neon-text-purple">
                  Dynamic Programming Space Complexity
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                  DP must memoize the optimal cost for every sub-range{" "}
                  <span className="font-mono neon-text-purple">dp[i][j]</span>,
                  producing a two-dimensional table.
                </p>

                <div className="grid md:grid-cols-3 gap-5 mt-6">
                  <StepCard
                    index={1}
                    title="Rows"
                    body="One row per possible left endpoint i of a sub-range."
                    formula="n"
                    color="purple"
                  />
                  <StepCard
                    index={2}
                    title="Columns"
                    body="One column per possible right endpoint j of a sub-range."
                    formula="n"
                    color="purple"
                  />
                  <StepCard
                    index={3}
                    title="Total cells"
                    body="Every (i, j) pair stores one memoized sub-result."
                    formula="n × n  =  n²"
                    color="purple"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[oklch(0.65_0.27_300)] to-[oklch(0.7_0.28_340)] text-background text-center"
                >
                  <div className="text-xs uppercase tracking-widest font-mono opacity-80">
                    Final Space
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold">O(n²)</div>
                </motion.div>

                <div className="glass rounded-xl p-5 mt-8 neon-border-purple">
                  <DpMatrixViz />
                </div>

                <div className="mt-8 glass rounded-xl p-5">
                  <GrowthChart
                    type="n2"
                    color="oklch(0.7 0.28 340)"
                    label="DP Memory Growth — n²"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlowCard>

        {/* FINAL COMPARISON */}
        <div className="text-center mb-10">
          <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
            Module C
          </div>
          <h3 className="font-display text-3xl font-bold gradient-text mt-1">
            Final Complexity Comparison
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            {
              name: "Greedy (Min Heap)",
              tag: "★ Recommended",
              color: "cyan" as const,
              rows: [
                ["Time Complexity", "O(n log n)"],
                ["Space Complexity", "O(n)"],
                ["Scalability", "High"],
                ["Performance", "Fast"],
                ["Practical Usage", "Recommended"],
              ],
            },
            {
              name: "Dynamic Programming",
              tag: "Educational",
              color: "purple" as const,
              rows: [
                ["Time Complexity", "O(n³)"],
                ["Space Complexity", "O(n²)"],
                ["Scalability", "Medium"],
                ["Performance", "Slower"],
                ["Practical Usage", "Educational"],
              ],
            },
          ].map((card) => (
            <motion.div
              key={card.name}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`glass-strong rounded-2xl p-6 border ${
                card.color === "cyan"
                  ? "neon-border-cyan"
                  : "neon-border-purple"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4
                  className={`font-display text-lg font-bold ${
                    card.color === "cyan" ? "neon-text-cyan" : "neon-text-purple"
                  }`}
                >
                  {card.name}
                </h4>
                <span
                  className={`text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded-md ${
                    card.color === "cyan"
                      ? "bg-[oklch(0.75_0.2_220/20%)] neon-text-cyan"
                      : "bg-[oklch(0.65_0.27_300/20%)] neon-text-purple"
                  }`}
                >
                  {card.tag}
                </span>
              </div>
              <div className="mt-5 space-y-2.5 font-mono text-sm">
                {card.rows.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between py-2 border-b border-[oklch(0.3_0.05_270/30%)]"
                  >
                    <span className="text-muted-foreground">{k}</span>
                    <span
                      className={
                        card.color === "cyan"
                          ? "neon-text-cyan"
                          : "neon-text-purple"
                      }
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl gradient-neon text-background text-center"
        >
          <div className="text-xs uppercase tracking-widest font-mono opacity-80">
            Verdict
          </div>
          <div className="mt-1 font-bold text-lg">
            Greedy is the best practical approach — optimal cost at O(n log n)
            time and O(n) space.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-[oklch(0.4_0.08_280/40%)] py-12 px-6 mt-12">
      <div className="mx-auto max-w-6xl text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-xl gradient-neon flex items-center justify-center shadow-[0_0_30px_oklch(0.7_0.22_240/60%)]">
            <Binary className="h-6 w-6 text-background" />
          </div>
        </div>
        <h3 className="font-display text-lg font-bold gradient-text">
          Analysis and Design of Algorithms Assignment
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Optimal Data Backup Scheduling — Greedy &amp; Dynamic Programming.
        </p>
        <p className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground/60">
          ADA.LAB · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <Problem />
      <AlgorithmSection />
      <Simulator />
      <FlowChart />
      <CodeTabs />
      <ComplexitySection />
      <Educational />
      <ComparisonCharts />
      <Recommendation />
      <DetailedComplexity />
      <Footer />
    </main>
  );
}
