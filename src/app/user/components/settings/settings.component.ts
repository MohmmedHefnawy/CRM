import { Component, OnInit } from '@angular/core';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';
import { SettingsServiceService } from 'src/app/user/services/settings-service.service'

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
    routers: ['user/settings/personal-info', 'user/settings/change-password', 'user/settings/contact'],
    api : []
  }

  constructor(public navService: NavigatorServicesService, public settingsService: SettingsServiceService) { }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;
  }
}
