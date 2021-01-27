import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Module
import { UserModule } from './user/user.module'
import { LayoutModule } from './layout/layout.module'
import { TaskModule } from './task/task.module'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './auth/auth.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    LayoutModule,
    SharedModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
