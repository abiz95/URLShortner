import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/admin/service/userInfo/user-info.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private userInfoService: UserInfoService,
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

}
