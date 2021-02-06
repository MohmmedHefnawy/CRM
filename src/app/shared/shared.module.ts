// import { LoadingInterceptor } from './services/loading-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationsComponent } from './components/navigations/navigations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [NavigationsComponent],
  exports: [NavigationsComponent, BrowserAnimationsModule, MatProgressBarModule, LoadingBarHttpClientModule],
  imports: [
    CommonModule,
    SharedRoutingModule,
    LoadingBarHttpClientModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    // { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class SharedModule { }
