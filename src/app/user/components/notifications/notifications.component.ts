import { Component, OnInit } from '@angular/core';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  // Navigators
  navigator = {
    icon: "/assets/Icons/notifi.svg",
    title: 'Notifications'
  }

  constructor(public navService: NavigatorServicesService) { }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;

  }

}
