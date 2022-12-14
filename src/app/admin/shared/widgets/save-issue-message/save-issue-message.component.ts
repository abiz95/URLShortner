import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-issue-message',
  templateUrl: './save-issue-message.component.html',
  styleUrls: ['./save-issue-message.component.scss']
})
export class SaveIssueMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
