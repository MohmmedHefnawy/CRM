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

  constructor(public taskDetails: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    // [#] snapshot prop [id]
    let propertyID = this.Activerouter.snapshot.params['id']
    this.getPropById(propertyID)
  }
  // [#] HTTP REQs
  getPropById(ID) {
    this.taskDetails.getTaskById(ID).subscribe((res: any) => {
      this.taskDetails.taskDetails = res.data
      console.log(res.data);
    })
  }
  onSubmit(form: NgForm){
    console.log(form);
    
  }
}
