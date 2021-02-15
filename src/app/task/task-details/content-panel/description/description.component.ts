import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  }
  // [#] HTTP REQs
  onSubmit(form: NgForm) {
    form.value.old_status = this.taskDetailsService.old_status
    form.value.old_category = this.taskDetailsService.old_category
    form.value.old_type = this.taskDetailsService.old_type
    form.value.id = this.taskDetailsService.propID
    form.value.action = 'description'
    for (let status of this.taskDetailsService.propStaticData?.property_status){
      if (form.value.status == status.name ){
        form.value.status = status.id
      }
    }
    for (let category of this.taskDetailsService.propStaticData?.property_category) {
      if (form.value.category == category.name) {
        form.value.category = category.id
      }
    }
    for (let type of this.taskDetailsService.propStaticData?.property_action_category) {
      if (form.value.type == type.name) {
        form.value.type = type.id
      }
    }
    console.log(form.value);
    
    // [#] post discription 
    this.postForm(form.value)
  }

  postForm(data) {
    this.taskDetailsService.postPropertyDescription(data).subscribe(res => {
      // this.taskDetailsService.propID = ID
      console.log(res);
    })
  }

}
