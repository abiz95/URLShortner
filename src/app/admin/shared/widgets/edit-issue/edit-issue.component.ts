import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportIssueService } from 'src/app/admin/service/reportIssue/report-issue.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.scss']
})
export class EditIssueComponent implements OnInit {

  updateUserDetails: any;
  userInfoForm: any;
  errorInd: any = false;
  errorMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private reportIssueService: ReportIssueService,
    private dialogRef: MatDialogRef<EditIssueComponent>,
  ) { }

  ngOnInit(): void {

    this.userInfoForm =this.formBuilder.group(
      {
        userId: [],
        issueTitle: ["", [Validators.required]],
        issueDescription: ["", [Validators.required]],
        issueId: []
      }
    );

    this.preLoadValues();
  }

  preLoadValues() {
    this.userInfoForm.patchValue({
      userId: this.data.userId,
      issueTitle: this.data.issueTitle,
      issueDescription: this.data.issueDescription,
      issueId: this.data.issueId
    })
  }

  get formValues() {
    return this.userInfoForm.controls;
  }

  saveForm() {
    console.log("update user details");
    console.log("updated values: ", this.userInfoForm.value)
    this.errorInd = false;
    if (this.userInfoForm.valid) {

      this.updateUserDetails = this.reportIssueService.updateIssueDetails(this.userInfoForm.value).subscribe(
        (res)=>{

          if (res === "failed") {
            this.errorInd = true;
            this.errorMessage = "Oops something went wrong!"
          }
          else{
            console.log("updated user details: "+res)
            this.dialogRef.close(this.userInfoForm.value);
          }
        },
        (err)=>{
          console.log("error: ",err);
          this.errorInd = true;
          this.errorMessage = "Oops something went wrong!!!"
        }
      );

    }
  }

}
