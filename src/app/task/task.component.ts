import { TaskDetailsService } from 'src/app/task/services/task-details.service';
import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NavigatorServicesService } from '../shared/services/navigator-services.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy, AfterViewInit {

  // Navigators
  navigator
  constructor(public navService: NavigatorServicesService, public taskDetails: TaskDetailsService) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.navigator = {
      icon: "/assets/Icons/Teamwork.svg",
      title: 'Prop Details',
      navigators: ['DashBoard', 'Team Status', 'Photographers', 'Designers', 'Property Details', 'Activities'],
      routers: [`/task/details/dashBoard/${this.taskDetails.propID}`, `/task/details/teamstatus/${this.taskDetails.propID}`, `/task/details/photographer/${this.taskDetails.propID}`, `/task/details/designer/${this.taskDetails.propID}`, `/task/details/content/description/${this.taskDetails.propID}`, `/task/details/activities/${this.taskDetails.propID}`],
      api: []
    }
    this.navService.navigators = this.navigator;
    this.getPropById(this.taskDetails.propID)
    console.log('fire');
  }

  getPropById(ID) {
    this.taskDetails.getTaskById(ID).subscribe((res: any) => {
      this.taskDetails.taskDetails = res.data
      console.log('Details', this.taskDetails.taskDetails);
    }, err => { }, () => {
      this.taskDetails.propID = ID;
      this.getPropertyStaticData('en')
    })
  }
  getPropertyStaticData(lang) {
    this.taskDetails.getPropertyStaticData(lang).subscribe((res: any) => {
      this.taskDetails.propStaticData = res.data
      console.log('langs', this.taskDetails.propStaticData);
    }, err => { }, () => { this.checkIfAmenities()})
  }
  // Add Check Prop To propStaticData [Array]
  checkIfAmenities() {
    let propStaticData = this.taskDetails.propStaticData?.property_features,
        taskDetails = this.taskDetails.taskDetails?.property_features
    for (let staticDatta of propStaticData) {
      if (taskDetails.includes(staticDatta.name)) {
        staticDatta.check = true
      } else {
        staticDatta.check = false
      }
    }
  }
  ngOnDestroy(): void {

  }
}
