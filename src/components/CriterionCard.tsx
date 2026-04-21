"use client";

interface Props {
  label: string;
  band: number;
  explanation: string;
  suggestions: string[];
  color: string;
}

function bandColor(_band: number): string {
  return "text-[#F5C000] bg-[#F5C000]/10 border-[#F5C000]/40";
}

export default function CriterionCard({
  label,
  band,
  explanation,
  suggestions,
}: Props) {
  const colorClasses = bandColor(band);

  return (
    <div className="bg-white rounded-2xl border border-[#1F3E9C]/15 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#1F3E9C] text-base">{label}</h3>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full border ${colorClasses}`}
        >
          Band {band}
        </span>
      </div>

      <p className="text-[#1F3E9C]/70 text-sm leading-relaxed">{explanation}</p>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#1F3E9C]/50 uppercase tracking-wide">
          Suggestions for improvement
        </p>
        <ul className="space-y-1.5">
          {suggestions.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#1F3E9C]">
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
