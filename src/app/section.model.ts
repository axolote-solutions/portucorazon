import { WeighingConfiguration } from "./model/weighing-configuration.model";
import { Question } from "./question.model";


export interface Section {
    name: string;
    title: string;
    enabled: boolean;
    number: number;
    headerInstructions: string;
    footerInstructions: string
    sectionColor: string;
    sectionLogos: Array<string>;
    questions: Array<Question>;
    weighingConfiguration: WeighingConfiguration;
    
}
