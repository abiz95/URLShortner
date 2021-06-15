import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { CustomizeUrlComponent } from '../../modules/customize-url/customize-url.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DefaultComponent } from './default.component';
// import { MatCardModule, MatDividerModule, MatPaginatorModule, MatSidenavModule, MatTableModule } from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { AppRoutingModule } from 'src/app/app-routing.module';
import { ManageUrlComponent } from '../../modules/manage-url/manage-url.component';
import { DefaultRoutingModule } from './default-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { UserProfileComponent } from '../../modules/user-profile/user-profile.component';
import { ReportIssueComponent } from '../../modules/report-issue/report-issue.component';
import { FaqComponent } from '../../modules/faq/faq.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CustomizeUrlComponent,
    ManageUrlComponent,
    UserProfileComponent,
    ReportIssueComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    // MatFormFieldModule,
    // AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    MatTabsModule,
    MatExpansionModule,
    // NgxQRCodeModule,
  ],
  // exports: [
  //   DashboardComponent,
  //   CustomizeUrlComponent,
  // ],
})

export class DefaultModule { }
