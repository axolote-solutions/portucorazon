import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanySurveyService {

  constructor(
    public httpClient: HttpClient
  ) { }


}
