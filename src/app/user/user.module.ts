import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { TeamsComponent } from './components/teams/teams.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './user.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PersonalInfoComponent } from './components/settings/personal-info/personal-info.component';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';
import { ContactComponent } from './components/settings/contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [TeamsComponent, ProfileComponent, UserComponent, NotificationsComponent, CreateAccountComponent, SettingsComponent, PersonalInfoComponent, ChangePasswordComponent, ContactComponent],
  exports: [UserRoutingModule],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
    MatPaginatorModule
  ]
})
export class UserModule { }
