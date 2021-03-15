import { Section } from "./section.model";
import { Surveykey } from "./surveykey.model";

export interface Survey {
    id: Surveykey;
    companyId: number;
    companyName: string;
    surveyName: string;
    surveyTitle: string;
    active: boolean;
    description: string;
    surveyLogos: Array<string>;
    surveyColor: string;
    sections: Array<Section>
}

