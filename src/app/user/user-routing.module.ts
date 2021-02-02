import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TeamsComponent } from './components/teams/teams.component'
import { UserComponent } from './user.component'
import { NotificationsComponent } from './components/notifications/notifications.component'
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PersonalInfoComponent } from './components/settings/personal-info/personal-info.component';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';
import { ContactComponent } from './components/settings/contact/contact.component';
import { AuthGuard } from '../auth/components/auth/auth.guard';
const routes: Routes = [
  { path: 'user', redirectTo: 'user/profile', pathMatch: 'full' }, // redirect to `profile`
  { path: 'user/settings', redirectTo: 'user/settings/personal-info', pathMatch: 'full' }, // redirect to `profile`
  { path: 'user/teams', redirectTo: 'user/teams/project-managers', pathMatch: 'full' }, // redirect to `profile`
  { path: '', redirectTo: 'user/profile', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'teams', component: TeamsComponent,
        children:[
          {path : 'project-managers', component: TeamsComponent},
          {path : 'dubai-admins', component: TeamsComponent},
          {path : 'account-managers', component: TeamsComponent},
          {path : 'photographers', component: TeamsComponent},
          {path : 'designers', component: TeamsComponent},
          {path : 'content-creators', component: TeamsComponent}
        ]
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/:user', component: ProfileComponent },
      { path: 'notifi', component: NotificationsComponent },
      { path: 'create-account', component: CreateAccountComponent },
      {
        path: 'settings', component: SettingsComponent,
        children: [
          { path: 'personal-info', component: PersonalInfoComponent },
          { path: 'change-password', component: ChangePasswordComponent },
          { path: 'contact', component: ContactComponent }
        ]
      },
    ], canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
