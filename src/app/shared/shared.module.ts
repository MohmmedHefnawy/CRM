import { LoadingInterceptor } from './services/loading-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationsComponent } from './components/navigations/navigations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [NavigationsComponent],
  exports: [NavigationsComponent, BrowserAnimationsModule, MatProgressBarModule],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class SharedModule { }
