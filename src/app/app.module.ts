import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DefaultModule } from './admin/layout/default/default.module';
import { LandingComponent } from './landing/landing.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatSnackBarModule} from '@angular/material/snack-bar'
// import { SigninComponent } from './access/signin/signin.component';
// import { SignoutComponent } from './access/signout/signout.component';
// import { SignupComponent } from './access/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
// import { AccessComponent } from './access/access.component';
import { LoadComponent } from './load/load.component';
import { PricingComponent } from './pricing/pricing.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomUrlValidationDirective } from './admin/service/customUrlValidation/custom-url-validation.directive';
import { ClipboardModule } from 'ngx-clipboard';
import { JwtInterceptorService } from './services/jwtInterceptor/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/errorInterceptor/error-interceptor.service';
import { LocalDataService } from './services/localDataService/local-data.service';
// import { FaqComponent } from './admin/modules/faq/faq.component';
// import { ReportIssueComponent } from './admin/modules/report-issue/report-issue.component';
// import { UserProfileComponent } from './admin/modules/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    // SigninComponent,
    // SignoutComponent,
    // SignupComponent,
    ErrorComponent,
    // AccessComponent,
    LoadComponent,
    PricingComponent,
    HeaderComponent,
    CustomUrlValidationDirective,
    // FaqComponent,
    // ReportIssueComponent,
    // UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // DefaultModule,
    FlexLayoutModule,
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
    HttpClientModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    LocalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
