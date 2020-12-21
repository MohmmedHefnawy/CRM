import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [TeamsComponent, ProfileComponent, UserComponent],
  exports: [UserRoutingModule],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
