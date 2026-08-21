import type { ReactNode } from "react";
import { Section, SectionHeading, FactList } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import BurnRateTicker from "@/components/lab/BurnRateTicker";
import WorkflowGraph from "@/components/viz/WorkflowGraph";
import PsychometricRadar from "@/components/viz/PsychometricRadar";
import CurriculumHeatmap from "@/components/viz/CurriculumHeatmap";
import { costly, oopsCupid, passway, workflowAutomation } from "@/lib/data";

function LabCard({
  kicker,
  name,
  summary,
  children,
  className = "",
  index,
}: {
  kicker: string;
  name: string;
  summary: string;
  children: ReactNode;
  className?: string;
  index: string;
}) {
  return (
    <GlassCard as="article" className={`p-7 sm:p-9 md:p-11 ${className}`}>
      <div className="reveal flex items-baseline gap-4">
        <span className="font-mono text-[0.625rem] tracking-[0.3em] text-gold">
          {index}
        </span>
        <span className="font-mono text-[0.625rem] tracking-[0.26em] text-ivory-faint uppercase">
          {kicker}
        </span>
      </div>
      <h3 className="reveal display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-gradient-ivory">
        {name}
      </h3>
      <p className="reveal mt-5 max-w-[62ch] text-[0.95rem] leading-relaxed text-ivory-dim">
        {summary}
      </p>
      {children}
    </GlassCard>
  );
}

export default function LabSection() {
  return (
    <Section id="lab">
      <SectionHeading
        index="04"
        eyebrow="The app laboratory"
        title={
          <>
            Four systems, each built to
            <span className="text-gold"> hold a measurement</span>
          </>
        }
        lede="Automation pipelines, native apps, and assessment platforms — every one of them starts from a behavioral claim and ends in an interface that has to survive contact with a real user."
      />

      <div className="space-y-8" data-stagger>
        {/* ---- 4.1 Workflow Automation Engine ---- */}
        <LabCard
          index="4.1"
          kicker={workflowAutomation.kicker}
          name={workflowAutomation.name}
          summary={workflowAutomation.summary}
        >
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="reveal lg:col-span-4">
              <ul className="space-y-4">
                {workflowAutomation.notes.map((n) => (
                  <li
                    key={n}
                    className="flex gap-3 text-[0.875rem] leading-relaxed text-ivory-dim"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-4 shrink-0 bg-gold/60"
                    />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal lg:col-span-8">
              <WorkflowGraph />
            </div>
          </div>
        </LabCard>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* ---- 4.2 Costly ---- */}
          <LabCard
            index="4.2"
            kicker={costly.kicker}
            name={costly.name}
            summary={costly.summary}
            className="lg:col-span-5"
          >
            <div className="reveal mt-9 rounded-sm border border-gold/20 bg-void/40 p-6">
              <BurnRateTicker />
            </div>
            <p className="reveal mt-7 border-l border-gold/30 pl-5 font-serif text-[1.0625rem] leading-snug text-ivory italic">
              {costly.premise}
            </p>
            <FactList facts={costly.facts} className="reveal mt-8" />
          </LabCard>

          {/* ---- 4.3 OopsCupid ---- */}
          <LabCard
            index="4.3"
            kicker={oopsCupid.kicker}
            name={oopsCupid.name}
            summary={oopsCupid.summary}
            className="lg:col-span-7"
          >
            <div className="reveal mt-8">
              <PsychometricRadar />
            </div>
            <FactList facts={oopsCupid.facts} className="reveal mt-8" />
          </LabCard>
        </div>

        {/* ---- 4.4 Passway ---- */}
        <LabCard
          index="4.4"
          kicker={passway.kicker}
          name={passway.name}
          summary={passway.summary}
        >
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="reveal lg:col-span-4">
              <ul className="space-y-7">
                {passway.sources.map((s) => (
                  <li key={s.id}>
                    <h4 className="font-mono text-[0.6875rem] tracking-[0.24em] text-gold uppercase">
                      {s.title}
                    </h4>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-ivory-dim">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal lg:col-span-8">
              <CurriculumHeatmap />
            </div>
          </div>
        </LabCard>
      </div>
    </Section>
  );
}
