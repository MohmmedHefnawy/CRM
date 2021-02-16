import { MiniContainerComponent } from './mini-container/mini-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// modules
import { MasterContainerComponent } from './master-container/master-container.component';
import { ModalComponent } from '../shared/components/popUps/task-modal/modal.component';
const routes: Routes = [
  { path: 'task', redirectTo: 'task/details/dashBoard', pathMatch: 'full' }, // redirect to `profile`
  { path: 'task/details', redirectTo: 'task/details/dashBoard', pathMatch: 'full' }, // redirect to `profile`
  { path: 'mrcontainer', component: MasterContainerComponent },
  { path: 'task', component: MiniContainerComponent, 
    children:  [
      { path: '', loadChildren: () => import('../task/task.module').then(m => m.TaskModule)}
    ]
  },
  // { path: 'assign-user', component:ModalComponent, 
  // children: [
  //   {path:'dubi-admin', component:ModalComponent}
    // {path:'dubi-admin', component:ModalComponent},
//   ]
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
