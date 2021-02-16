import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
  }
  onSubmit(form: NgForm) {
    console.log(this.taskDetailsService?.taskDetails);
    form.value.id = this.taskDetailsService.propID
    form.value.action = 'location'
    form.value.old_city = this.taskDetailsService?.old_city
    for (let city of this.taskDetailsService.propStaticData?.property_city) {
      if (city.name == form.value.city) {
        form.value.city = city.id;
      }
    }
    // console.log(form.value);

    this.postAllLocationData(form.value)
  }
  postAllLocationData(data) {
    this.taskDetailsService.postPropertyData(data).subscribe(res => {
      console.log(res);
    })
  }
}
