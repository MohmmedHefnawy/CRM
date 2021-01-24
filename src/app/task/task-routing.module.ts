import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './task-details/dash-board/dash-board.component';
import { TaskDetailsComponent } from './task-details/task-details.component'
import { TaskComponent } from './task.component';
const routes: Routes = [
  { path: 'details', component: TaskComponent,
  children:  [
    { path: 'dashBoard', component: DashBoardComponent },
    { path: 'data', component: TaskDetailsComponent }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
