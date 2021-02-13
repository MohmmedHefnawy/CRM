import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssignUserService } from './../../services/assign-user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  imageBaseURL = environment.imageBaseurl
  rollId_isActive;
  searchText;
  constructor(public  assignUserService:AssignUserService) { }

  ngOnInit(): void {
  }
  // Controls
  openPopup(taskID){
    $('#openPop').click()
    console.log(taskID);
    
    this.activeRoute(2)
    // get dubai admin by ( role id 2)
    this.getUsersByRoleID(2)
    this.searchText= ""
  }
  // 
  assignTask(userID,expiryDate){
    // Todo 
  }
  activeRoute(ID){
  this.rollId_isActive = ID
  }

  // [#] HTTP REQs
  getUsersByRoleID(ID){
    this.assignUserService.getUsersByRoleID(ID).subscribe((res:any)=>{
      this.assignUserService.usersByRole = res.data
      console.log(res);
    })
  }

}

