import { Question } from "./question.model";
import { WeighingMessages } from "./weighing-messages.model"

export interface Section {
    name: string;
    title: string;
    description: string;
    number: number;
    enabled: boolean;
    weighing: boolean;
    questions: Array<Question>
    weighingMessages: Array<WeighingMessages>
}
