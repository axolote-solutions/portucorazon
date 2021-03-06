import { Component, OnInit, Input } from '@angular/core';
import { Survey } from '../survey.model'
import { FormGroup, Validators, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WeighingMessageComponent } from '../weighing-message/weighing-message.component';
import { Section } from '../section.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss']
})
export class SurveyResponseComponent implements OnInit {

  @Input() survey: Survey;
  surveyForm: FormGroup;
  surveyConfigurationId = "";
  companySurveyId = "";
  //console = console;
  submitted = false;
  sectionChanged = false;

  constructor(
    private fb: FormBuilder,
    public httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog) {

    this.surveyForm = this.fb.group({
      surveyName: null,
      sectionsResponses: this.fb.array([]),
    })
  }

  ngOnInit(): void {

    this.surveyConfigurationId = this.activatedRoute.snapshot.params.surveyConfigurationId;
    this.companySurveyId = this.activatedRoute.snapshot.params.companySurveyId;

    this.surveyForm.get("surveyName").setValue(this.survey.surveyName);

    let i = 0;
    for (let section of this.survey.sections) {
      this.addSection(section.name);
      if (section.enabled) {
        for (let question of section.questions) {
          if (question.display === undefined) {
            question.display = true;
          }

          this.addResponse(i, question);
        }
      }

      if(section.footerInstructions) {
        section.footerInstructions = this.replaceMarkText(section.footerInstructions);
      }
      if(section.headerInstructions) {
        section.headerInstructions = this.replaceMarkText(section.headerInstructions);
      }
      i++;
    }
  }

  newSectionResponse(name: string): FormGroup {
    return this.fb.group({
      sectionWeighing: 0,
      sectionName: name,
      questionResponses: this.fb.array([])
    })
  }

  addSection(name: string) {
    this.sectionsResponses().push(this.newSectionResponse(name));
  }

  sectionsResponses(): FormArray {
    return this.surveyForm.get("sectionsResponses") as FormArray
  }

  questionResponses(sectionIndex: number): FormArray {
    return this.sectionsResponses().at(sectionIndex).get("questionResponses") as FormArray
  }


  newQuestionResponse(question: Question, sectionIndex: number): FormGroup {

    if (question.parent) {
      for (let child of question.childQuestion) {
        let q = child.questionNumber - 1;
        this.survey.sections[sectionIndex].questions[q].display = false;
        this.survey.sections[sectionIndex].questions[q].mandatory = false;
      }

    }

    let group = this.fb.group({});

    const questionText = new FormControl(question.questionText);
    group.addControl('questionText', questionText);
    const questionNumber = new FormControl(question.questionNumber);
    group.addControl('questionNumber', questionNumber)

    if (question.questionType === 'OPEN') {

      let responseText: FormControl;
      switch (question.responseDataType) {
        case 'INTEGER':
          let validatorIntegerList: ValidatorFn[] = this.prepareValidators(question);
          
          responseText = new FormControl('', validatorIntegerList);
          group.addControl('responseText', responseText);
          break;
        case 'EMAIL': //responseText = new FormControl('', [Validators.required, Validators.email]);
          if (question.mandatory) {
            responseText = new FormControl('', [Validators.required, Validators.email]);
          } else {
            responseText = new FormControl('', Validators.email);
          }
          group.addControl('responseText', responseText);
          break;
          
        case 'FLOAT':
          let validatorFloatList: ValidatorFn[] = this.prepareValidators(question);
          
          responseText = new FormControl('', validatorFloatList);
          
          group.addControl('responseText', responseText);
          break;

        default: //responseText = new FormControl('', [Validators.required, Validators.email]);
          if (question.mandatory) {
            responseText = new FormControl('', Validators.required);
          } else {
            responseText = new FormControl();
          }
          group.addControl('responseText', responseText);
          break;
      }

    } else {
      let responseOption: FormControl;
      
      if (question.mandatory) {
        responseOption = new FormControl('', Validators.required);
      } else {
        responseOption = new FormControl();
      }
      group.addControl('responseOption', responseOption);
    }

    return group;
  }

  private prepareValidators(question: Question) {
    let validatorList: ValidatorFn[] = [];
    if (question.mandatory) {
      validatorList.push(Validators.required);
    }
    if (question.responseDataType==='INTEGER')
    {
      validatorList.push(Validators.pattern("^[0-9]*$"));
    }
    if (question.responseDataType === 'FLOAT') {
      validatorList.push(Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"));
    }
    if (question.openQuestionConfig) {
      if (question.openQuestionConfig.minValue) {
        validatorList.push(Validators.min(question.openQuestionConfig.minValue));
      }
      if (question.openQuestionConfig.maxValue) {
        validatorList.push(Validators.max(question.openQuestionConfig.maxValue));
      }
      if (question.openQuestionConfig.maxLength) {
        validatorList.push(Validators.maxLength(question.openQuestionConfig.maxLength));
      }
    }
    
    return validatorList;
  }

  addResponse(sectionIndex: number, question: Question) {
    this.questionResponses(sectionIndex).push(this.newQuestionResponse(question, sectionIndex));
  }

  onSubmit() {
    if (this.sectionChanged) {
      this.submitted = false;
      this.sectionChanged = false;
    } else {
      this.submitted = true;
    }
  }


  selectionChange(event: any): void {
    this.sectionChanged = true;
    document.documentElement.scrollTop = 0;
    
    let selectedIndex = event.previouslySelectedIndex;

    let filledSection = this.survey.sections[selectedIndex];

    if (filledSection.weighingConfiguration) {
      let responsesValues = this.questionResponses(selectedIndex).value;

      let sumDimensions: number[] = [0, 0, 0, 0, 0];
      let countDimensions: number[] = [0, 0, 0, 0, 0];

      let totalPoints: number = 0;
      let index = 1;

      for (let responseValue of responsesValues) {
        if(!responseValue.responseOption) {
          continue;
        }
        let questionPoints = responseValue.responseOption.value;

        if (filledSection.weighingConfiguration.multiDimensionWeighingMessages) {
          let questionDimension = filledSection.questions[index - 1].dimension;
          
          sumDimensions[questionDimension - 1] = sumDimensions[questionDimension - 1] + questionPoints;
          countDimensions[questionDimension - 1] = countDimensions[questionDimension - 1] + 1;
        }

        totalPoints += questionPoints;
        index++;
      }

      if (filledSection.weighingConfiguration.weighingAverage) {
        totalPoints = totalPoints / index;

        for (let i = 0; i < sumDimensions.length; i++) {
          sumDimensions[i] = sumDimensions[i] / countDimensions[i];
        }
      }

      this.sectionsResponses().at(selectedIndex).get("sectionWeighing").setValue(totalPoints);

      let allText: string[] = [];

      var showMessage = false;

      for (let weigh of filledSection.weighingConfiguration.weighingMessages) {
        if (totalPoints < weigh.limit) {

          allText.push(this.replaceMarkText(weigh.text));
          showMessage = true;
          break;
        }
      }

      if (filledSection.weighingConfiguration.multiDimensionWeighingMessages) {
        for (var weighDimension of filledSection.weighingConfiguration.multiDimensionWeighingMessages) {
          for (let i = 0; i < sumDimensions.length; i++) {
            let sum = sumDimensions[i];

            if (weighDimension.dimension === i + 1 && sum < weighDimension.limit) {
              allText.push(this.replaceMarkText(weighDimension.text));
              showMessage = true;
              break;
            }
          }
        }
      }

      if (showMessage) {
        document.documentElement.scrollTop = 0;
        this.openDialog(allText, filledSection.title);
      }

    }
  }

  openDialog(text: string[], head: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = {
      text: text,
      header: head
    }

    this.dialog.open(WeighingMessageComponent, dialogConfig);
  }

  saveSurvey() {
    let responses = JSON.stringify(this.surveyForm.value);

    let url = "https://portusalud-api.uc.r.appspot.com/api/v2/survey/response/" + this.surveyConfigurationId;
    //let url = "http://localhost:8080/api/v2/survey/response/" + this.surveyConfigurationId;
    //let url = "https://portucorazon-survey.uc.r.appspot.com/api/v2/survey/response/" + this.surveyConfigurationId;
    


    const headers = { 'Content-Type': 'application/json' };

    this.httpClient.post(url, responses, { 'headers': headers }).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.log(error);
        
        location.reload();

      }
    )
  }

  radioChange(event: any, section: number, question: number) {
    if (this.survey.sections[section].questions[question].parent) {
      for (let childQuestion of this.survey.sections[section].questions[question].childQuestion) {
        if (event.value.value === childQuestion.responseValue) {
          let i = childQuestion.questionNumber - 1;
          this.survey.sections[section].questions[i].display = true;
        } else {
          let i = childQuestion.questionNumber - 1;
          this.survey.sections[section].questions[i].display = false;
        }
      }
    }
  }

  private calculateWeigh(filledSection: Section, sectionIndex: number) {
    console.log("calculateWeigh");


  }

  replaceMarkText(text: string ): string {
    
    if(text) {
      text = text.replace(/%%/g, '<br>');
      text = text.replace(/##/g, '<b>');
      text = text.replace(/#-#/g, '</b>');
    }

    return text;
  }


}
