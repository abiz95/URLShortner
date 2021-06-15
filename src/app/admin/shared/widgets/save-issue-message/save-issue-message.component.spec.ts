import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveIssueMessageComponent } from './save-issue-message.component';

describe('SaveIssueMessageComponent', () => {
  let component: SaveIssueMessageComponent;
  let fixture: ComponentFixture<SaveIssueMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveIssueMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveIssueMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
