import { Section } from "./section.model";
import { Surveykey } from "./surveykey.model";

export interface Survey {
    id: Surveykey;
    companyId: number;
    companyName: string;
    surveyDescription: string;
    surveyConfigurationId: number;
    surveyId: number;
    surveyName: string;
    sections: Array<Section>
}

