import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
// Module
import { UserModule } from './user/user.module'
import { LayoutModule } from './layout/layout.module'
import { TaskModule } from './task/task.module'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './auth/auth.module';
import { DashComponent } from './dash/dash.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    LayoutModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule
  ],
  providers: [
    // { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
