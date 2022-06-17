import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestanalysisComponent } from './requestanalysis.component';

describe('RequestanalysisComponent', () => {
  let component: RequestanalysisComponent;
  let fixture: ComponentFixture<RequestanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
