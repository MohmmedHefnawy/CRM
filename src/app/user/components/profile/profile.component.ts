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
import { trigger, state, style, animate, transition, keyframes } from "@angular/animations";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger("rotatedState", [
      state("default", style({ transform: "rotate(0)" })),
      state("rotated", style({ transform: "rotate(-100deg)" })),
      transition("rotated <=> default", animate("200ms ease-out")),
    ])
  ]
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
  // Verbs Used To Active Animation On Profile Call Icon
  state: string = "default";
  // Navigators
  navigator = {
    icon: "/assets/Icons/Profile.svg",
    title: `${this.visitedUserName} Profile`,
    navigators: ['All', 'Pending', 'In Progress', 'Expired', 'Completed'],
    routers: ['/user/profile', '/user/me/profile/pending', '/user/me/profile/inProgress', '/user/me/profile/expired', '/user/me/profile/publish'],
    api: []
  }
  isIndex:number = -1
  // [#]  Life cycles
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
    // status
    let urlStatus = this.activeRouter.snapshot?.url[2]?.path
    this.checkUser(route, urlStatus)
  }
// [#]  Life cycles
  ngOnInit(): void {
    this.navService.navigators = this.navigator;
    setTimeout(()=>{
      console.log(this.authService.user);
    },1000)
    // Function PopOver
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  }
  // [#] Controller
  // Open popover With Click Call Icon At Cards
  openPopover(e){
    $('[data-toggle="popover"]').popover()
    e.stopPropagation()
  }
  // Rotate Call Icon At Profile 
  rotate() {
    this.state = this.state === "default" ? "rotated" : "default";
  }
  // Check Users Router
  checkUser(route, status) {
    !status ? status =  "" :false        
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
    e.stopPropagation();
    userRoleID == 1 ? this.assignTask(propID) : this.changeTaskStatus(propID)
  }
  // open modal from ModalComponent
  openPopUp(e, prop, roleId) {
    console.log(prop)
    e.stopPropagation();
    this.popUp.openPopup(prop, roleId)
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
  // Uploaded Img To Server
  uploadMyImage(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.updateImage.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  // Update Img To Server
  updateImage(e) {
    let imageObj = { image: 'data:image/png;base64,' + btoa(e.target.result) }
    this.profileService.postImage(imageObj).subscribe(res => {
      this.authService.user = res
    })

  }
  // Handle Pagination 
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
  // Get All Properties 
  getAllProps(lang, page, num, status, userID) {
    this.userTaskService.getUserTask(lang, page, num, status, userID).subscribe((res: any) => {
      this.userTaskService.userTasks = res.data
      this.userTaskService.pagination = res.pages
      console.log(this.userTaskService.userTasks)
    })
  }
  // Get Properties By ID
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
            console.log(singleProp)
          }
        }
    })
  }
  // [#]  Life cycles
  ngOnDestroy(): void {
    this.userTaskService.userTasks = ''
  }
}


