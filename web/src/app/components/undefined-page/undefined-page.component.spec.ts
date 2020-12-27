import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndefinedPageComponent } from './undefined-page.component';

describe('UndefinedPageComponent', () => {
  let component: UndefinedPageComponent;
  let fixture: ComponentFixture<UndefinedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndefinedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndefinedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
