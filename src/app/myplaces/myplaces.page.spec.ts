import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyplacesPage } from './myplaces.page';

describe('MyplacesPage', () => {
  let component: MyplacesPage;
  let fixture: ComponentFixture<MyplacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyplacesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyplacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
