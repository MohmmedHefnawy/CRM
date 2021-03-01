import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service'
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';
@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})
export class SideContentComponent implements OnInit {
  propID;
  imageBaseURL = environment.imageBaseurl
  constructor(public taskDetailsService: TaskDetailsService,
      public Activerouter: ActivatedRoute,
      private location: Location,
      public authService: AuthService,
      public assignUserService: AssignUserService
      ) { }

  ngOnInit(): void {
    setTimeout(() => { console.log(this.authService.user);
      console.log(this.taskDetailsService.taskDetails);
    }, 1000)
    // Popover Function
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  }
  changeUserTaskStatus(propID, taskStatus){
    let data = {
      users_id: this.authService.user?.data.id,
      post_id: propID,
      status_id: taskStatus
    }
    this.assignUserService.propChangeStatus(data).subscribe(res=>{
    })
  }
}
