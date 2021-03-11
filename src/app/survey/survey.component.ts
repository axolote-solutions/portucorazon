import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanySurveyService } from '../company-survey.service';
import { Survey } from '../survey.model';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  survey: Survey;

  respond = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companySurveyService: CompanySurveyService
  ) { }

  ngOnInit(): void {
    let surveyConfigurationId = this.activatedRoute.snapshot.params.surveyConfigurationId;
    let companySurveyId = this.activatedRoute.snapshot.params.companySurveyId;

    this.companySurveyService.getCompanySurvey(surveyConfigurationId, companySurveyId).subscribe(
      data=> {
        this.survey = data;
        console.log("aqui estoy");
      }, error => {
        console.log(error);
      }
    )
  }

  answer(): void {
    this.respond = !this.respond;


  }

}
