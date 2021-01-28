import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Navigators
  navigator = {
    icon: "/assets/Icons/Profile.svg",
    title: 'Profile',
    navigators: ['All', 'Pending', 'In Progress', 'Didn\'t Finished', 'Completed'],
    routers: []
  }
  constructor(public navService: NavigatorServicesService, public authService: AuthService) { }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;

  }

}
