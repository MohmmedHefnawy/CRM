import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterContainerComponent } from './master-container/master-container.component';
import { LayoutComponent } from './layout.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MiniContainerComponent } from './mini-container/mini-container.component'
// modules
import { LayoutRoutingModule } from './layout-routing.module';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module'
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MasterContainerComponent, LayoutComponent, SideMenuComponent, NavBarComponent, MiniContainerComponent],
  exports: [NavBarComponent, SideMenuComponent, MasterContainerComponent, LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    UserModule,
    TaskModule,
    SharedModule,
  ]
})
export class LayoutModule { }