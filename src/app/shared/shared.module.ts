import { TeamModalComponent } from '../shared/components/popUps/team-modal/team-modal.component';
import { FormsModule } from '@angular/forms';
// import { LoadingInterceptor } from './services/loading-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationsComponent } from './components/navigations/navigations.component';
import { ModalComponent } from './components/popUps/task-modal/modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationComponent } from './components/notification/notification.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavigationsComponent, ModalComponent, TeamModalComponent, NotificationComponent],
  exports: [NavigationsComponent, MatProgressBarModule, ModalComponent, NgxPaginationModule, TeamModalComponent, NotificationComponent, MatIconModule, MatButtonModule, MatMenuModule],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatProgressBarModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    // { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },
    // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class SharedModule { }
