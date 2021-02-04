import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LayoutRoutingModule } from './layout-routing.module';
import { MasterContainerComponent } from './master-container/master-container.component';
import { LayoutComponent } from './layout.component';
// modules
import { UserModule } from '../user/user.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MiniContainerComponent } from './mini-container/mini-container.component'
import { TaskModule } from '../task/task.module'
import { SharedModule } from '../shared/shared.module'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [MasterContainerComponent, LayoutComponent, SideMenuComponent, NavBarComponent, MiniContainerComponent],
  exports: [NavBarComponent, SideMenuComponent, MasterContainerComponent, LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    UserModule,
    TaskModule,
    SharedModule,
    // MatProgressBarModule,
    // BrowserAnimationsModule
  ]
})
export class LayoutModule { }