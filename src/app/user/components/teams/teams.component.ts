import { NavigatorServicesService } from './../../../shared/services/navigator-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  // Navigators
  navigator = {
    icon: "/assets/Icons/Teamwork.svg",
    title: 'teams',
    navigators: ['Project Manegers', 'Dubai Admins', 'Account Manegers', 'Photographers', 'Designers', 'Content Creators'],
  }

  constructor(public navService: NavigatorServicesService) { }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;

  }
}
