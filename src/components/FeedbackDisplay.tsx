"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import CriterionCard from "./CriterionCard";
import { FeedbackResult } from "@/types/feedback";

const BandRadarChart = dynamic(() => import("./BandRadarChart"), {
  ssr: false,
});

interface Props {
  feedback: FeedbackResult;
  task: "task1" | "task2";
}

function overallBandLabel(band: number): string {
  if (band >= 8.5) return "Expert";
  if (band >= 7.5) return "Very Good";
  if (band >= 6.5) return "Competent";
  if (band >= 5.5) return "Modest";
  if (band >= 4.5) return "Limited";
  return "Developing";
}

function overallBandColor(band: number): string {
  if (band >= 8) return "from-emerald-500 to-emerald-600";
  if (band >= 7) return "from-blue-500 to-blue-600";
  if (band >= 6) return "from-amber-500 to-amber-600";
  return "from-red-400 to-red-500";
}

export default function FeedbackDisplay({ feedback, task }: Props) {
  const [copied, setCopied] = useState(false);

  const { overallBand, criteria, modelAnswer } = feedback;
  const ta_tr_label = task === "task1" ? "Task Achievement" : "Task Response";

  async function copyModelAnswer() {
    await navigator.clipboard.writeText(modelAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const criteriaCards = [
    {
      key: "ta_tr",
      label: ta_tr_label,
      data: criteria.ta_tr,
      color: "blue",
    },
    {
      key: "cc",
      label: "Coherence & Cohesion",
      data: criteria.cc,
      color: "purple",
    },
    {
      key: "lr",
      label: "Lexical Resource",
      data: criteria.lr,
      color: "green",
    },
    {
      key: "gra",
      label: "Grammatical Range & Accuracy",
      data: criteria.gra,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overall band score */}
      <div
        className={`rounded-2xl bg-gradient-to-r ${overallBandColor(
          overallBand
        )} text-white p-8 text-center shadow-lg`}
      >
        <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-1">
          Estimated Overall Band
        </p>
        <p className="text-7xl font-bold mb-1">{overallBand}</p>
        <p className="text-white/90 text-xl font-medium">
          {overallBandLabel(overallBand)}
        </p>
        <p className="mt-3 text-white/70 text-xs">
          Average of four criteria, rounded to nearest 0.5
        </p>
      </div>

      {/* Radar chart */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-base font-semibold text-[#1B2B4B] mb-4 text-center">
          Score Breakdown
        </h2>
        <BandRadarChart
          scores={{
            ta_tr: criteria.ta_tr.band,
            cc: criteria.cc.band,
            lr: criteria.lr.band,
            gra: criteria.gra.band,
          }}
          task={task}
        />
        {/* Quick score summary */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {criteriaCards.map(({ key, label, data }) => (
            <div key={key} className="text-center">
              <p className="text-2xl font-bold text-slate-800">{data.band}</p>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                {label.split(" ").slice(0, 2).join(" ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Criterion cards */}
      <div>
        <h2 className="text-xl font-bold text-[#1B2B4B] mb-4">
          Detailed Feedback
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {criteriaCards.map(({ key, label, data, color }) => (
            <CriterionCard
              key={key}
              label={label}
              band={data.band}
              explanation={data.explanation}
              suggestions={data.suggestions}
              color={color}
            />
          ))}
        </div>
      </div>

      {/* Model answer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1B2B4B]">Model Answer</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Band 8–9 level response to the same question
            </p>
          </div>
          <button
            onClick={copyModelAnswer}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              copied
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
            {modelAnswer}
          </p>
        </div>
      </div>
    </div>
  );
}
