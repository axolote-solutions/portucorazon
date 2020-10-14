import { QuestionOptions } from "./question-options.model";

export interface Question {
    questionNumber: number;
    questionText: string;
    mandatory: boolean;
    questionType: string;
    options: Array<QuestionOptions>;
    responseDataType: string;
}
