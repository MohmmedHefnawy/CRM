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
    routers: ['/task/details/dashBoard/1', '/task/details/teamstatus/1', '/task/details/photographer/1', '/task/details/designer/1', '/task/details/content/amenities/1', '/task/details/activities'],
    api: []
  }
  constructor(public navService: NavigatorServicesService) { }
  ngOnInit() {
    this.navService.navigators = this.navigator;
  }
}
