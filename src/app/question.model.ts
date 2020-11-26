import { QuestionOptions } from "./question-options.model";
import { ChildQuestion } from "./child-question.model";
import { OpenQuestionConfig } from "./open-question-config"

export interface Question {
    questionNumber: number;
    questionText: string;
    mandatory: boolean;
    questionType: string;
    options: Array<QuestionOptions>;
    responseDataType: string;
    parent: boolean;
    childQuestion: Array<ChildQuestion>;
    display: boolean;
    dimension: number;
    openQuestionConfig: OpenQuestionConfig;
}
