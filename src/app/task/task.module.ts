import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SideContentComponent } from './side-content/side-content.component';


@NgModule({
  declarations: [TaskComponent, SideContentComponent],
  exports: [SideContentComponent],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
