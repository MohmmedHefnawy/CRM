import { Component, OnInit } from '@angular/core';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // Navigators
  navigator = {
    icon: "/assets/Icons/Settings.svg",
    title: 'settings',
    navigators: ['Personal Info', 'Change Password', 'Contact'],
    routers: ['user/settings/personal-info', 'user/settings/change-password', 'user/settings/contact']
  }

  constructor(public navService: NavigatorServicesService) { }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;

  }
}
