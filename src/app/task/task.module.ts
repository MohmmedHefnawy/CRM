import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SideContentComponent } from './side-content/side-content.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DashBoardComponent } from './task-details/dash-board/dash-board.component';
import { PhotographerPanelComponent } from './task-details/photographer-panel/photographer-panel.component';
import { DesignersPanelComponent } from './task-details/designers-panel/designers-panel.component';
import { ContentPanelComponent } from './task-details/content-panel/content-panel.component';
import { ActivitiesComponent } from './task-details/activities/activities.component';
import { TeamStatusComponent } from './task-details/team-status/team-status.component';
import { DetailsComponent } from './task-details/content-panel/details/details.component';
import { AmenitiesComponent } from './task-details/content-panel/amenities/amenities.component';
import { MediaComponent } from './task-details/content-panel/media/media.component';
import { DescriptionComponent } from './task-details/description/description.component';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './task-details/content-panel/location/location.component';

@NgModule({
  declarations: [TaskComponent, SideContentComponent, TaskDetailsComponent, DashBoardComponent, PhotographerPanelComponent, DesignersPanelComponent, ContentPanelComponent, ActivitiesComponent, TeamStatusComponent, DetailsComponent, AmenitiesComponent, MediaComponent, DescriptionComponent, LocationComponent],
  exports: [SideContentComponent, TaskDetailsComponent, TaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule
  ]
})
export class TaskModule { }
