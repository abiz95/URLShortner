import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportIssueService } from 'src/app/admin/service/reportIssue/report-issue.service';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { LocalDataService } from 'src/app/services/localDataService/local-data.service';

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
  issueListData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private reportIssueService: ReportIssueService,
    private adminAuthService: AuthSharedService,
    private localDataService: LocalDataService,

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
            this.updateIssueListDataService();
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

  updateIssueListDataService() {
    this.issueListData = this.reportIssueService.getIssueList(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        // console.log("updateIssueListDataService: "+res);
        let issueList: any = res;
        this.localDataService.setIssueListData(issueList);
      }
    );
  }

  ngOnDestroy(): void {
  
    if (this.updateUserDetails) {
      console.log("unsubscribe")
        this.updateUserDetails.unsubscribe();
    }

    if (this.issueListData) {
      console.log("unsubscribe")
        this.issueListData.unsubscribe();
    }

  }

}
