import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './access.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { SignupInfoComponent } from './signup/signup-info/signup-info.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'', 
    component:AccessComponent, 
    children: [
      {path:'signin', component:SigninComponent},
      {path:'signup', component:SignupComponent},
      {path:'info', component:SignupInfoComponent},
    ]
  },
  {path:'signout', component:SignoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
