import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxWrapperComponent } from './checkbox-wrapper.component';

describe('CheckboxWrapperComponent', () => {
  let component: CheckboxWrapperComponent;
  let fixture: ComponentFixture<CheckboxWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
