import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// modules
import { UserModule } from '../user/user.module'
import { UserRoutingModule } from '../user/user-routing.module';
const routes: Routes = [
  // { path: 'crm', component: LayoutComponent,
  //   children: [
  //     ...UserRoutingModule
  //   ] 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
