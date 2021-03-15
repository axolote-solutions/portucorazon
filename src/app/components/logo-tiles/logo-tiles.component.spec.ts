import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoTilesComponent } from './logo-tiles.component';

describe('LogoTilesComponent', () => {
  let component: LogoTilesComponent;
  let fixture: ComponentFixture<LogoTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
