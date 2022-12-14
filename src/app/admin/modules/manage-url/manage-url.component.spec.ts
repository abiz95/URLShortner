import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUrlComponent } from './manage-url.component';

describe('ManageUrlComponent', () => {
  let component: ManageUrlComponent;
  let fixture: ComponentFixture<ManageUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
