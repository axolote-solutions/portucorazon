import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SurveyComponent } from './survey/survey.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanySurveyService } from './company-survey.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SurveyResponseComponent } from './survey-response/survey-response.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SurveyResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    MatStepperModule,
    MatTabsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    CompanySurveyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
