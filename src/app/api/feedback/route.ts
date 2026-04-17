import Anthropic from "@anthropic-ai/sdk";
import type {
  ImageBlockParam,
  TextBlockParam,
} from "@anthropic-ai/sdk/resources/messages/messages";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TASK1_TA_DESCRIPTORS = `
Task Achievement (Task 1):
- Band 9: Fully satisfies all requirements. Clearly presents and highlights key features, and where relevant makes comparisons. Data is accurately described throughout.
- Band 7: Covers the requirements. Presents, highlights and illustrates key features clearly with relevant and accurate data. May have minor inaccuracies.
- Band 6: Addresses the requirements though coverage may be insufficient or too mechanical. Key features are presented but detail or accuracy may be lacking.
- Band 5: Recounts detail but fails to identify key features or make an overview. May misrepresent information.
- Band 3–4: Does not address the task adequately. Reproduces raw data without selectivity. Little or no attempt at overview.
`;

const TASK2_TR_DESCRIPTORS = `
Task Response (Task 2):
- Band 9: Fully addresses all parts of the task. Presents a fully developed position with relevant, extended and well-supported ideas.
- Band 7: Addresses all parts of the task. Presents a clear position throughout. Main ideas are extended and supported but there may be occasional over-generalisation.
- Band 6: Addresses all parts though some may be more fully covered. Presents a relevant position, though conclusions may be unclear. Main ideas are relevant but may lack development.
- Band 5: Addresses the task only partially. The format may be inappropriate. A position is presented but ideas may be irrelevant, repetitive or inadequately supported.
- Band 3–4: Does not adequately address the task. Limited and often irrelevant ideas. Little attempt to present a position.
`;

const CC_DESCRIPTORS_TASK1 = `
Coherence & Cohesion (Task 1):
- Band 9: Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.
- Band 7: Logically organises information with clear progression. Uses a range of cohesive devices appropriately. Presents a clear central topic within each paragraph.
- Band 6: Arranges information coherently with generally clear progression. Uses cohesive devices effectively but may be mechanical or with some inaccuracies. May not always use referencing clearly.
- Band 5: Presents information with some organisation but may lack overall progression. Makes inadequate or inaccurate use of cohesive devices. May be repetitive.
- Band 3–4: Does not organise ideas logically. Limited use of cohesive devices.

For Task 1, paragraphing is expected (e.g. a short overview paragraph + detail paragraphs) but the standard is less rigid than Task 2. Focus on logical grouping of information and cohesive flow rather than formal essay structure.
`;

const CC_DESCRIPTORS_TASK2 = `
Coherence & Cohesion (Task 2):
- Band 9: Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.
- Band 7: Logically organises information with clear progression. Uses a range of cohesive devices appropriately. Presents a clear central topic within each paragraph.
- Band 6: Arranges information coherently with generally clear progression. Uses cohesive devices effectively but may be mechanical or with some inaccuracies. May not always use referencing clearly.
- Band 5: Presents information with some organisation but may lack overall progression. Makes inadequate or inaccurate use of cohesive devices. May be repetitive.
- Band 3–4: Does not organise ideas logically. Limited use of cohesive devices.

For Task 2, explicitly evaluate: presence of a clear introduction, developed body paragraphs each with a distinct central argument, and a conclusion. Topic sentences, paragraph unity, and logical flow between paragraphs are all significant components of the CC band score.
`;

const LR_DESCRIPTORS = `
Lexical Resource (both tasks):
- Band 9: Uses a wide range of vocabulary with very natural and sophisticated control. Errors are rare and difficult to detect.
- Band 7: Uses a sufficient range of vocabulary to allow flexibility and precision. Uses less common lexical items with some awareness of style and collocation. May produce occasional errors in word choice, spelling and/or word formation.
- Band 6: Uses an adequate range of vocabulary for the task. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation but they do not impede communication.
- Band 5: Uses a limited range of vocabulary. Makes noticeable errors in spelling and/or word formation that may cause some difficulty for the reader.
- Band 3–4: Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task.
`;

const GRA_DESCRIPTORS = `
Grammatical Range & Accuracy (both tasks):
- Band 9: Uses a wide range of structures with full flexibility and accuracy. Errors are rare and difficult to detect.
- Band 7: Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.
- Band 6: Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.
- Band 5: Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple ones. May make frequent grammatical errors.
- Band 3–4: Uses only a very limited range of structures with only rare use of subordinate clauses. Errors are frequent and may impede meaning.
`;

function buildSystemPrompt(task: "task1" | "task2"): string {
  const taskLabel = task === "task1" ? "Task 1" : "Task 2";
  const firstCriterion =
    task === "task1" ? TASK1_TA_DESCRIPTORS : TASK2_TR_DESCRIPTORS;
  const ccDescriptors =
    task === "task1" ? CC_DESCRIPTORS_TASK1 : CC_DESCRIPTORS_TASK2;

  return `You are an expert IELTS examiner with years of experience marking Academic Writing ${taskLabel} scripts.
You will evaluate a student's IELTS ${taskLabel} writing response using the official IELTS public band descriptors provided below.

You are a fair and experienced IELTS examiner. Your scoring should reflect real-world IELTS marking standards where examiners are trained to award the band that best fits the overall performance — not to penalise every minor error. When a response demonstrates the majority of features of a band level, award that band. Do not be overly strict. In borderline cases always award the higher band.

For each of the four criteria, provide:
- A band score from 1–9
- A concise examiner-style justification (2–4 sentences)
- 2–3 specific, actionable suggestions for improvement

Then provide:
- An overall estimated band score (average of the four criteria, rounded to nearest 0.5)
- A model answer for the same question that demonstrates Band 8–9 level writing

Use the following band descriptors to guide your scoring:

${firstCriterion}
${ccDescriptors}
${LR_DESCRIPTORS}
${GRA_DESCRIPTORS}

Be honest, specific, and constructive. Mirror the tone and standards of a real IELTS examiner.

Important: A typical competent non-native English speaker writing a reasonable essay should score in the 5.5–6.5 range. A good essay with only minor errors should score 7–7.5. Reserve bands below 5 for responses with serious communication breakdown. Do not inflate scores, but do not penalise harshly for minor or occasional errors.

Return your response as a JSON object in this exact format (no markdown, no code fences, just raw JSON):
{
  "overallBand": number,
  "criteria": {
    "ta_tr": { "band": number, "explanation": string, "suggestions": [string, string, string] },
    "cc": { "band": number, "explanation": string, "suggestions": [string, string, string] },
    "lr": { "band": number, "explanation": string, "suggestions": [string, string, string] },
    "gra": { "band": number, "explanation": string, "suggestions": [string, string, string] }
  },
  "modelAnswer": string
}`;
}

export async function POST(req: NextRequest) {
  try {
    const {
      task,
      question,
      response: studentResponse,
      diagramImage,
    } = await req.json();

    if (!task || !question || !studentResponse) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(task);

    type SupportedMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

    let userContent: string | (ImageBlockParam | TextBlockParam)[];

    if (task === "task1" && diagramImage?.data) {
      userContent = [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: (diagramImage.mediaType as SupportedMediaType),
            data: diagramImage.data,
          },
        },
        {
          type: "text",
          text: `IELTS Question/Prompt:\n${question}\n\nStudent's Response:\n${studentResponse}`,
        },
      ];
    } else if (task === "task1") {
      userContent = `[No diagram provided]\n\nIELTS Question/Prompt:\n${question}\n\nStudent's Response:\n${studentResponse}`;
    } else {
      userContent = `IELTS Question/Prompt:\n${question}\n\nStudent's Response:\n${studentResponse}`;
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Strip markdown code fences if present
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const feedback = JSON.parse(cleaned);

    return NextResponse.json(feedback);
  } catch (err) {
    console.error("Feedback API error:", err);
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
