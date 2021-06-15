import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './access/service/authGuard/auth-guard.service';
// import { AccessComponent } from './access/access.component';
// import { SigninComponent } from './access/signin/signin.component';
// import { SignoutComponent } from './access/signout/signout.component';
// import { SignupComponent } from './access/signup/signup.component';
// import { DefaultComponent } from './admin/layout/default/default.component';
// import { CustomizeUrlComponent } from './admin/modules/customize-url/customize-url.component';
// import { DashboardComponent } from './admin/modules/dashboard/dashboard.component';
// import { ManageUrlComponent } from './admin/modules/manage-url/manage-url.component';
import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { LoadComponent } from './load/load.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {path:'', component:LandingComponent},
  // {path:'access', 
  // component:AccessComponent, 
  // children: [
  //   {path:'signin', component:SigninComponent},
  //   {path:'signup', component:SignupComponent},
  // ]},
  // {path:'signout', component:SignoutComponent},
  {path:'pricing', component:PricingComponent},
  // { 
  //   path: 'admin', 
  //   component: DefaultComponent,
  //   children: [
  //     { path: '', component: DashboardComponent},
  //     { path: 'customize', component: CustomizeUrlComponent},
  //     { path: 'manage', component: ManageUrlComponent}
  //   ] 
  // },
  // { path: 'admin', loadChildren:()=>import('src/app/admin/admin.module').then(i=>i.AdminModule), canActivate:[AuthGuardService] },
  { path: 'admin', loadChildren:()=>import('src/app/admin/layout/default/default.module').then(i=>i.DefaultModule), canActivate:[AuthGuardService] },
  { path: 'access', loadChildren:()=>import('src/app/access/access.module').then(i=>i.AccessModule)},
   {path: 'error', component:ErrorComponent },
  { path: ':id', component:LoadComponent },
  { path: '**', component:ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
