import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestrateComponent } from './testrate.component';

describe('TestrateComponent', () => {
  let component: TestrateComponent;
  let fixture: ComponentFixture<TestrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
