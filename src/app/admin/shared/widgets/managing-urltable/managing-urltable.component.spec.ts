import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingURLTableComponent } from './managing-urltable.component';

describe('ManagingURLTableComponent', () => {
  let component: ManagingURLTableComponent;
  let fixture: ComponentFixture<ManagingURLTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagingURLTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingURLTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
