export interface CriterionFeedback {
  band: number;
  explanation: string;
  suggestions: string[];
}

export interface FeedbackResult {
  overallBand: number;
  criteria: {
    ta_tr: CriterionFeedback;
    cc: CriterionFeedback;
    lr: CriterionFeedback;
    gra: CriterionFeedback;
  };
  modelAnswer: string;
}
