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

Calibration guidance: A balanced 'discuss both views' approach on a 'to what extent' question is perfectly acceptable and should not be penalised. If the candidate presents both sides clearly and reaches a reasoned conclusion, this satisfies the task requirements for Band 7+. Do not penalise candidates for not taking a strong one-sided position if the question allows for a balanced response.
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

Calibration guidance: Pay close attention to collocational accuracy and the precise use of less common lexical items. Phrases like 'pivotal role', 'foolproof method', 'anxiety-provoking', 'psychometric tests', 'comprehensive picture' demonstrate sophisticated lexical control and should be rewarded highly. Do not penalise for occasional repetition if the overall lexical range is wide and precise. A response demonstrating a wide range of precise, sophisticated vocabulary with accurate collocation should score 8–9 even if there are occasional less precise choices.
`;

const GRA_DESCRIPTORS = `
Grammatical Range & Accuracy (both tasks):
- Band 9: Uses a wide range of structures with full flexibility and accuracy. Errors are rare and difficult to detect.
- Band 7: Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.
- Band 6: Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.
- Band 5: Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple ones. May make frequent grammatical errors.
- Band 3–4: Uses only a very limited range of structures with only rare use of subordinate clauses. Errors are frequent and may impede meaning.
`;

const CALIBRATION_EXAMPLES = `
CALIBRATION EXAMPLES — use these to anchor your scoring:

Example 1 — Band 6/7 essay (TR:6, CC:7, LR:7, GRA:6)
Question: Some people believe that entertainers are paid too much and their impact on society is negative, while others disagree and believe that they deserve the money that they make because of their positive effects on society. Discuss both opinions and give your own opinion.
Essay: "The entertainment industry is one of the largest sectors in all around the world. Some think that the people who work in that industry earn too much money considering their bad influence on society, and I agree. Others, however, believe that their positive impact on others is worth the money that they are paid. On the one hand, there is no doubt that show business is an enormous and unfairly well paid sector. In addition to that, members of it do not add real value, compared to others like, for instance, education workers. Although in some countries teachers live with unreasonable wages, their responsibility, is extremely valuable for next generations become better people. Whereas a singer can earn double their yearly salary from one concert. The other important point is, for a balanced and equal society, the difference between income levels must not be very high. Regardless than their contribution, no one should make billions of dollars that easily, because that imbalance does have a significant negative impact on societies. On the other hand, some people think that entertainers' contribution to the modern life is worth the money they earn. It can be understood that for many people, watching a movie or going to a concert is irreplaceable with other activities; therefore, they think that their positive impact is crucial for a significant proportion of people. In addition to that, celebrities do compromise their privacy and freedom with being known by many others. In exchange of that, they do deserve a comfortable life with significantly better paychecks. In conclusion, despite their minimal contribution with their work to the people and sacrifice from their private life; I believe that their impact is far from being positive and they are not paid fairly or balanced with others."
Scores: TR:6, CC:7, LR:7, GRA:6
Reasoning:
- TR:6 — Covers both parts of the prompt. Position is clear but main ideas sometimes lack support and coverage is uneven.
- CC:7 — Information is logically organised with clear progression. More sophisticated cohesive devices are present e.g. "The other important point is..." showing referencing beyond basic connectives.
- LR:7 — Sufficient range for flexibility and precision. Includes less common items and accurate collocation e.g. "compromise their privacy and freedom", "minimal contribution". Some less precise choices e.g. "a balanced and equal society".
- GRA:6 — Mix of simple and complex sentences but errors appear in more complex structures.

Example 2 — Band 7/6 essay (TR:7, CC:7, LR:7, GRA:6)
Question: Young people are leaving their homes in rural areas to work or study in cities. What are the reasons? Do the advantages of this development outweigh the drawbacks?
Essay: "The comparison of standards of the cities and small town or villages has been always a debate. Recently, teenagers choose to live in the cities rather than their home villages because of school or job opportunities. This essay will discuss multiple reasons behind this trend and explain why the advantages of being in a city do indeed outweigh its drawbacks. There are several reasons to desire living in urban areas. Firstly, it gives people an opportunity to study in better schools which cannot be found in rural areas. Since in the modern world education means very much for people's future, it is crucial to have higher education degrees for those individuals to find well-paid jobs. In addition to that, city life provides people with completely different experiences than their home villages. Thanks to the schools, work or social gathering places, they get to meet a greater number of people from all around the country compared to their rural towns which is crucial for one's personal development. Lastly, in the cities, not only they get bigger number of job options, but also they can earn larger amount of money. It is very well know that job market is significantly limited in the villages also the current jobs barely pay enough. It is clearly seen that benefits of leaving villages outweigh its few number of deficits. It is worth to mention that people face some issues, such as being away from their extended family, more competitive and challenging job market, and substantially more expensive living cost, when they move to the cities. Advantages like learning and exploring new experiences, getting a better education leading to a better paid job and having an interesting career, however, surpass the number of the drawbacks of this development. To conclude, there are various reasons for young generation to leave their homes to live in the cities and this movement's benefits easily outweigh its disadvantages."
Scores: TR:7, CC:7, LR:7, GRA:6
Reasoning:
- TR:7 — Addresses all parts of the prompt clearly. Position is maintained throughout. Main ideas are relevant and developed.
- CC:7 — Clear progression throughout. Good use of cohesive devices and paragraphing.
- LR:7 — Good collocations e.g. "competitive and challenging job market", "crucial for one's personal development". Some inappropriacies e.g. "few number of deficits".
- GRA:6 — Some complex structures used but errors are present. Mix of simple and complex sentences.

Example 3 — Band 8 essay (TR:8, CC:8, LR:8, GRA:8)
Question: Some people believe that it is the responsibility of individuals to take care of their own health and diet. Others however believe that governments should make sure that their citizens have a healthy diet. Discuss both views and give your opinion.
Essay: "Nowadays an increasing number of people are becoming concerned about their health and the quality of their diet. There are two diametrically opposed opinions on the matter. Some people believe that each and every individual is responsible for their own health while others state that it is the government that must ensure that the citizens have healthy eating habits. Personally, I believe that people bear full responsibility for their diets for a number of reasons. First, nowadays there is a vast variety of products that everyone can choose from, ensuring a balanced diet consisting of different types of products with sufficient vitamins, proteins, carbohydrates and fats. Everyone can balance their diets according to these factors and also based on their taste preferences. For example vegetarians will prefer beans rich in protein while omnivorous eaters might opt for meat instead. Secondly, while governments cannot considerably vary in their healthy eating programs usually adhering to 'one size fits all' approach, individuals know exactly what they need in order to keep fit and healthy both generally speaking and in terms of food. We take tailored approach as we know exactly what we need to succeed in life, be strong and healthy. However, others argue that the government is fully responsible for the kind of food its population consume because they make decisions regarding the quality of food their country produce and import as well as prices. For instance, in many developing countries people rarely have access to high quality food, thus being forced to choose something cheap like fast food. Moreover, the government can introduce legislation as regards to what kind of food can be promoted, seen for example in many European countries where the advertising of fast food, alcohol and cigarettes is prohibited. These measure, it is argued, can affect the way we eat and control the diets of the whole population. In conclusion, while the governments may play a role in the choice of food of its citizens, it is still the responsibility of every individual whether to eat healthy diet or not due to many reasons being that a variety of methods to balance their diets or their finances. After all our life is in our hands!"
Scores: TR:8, CC:8, LR:8, GRA:8
Reasoning:
- TR:8 — Fully addresses all parts of the task. Clear and well-developed position. Ideas are well-supported and extended throughout.
- CC:8 — Skilfully manages paragraphing. Cohesion is smooth and does not draw attention to itself. Clear progression throughout.
- LR:8 — Wide range of vocabulary used with flexibility and precision. Strong collocations e.g. "diametrically opposed", "omnivorous eaters", "one size fits all approach", "vast variety". Minor imprecisions do not detract from overall quality.
- GRA:8 — Wide range of complex structures used accurately. Error-free sentences are frequent. No systematic errors present. Note: systematic errors such as repeated subject-verb agreement mistakes or consistent article errors would cap GRA at Band 7 regardless of range.

Example 4 — Band 5/6 essay (TR:5, CC:6, LR:6, GRA:5)
Question: Some of the methods used in advertising are unethical and unacceptable in today's society. To what extent do you agree with this view?
Essay: "Nowadays in worldwide nations, every moment, we are displayed advertisements on TV shows, magazines or huge LED boards situated on intersections. In what methods they are produced or how much producers care about ethical trend to making them? I believe they intent to have more watcher to earn more money regardless to its consequences. In first point of view, some families my does not need something that is displaying on tv, but as home wife see the advertisement will feel that is a good idea to have it and decide to buy it immediately. In another case, there is families who have young offspring who mentally is not wise enough to perceive everything in family situation. Therefore, they will have high demand while they are watching a new toy advertisement. Begging his parent to purchase it and crying all time. As a result his poor father will be finally obliged to buy the toy. In second point, they may use psychological weaknesses; for example, by displaying a young lady with fitness body who is using some stuff on show to attract people for the good. It may apparently not so bad, but if we go deep in down will understand that how it may have an effect of youth brain and corrupt it. Or by using a charming sentences on cigarette box 'the ideal of a manhood' as a person see this advertisement on the box, will feel himself on his dreams and will buy it. In conclusion, the advertisement makers, regardless to the bad effects the advertise may cause on people, will made them due to make their customers satisfying. But it may have bad consequences on society which due to avoiding this trend i suggest authorities make some plans for the circumstance to check and control advertisements before showing up."
Scores: TR:5, CC:6, LR:6, GRA:5
Reasoning:
- TR:5 — Addresses the task only partially. A position is present but ideas are sometimes irrelevant or inadequately supported. Format is not always appropriate.
- CC:6 — Sufficient cohesive devices are present and paragraphing is just adequate. Organisation is clear enough but progression is sometimes mechanical.
- LR:6 — Some risk-taking with less common vocabulary. Attempts at less common items are present but with some inaccuracy. Communication is not impeded.
- GRA:5 — Limited range of structures. Errors are frequent in complex sentences and sometimes impede meaning.

Example 5 — Band 4/5 essay (TR:4, CC:4, LR:5, GRA:5)
Question: A growing number of people feel that animals should not be exploited by people and that they should have the same rights as humans, while others argue that humans must employ animals to satisfy their various needs, including uses for food and research. Discuss both views and give your opinion.
Essay: "In this century, there are a countless number of people that are showing interest in what concerne animals rights, therefore it is becoming an actual and argued topic. People are starting to look disapprovingly all situations and events with animal exploitation. Infact, circus for example, has lost its popularity and the audience prefer human performances. Moreover, animal rights have become part of the law and animal's abuse is punished with fees and occasionally with prison. Further more, also the animal breeding has been observed and people are realizing that the killing and the slaughter of animals is cruelly done. It is important to realize that people of new generations are developing a new sensibility concerning this issue, but currently it is emerging a new exstremist thought. Despite the huge number of vegeterian people (which the majority of them are following a new fashion), there are also people with distorted views. The area that worry me most regards the animal research which allows considerable and important improvements in the medical research, therefore in human walfare. The animalist group are spreading wrong information, directly demaging the research sector. As an illustration, few months ago an animalist group destroyed years and years of neurological research freeing rats used in a laboratory, because they would have been cruelly treated. Unfortunately this animalists did not know that for each treatment was used anesthesia. Given these points, I defend animal rights and I do not support any form of animal exploitation, nevertheless I do not support any exetremist thought especially concerning medical research."
Scores: TR:4, CC:4, LR:5, GRA:5
Reasoning:
- TR:4 — Does not adequately address both views. The task asks to discuss both views but the response is largely one-sided and lacks clear development of the opposing view. Limited and sometimes irrelevant ideas.
- CC:4 — Does not organise ideas logically. Paragraphing is poor with ideas scattered across the response without clear structure. Limited use of cohesive devices.
- LR:5 — Limited range of vocabulary but some attempts at less common items are visible e.g. "exploitation", "sensibility", "neurological research". Errors in spelling and word form are present but do not completely impede communication.
- GRA:5 — Attempts at subordination and complex structures are visible even though errors are frequent. Limited range overall.

These examples should be used to anchor your scoring. When assessing a new essay, compare it against these benchmarks before assigning band scores. The five examples together cover the full range from Band 4 to Band 8 and should be used collectively when calibrating scores.
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
${CALIBRATION_EXAMPLES}
Be honest, specific, and constructive. Mirror the tone and standards of a real IELTS examiner.

Important: A typical competent non-native English speaker writing a reasonable essay should score in the 5.5–6.5 range. A good essay with only minor errors should score 7–7.5. Reserve bands below 5 for responses with serious communication breakdown. Do not inflate scores, but do not penalise harshly for minor or occasional errors.

Overall calibration: A well-structured essay with sophisticated vocabulary, clear paragraphing, a range of complex grammatical structures, and a reasoned conclusion should score in the 7–8 range overall. Do not default to Band 6 for competent writing — reserve Band 6 for responses with noticeable limitations in range or accuracy.

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
