import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminAuthService } from 'src/app/admin/service/adminAuth/admin-auth.service';
import { ReportIssueService } from 'src/app/admin/service/reportIssue/report-issue.service';
import { SaveIssueMessageComponent } from '../save-issue-message/save-issue-message.component';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  // userId: string;
  issueListData: any;
  updateUserDetails: any;
  userInfoForm: any;
  errorInd: any = false;
  errorMessage: any;

  constructor(private formBuilder: FormBuilder, private adminAuthService: AdminAuthService, private reportIssueService: ReportIssueService, private matDialog: MatDialog) { }

  ngOnInit(): void {

    // this.userId = this.adminAuthService.getSessionUserId();

    this.userInfoForm =this.formBuilder.group(
      {
        userId: [this.adminAuthService.getSessionUserId()],
        issueTitle: ["", [Validators.required]],
        issueDescription: ["", [Validators.required]]
      }
    );
  }

  get formValues() {
    return this.userInfoForm.controls;
  }

  getIssueListData() {
    this.issueListData = this.reportIssueService.getIssueList(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("getIssueListData: "+res);
      }
    );
  }

  saveForm() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = shortenUrl;
    // dialogConfig.width="500px";
    // dialogConfig.height="400px";

    let urlRef = this.matDialog.open(SaveIssueMessageComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {

        console.log("update user details: ",data);
        console.log("updated values: ", this.userInfoForm.value)
        this.errorInd = false;
        if (this.userInfoForm.valid) {
    
          this.updateUserDetails = this.reportIssueService.saveIssueDetails(this.userInfoForm.value).subscribe(
            (res)=>{
    
              if (res === "failed") {
                this.errorInd = true;
                this.errorMessage = "Oops something went wrong!"
              }
              else{
                console.log("updated user details: "+res);
                window.location.reload();
                // this.getIssueListData();
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
    );

  }

}
