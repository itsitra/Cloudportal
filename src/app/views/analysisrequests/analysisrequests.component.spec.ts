import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisrequestsComponent } from './analysisrequests.component';

describe('AnalysisrequestsComponent', () => {
  let component: AnalysisrequestsComponent;
  let fixture: ComponentFixture<AnalysisrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
