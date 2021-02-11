import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.css']
})
export class ContentPanelComponent implements OnInit, OnDestroy {

  // Navigators
  navigator = {
    icon: "/assets/Icons/Teamwork.svg",
    title: 'Content Creator',
    navigators: ['Description', 'Media', 'Details', 'Amenities'],
    routers: ['/task/details/description/1', '/task/details/content/media/1', '/task/details/content/details/1', '/task/details/content/amenities/1'],
    api: []
  }
  constructor(public navService: NavigatorServicesService) { }
  ngOnInit() {
    this.navService.navigators = this.navigator;
  }
  ngOnDestroy() {

  }

}
