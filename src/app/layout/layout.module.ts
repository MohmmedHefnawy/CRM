import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MasterContainerComponent } from './master-container/master-container.component';
import { LayoutComponent } from './layout.component';
// modules
import { UserModule }  from '../user/user.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'

@NgModule({
  declarations: [MasterContainerComponent, LayoutComponent, SideMenuComponent, NavBarComponent],
  exports: [NavBarComponent, SideMenuComponent, MasterContainerComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    UserModule
  ]
})
export class LayoutModule { }