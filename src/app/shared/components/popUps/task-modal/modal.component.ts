import { InLoadingService } from '../../../services/in-loading.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssignUserService } from '../../../services/assign-user.service';
import { UserTaskService } from 'src/app/task/services/user-task.service';
import { UsersMapService } from 'src/app/shared/services/users-map.service'
import { TaskDetailsService } from 'src/app/task/services/task-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/user/services/teams.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  // [@] Verbs
  today =  new Date().toJSON().slice(0,10).replace(/-/g,'/');
  imageBaseURL = environment.imageBaseurl
  rollId_isActive;
  searchText;
  userRoleID
  prop:any
  _urlPath
  isAssigned:boolean = false
  // ! Constructor
  constructor(public assignUserService: AssignUserService, public loading: InLoadingService, public userTaskService: UserTaskService,
     public usersMapService: UsersMapService, public taskDetails: TaskDetailsService, public teamService: TeamsService,
     private router: Router, private acitveRouter :ActivatedRoute){}
  // ! OnInit
  ngOnInit(): void {
    this._urlPath = this.acitveRouter.snapshot.url[0].path
    console.log(this._urlPath);
  }
  // [#] Controlers
  openPopup(prop, roleId){
    $('#openPop').click()
    this.prop = prop
    // this.propTitle = propTitle
    this.isAssigned = false
    this.activeRoute(roleId)
    // get dubai admin by ( role id 2)
    this.getUsersByRoleID(roleId)
    this.searchText= ""
  }
  // Assign Task 
  assignTask(userID, expiryDate, userRole_id){
    this.userRoleID = userRole_id
    expiryDate ? this.postUsersByRoleID(userID, expiryDate) : false
  }
  // Update Task Out Card profile
  updateTaskOuterCard(userRole_id){
    let userMap = this.usersMapService.usersMap[userRole_id.toString()]
    switch(this._urlPath){
      case "profile":
        // loop for porps in profile
        let props = this.userTaskService.userTasks
        for (let singleProp of props ) {
          if (singleProp.id == this.prop.id) {
            singleProp.tasks[userMap]++;
          }
        }
      break
      default :
        // loop for users in dashboard members List
        this.getUsersToAssign(this.prop.id)
      break
    }
  }
  activeRoute(ID){
  this.rollId_isActive = ID
  }
  // Add Check prop To Assign tasks [Array]
  checkIfAssignedUsers(){
    let allUsers = this.assignUserService.usersByRole,
        assignedUsers = this.assignUserService.assignUsers;
    for (let assingedUser of assignedUsers){
      for (let user of allUsers){
        if (assingedUser.users_id == user.id) {
          user.check = true
          user.expDate = assingedUser.expiry_date
        }
      }
    }
    this.isAssigned = true
  }
  // Route To Properties Profile
  getPropertiesById(ID){
    this.taskDetails.getTaskById(ID).subscribe((res:any)=>{
      this.taskDetails.taskDetails = res.data
    }, err => {},()=>{
      this.taskDetails.propID = ID
      this.router.navigate([`/task/details/dashBoard/${ID}`])
    })
  }
  // [#] HTTP REQs
  // Get Users By Roll ID
  getUsersByRoleID(ID){
    this.isAssigned = false
    this.assignUserService.getUsersByRoleID(ID).subscribe((res:any)=>{
      this.assignUserService.usersByRole = res.data
    },err => {},()=>{
  // get Assign Users ID
    this.getAssignUsers(this.prop.id);
    })
  }
  // Get Assign Users
  getAssignUsers(ID){
    this.assignUserService.getAssignUsers(ID).subscribe((res:any)=>{
    this.assignUserService.assignUsers = res.data
    console.log(this.assignUserService.assignUsers);
    },err =>{},()=>{
      this.checkIfAssignedUsers()
    })
  }
  // Assign Task To User 
  postUsersByRoleID(userID, expireDate){
    let data = {
      users_id : userID,
      post_id :this.prop.id,
      expiry_date : expireDate,
    }
    this.assignUserService.postUsersByRoleID(data).subscribe((res:any)=>{},err =>{},()=>{
      // ! change get Users and edit in Service array
      this.getAssignUsers(this.prop.id);
      this.updateTaskOuterCard(this.userRoleID)
    })
  }
  // Deleted Assign User From Properties
  deleteAssignedUser(user){
    let userMap = this.usersMapService.usersMap[user.role_id.toString()]    
    console.log(userMap)
    this.assignUserService.deleteUserFromProp(user.id, this.prop.id ).subscribe(res=>{
    },err=>{},()=>{
        user.check = false
        // ! change get Users and edit in Service array
        this.getAssignUsers(this.prop.id);
        // if this moadl opend from profile only
        this._urlPath == "profile" ? this.prop.tasks[userMap]-- : false
        // if this moadl opend from dashBoard only // ! change get usres 
        this._urlPath != "profile" ?  this.getUsersToAssign(this.prop.id) : false
        user.expDate = ""
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
      this.getAssignUsers(iD)
      this.router.navigate(['/user/profile/user'])
    })
  }
  // Get User Data
  getUsersToAssign(ID) {
    this.taskDetails.getTaskAssignUser(ID).subscribe((res: any) => {
      this.taskDetails.assignedUsers = res.data
    })
  }
}