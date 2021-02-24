import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from 'src/environments/environment';
import { ModalComponent } from 'src/app/shared/components/popUps/task-modal/modal.component';
import { TeamsService } from 'src/app/user/services/teams.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';
import { UserTaskService } from '../../services/user-task.service';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css']
})
export class TeamStatusComponent implements OnInit {

  @ViewChild(ModalComponent) taskModal: ModalComponent

  // [@] Verbs 
  imageBaseURL = environment.imageBaseurl
  prop
  constructor(public taskDetailsService: TaskDetailsService,
    private Activerouter: ActivatedRoute,
    public teamService: TeamsService,
    private router: Router,
    public authService: AuthService,
    public assignUserService: AssignUserService,
    public userTaskService: UserTaskService,
       ) {}
  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.getUsersToAssign(this.taskDetailsService.propID)
  }
  // [#] Controler
  openModal(){
  this.prop = {
    title: this.taskDetailsService.taskDetails.description.title,
    id: this.taskDetailsService.taskDetails.id,
    images: this.taskDetailsService.taskDetails.images
  }
    this.taskModal.openPopup(this.prop , 2)
  }
  // [#] REQ
  // Get User Data
  getUsersToAssign(ID) {
    this.taskDetailsService.getTaskAssignUser(ID).subscribe((res: any) => {
      this.taskDetailsService.assignedUsers = res.data
      console.log(this.taskDetailsService.assignedUsers)
    })
  }
  // Open Selected User profile
  goToUserProfile(iD) {
    let userID = { user_id: iD }
    this.teamService.getUserByID(userID).subscribe((res: any) => {
      this.teamService.oneUser = res.data
      localStorage.setItem("teamUser", JSON.stringify(this.teamService.oneUser))
    }, err => {
    }, () => {
      this.getUsersToAssign(iD)
      this.router.navigate(['/user/profile/user'])
    })
  }
  // [?] start Task
  startTask(e, propID) {
    let userRoleID = this.authService.user.data.role_id
    userRoleID == 1 ? this.assignTask(propID) : this.changeTaskStatus(propID)
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
  changeTaskStatus(propID) {
    let data = {
      users_id: this.authService.user?.data.id,
      post_id: propID,
      status_id: 2
    }
    this.assignUserService.propChangeStatus(data).subscribe(res => {
      console.log(res)
    }, err => { }, () => {
      for (let singleProp of this.userTaskService.userTasks) {
        if (singleProp.id == propID) {
          singleProp.tasks_status = '2'
          this.authService.user.data.inProgress++
          console.log(singleProp)
        }
      }
    })
  }
}
