import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  visitedUserName = this.teamService.oneUser?.name ? this.teamService.oneUser?.name : ''
  // Navigators
  navigator = {
    icon: "/assets/Icons/Profile.svg",
    title: `${this.visitedUserName} Profile`,
    navigators: ['All', 'Pending', 'In Progress', 'Didn\'t Finished', 'Completed'],
    routers: [],
    api: []
  }
  obj: any;
  constructor(public navService: NavigatorServicesService, public authService: AuthService, public teamService: TeamsService) { }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;
  }
  onFileSelect(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('Got here: ', e.target.result);
        this.obj.photoUrl = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }

  }

}
