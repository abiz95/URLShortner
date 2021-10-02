import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidationService } from 'src/app/access/service/customValidation/custom-validation.service';
import { UserInfoService } from 'src/app/admin/service/userInfo/user-info.service';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { LocalDataService } from 'src/app/services/localDataService/local-data.service';

@Component({
  selector: 'app-update-user-credential',
  templateUrl: './update-user-credential.component.html',
  styleUrls: ['./update-user-credential.component.scss']
})
export class UpdateUserCredentialComponent implements OnInit {

  updateUserDetails: any;
  userCredentialForm: any;
  errorInd: any = false;
  errorMessage: any;
  hide = true;
  c_hide = true;
  o_hide = true;
  userDetailsData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private userInfoService: UserInfoService,
    private customValidator: CustomValidationService,
    private adminAuthService: AuthSharedService,
    private localDataService: LocalDataService,
    private dialogRef: MatDialogRef<UpdateUserCredentialComponent>,
  ) { }

  ngOnInit(): void {

    this.userCredentialForm =this.formBuilder.group(
      {
        userId: [],
        currentPassword: ["", [Validators.required]],
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );

    this.preLoadValues();
  }

  preLoadValues() {
    this.userCredentialForm.patchValue({
      userId: this.data.userId
    })
  }

  get formValues() {
    return this.userCredentialForm.controls;
  }

  saveForm() {
    console.log("update user details");
    console.log("updated values: ", this.userCredentialForm.value)
    this.errorInd = false;
    if (this.userCredentialForm.valid) {

      console.log('user: ',this.userCredentialForm.get('userId').value)
      let updateUserData = {userId: this.userCredentialForm.get('userId').value, currentPassword: this.userCredentialForm.get('currentPassword').value, password: this.userCredentialForm.get('password').value}
      this.updateUserDetails = this.userInfoService.updateUserCredential(updateUserData).subscribe(
        (res)=>{

          if (res === "failed") {
            this.errorInd = true;
            this.errorMessage = "Updation failed!"
          }
          else{
            console.log("updated user credential details: "+res);
            this.getProfileInfoDataService();
            this.dialogRef.close(this.userCredentialForm.value);
          }
        },
        (err)=>{
          console.log(err.status+" error: ",err);
          if (err.status === 406) {
            this.errorInd = true;
            this.errorMessage = "Current password doesn't match!"
          }
          else {
            this.errorInd = true;
            this.errorMessage = "Oops something went wrong!!!"
          }
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
