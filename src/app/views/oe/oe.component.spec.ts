import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OeComponent } from './oe.component';

describe('OeComponent', () => {
  let component: OeComponent;
  let fixture: ComponentFixture<OeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
