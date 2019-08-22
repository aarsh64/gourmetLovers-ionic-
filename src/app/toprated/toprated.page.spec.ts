import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopratedPage } from './toprated.page';

describe('TopratedPage', () => {
  let component: TopratedPage;
  let fixture: ComponentFixture<TopratedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopratedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopratedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
