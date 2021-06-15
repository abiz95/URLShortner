import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PremiumUrlService } from 'src/app/admin/service/premiumUrl/premium-url.service';

@Component({
  selector: 'app-edit-url',
  templateUrl: './edit-url.component.html',
  styleUrls: ['./edit-url.component.scss']
})
export class EditUrlComponent implements OnInit {

  editForm: any;
  updateCustomUrlDetails: any;
  errorInd: any = false;
  errorMessage: string;
  custom_readonly: any = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private premiumUrlService: PremiumUrlService,
    private dialogRef: MatDialogRef<EditUrlComponent>,
    ) { }

  ngOnInit(): void {
    this.editForm =this.formBuilder.group(
      {
        actualUrl: ["", [Validators.required]],
        shortenUrl: ["", [Validators.required]],
        premiumUrlIdRec: [],
        urlStatus: [],
        cre_rec_ts: []
      }
    );
    this.preLoadValues();

    if (this.data.customStatus === 0) {
      this.custom_readonly = true;
    }
    else {
      this.custom_readonly = false;
    }
  }

  preLoadValues() {
    this.editForm.patchValue({
      actualUrl: this.data.actualUrl,
      shortenUrl: this.data.shortenUrl,
      premiumUrlIdRec: this.data.premiumUrlIdRec,
      urlStatus: this.data.urlStatus,
      cre_rec_ts: this.data.cre_rec_ts
    })
  }

  get formValues() {
    return this.editForm.controls;
  }

  saveForm() {
    console.log("update url details in edit mode!");
    console.log("updated values: ", this.editForm.value)
    this.errorInd = false;
    if (this.editForm.valid) {

      this.updateCustomUrlDetails = this.premiumUrlService.updateCustomPremiumUrlDetails(this.editForm.value).subscribe(
        (res)=>{

          if (res === "ALREADY_EXIST") {
            this.errorInd = true;
            this.errorMessage = "The shorten URL already exist. please try an another custom URL"
          }
          else if (res === "failed") {
            this.errorInd = true;
            this.errorMessage = "The Custom URL doesn't exist. please try an another custom URL"
          }
          else{
            console.log("update custom premium URL details: "+res)
            this.dialogRef.close(this.editForm.value);
          }
        },
        (err)=>{
          console.log("error!!!")
          if (err.status === 208) {
            this.errorInd = true;
            this.errorMessage = "The shorten URL already exist. please try an another custom URL"
          }
          else if (err.status === 204) {
            this.errorInd = true;
            this.errorMessage = "The Custom URL doesn't exist. please try an another custom URL"
          }
          else{
            this.errorInd = true;
            this.errorMessage = "Oops something went wrong!!!"
          }
        }
      );

    }
  }

}
