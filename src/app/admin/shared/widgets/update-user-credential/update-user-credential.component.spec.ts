import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserCredentialComponent } from './update-user-credential.component';

describe('UpdateUserCredentialComponent', () => {
  let component: UpdateUserCredentialComponent;
  let fixture: ComponentFixture<UpdateUserCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
