import BurnRateTicker from "@/components/lab/BurnRateTicker";
import EmailWireframe from "@/components/media/EmailWireframe";
import AnovaPlot from "@/components/viz/AnovaPlot";
import CurriculumHeatmap from "@/components/viz/CurriculumHeatmap";
import PsychometricRadar from "@/components/viz/PsychometricRadar";
import WorkflowGraph from "@/components/viz/WorkflowGraph";
import type { VizKind } from "@/lib/content";
import { costly, passway, workflowAutomation } from "@/lib/data";

function Notes({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((n) => (
        <li key={n} className="flex gap-3 text-[0.9375rem] text-ivory-dim">
          <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-gold" />
          {n}
        </li>
      ))}
    </ul>
  );
}

/** The interactive chart for a case study, with any notes it needs. */
export default function CaseViz({ kind }: { kind: VizKind }) {
  switch (kind) {
    case "workflow":
      return (
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Notes items={workflowAutomation.notes} />
          </div>
          <div className="lg:col-span-8">
            <WorkflowGraph />
          </div>
        </div>
      );
    case "costly":
      return (
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="rounded-xl border border-gold/25 bg-void/40 p-6 lg:col-span-6">
            <BurnRateTicker />
          </div>
          <p className="font-serif text-[1.5rem] leading-snug italic lg:col-span-6">{costly.premise}</p>
        </div>
      );
    case "radar":
      return <PsychometricRadar />;
    case "heatmap":
      return (
        <div className="grid gap-10 lg:grid-cols-12">
          <ul className="space-y-7 lg:col-span-4">
            {passway.sources.map((s) => (
              <li key={s.id}>
                <h3 className="eyebrow">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-ivory-dim">{s.body}</p>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-8">
            <CurriculumHeatmap />
          </div>
        </div>
      );
    case "anova":
      return <AnovaPlot />;
    case "email":
      return (
        <div className="mx-auto max-w-2xl">
          <EmailWireframe />
        </div>
      );
  }
}
