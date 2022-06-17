import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkgmillComponent } from './ukgmill.component';

describe('UkgmillComponent', () => {
  let component: UkgmillComponent;
  let fixture: ComponentFixture<UkgmillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkgmillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkgmillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
