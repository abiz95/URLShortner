import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PremiumUrlService } from 'src/app/admin/service/premiumUrl/premium-url.service';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-premium-general-url',
  templateUrl: './premium-general-url.component.html',
  styleUrls: ['./premium-general-url.component.scss']
})
export class PremiumGeneralUrlComponent implements OnInit {

  premiumForm: any;
  premiumCustomForm: any;
  premiumData:any;
  userId: string;
  postPremiumUrl: any;
  premiumrlSuccessMessage: any = false;
  premiumUrlFailedMessage: any = false;

  premiumShortenUrl: any;
  customShortenUrl: any;

  QRData: any;
  // QACodeInd: any = false;
  // QRvalue: any;

  @Output() QREvent = new EventEmitter();
  
  constructor(
    private formBuilder: FormBuilder, 
    private adminAuthService: AuthSharedService,
    private premiumUrlService: PremiumUrlService,
    private clipboardApi: ClipboardService, 
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.userId = this.adminAuthService.getSessionUserId();

    this.premiumForm =this.formBuilder.group(
      {
        premiumActualUrl: ["", [Validators.required]],
      }
    );

  }

  get premiumValues() {
    return this.premiumForm.controls;
  }

  savePremiumUrl() {
    console.log("premium data: ", this.premiumForm.value);
    console.log("premium data values: ", this.premiumForm.get('premiumActualUrl').value);

    this.premiumData = {
      userId: this.userId,
      actualUrl: this.premiumForm.get('premiumActualUrl').value,
    }

    if (this.premiumForm.valid) {
      this.postPremiumUrl = this.premiumUrlService.savePremiumUrlDetails(this.premiumData).subscribe(
        (res)=>{
          console.log("save premium URL: "+res)
          if (res==="failed") {
            this.premiumrlSuccessMessage = false;
            this.premiumUrlFailedMessage = true;
            // this.QACodeInd = false;
            this.QRData={ind: false, url: ''};
            this.QREvent.emit(this.QRData);
          }
          else{
            this.premiumUrlFailedMessage = false;
            this.premiumrlSuccessMessage = true;
            // this.premiumShortenUrl = "http://localhost:4200/"+res;
            this.premiumShortenUrl = `${environment.hostUrl}` + '/' + res;
            // this.QRvalue = this.premiumShortenUrl;
            // this.QACodeInd = true;
            this.QRData={ind: true, url: this.premiumShortenUrl};
            this.QREvent.emit(this.QRData);
          }
        }
      );
    }

  }

  copiedMessage() {
    this.clipboardApi.copyFromContent(this.premiumShortenUrl)
    this._snackBar.open("Copied!", 'Dismiss', {duration: 3000});
  }

  ngOnDestroy(): void {
  
    if (this.postPremiumUrl) {
      // console.log("unsubscribe")
        this.postPremiumUrl.unsubscribe();
    }
  }

}
