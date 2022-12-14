import { Component, OnInit } from '@angular/core';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { LocalDataService } from 'src/app/services/localDataService/local-data.service';
import { PremiumUrlService } from '../../service/premiumUrl/premium-url.service';
import { ReportIssueService } from '../../service/reportIssue/report-issue.service';
import { UserInfoService } from '../../service/userInfo/user-info.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isSideBarOpen = false;
  premiumUrlListData: any;
  issueHistoryData: any;
  issueListData: any;
  userDetailsData: any;
  userProfilePictureData: any;

  constructor(
    private premiumUrlService: PremiumUrlService, 
    private adminAuthService: AuthSharedService,
    private reportIssueService: ReportIssueService,
    private userInfoService: UserInfoService, 
    private localDataService: LocalDataService,
  ) { }

  ngOnInit() {
    this.getManageUrlDataService();
    this.getIssueHistoryDataService();
    this.getIssueListDataService();
    this.getProfileInfoDataService();
  }

  isSideBarToggled(event: any) {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  getManageUrlDataService() {
    this.premiumUrlListData = this.premiumUrlService.getPremiumUrlList(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("premiumUrlList: "+res);
        let premiumUrlList: any = res;
        this.localDataService.setManageURLData(premiumUrlList);
      }
    );
  }

  getIssueHistoryDataService() {
    this.issueHistoryData = this.reportIssueService.getIssueHistory(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("getIssueListData: "+res);
        let issueHistory: any = res;
        this.localDataService.setIssueHistoryData(issueHistory);
      }
    );
  }

  getIssueListDataService() {
    this.issueListData = this.reportIssueService.getIssueList(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("getIssueListData: "+res);
        let issueList: any = res;
        this.localDataService.setIssueListData(issueList);
      }
    );
    
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

  // getProfilePictureDataService() {
  //   let userId = this.adminAuthService.getSessionUserId();
  //   this.userProfilePictureData = this.userInfoService.getProfilePicture(userId).subscribe(
  //     (res) => {
  //       console.log("user picture: " + res);
  //       let userImage: any = res;
  //       this.localDataService.setProfilePicture(userImage);
  //     }
  //   );
  // }

  ngOnDestroy(): void {

    if (this.premiumUrlListData) {
      // console.log("unsubscribe")
      this.premiumUrlListData.unsubscribe();
    }

    if (this.issueHistoryData) {
      // console.log("unsubscribe")
      this.issueHistoryData.unsubscribe();
    }

    if (this.issueListData) {
      // console.log("unsubscribe")
      this.issueListData.unsubscribe();
    }

    if (this.userDetailsData) {
      // console.log("unsubscribe")
      this.userDetailsData.unsubscribe();
    }

    // if (this.userProfilePictureData) {
    //   // console.log("unsubscribe")
    //   this.userProfilePictureData.unsubscribe();
    // }
  }

}
