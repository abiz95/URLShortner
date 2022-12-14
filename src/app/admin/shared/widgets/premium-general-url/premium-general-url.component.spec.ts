import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumGeneralUrlComponent } from './premium-general-url.component';

describe('PremiumGeneralUrlComponent', () => {
  let component: PremiumGeneralUrlComponent;
  let fixture: ComponentFixture<PremiumGeneralUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumGeneralUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumGeneralUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
