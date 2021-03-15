import { WeighingMessages } from "../weighing-messages.model";
import { MultiDimensionWeighingMessages } from "../multi-dimension-weighing-messages.model";

export interface WeighingConfiguration {

    weighing: boolean;
    weighingAverage: boolean;
    weighingMessages: Array<WeighingMessages>
    multiDimensionWeighingMessages: Array<MultiDimensionWeighingMessages>
}
