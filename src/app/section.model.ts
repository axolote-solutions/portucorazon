import { Question } from "./question.model";

export interface Section {
    name: string;
    title: string;
    description: string;
    number: number;
    enabled: boolean;
    weighing: boolean;
    questions: Array<Question>
}
