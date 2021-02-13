import { TaskDetailsService } from 'src/app/task/services/task-details.service';
import { AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.css']
})
export class ContentPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(public navService: NavigatorServicesService, public taskDetails: TaskDetailsService) { }
  // Navigators
  navigator
  ngOnInit() {
    console.log('here', this.taskDetails.propID);
    setTimeout(() => { console.log('here', this.taskDetails.propID); }, 1000)
  }
  ngAfterViewInit() {
    this.navigator = {
      icon: "/assets/Icons/Teamwork.svg",
      title: 'Content Creator',
      navigators: ['Description', 'Location', 'Media', 'Details', 'Amenities'],
      routers: [`/task/details/content/description/${this.taskDetails.propID}`, `/task/details/content/location/${this.taskDetails.propID}`, `/task/details/content/media/${this.taskDetails.propID}`, `/task/details/content/details/${this.taskDetails.propID}`, `/task/details/content/amenities/${this.taskDetails.propID}`],
      api: []
    }
    this.navService.navigators = this.navigator;
    console.log('chi');

  }
  ngOnDestroy() {

  }

}
