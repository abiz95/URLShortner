import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { AuthService } from '../../service/auth/auth.service';
import { CustomValidationService } from '../../service/customValidation/custom-validation.service';
import { SharedAcessDataService } from '../../shared/sharedAccessDataService/shared-acess-data.service';

@Component({
  selector: 'app-signup-info',
  templateUrl: './signup-info.component.html',
  styleUrls: ['./signup-info.component.scss']
})
export class SignupInfoComponent implements OnInit {

  userId: any;
  signupForm;
  hide = true;
  c_hide = true;
  emailVal: any;
  errorMessage: string = null;
  rawImg: any;
  profilePicFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customValidator: CustomValidationService,
    private authService: AuthService,
    private authSharedService: AuthSharedService,
    private SharedAcessDataService: SharedAcessDataService
  ) {

  }

  ngOnInit(): void {
    this.emailVal = this.SharedAcessDataService.userEmailId;
    this.signupForm = this.formBuilder.group(
      {
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: [],
        phoneNumber: ["", [Validators.required]],
        country: ["", [Validators.required]],
        // userImage: [],
        password: ["", Validators.compose([Validators.required, this.customValidator.patternValidator()])],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
    this.preLoadValues();
  }

  get formValues() {
    return this.signupForm.controls;
  }

  firstName() {
    return this.signupForm.get('firstName');
  }

  preLoadValues() {
    this.signupForm.patchValue({
      email: this.emailVal
    })
  }

  onSelectFile(event) {
    this.profilePicFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(this.profilePicFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.rawImg = event.target.result;
      }
    }

  }
  public delete() {
    this.rawImg = null;
    this.profilePicFile = null;
  }

  saveForm() {
    console.log("form data", this.signupForm.value);
    // console.log("errors: ", this.signupForm.valid);
    // this.router.navigate(['login'])
    if (
      // this.signupForm.get('firstName').status==="VALID" &&
      // this.signupForm.get('lastName').status==="VALID" &&
      // this.signupForm.get('email').status==="VALID" &&
      // this.signupForm.get('phoneNumber').status==="VALID" &&
      // this.signupForm.get('country').status==="VALID" &&
      // this.signupForm.get('password').status==="VALID" &&
      // this.signupForm.get('confirmPassword').status==="VALID" &&
      // this.signupForm.get('password').value === this.signupForm.get('confirmPassword').value

      this.signupForm.valid
    ) {
      console.log("password matched: ", this.signupForm.value);
      console.log("profile picture value: ", this.profilePicFile);
      this.authService.saveUserData(this.signupForm.value).subscribe(
        res => {  
          console.log("Signup resp", res);
          if (res=='') {
            this.errorMessage="Email Id already exist"
          } else {
            this.errorMessage=null;
            this.authSharedService.tokenSetup(res);
            if (typeof(this.profilePicFile) !== 'undefined') {
              this.uploadProfilePicture();
            }
            this.router.navigate(['pricing']);
            // if (this.errorMessage !== 'null') {
            //   this.router.navigate(['pricing']);
            // }
          }

        },
        (err) => {
          console.log("signup error", err);
          this.errorMessage="Something went wrong. Please try again"
        }
      )

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
      },
      (err) => {
        console.log("error while uploading profile picture", err);
        this.errorMessage="unable to upload profile picture! Please try again latter, after completing the signup"
      }
    )
  }

}
