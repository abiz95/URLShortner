import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminAuthService } from 'src/app/admin/service/adminAuth/admin-auth.service';
import { PremiumUrlService } from 'src/app/admin/service/premiumUrl/premium-url.service';

@Component({
  selector: 'app-premium-custom-url',
  templateUrl: './premium-custom-url.component.html',
  styleUrls: ['./premium-custom-url.component.scss']
})
export class PremiumCustomUrlComponent implements OnInit {

  premiumCustomForm: any;
  customData:any;
  userId: string;
  customAvailability: any;
  customAvailabilityInd: any = false;
  customAvailabilityMessage: any = false;
  postCustomUrl: any;
  customUrlSuccessMessage: any = false;
  customUrlFailedMessage: any = false;
  customUrlOtherFailedMessage: any = false;

  customShortenUrl: any;

  QRvalue: any;
  QACodeInd: any = false;
  QRData: any;

  @Output() QREvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder, 
    private adminAuthService: AdminAuthService,
    private premiumUrlService: PremiumUrlService,
  ) { }

  ngOnInit(): void {

    this.userId = this.adminAuthService.getSessionUserId();

    this.premiumCustomForm =this.formBuilder.group(
      {
        premiumCustomActualUrl: ["", [Validators.required]],
        premiumCustomUrl: ["", [Validators.required]],
      }
    );
  }

  get premiumCustomValues() {
    return this.premiumCustomForm.controls;
  }

  checkCustomUrlAvailability() {

    this.customAvailability = this.premiumUrlService.findCustomPremiumUrl(this.premiumCustomForm.get('premiumCustomUrl').value).subscribe(
      (res)=>{
        console.log("customAvailability: "+res);
        if (res !== null) {
          this.customAvailabilityInd = true;
          this.customAvailabilityMessage = false;
          console.log("customAvailabilityInd: "+this.customAvailabilityInd);
        }
        else{
          this.customAvailabilityInd = false;
          this.customAvailabilityMessage = true;
        }
      }
    );
  }

  savePremiumCustomUrl() {
  console.log("custom premium data: ", this.premiumCustomForm.value);
  console.log("custom values: ", this.premiumCustomForm.get('premiumCustomUrl').value);
  console.log("actual values: ", this.premiumCustomForm.get('premiumCustomActualUrl').value);
  // this.userId = this.adminAuthService.getSessionUserId();
  this.customData = {
    userId: this.userId,
    actualUrl: this.premiumCustomForm.get('premiumCustomActualUrl').value,
    shortenUrl: this.premiumCustomForm.get('premiumCustomUrl').value
  }
  this.postCustomUrl = this.premiumUrlService.saveCustomPremiumUrlDetails(this.customData).subscribe(
    (res)=>{
      console.log("save custom premium URL: "+res)
      if (res==="failed") {
        this.customUrlSuccessMessage = false;
        this.customUrlFailedMessage = true;
        // this.QACodeInd = false;
        this.QRData={ind: false, url: ''};
        this.QREvent.emit(this.QRData);
      }
      else{
        this.customUrlSuccessMessage = true;
        this.customUrlFailedMessage = false;
        this.customUrlOtherFailedMessage = false;
        this.customShortenUrl="http://localhost:4200/"+res
        // this.QRvalue=this.customShortenUrl;
        // this.QACodeInd = true;
        this.QRData={ind: true, url: this.customShortenUrl};
        this.QREvent.emit(this.QRData);
      }
    },
    (err)=>{
      if (err.status === 501) {
        this.customUrlSuccessMessage = false;
        this.customUrlFailedMessage = true;
        this.customUrlOtherFailedMessage = false;
        // this.QACodeInd = false;
        this.QRData={ind: false, url: ''};
        this.QREvent.emit(this.QRData);
      }
      else{
        this.customUrlSuccessMessage = false;
        this.customUrlFailedMessage = false;
        this.customUrlOtherFailedMessage = true;
        // this.QACodeInd = false;
        this.QRData={ind: false, url: ''};
        this.QREvent.emit(this.QRData);
      }
    }
  );
  console.log("custom data: ", this.customData);
  }

  ngOnDestroy(): void {
  
    if (this.customAvailability) {
      // console.log("unsubscribe")
        this.customAvailability.unsubscribe();
    }
    if (this.postCustomUrl) {
      // console.log("unsubscribe")
        this.postCustomUrl.unsubscribe();
    }
  }

}
