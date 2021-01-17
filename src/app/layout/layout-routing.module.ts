import { MiniContainerComponent } from './mini-container/mini-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// modules
import { UserModule } from '../user/user.module'
import { UserRoutingModule } from '../user/user-routing.module';
import { MasterContainerComponent } from './master-container/master-container.component'
const routes: Routes = [
  { path: 'mrcontainer', component: MasterContainerComponent },
  { path: 'mini-container', component: MiniContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
