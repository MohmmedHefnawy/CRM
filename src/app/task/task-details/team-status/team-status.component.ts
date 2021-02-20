import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css']
})
export class TeamStatusComponent implements OnInit {
  imageBaseURL = environment.imageBaseurl


  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.getUsersToAssign(this.taskDetailsService.propID)
  }
  getUsersToAssign(ID) {
    this.taskDetailsService.getTaskAssignUser(ID).subscribe((res: any) => {
      this.taskDetailsService.assignedUsers = res.data
    })
  }


}
