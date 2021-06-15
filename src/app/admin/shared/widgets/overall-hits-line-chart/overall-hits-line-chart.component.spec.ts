import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallHitsLineChartComponent } from './overall-hits-line-chart.component';

describe('OverallHitsLineChartComponent', () => {
  let component: OverallHitsLineChartComponent;
  let fixture: ComponentFixture<OverallHitsLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallHitsLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallHitsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
