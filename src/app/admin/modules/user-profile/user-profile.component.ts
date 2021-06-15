import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminAuthService } from '../../service/adminAuth/admin-auth.service';
import { UserInfoService } from '../../service/userInfo/user-info.service';
import { EditPersonalInfoComponent } from '../../shared/widgets/edit-personal-info/edit-personal-info.component';
import { UpdateUserCredentialComponent } from '../../shared/widgets/update-user-credential/update-user-credential.component';
import { UpdateUserSubscriptionComponent } from '../../shared/widgets/update-user-subscription/update-user-subscription.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userInfo: any;
  getUserDetails: any;
  userId: string;
  password: string;

  constructor(private userInfoService: UserInfoService, private adminAuthService: AdminAuthService, private matDialog: MatDialog) { }

  ngOnInit(): void {

    this.userId = this.adminAuthService.getSessionUserId();
    this.getUserData();

  }

  getUserData() {

    this.getUserDetails = this.userInfoService.getUserInfo(this.userId).subscribe(
      (res)=>{
        console.log("user details: "+res);
        this.userInfo = res;
        this.password = this.userInfo.password.replace(/./g,'*');
      },
      (err)=>{
        console.log("Error: "+err);
      }
    );
  }

  updateUserDetails() {
    // console.log("updateUserDetails: "+JSON.stringify(obj));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.userInfo;
    dialogConfig.width="500px";
    dialogConfig.height='auto';
    
    let urlRef = this.matDialog.open(EditPersonalInfoComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        // this.getPremiumUrlListData();
        this.getUserData();
      }
    );
  }

  updateUserCredentials() {
    // console.log("updateUserDetails: "+JSON.stringify(obj));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.userInfo;
    dialogConfig.width="500px";
    dialogConfig.height='auto';
    
    let urlRef = this.matDialog.open(UpdateUserCredentialComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        // this.getPremiumUrlListData();
        this.getUserData();
      }
    );
  }
  
  updateUserSubscription() {
    // console.log("updateUserDetails: "+JSON.stringify(obj));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.userInfo;
    dialogConfig.width="500px";
    dialogConfig.height='auto';
    
    let urlRef = this.matDialog.open(UpdateUserSubscriptionComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        // this.getPremiumUrlListData();
        this.getUserData();
      }
    );
  }

}
