"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  scores: {
    ta_tr: number;
    cc: number;
    lr: number;
    gra: number;
  };
  task: "task1" | "task2";
}

export default function BandRadarChart({ scores, task }: Props) {
  const data = [
    {
      criterion: task === "task1" ? "Task Achievement" : "Task Response",
      score: scores.ta_tr,
      fullMark: 9,
    },
    { criterion: "Coherence & Cohesion", score: scores.cc, fullMark: 9 },
    { criterion: "Lexical Resource", score: scores.lr, fullMark: 9 },
    {
      criterion: "Grammatical Range",
      score: scores.gra,
      fullMark: 9,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="criterion"
          tick={{ fill: "#1F3E9C", fontSize: 12, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 9]}
          tickCount={4}
          tick={{ fill: "#1F3E9C", fontSize: 11 }}
        />
        <Radar
          name="Band Score"
          dataKey="score"
          stroke="#E8322A"
          fill="#E8322A"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Tooltip
          formatter={(value) => [`Band ${value}`, "Score"]}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #1F3E9C20",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#1F3E9C",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
