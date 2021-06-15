import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeUrlComponent } from './customize-url.component';

describe('CustomizeUrlComponent', () => {
  let component: CustomizeUrlComponent;
  let fixture: ComponentFixture<CustomizeUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
