import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
// import { NgApexchartsModule } from 'ng-apexcharts';
import { OverallHitsLineChartComponent } from './widgets/overall-hits-line-chart/overall-hits-line-chart.component';
import { ManagingURLTableComponent } from './widgets/managing-urltable/managing-urltable.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUrlComponent } from './widgets/edit-url/edit-url.component';
import { DeleteMessageComponent } from './widgets/delete-message/delete-message.component';
import { PremiumGeneralUrlComponent } from './widgets/premium-general-url/premium-general-url.component';
import { PremiumCustomUrlComponent } from './widgets/premium-custom-url/premium-custom-url.component';
import { QRCodeGeneratorComponent } from './widgets/qrcode-generator/qrcode-generator.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ChartsModule } from 'ng2-charts';
import { EditPersonalInfoComponent } from './widgets/edit-personal-info/edit-personal-info.component';
import { MatCardModule } from '@angular/material/card';
import { UpdateUserCredentialComponent } from './widgets/update-user-credential/update-user-credential.component';
import { UpdateUserSubscriptionComponent } from './widgets/update-user-subscription/update-user-subscription.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { IssueComponent } from './widgets/issue/issue.component';
import { IssueListComponent } from './widgets/issue-list/issue-list.component';
import { EditIssueComponent } from './widgets/edit-issue/edit-issue.component';
import { IssueHistoryComponent } from './widgets/issue-history/issue-history.component';
import { ViewIssueComponent } from './widgets/view-issue/view-issue.component';
import { SaveIssueMessageComponent } from './widgets/save-issue-message/save-issue-message.component';
import { DailyPieChartComponent } from './widgets/daily-pie-chart/daily-pie-chart.component';
import { MonthlyHitTableComponent } from './widgets/monthly-hit-table/monthly-hit-table.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    OverallHitsLineChartComponent,
    ManagingURLTableComponent,
    EditUrlComponent,
    DeleteMessageComponent,
    PremiumGeneralUrlComponent,
    PremiumCustomUrlComponent,
    QRCodeGeneratorComponent,
    EditPersonalInfoComponent,
    UpdateUserCredentialComponent,
    UpdateUserSubscriptionComponent,
    IssueComponent,
    IssueListComponent,
    EditIssueComponent,
    IssueHistoryComponent,
    ViewIssueComponent,
    SaveIssueMessageComponent,
    DailyPieChartComponent,
    MonthlyHitTableComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // NgApexchartsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    NgxQRCodeModule,
    ChartsModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    OverallHitsLineChartComponent,
    ManagingURLTableComponent,
    PremiumGeneralUrlComponent,
    PremiumCustomUrlComponent,
    QRCodeGeneratorComponent,
    IssueComponent,
    IssueListComponent,
    IssueHistoryComponent,
    DailyPieChartComponent,
    MonthlyHitTableComponent
  ],
  entryComponents: [
    EditUrlComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SharedModule { }
