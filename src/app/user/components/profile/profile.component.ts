import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileServiceService } from './../../services/profile-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';
import { TeamsService } from '../../services/teams.service';
import { environment } from 'src/environments/environment';
import { UserTaskService } from 'src/app/task/services/user-task.service'
import { TaskDetailsService } from 'src/app/task/services/task-details.service'
import { ModalComponent } from 'src/app/shared/components/popUps/task-modal/modal.component';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(ModalComponent) popUp: ModalComponent
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
    navigators: ['All', 'Pending', 'In Progress', 'Expired', 'Completed'],
    routers: ['/user/profile', '/user/me/profile/pending', '/user/me/profile/inProgress', '/user/me/profile/expired', '/user/me/profile/publish'],
    api: []
  }
  constructor(
    public navService: NavigatorServicesService,
    public authService: AuthService,
    public teamService: TeamsService,
    public profileService: ProfileServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public userTaskService: UserTaskService,
    public taskDetails: TaskDetailsService,
    public assignUserService: AssignUserService
  ) {
    let route = this.router.url
    // statuss
    let urlStatus = this.activeRouter.snapshot?.url[2]?.path
    this.checkUser(route, urlStatus)
  }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;
    setTimeout(() => {
      console.log(this.userTaskService.userTasks);
    }, 2000)
  }
  // [#] Controller
  checkUser(route, status) {
    !status ? status =  "" :false    
    console.log(status);
    
    switch (route) {
      // current user
      case '/user/profile':
      case '/user/me/profile/pending':
      case '/user/me/profile/inProgress':
      case '/user/me/profile/expired':
      case '/user/me/profile/publish':
        this.userProfile = true
        this.navigator.title = 'Profile'
        localStorage.removeItem("teamUser");
        this.getPropsByStatus(status)
        break;
      // team user
      default:
        this.userProfile = false
        this.teamService.oneUser = JSON.parse(localStorage.getItem("teamUser"))
        this.navigator.title = `${this.teamService.oneUser?.name} Profile`
        this.navigator.routers = ['/user/profile/user', '/user/profile/user/pending', '/user/profile/user/inProgress', '/user/profile/user/expired', '/user/profile/user/publish']
        // this.getAllProps('en', 1, 25, '', this.teamService.oneUser?.id)
        this.getPropsByStatus(status, this.teamService.oneUser?.id)
        break;
    }
  }
  // [#] get propertys by status by (click) status cards
  getPropsByStatus(status = "", userID = '') {
    this.getAllProps('en', 1, 25, status, userID)
  }
  // [?] start Task
  startTask(e, propID) {
    let userRoleID = this.authService.user.data.role_id
    console.log(userRoleID);
    e.stopPropagation();
    userRoleID == 1 ? this.assignTask(propID) : this.changeTaskStatus(propID)
  }
  // open modal from ModalComponent
  openPopUp(e, prop, roleId, action) {
    console.log(prop)
    e.stopPropagation();
    this.popUp.openPopup(action, prop, roleId)
    //  this.router.navigate([`/user/profile/assign-user`])
  }
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
  handlePageChange(event) {
    $('.M0-content-holder').get(0).scrollTo({ top: 0, behavior: 'smooth' });
    this.getAllProps('en', event, 25, '', '')
  }
  // [#] HTTP REQs
  updateMyInfo(userInfo) {
    this.profileService.postPersonalInfo(userInfo).subscribe(res => {
      this.authService.user = res
    })
  }
  getAllProps(lang, page, num, status, userID) {
    this.userTaskService.getUserTask(lang, page, num, status, userID).subscribe((res: any) => {
      this.userTaskService.userTasks = res.data
      this.userTaskService.pagination = res.pages
    })
  }
  getPropById(ID) {
    this.taskDetails.getTaskById(ID).subscribe((res: any) => {
      this.taskDetails.taskDetails = res.data
    }, err => { }, () => {
      this.taskDetails.propID = ID;
      this.router.navigate([`/task/details/dashBoard/${ID}`])
    })
  }
  // if PM
  assignTask(propID) {
    let data = {
      users_id: this.authService.user?.data.id,
      post_id: propID,
      expiry_date: '',
      status_id: 2
    }
    this.assignUserService.postUsersByRoleID(data).subscribe(res => {
    }, err => { }, () => {
      for (let singleProp of this.userTaskService.userTasks) {
        if (singleProp.id == propID) {
          singleProp.tasks_status = '2'
          this.authService.user.data.inProgress++
        }
      }
    })
  }
  // if !PM
  changeTaskStatus(propID){
    let data  = {
      users_id: this.authService.user?.data.id,
      post_id: propID,
      status_id: 2
    }
    this.assignUserService.propChangeStatus(data).subscribe(res=>{

    },err=>{}, ()=>{
        for (let singleProp of this.userTaskService.userTasks) {
          if (singleProp.id == propID) {
            singleProp.tasks_status = '2'
            this.authService.user.data.inProgress++
          }
        }
    })
  }
  // [#]  Life cycles
  ngOnDestroy(): void {
    this.userTaskService.userTasks = ''
  }
}


