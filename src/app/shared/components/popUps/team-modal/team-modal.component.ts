import { AssignPropertiesService } from './../../../services/assign-properties.service';
import { Component, OnInit } from '@angular/core';
import { InLoadingService } from '../../../services/in-loading.service';
import { environment } from 'src/environments/environment';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';

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
  constructor(public loading: InLoadingService,public assignUserService: AssignUserService) { }
  ngOnInit(): void {
   
  }
  // [#] Controls
  openTeamPopup(theUser){
    $('#openTeamPop').click()
    this.isAssigned = false
    this.theUser = theUser
    console.log( this.theUser)
    this.getAllProperties("en", 25, 1, "inProgress","" )
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
        }
      }
    }
    this.isAssigned = true
  }
  // [#] HTTP REQs
  // Get All Properties
  getAllProperties(lang, num, page, status, user_id){
    this.assignUserService.getAllProperties(lang, num, page, status, user_id).subscribe((res:any)=>{
    this.assignUserService.propLists = res.data
    
    this.assignUserService.pagination =  res.pages
    },err =>{},()=>{
      this.getTeamProperties(this.theUser.id);
    })
  }
  // Get All UserProperties
  getTeamProperties(user_id){
    this.assignUserService.getAllProperties("", "", "", "", user_id).subscribe((res:any)=>{
    this.assignUserService.userProperties = res.data
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
      this.getTeamProperties(this.theUser.id)
    })
  }
  // Deleted Task From User
  deleteAssignedUser(theUser, taskProps){
    this.assignUserService.deleteUserFromProp(theUser.id, taskProps.id).subscribe(res=>{
      console.log(theUser.id, taskProps.id);
    },err=>{},()=>{
      taskProps.check = false
    })
  }
}