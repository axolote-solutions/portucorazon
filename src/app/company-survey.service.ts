import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from './survey.model';

@Injectable({
  providedIn: 'root'
})
export class CompanySurveyService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getCompanySurvey(surveyConfigurationId :String, companySurveyId :String) {
    let url = "https://portucorazon-api-294002.uc.r.appspot.com/api/v1/survey/" + surveyConfigurationId + "/" + companySurveyId;
    //let url = "https://portucorazon-survey.uc.r.appspot.com/api/v1/survey/" + surveyConfigurationId + "/" + companySurveyId;

    return this.httpClient.get<Survey>(url);
  }


}
