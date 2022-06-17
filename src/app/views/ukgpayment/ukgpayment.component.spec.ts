import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkgpaymentComponent } from './ukgpayment.component';

describe('UkgpaymentComponent', () => {
  let component: UkgpaymentComponent;
  let fixture: ComponentFixture<UkgpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkgpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkgpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
