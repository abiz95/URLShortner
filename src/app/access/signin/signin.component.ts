import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  userId
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,) { }

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
          console.log(res);
          this.userId=res;
          // this.validation=res
          // console.log(this.validation[0]);
          // this.router.navigate(['admin'])
          if (res!=="failed") {
            console.log("success completed");
            console.log("login User: ",this.signinForm.get('email').value);
            sessionStorage.setItem('userName',this.userId);
            this.router.navigate(['admin'])
          }
          else {
            this.validationError=true;
          }
        },
        (err) => {
          if (err.status === "401") {
            this.validationError=true;
          }
          else {
            this.errorInd=true;
          }
          // console.error('error caught in component',err.status)
        }
      );
    }
  }

}
