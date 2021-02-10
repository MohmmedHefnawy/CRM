import { Subscription } from 'rxjs';
import { ProfileServiceService } from './../../services/profile-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';
import { TeamsService } from '../../services/teams.service';
import { environment } from 'src/environments/environment';
import { UserTaskService } from 'src/app/task/services/user-task.service'
import { TaskDetailsService } from 'src/app/task/services/task-details.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subscription: Subscription;
  imageBaseURL = environment.imageBaseurl
  // visited user
  visitedUserName = this.teamService.oneUser?.name ? this.teamService.oneUser?.name : '';
  userProfile = true
  // edit var
  editMyInfo = false
  // image base64
  base64textString = [];
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
    private router: Router,
    public userTaskService: UserTaskService,
    public taskDetails: TaskDetailsService
  ) {
    let route = this.router.url
    switch (route) {
      // current user
      case '/user/profile':
        this.userProfile = true
        this.navigator.title = 'Profile'
        localStorage.removeItem("teamUser");
        this.getAllProps('en', 1, 10, '', '')
        break;
      // team user
      default:
        teamService.oneUser = JSON.parse(localStorage.getItem("teamUser"))
        this.userProfile = false
        break;
    }

  }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;
    setTimeout(() => { console.log(this.authService.user); }, 1000)
  }
  // [#] Controller
  saveMyInfo(textContent) {
    switch (textContent) {
      case 'Save':
        let userLocInp = $('#userLocInp').val(),
          userNameInp = $('#userNameInp').val(),
          userBioInp = $('#userBioInp').val();
        let userInfo = { name: userNameInp, address: userLocInp, bio: userBioInp }
        this.updateMyInfo(userInfo)
        break;
    }
  }
  uploadMyImage(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.updateImage.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  updateImage(e) {
    let imageObj = { image: 'data:image/png;base64,' + btoa(e.target.result) }
    this.profileService.postImage(imageObj).subscribe(res => {
      this.authService.user = res

    })

  }
  // [#] HTTP REQs
  updateMyInfo(userInfo) {
    this.profileService.postPersonalInfo(userInfo).subscribe(res => {
      this.authService.user = res
      console.log(this.authService.user);

    })
  }
  getAllProps(lang, page, num, status, userID) {
    this.userTaskService.getUserTask(lang, page, num, status, userID).subscribe((res: any) => {
      this.userTaskService.userTasks = res.data
      console.log(this.userTaskService.userTasks);

    })
  }
  getPropById(ID){
    this.taskDetails.getTaskById(ID).subscribe((res: any)=>{
      this.taskDetails.taskDetails = res.data
      console.log(res.data);
    })
  }
  // [#]  Life cycles
  ngOnDestroy(): void {
    this.userTaskService.userTasks = ''
  }
}


