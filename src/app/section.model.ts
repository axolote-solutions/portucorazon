import { from } from 'rxjs';
import { Question } from "./question.model";
import { WeighingMessages } from "./weighing-messages.model";
import { MultiDimensionWeighingMessages } from "./multi-dimension-weighing-messages.model";

export interface Section {
    name: string;
    title: string;
    description: string;
    number: number;
    enabled: boolean;
    weighing: boolean;
    weighingAverage: boolean;
    questions: Array<Question>
    weighingMessages: Array<WeighingMessages>
    multiDimensionWeighingMessages: Array<MultiDimensionWeighingMessages>
}
