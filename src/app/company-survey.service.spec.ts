import { TestBed } from '@angular/core/testing';

import { CompanySurveyService } from './company-survey.service';

describe('CompanySurveyService', () => {
  let service: CompanySurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
