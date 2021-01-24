import { MiniContainerComponent } from './mini-container/mini-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// modules
import { MasterContainerComponent } from './master-container/master-container.component';
const routes: Routes = [
  { path: 'task', redirectTo: 'task/details/dashBoard', pathMatch: 'full' }, // redirect to `profile`
  { path: 'mrcontainer', component: MasterContainerComponent },
  { path: 'task', component: MiniContainerComponent, 
    children:  [
      { path: '', loadChildren: () => import('../task/task.module').then(m => m.TaskModule)}
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
