import { InLoadingService } from '../../../services/in-loading.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssignUserService } from '../../../services/assign-user.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  today =  new Date().toJSON().slice(0,10).replace(/-/g,'/');
  imageBaseURL = environment.imageBaseurl
  rollId_isActive;
  searchText;
  prop:any
  isAssigned:boolean = false
  constructor(public assignUserService:AssignUserService, public loading: InLoadingService){}
  ngOnInit(): void {
  }
  // Controls
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
  assignTask(userID,expiryDate){
    this.postUsersByRoleID(userID, this.prop.id, expiryDate)
  }
  activeRoute(ID){
  this.rollId_isActive = ID
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
  //  Assign Task To User 
  postUsersByRoleID(userID, propID, expireDate){
    let data = {
      users_id : userID,
      post_id :this.prop.id,
      expiry_date : expireDate,
    }
    this.assignUserService.postUsersByRoleID(data).subscribe(
    (res:any)=>{

    },
    err =>{

    },
    ()=>{
         this.getAssignUsers(this.prop.id);
    })
  }
// Add Check prop To Assign tasks [Array]
  checkIfAssignedUsers() {
    let allUsers = this.assignUserService.usersByRole,
        assignedUsers = this.assignUserService.assignUsers;
      for(let assingedUser of assignedUsers ){
        for(let user of allUsers){
          if(assingedUser.users_id == user.id){
            user.check = true
            user.expDate = assingedUser.expiry_date
          }
        }
      }
    this.isAssigned = true
  }
} 