import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TeamsComponent }from './teams/teams.component'
import { UserComponent } from './user.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { CreateAccountComponent } from './create-account/create-account.component';
import { SettingsComponent } from './settings/settings.component';
import { PersonalInfoComponent } from './settings/personal-info/personal-info.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ContactComponent } from './settings/contact/contact.component';
const routes: Routes = [
  { path: 'user', redirectTo: 'user/profile', pathMatch: 'full' }, // redirect to `profile`
  { path: 'user/setting', redirectTo: 'user/setting/personal-info', pathMatch: 'full' }, // redirect to `profile`
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'teams', component: TeamsComponent },
      { path: 'profile', component: ProfileComponent },
      {path : 'notifi', component : NotificationsComponent},
      { path : 'create-account', component : CreateAccountComponent},
      { path : 'setting' , component : SettingsComponent,
       children: [
        { path : 'personal-info' , component : PersonalInfoComponent},
        { path : 'change-password' , component : ChangePasswordComponent},
        { path : 'contact' , component : ContactComponent}
      ]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
