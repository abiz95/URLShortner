import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/admin/service/userInfo/user-info.service';
import { userPlan } from 'src/app/app.constants';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { LocalDataService } from 'src/app/services/localDataService/local-data.service';

@Component({
  selector: 'app-update-user-subscription',
  templateUrl: './update-user-subscription.component.html',
  styleUrls: ['./update-user-subscription.component.scss']
})
export class UpdateUserSubscriptionComponent implements OnInit {

  updateSubscriptionDetails: any;
  userSubscriptionForm: any;
  errorInd: any = false;
  errorMessage: any;
  planDetails: any = userPlan.plan;
  userDetailsData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private userInfoService: UserInfoService,
    private adminAuthService: AuthSharedService,
    private localDataService: LocalDataService,
    private dialogRef: MatDialogRef<UpdateUserSubscriptionComponent>,
  ) { }

  ngOnInit(): void {

    this.userSubscriptionForm =this.formBuilder.group(
      {
        userId: [],
        plan: ["", [Validators.required]],
        planStatus: ["", [Validators.required]]
      }
    );

    this.preLoadValues();
  }

  preLoadValues() {
    this.userSubscriptionForm.patchValue({
      userId: this.data.userId,
      plan: this.data.plan,
      planStatus: this.data.planStatus
    })
  }

  get formValues() {
    return this.userSubscriptionForm.controls;
  }

  saveForm() {
    console.log("update user Subscription details");
    console.log("updated values: ", this.userSubscriptionForm.value)
    this.errorInd = false;
    if (this.userSubscriptionForm.valid) {

      this.updateSubscriptionDetails = this.userInfoService.updateUserSubscription(this.userSubscriptionForm.value).subscribe(
        (res)=>{

          if (res === "failed") {
            this.errorInd = true;
            this.errorMessage = "Oops something went wrong!"
          }
          else{
            console.log("updated user Subscription details: "+res)
            this.dialogRef.close(this.userSubscriptionForm.value);
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

  getProfileInfoDataService() {
    this.userDetailsData = this.userInfoService.getUserInfo(this.adminAuthService.getSessionUserId()).subscribe(
      (res) => {
        console.log("getProfileInfoDataService: " + JSON.stringify(res));
        let userInfo: any = res;
        this.localDataService.setProfileInfo(userInfo);
      }
    );
  }

  ngOnDestroy(): void {

    if (this.userDetailsData) {
      // console.log("unsubscribe")
      this.userDetailsData.unsubscribe();
    }
  }

}
