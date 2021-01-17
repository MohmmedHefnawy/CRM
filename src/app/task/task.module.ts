import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SideContentComponent } from './side-content/side-content.component';
import { TaskDetailsComponent } from './task-details/task-details.component';


@NgModule({
  declarations: [TaskComponent, SideContentComponent, TaskDetailsComponent],
  exports: [SideContentComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
