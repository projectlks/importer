import type { ReactNode } from "react";
import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export type StepItem = {
  title: string;
  detail: string;
  note?: string;
};

type ContentCardProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
};

export function ContentCard({ title, subtitle, children, className }: ContentCardProps) {
  return (
    <section className={clsx("card-shell p-5 sm:p-6", className)}>
      <header className="border-b border-slate-100 pb-3">
        <h2 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-brand-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
      </header>
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}

export function StepTimeline({ steps }: { steps: StepItem[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-800 text-xs font-bold text-white">
              {index + 1}
            </span>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-800">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-600">{step.detail}</p>
              {step.note ? (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  {step.note}
                </p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

type TableProps = {
  headers: string[];
  emptyMessage?: string;
};

export function MockTable({ headers, emptyMessage = "No data available in table" }: TableProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <p>Show 10 entries</p>
        <label className="flex items-center gap-2">
          <span>Search:</span>
          <input type="search" className="input-lite h-7 w-36" />
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="table-head">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={headers.length} className="table-cell text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <p>Showing 0 to 0 of 0 entries</p>
        <div className="flex gap-1">
          {['First', 'Previous', 'Next', 'Last'].map((action) => (
            <button key={action} className="rounded border border-slate-300 px-2 py-1 text-[11px]">
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TagMetric({
  title,
  value,
  colorClass,
}: {
  title: string;
  value: string;
  colorClass: string;
}) {
  return (
    <article className={clsx("rounded-xl px-4 py-3 text-white shadow-lg", colorClass)}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/90">{title}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
    </article>
  );
}

export function SuccessMessage({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
      <CheckCircleIcon className="h-4 w-4" />
      {children}
    </p>
  );
}
