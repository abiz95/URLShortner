import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyHitTableComponent } from './monthly-hit-table.component';

describe('MonthlyHitTableComponent', () => {
  let component: MonthlyHitTableComponent;
  let fixture: ComponentFixture<MonthlyHitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyHitTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyHitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
