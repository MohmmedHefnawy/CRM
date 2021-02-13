import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { TaskDetailsService } from 'src/app/task/services/task-details.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    // [#] snapshot prop [id]
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.getPropById(this.taskDetailsService.propID)
  }
  // [#] HTTP REQs
  getPropById(ID) {
    this.taskDetailsService.getTaskById(ID).subscribe((res: any) => {
      this.taskDetailsService.taskDetails = res.data
      console.log('taskDetailsService', this.taskDetailsService.taskDetails);
    }, err => { }, () => {
      this.taskDetailsService.propID = ID;
    })
  }
  onSubmit(form: NgForm) {
    console.log(form);

  }
}
