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
      <Footer />
    </main>
  );
}
