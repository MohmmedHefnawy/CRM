import { AssignPropertiesService } from './../../../services/assign-properties.service';
import { Component, OnInit } from '@angular/core';
import { InLoadingService } from '../../../services/in-loading.service';
import { environment } from 'src/environments/environment';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';
import { TeamsService } from 'src/app/user/services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.css']
})
export class TeamModalComponent implements OnInit {
  today =  new Date().toJSON().slice(0,10).replace(/-/g,'/');
  imageBaseURL = environment.imageBaseurl
  searchProps
  theUser
  propLists
  isAssigned:boolean = false
  constructor(public loading: InLoadingService,public assignUserService: AssignUserService, public teamService: TeamsService, private router: Router) { }
  ngOnInit(): void {
   
  }
  // [#] Controls
  openTeamPopup(action, theUser){
    $('#openTeamPop').click()
    this.isAssigned = false
    this.theUser = theUser
    console.log( this.theUser)
    switch(action){
      case "userList":
        this.getAllProperties("en", 25, 1, "pending", theUser.id );
        break;
      case "assign":
        this.getAllProperties("en", 25, 1, "inProgress","" );
        break;
    }
  }
  // Handling Pagination
  handlePageChange(event) {
    this.getAllProperties('en', 25 , event, 'inProgress', '')
  }
  // Assign Properties 
  assignProp(theUsersID, taskPropsID, expiryDate){
    expiryDate ? this.postAssignProps(theUsersID, taskPropsID, expiryDate) : false
  }
  // Add Check Properties To Assign User [Array]
  checkIfAssignProps(){
    let userProperties = this.assignUserService.userProperties,
        allProperties = this.assignUserService.propLists;
      for(let userProp of userProperties){
      for(let prop of allProperties ){
        if(prop.id == userProp.id){
          prop.check = true
          prop.expiryDate = userProp.tasks_exp
        }
      }
    }
    this.isAssigned = true
  }
  // Properties Counts
  propCounts(action, theUsersID){
    let users = this.teamService.team
    for( let user of users){
      if(theUsersID == user.id) {
        switch(action){
          case "assign":
            user.prop_count++
            break;
          case "delete":
            user.prop_count--
            break;
        }
      }
    }
  }
  // [#] HTTP REQs
  // Get All Properties
  getAllProperties(lang, num, page, status, user_id){
    this.assignUserService.getAllProperties(lang, num, page, status, user_id).subscribe((res:any)=>{
    this.assignUserService.propLists = res.data
    console.log(this.assignUserService.propLists);
    
    this.assignUserService.pagination =  res.pages
    },err =>{},()=>{
      this.getTeamProperties(this.theUser.id);
    })
  }
  // Get All UserProperties
  getTeamProperties(user_id){
    this.assignUserService.getAllProperties("", "", "", "", user_id).subscribe((res:any)=>{
    this.assignUserService.userProperties = res.data
    console.log(this.assignUserService.userProperties);
    
    },err =>{},()=>{
      this.checkIfAssignProps()
    })
  }
  // Assign Task To User
  postAssignProps(theUsersID, taskPropsID, expiryDate){
    let data = {
      users_id : theUsersID,
      post_id : taskPropsID,
      expiry_date : expiryDate
    }
    this.assignUserService.postUsersByRoleID(data).subscribe((res)=>{
    },err =>{},()=>{
      this.propCounts("assign",theUsersID)
      this.getTeamProperties(this.theUser.id)
    })
  }
  // Deleted Task From User
  deleteAssignedUser(theUser, taskProps){
    this.assignUserService.deleteUserFromProp(theUser.id, taskProps.id).subscribe(res=>{
      console.log(theUser.id, taskProps.id);
    },err=>{},()=>{
      this.propCounts("delete",theUser.id)
      taskProps.check = false
      taskProps.expiryDate = ""
      this.getTeamProperties(theUser.id)
    })
    this.isAssigned = true
  }
  goToUserProfile(iD) {
    let userID = { user_id: iD }
    this.teamService.getUserByID(userID).subscribe((res: any) => {
      this.teamService.oneUser = res.data
      localStorage.setItem("teamUser", JSON.stringify(this.teamService.oneUser))
    }, err => {
    }, () => {
      this.getAllProperties('en', 1, 10, '', iD)
      this.router.navigate(['/user/profile/user'])
    })
  }
}