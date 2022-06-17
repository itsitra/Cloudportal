import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkgComponent } from './ukg.component';

describe('UkgComponent', () => {
  let component: UkgComponent;
  let fixture: ComponentFixture<UkgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
