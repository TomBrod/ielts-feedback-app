"use client";

import { useState } from "react";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import SubmissionForm from "@/components/SubmissionForm";
import { FeedbackResult } from "@/types/feedback";

export default function Home() {
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedTask, setSubmittedTask] = useState<"task1" | "task2">(
    "task1"
  );

  async function handleSubmit(
    task: "task1" | "task2",
    question: string,
    response: string,
    diagramImage?: { data: string; mediaType: string } | null
  ) {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setSubmittedTask(task);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task,
          question,
          response,
          diagramImage: diagramImage ?? null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      setFeedback(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFeedback(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {!feedback && (
          <SubmissionForm onSubmit={handleSubmit} loading={loading} />
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-10 flex flex-col items-center gap-4 text-slate-600">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-lg font-medium">Analysing your writing...</p>
            <p className="text-sm text-slate-400">
              This usually takes 10–20 seconds
            </p>
          </div>
        )}

        {feedback && (
          <>
            <FeedbackDisplay feedback={feedback} task={submittedTask} />
            <div className="mt-8 text-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-[#E8322A] hover:bg-[#c9281f] text-white rounded-xl font-semibold transition-colors"
              >
                Submit Another Response
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
