import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TeamsComponent }from './teams/teams.component'
import { UserComponent } from './user.component'
const routes: Routes = [
  { path: 'user', redirectTo: 'user/profile', pathMatch: 'full' }, // redirect to `profile`
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'teams', component: TeamsComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
