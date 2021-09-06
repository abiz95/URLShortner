import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/access/service/auth/auth.service';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
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
  profileImgDetailService: any;
  retrievedImage: any;
  profilePicFile: any;
  rawImg: any;
  spinnerInd: boolean = false;

  constructor(
    private userInfoService: UserInfoService, 
    private adminAuthService: AuthSharedService, 
    private matDialog: MatDialog, 
    private authService: AuthService, 
    private authSharedService: AuthSharedService
    ) { }

  ngOnInit(): void {

    this.userId = this.adminAuthService.getSessionUserId();
    this.getUserData();
    this.profileImgDetailService = this.userInfoService.getProfilePicture(this.userId).subscribe(
      image => this.createImage(image),
      err => this.handleImageRetrievalError(err)
    );

  }

  getUserData() {

    this.getUserDetails = this.userInfoService.getUserInfo(this.userId).subscribe(
      (res) => {
        console.log("user details: " + res);
        this.userInfo = res;
        this.password = this.userInfo.password.replace(/./g, '*');
      },
      (err) => {
        console.log("Error: " + err);
      }
    );
  }

  updateUserDetails() {
    // console.log("updateUserDetails: "+JSON.stringify(obj));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.userInfo;
    dialogConfig.width = "500px";
    dialogConfig.height = 'auto';

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
    dialogConfig.width = "500px";
    dialogConfig.height = 'auto';

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
    dialogConfig.width = "500px";
    dialogConfig.height = 'auto';

    let urlRef = this.matDialog.open(UpdateUserSubscriptionComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        // this.getPremiumUrlListData();
        this.getUserData();
      }
    );
  }

  updateUserProfilePicture(event) {
    this.spinnerInd = true
    console.log("inside updateUserProfilePicture");
    this.rawImg = null;
    this.profilePicFile = null;
    this.profilePicFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(this.profilePicFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.rawImg = event.target.result;
        this.uploadProfilePicture();
      }
    }
  }

  uploadProfilePicture() {
    console.log("inside uploadProfilePicture");
    this.userId = this.authSharedService.getSessionUserId();
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.profilePicFile, this.profilePicFile.name);
    this.authService.uploadUserImg(uploadImageData, this.userId).subscribe(
      res => {
        console.log("profile picture upload", res);
        this.createImage(this.profilePicFile);
        this.spinnerInd = false;
      },
      (err) => {
        console.log("error while uploading profile picture", err);
        // this.errorMessage = "unable to upload profile picture! Please try again latter, after completing the signup"
        this.spinnerInd = false;
      }
    )
  }

  // updateUserProfilePicture() {
  //   console.log("updateUserProfilePicture: ");

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = false;
  //   dialogConfig.data = this.userInfo;
  //   dialogConfig.width="500px";
  //   dialogConfig.height='auto';

  //   let urlRef = this.matDialog.open(UpdateUserProfilePictureComponent, dialogConfig);
  //   urlRef.afterClosed().subscribe(
  //     (data) => {
  //       console.log("Dialog output:", data)
  //       // this.getPremiumUrlListData();
  //       this.getUserData();
  //     }
  //   );
  // }

  private handleImageRetrievalError(err: Error) {
    console.error(err);
    // this.showSpinner = false;
    // this.alertService.error("Problem retrieving profile photo.");
  }

  private createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.retrievedImage = reader.result;
        // this.showSpinner = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      // this.showSpinner = false;
    }
  }

  ngOnDestroy(): void {

    if (this.profileImgDetailService) {
      // console.log("unsubscribe")
      this.profileImgDetailService.unsubscribe();
    }
    if (this.getUserDetails) {
      // console.log("unsubscribe")
      this.getUserDetails.unsubscribe();
    }
  }

}
