import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { AuthService } from '../service/auth/auth.service';
import { CustomValidationService } from '../service/customValidation/custom-validation.service';
import { SharedAcessDataService } from '../shared/sharedAccessDataService/shared-acess-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm;
  hide = true;
  c_hide = true;
  errorMessage: string = null;
  
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private SharedAcessDataService: SharedAcessDataService
    ) {

  }

  ngOnInit(): void {
    this.signupForm =this.formBuilder.group(
        {
          email: ["", [Validators.required, Validators.email]],
        }
      );
  }

  get formValues() {
    return this.signupForm.controls;
  }

  firstName() {
    return this.signupForm.get('email');
  }

  saveForm() {
    console.log("form data", this.signupForm.value);
    // console.log("errors: ", this.signupForm.valid);
    if (this.signupForm.valid) {
      console.log("password matched: ", this.signupForm.get('email').value);
      this.authService.userEmailVerification(this.signupForm.value).subscribe(
        res => {  
          console.log("Signup resp", res);
          if (res=='failed') {
            this.errorMessage="Email Id already exist"
          } else {
            this.errorMessage=null;
            this.SharedAcessDataService.userEmailId = this.signupForm.get('email').value;
            this.router.navigate(['access/info'])
          }

        },
        (err) => {
          console.log("signup error", err);
          this.errorMessage="Something went wrong. Please try again"
        }
      )
    }
  }

}
