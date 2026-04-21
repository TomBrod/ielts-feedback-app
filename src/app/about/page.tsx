export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section style={{ backgroundColor: "#1F3E9C" }} className="px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">About This Tool</h1>
          <p className="text-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
            AI-powered IELTS writing feedback, designed for serious learners
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* About the Tool */}
        <section className="rounded-2xl border p-8 space-y-4" style={{ borderColor: "rgba(31,62,156,0.15)" }}>
          <h2 className="text-2xl font-bold" style={{ color: "#1F3E9C" }}>About the Tool</h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(31,62,156,0.75)" }}>
            This tool uses advanced AI to analyse IELTS Academic Writing Task 1 and Task 2 responses
            against the four official IELTS marking criteria: <strong style={{ color: "#1F3E9C" }}>Task Achievement / Task Response</strong>,{" "}
            <strong style={{ color: "#1F3E9C" }}>Coherence &amp; Cohesion</strong>,{" "}
            <strong style={{ color: "#1F3E9C" }}>Lexical Resource</strong>, and{" "}
            <strong style={{ color: "#1F3E9C" }}>Grammatical Range &amp; Accuracy</strong>.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "rgba(31,62,156,0.75)" }}>
            For each submission you receive an estimated band score, detailed criterion-by-criterion
            feedback, and a model Band 8–9 answer for comparison — everything you need to understand
            exactly where you are and what to improve next.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "rgba(31,62,156,0.75)" }}>
            The tool is designed to help students practise more effectively between tutoring sessions,
            giving you examiner-quality insight on demand, any time you write.
          </p>
        </section>

        {/* About Brodie Academy */}
        <section className="rounded-2xl p-8 space-y-4" style={{ backgroundColor: "#1F3E9C" }}>
          <h2 className="text-2xl font-bold text-white">About Brodie Academy</h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Brodie Academy is a premier online learning institution specialising in academic English
            and English for exams. We help students from around the world achieve their language
            goals — whether that&apos;s passing IELTS, improving academic writing, or building
            confidence in English.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Our programmes combine expert human tutoring with innovative tools like this one,
            so that every student gets the support, structure, and feedback they need to succeed.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl p-8 space-y-4" style={{ backgroundColor: "#F5C000" }}>
          <div className="flex items-center gap-3 mb-1">
            <svg
              className="w-6 h-6 flex-shrink-0"
              style={{ color: "#1F3E9C" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold" style={{ color: "#1F3E9C" }}>Important Disclaimer</h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: "#1F3E9C" }}>
            This tool uses artificial intelligence to provide feedback and estimated band scores.
            While it is designed to reflect publicly available IELTS marking criteria, AI is not infallible
            and scores should be treated as a guide only. For official preparation, we always
            recommend working with a qualified IELTS examiner or tutor. Brodie Academy accepts no
            responsibility for any discrepancy between AI-generated scores and official IELTS results.
          </p>
        </section>
      </div>
    </main>
  );
}
