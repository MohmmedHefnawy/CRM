import { ProfileServiceService } from './../../services/profile-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // visited user
  visitedUserName = this.teamService.oneUser?.name ? this.teamService.oneUser?.name : '';
  userProfile: boolean;
  // Navigators
  navigator = {
    icon: "/assets/Icons/Profile.svg",
    title: `${this.visitedUserName} Profile`,
    navigators: ['All', 'Pending', 'In Progress', 'Didn\'t Finished', 'Completed'],
    routers: [],
    api: []
  }
  constructor(
    public navService: NavigatorServicesService,
    public authService: AuthService,
    public teamService: TeamsService,
    public profileService: ProfileServiceService,
    private router: Router
  ) {
    let route = this.router.url
    switch (route) {
      // current user
      case '/user/profile':
        this.userProfile = true
        this.navigator.title = 'Profile'
        break;
      // team user
      default:
        this.userProfile = false
        break;
    }

  }
  fileToUpload: File = null;

  ngOnInit(): void {
    this.navService.navigators = this.navigator;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);

  }

  uploadFileToActivity() {
    this.profileService.postPersonalImage(this.fileToUpload).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  // onFileSelect(input) {

  //   console.log(input.files);
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       console.log('Got here: ', e.target.result);
  //     }
  //     reader.readAsDataURL(input.files[0]);
  //     this.profileService.postPersonalImage(input.files[0]).subscribe(res => {
  //       console.log(res);
  //     })
  //     console.log('done');

  //   }
  // }

}


