import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPieChartComponent } from './daily-pie-chart.component';

describe('DailyPieChartComponent', () => {
  let component: DailyPieChartComponent;
  let fixture: ComponentFixture<DailyPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
