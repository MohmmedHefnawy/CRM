import { FormsModule } from '@angular/forms';
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
import { ModalComponent } from './components/modal/modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap'
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [NavigationsComponent, ModalComponent],
  exports: [NavigationsComponent, BrowserAnimationsModule, MatProgressBarModule, LoadingBarHttpClientModule, ModalComponent, NgxPaginationModule],
  imports: [
    CommonModule,
    SharedRoutingModule,
    LoadingBarHttpClientModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [
    // { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class SharedModule { }
