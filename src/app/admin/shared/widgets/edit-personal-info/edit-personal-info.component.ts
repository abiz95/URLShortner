import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoService } from 'src/app/admin/service/userInfo/user-info.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.scss']
})
export class EditPersonalInfoComponent implements OnInit {

  updateUserDetails: any;
  userInfoForm: any;
  errorInd: any = false;
  errorMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private userInfoService: UserInfoService,
    private dialogRef: MatDialogRef<EditPersonalInfoComponent>,
  ) { }

  ngOnInit(): void {

    this.userInfoForm =this.formBuilder.group(
      {
        userId: [],
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        country: ["", [Validators.required]],
        phoneNumber: ["", [Validators.required]]
      }
    );

    this.preLoadValues();
  }

  preLoadValues() {
    this.userInfoForm.patchValue({
      userId: this.data.userId,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      country: this.data.country,
      phoneNumber: this.data.phoneNumber
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

      this.updateUserDetails = this.userInfoService.updateUserInfo(this.userInfoForm.value).subscribe(
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
