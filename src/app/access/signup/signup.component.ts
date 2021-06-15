import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { CustomValidationService } from '../service/customValidation/custom-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm;
  hide = true;
  c_hide = true;
  
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private customValidator: CustomValidationService,
    private authService: AuthService,
    ) {

  }

  ngOnInit(): void {
    this.signupForm =this.formBuilder.group(
        {
          firstName: ["", [Validators.required]],
          lastName: ["", [Validators.required]],
          email: ["", [Validators.required, Validators.email]],
          phoneNumber: ["", [Validators.required]],
          country: ["", [Validators.required]],
          // userName: ["", [Validators.required]],
          password: ["", Validators.compose([Validators.required, this.customValidator.patternValidator()])],
          confirmPassword: ["", [Validators.required]],
        },
        {
          validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
        }
      );
  }

  get formValues() {
    return this.signupForm.controls;
  }

  firstName() {
    return this.signupForm.get('firstName');
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
      this.authService.saveUserData(this.signupForm.value).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['admin'])
        }
      )
    }
  }

  login() {
    this.router.navigate(['login'])
  }

}
