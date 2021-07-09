import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthSharedService } from '../services/authShared/auth-shared.service';
import { GeneralUrlService } from '../services/generalUrl/general-url.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  shortenUrl: any;
  actualUrl: string;
  saveShortenUrl: any;
  data: any;
  isUserAuthenticated

  constructor(private generalUrlService: GeneralUrlService, private authSharedService: AuthSharedService, private clipboardApi: ClipboardService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.isUserAuthenticated = this.authSharedService.isUserLoggedIn()
  }

  shortenUserLink(){

    this.data={actualUrl: this.actualUrl}
    console.log("Actual Url: "+this.data);
    this.saveShortenUrl = this.generalUrlService.saveGeneralUrl(this.data).subscribe((res)=>{
      console.log("Response: "+res)
      this.shortenUrl="http://localhost:4200/"+res;
    });
  }

  copiedMessage() {
    this.clipboardApi.copyFromContent(this.shortenUrl)
    this._snackBar.open("Copied!", 'Dismiss', {duration: 3000});
  }

  ngOnDestroy(): void {
    if (this.saveShortenUrl) {
      // console.log("unsubscribe")
        this.saveShortenUrl.unsubscribe();
    }
  }

}
