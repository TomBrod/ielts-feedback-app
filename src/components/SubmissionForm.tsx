"use client";

import { useRef, useState } from "react";

interface Props {
  onSubmit: (
    task: "task1" | "task2",
    question: string,
    response: string,
    diagramImage?: { data: string; mediaType: string } | null
  ) => void;
  loading: boolean;
}

const TASK1_MIN = 150;
const TASK2_MIN = 250;

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export default function SubmissionForm({ onSubmit, loading }: Props) {
  const [task, setTask] = useState<"task1" | "task2">("task1");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [diagramFile, setDiagramFile] = useState<File | null>(null);
  const [diagramPreview, setDiagramPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = countWords(response);
  const minWords = task === "task1" ? TASK1_MIN : TASK2_MIN;
  const underMinimum = wordCount > 0 && wordCount < minWords;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setDiagramFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setDiagramPreview(url);
    } else {
      setDiagramPreview(null);
    }
  }

  function handleRemoveImage() {
    setDiagramFile(null);
    setDiagramPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !response.trim()) return;

    if (task === "task1" && diagramFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        // dataUrl is "data:<mediaType>;base64,<data>"
        const [meta, data] = dataUrl.split(",");
        const mediaType = meta.replace("data:", "").replace(";base64", "");
        onSubmit(task, question, response, { data, mediaType });
      };
      reader.readAsDataURL(diagramFile);
    } else {
      onSubmit(task, question, response, null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-[#1F3E9C]/15 p-8 space-y-6"
    >
      {/* Task selector */}
      <div>
        <label className="block text-sm font-semibold text-[#1F3E9C] mb-3">
          Select Task
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["task1", "task2"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTask(t)}
              className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                task === t
                  ? "border-[#E8322A] bg-[#E8322A] text-white"
                  : "border-[#1F3E9C]/30 bg-white text-[#1F3E9C] hover:border-[#1F3E9C]"
              }`}
            >
              <span className="block text-base font-bold">
                {t === "task1" ? "Task 1" : "Task 2"}
              </span>
              <span className="block text-xs font-normal mt-0.5 opacity-75">
                {t === "task1"
                  ? "Graph, chart, or diagram"
                  : "Essay or discussion"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Question */}
      <div>
        <label
          htmlFor="question"
          className="block text-sm font-semibold text-[#1F3E9C] mb-2"
        >
          Exam Question / Prompt
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Paste the full IELTS question or prompt here..."
          rows={4}
          className="w-full rounded-xl border border-[#1F3E9C]/20 px-4 py-3 text-[#1F3E9C] placeholder-[#1F3E9C]/40 focus:outline-none focus:ring-2 focus:ring-[#E8322A]/40 focus:border-transparent resize-none text-sm leading-relaxed"
          required
        />
      </div>

      {/* Diagram input (Task 1 only) */}
      {task === "task1" && (
        <div>
          <label className="block text-sm font-semibold text-[#1F3E9C] mb-3">
            Provide the diagram for the Task 1 prompt
          </label>

          <div className="rounded-xl border border-[#1F3E9C]/20 p-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              className="block w-full text-sm text-[#1F3E9C]/60 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E8322A] file:text-white hover:file:bg-[#c9281f] cursor-pointer"
            />
            {diagramPreview && (
              <div className="mt-3 relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={diagramPreview}
                  alt="Diagram preview"
                  className="max-h-56 rounded-lg border border-[#1F3E9C]/20 object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#1F3E9C] text-white rounded-full text-xs flex items-center justify-center hover:bg-[#152c7a] transition-colors"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Response */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="response"
            className="block text-sm font-semibold text-[#1F3E9C]"
          >
            Your Written Response
          </label>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              wordCount === 0
                ? "bg-[#1F3E9C]/5 text-[#1F3E9C]/40"
                : underMinimum
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {wordCount} words
          </span>
        </div>
        <textarea
          id="response"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Paste your written response here..."
          rows={12}
          className="w-full rounded-xl border border-[#1F3E9C]/20 px-4 py-3 text-[#1F3E9C] placeholder-[#1F3E9C]/40 focus:outline-none focus:ring-2 focus:ring-[#E8322A]/40 focus:border-transparent resize-none text-sm leading-relaxed"
          required
        />

        {underMinimum && (
          <p className="mt-2 text-sm text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
            Your response is under the {task === "task1" ? "Task 1" : "Task 2"}{" "}
            minimum of {minWords} words. You can still submit, but you may be
            penalised for being under-length.
          </p>
        )}

        {wordCount >= minWords && (
          <p className="mt-2 text-sm text-green-600">
            Minimum word count met.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !question.trim() || !response.trim()}
        className="w-full py-3.5 bg-[#F5C000] hover:bg-[#dca900] text-[#1F3E9C] font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
      >
        {loading ? "Analysing..." : "Get Feedback"}
      </button>
    </form>
  );
}
