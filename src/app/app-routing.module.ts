import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { ThanksComponent } from './thanks/thanks.component';

const routes: Routes = [
  { path: 'survey/:surveyConfigurationId/:companySurveyId', component: SurveyComponent},
  { path: 'thanks', component: ThanksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
