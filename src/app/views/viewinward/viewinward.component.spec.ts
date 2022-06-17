import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinwardComponent } from './viewinward.component';

describe('ViewinwardComponent', () => {
  let component: ViewinwardComponent;
  let fixture: ComponentFixture<ViewinwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
