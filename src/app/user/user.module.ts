import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SettingsComponent } from './settings/settings.component';
import { PersonalInfoComponent } from './settings/personal-info/personal-info.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ContactComponent } from './settings/contact/contact.component';


@NgModule({
  declarations: [TeamsComponent, ProfileComponent, UserComponent, NotificationsComponent, CreateAccountComponent, SettingsComponent, PersonalInfoComponent, ChangePasswordComponent, ContactComponent],
  exports: [UserRoutingModule],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
