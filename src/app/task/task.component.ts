import { TaskDetailsService } from 'src/app/task/services/task-details.service';
import { Component, OnInit } from '@angular/core';
import { NavigatorServicesService } from '../shared/services/navigator-services.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  // Navigators
  navigator = {
    icon: "/assets/Icons/Teamwork.svg",
    title: 'Prop Details',
    navigators: ['DashBoard', 'Team Status', 'Photographers', 'Designers', 'Property Details', 'Activities'],
    routers: [`/task/details/dashBoard/${this.taskDetails.propID}`, `/task/details/teamstatus/${this.taskDetails.propID}`, `/task/details/photographer/${this.taskDetails.propID}`, `/task/details/designer/${this.taskDetails.propID}`, `/task/details/content/amenities/${this.taskDetails.propID}`, `/task/details/activities/${this.taskDetails.propID}`],
    api: []
  }
  constructor(public navService: NavigatorServicesService, public taskDetails: TaskDetailsService) { }
  ngOnInit() {
    this.navService.navigators = this.navigator;
  }
}
