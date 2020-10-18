import { QuestionOptions } from "./question-options.model";
import { ChildQuestion } from "./child-question.model";

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
}
