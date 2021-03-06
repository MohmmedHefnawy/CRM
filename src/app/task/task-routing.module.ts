import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmenitiesComponent } from './task-details/content-panel/amenities/amenities.component';
import { ContentPanelComponent } from './task-details/content-panel/content-panel.component';
import { DetailsComponent } from './task-details/content-panel/details/details.component';
import { MediaComponent } from './task-details/content-panel/media/media.component';
import { DashBoardComponent } from './task-details/dash-board/dash-board.component';
import { DesignersPanelComponent } from './task-details/designers-panel/designers-panel.component';
import { PhotographerPanelComponent } from './task-details/photographer-panel/photographer-panel.component';
import { TaskDetailsComponent } from './task-details/task-details.component'
import { TeamStatusComponent } from './task-details/team-status/team-status.component';
import { TaskComponent } from './task.component';
import { AuthGuard } from '../auth/components/auth/auth.guard';
import { DescriptionComponent } from './task-details/content-panel/description/description.component';
import { MasterRoleGuard } from '../auth/components/auth/masterRole.guard';

import { LocationComponent } from './task-details/content-panel/location/location.component';
import { ActivitiesComponent } from './task-details/activities/activities.component';
const routes: Routes = [
  { path: 'details', redirectTo: 'task/details/dashBoard:id', pathMatch: 'full' }, // redirect to `profile`
  {
    path: 'details', component: TaskComponent,
    children: [
      { path: 'dashBoard/:id', component: DashBoardComponent},
      { path: 'teamstatus/:id', component: TeamStatusComponent, canActivate: [MasterRoleGuard], data: { syncGuards: 'pm&da&am' } },
      { path: 'photographer/:id', component: PhotographerPanelComponent, canActivate: [MasterRoleGuard], data: { syncGuards: 'pm&da&am&ph' } },
      { path: 'designer/:id', component: DesignersPanelComponent, canActivate: [MasterRoleGuard], data: { syncGuards: 'pm&da&am&ds' } },
      { path: 'activities/:id', component: ActivitiesComponent },
      {
        path: 'content', component: ContentPanelComponent,
        children: [
          { path: 'description/:id', component: DescriptionComponent},
          { path: 'location/:id', component: LocationComponent },
          { path: 'media/:id', component: MediaComponent },
          { path: 'details/:id', component: DetailsComponent },
          { path: 'amenities/:id', component: AmenitiesComponent }
        ], canActivate: [MasterRoleGuard], data: { syncGuards: 'pm&da&am&cm' }
      }
    ], canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {
  static forRoot: any;
}
