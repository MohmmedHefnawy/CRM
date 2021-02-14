import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssignUserService } from './../../services/assign-user.service';
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
  propID
  constructor(public  assignUserService:AssignUserService){}
  ngOnInit(): void {
  }
  // Controls
  openPopup(propID){
    $('#openPop').click()
    this.propID = propID
    
    this.activeRoute(2)
    // get dubai admin by ( role id 2)
    this.getUsersByRoleID(2)
    this.searchText= ""
  }
  // Assign Task 
  assignTask(userID,expiryDate){
    this.postUsersByRoleID(userID, this.propID, expiryDate)
  }
  activeRoute(ID){
  this.rollId_isActive = ID
  }
  // [#] HTTP REQs
  // Get Users By Roll ID
  getUsersByRoleID(ID){
    this.assignUserService.getUsersByRoleID(ID).subscribe((res:any)=>{
      this.assignUserService.usersByRole = res.data
      console.log(res);
    })
  }
  //  Assign Task To User 
  postUsersByRoleID(userID, propID, expireDate){
    let data = {
      users_id : userID,
      post_id : propID,
      expiry_date : expireDate
    }
    this.assignUserService.postUsersByRoleID(data).subscribe((res:any)=>{})
    }
}