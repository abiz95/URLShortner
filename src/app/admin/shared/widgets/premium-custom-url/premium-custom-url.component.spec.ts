import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCustomUrlComponent } from './premium-custom-url.component';

describe('PremiumCustomUrlComponent', () => {
  let component: PremiumCustomUrlComponent;
  let fixture: ComponentFixture<PremiumCustomUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumCustomUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCustomUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
