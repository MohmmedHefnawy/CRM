import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationsComponent } from './components/navigations/navigations.component';


@NgModule({
  declarations: [NavigationsComponent],
  exports: [NavigationsComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
