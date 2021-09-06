import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm;
  hide = true;
  validationError:boolean=false
  errorInd:boolean=false
  userData
  errorMessage: string = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private authSharedService: AuthSharedService) { }

  ngOnInit(): void {
    this.signinForm =this.formBuilder.group(
      {
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
      }
    );
  }

  get formValues() {
    return this.signinForm.controls;
  }

  saveForm() {
    console.log("form data", this.signinForm.value);
    // console.log("errors: ", this.signinForm.valid);
    // this.router.navigate(['login'])
    if (this.signinForm.valid) {
      console.log("password matched: ", this.signinForm.value);
      // this.authService.userValidation(this.signinForm.value).subscribe(
      //   (res)=>{
      //     console.log(res);
      //   }
      // );
      this.authService.userValidation(this.signinForm.value).subscribe(
        res => {
          console.log("res ",res);
          this.userData=res;
          // this.validation=res
          // console.log(this.validation[0]);
          // this.router.navigate(['admin'])
          if (res!=="failed") {
            console.log("signin success completed");
            // let jsonValues = JSON.parse(res);
            // console.log("token value: ", jsonValues["token"]);
            // sessionStorage.setItem('token',jsonValues["token"]);
            // console.log("login User: ",this.signinForm.get('email').value);
            // sessionStorage.setItem('userId',jsonValues["userId"]);
            // this.router.navigate(['admin'])

            if (this.tokenExpired(res)) {
              // token expired
              console.log('expired');
              this.authService.generateToken(this.authSharedService.getLoggedInToken()).subscribe(
                res => {
                  console.log("refresh token resp ",res);
                  this.authSharedService.tokenSetup(res);
                })

            } else {
              // token valid
              console.log('not expired');
              this.errorMessage = null;
              this.authSharedService.tokenSetup(res);

              // console.log("token value: ", res);
              // sessionStorage.setItem('token', res);
              // let jwtData = res.split('.')[1];
              // let decodedJwtJsonData = window.atob(jwtData);
              // let decodedJwtData = JSON.parse(decodedJwtJsonData);
              // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
              // console.log("user Id: ", decodedJwtData.userId);
              // sessionStorage.setItem('userId', decodedJwtData.userId);
              this.router.navigate(['admin']);
            }
          }
          else {
            console.log("error returned");
            this.validationError=true;
          }
        },
        (err) => {
          console.log("error code ", err.error);
          this.errorMessage = "Authentication failed. Please check username and password"
          if (err.status === "401") {
            console.log("error code ", err.error);
            this.validationError=true;
          }
          else {
            this.errorInd=true;
          }
          this.errorInd=true;
          console.error('error caught in component',err)
        }
      );
    }
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    console.log('expiry :: ',expiry);
    console.log('test time :: ',Math.floor((new Date).getTime()/ 1000)-expiry);
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
