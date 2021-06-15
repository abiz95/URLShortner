import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomizeUrlComponent } from "../../modules/customize-url/customize-url.component";
import { DashboardComponent } from "../../modules/dashboard/dashboard.component";
import { FaqComponent } from "../../modules/faq/faq.component";
import { ManageUrlComponent } from "../../modules/manage-url/manage-url.component";
import { ReportIssueComponent } from "../../modules/report-issue/report-issue.component";
import { UserProfileComponent } from "../../modules/user-profile/user-profile.component";
import { DefaultComponent } from "./default.component";

const routes: Routes = [
    { 
        path: '', 
        component: DefaultComponent,
        children: [
          { path: '', component: DashboardComponent},
          { path: 'customize', component: CustomizeUrlComponent},
          { path: 'manage', component: ManageUrlComponent},
          { path: 'profile', component: UserProfileComponent},
          { path: 'report', component: ReportIssueComponent},
          { path: 'FAQ', component: FaqComponent}
        ] 
      }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DefaultRoutingModule { }