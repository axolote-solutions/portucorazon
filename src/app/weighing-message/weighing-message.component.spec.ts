import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighingMessageComponent } from './weighing-message.component';

describe('WeighingMessageComponent', () => {
  let component: WeighingMessageComponent;
  let fixture: ComponentFixture<WeighingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeighingMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
