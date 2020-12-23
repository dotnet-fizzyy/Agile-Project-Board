import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPromptComponent } from './start-prompt.component';

describe('StartPromptComponent', () => {
  let component: StartPromptComponent;
  let fixture: ComponentFixture<StartPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
