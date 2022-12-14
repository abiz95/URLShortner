import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthSharedService } from '../services/authShared/auth-shared.service';
import { GeneralUrlService } from '../services/generalUrl/general-url.service';
import { ClipboardService } from 'ngx-clipboard';
import { environment } from 'src/environments/environment';

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
  isUrlShorten: boolean;

  constructor(private generalUrlService: GeneralUrlService, private authSharedService: AuthSharedService, private clipboardApi: ClipboardService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.isUserAuthenticated = this.authSharedService.isUserLoggedIn()
  }

  shortenUserLink() {
    console.log("Actual Url value: " + this.actualUrl);
    if (this.actualUrl === '' || this.actualUrl === undefined || this.actualUrl === null) {
      console.log("Actual Url: No data");
      this.isUrlShorten = false;
    } else {
      this.data = { actualUrl: this.actualUrl }
      console.log("Actual Url: " + this.data);
      this.saveShortenUrl = this.generalUrlService.saveGeneralUrl(this.data).subscribe((res) => {
        console.log("Response: " + res)
        if (res !== undefined) {
          this.shortenUrl = `${environment.hostUrl}` + '/' + res;
          this.isUrlShorten = true;
        } else {
          this.isUrlShorten = false;
        }
      });
    }

  }

  copiedMessage() {
    this.clipboardApi.copyFromContent(this.shortenUrl)
    this._snackBar.open("Copied!", 'Dismiss', { duration: 3000 });
  }

  ngOnDestroy(): void {
    if (this.saveShortenUrl) {
      // console.log("unsubscribe")
      this.saveShortenUrl.unsubscribe();
    }
  }

}
