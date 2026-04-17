"use client";

interface Props {
  label: string;
  band: number;
  explanation: string;
  suggestions: string[];
  color: string;
}

function bandColor(band: number): string {
  if (band >= 8) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (band >= 7) return "text-blue-600 bg-blue-50 border-blue-200";
  if (band >= 6) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
}

export default function CriterionCard({
  label,
  band,
  explanation,
  suggestions,
}: Props) {
  const colorClasses = bandColor(band);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#1B2B4B] text-base">{label}</h3>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full border ${colorClasses}`}
        >
          Band {band}
        </span>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed">{explanation}</p>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Suggestions for improvement
        </p>
        <ul className="space-y-1.5">
          {suggestions.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-[#E8322A] text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
