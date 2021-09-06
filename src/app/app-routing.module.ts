import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { LoadComponent } from './load/load.component';
import { PricingComponent } from './pricing/pricing.component';
import { SharedAuthGuardService } from './services/sharedAuthGuardService/shared-auth-guard.service';

const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'pricing', component:PricingComponent},
  { path: 'admin', loadChildren:()=>import('src/app/admin/layout/default/default.module').then(i=>i.DefaultModule), canActivate:[SharedAuthGuardService] },
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
