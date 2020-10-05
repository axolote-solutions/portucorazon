import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    let surveyConfigurationId = this.activatedRoute.snapshot.params.surveyConfigurationId;
    let companySurvey = this.activatedRoute.snapshot.params.companySurvey;

    this.getCompanySurvey(surveyConfigurationId, companySurvey);
  }

  getCompanySurvey(surveyConfigurationId :String, companySurvey :String) {
    let url = "https://portucorazon-survey.uc.r.appspot.com/api/v1/survey/" + surveyConfigurationId + "/" +companySurvey 

    return this.httpClient.get(url).subscribe(data => {
      console.log(data);
    })
    
  }



}
