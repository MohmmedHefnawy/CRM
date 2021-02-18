import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit, OnDestroy {
  amenitiesArr = []

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
  }
  selectedAmenity(amen) {
    for (let singleAmen of this.amenitiesArr) {
      if (singleAmen?.id == amen.id) {
        this.amenitiesArr.splice(this.amenitiesArr.indexOf(singleAmen), 1)
        console.log(this.amenitiesArr);
        amen.check = false
        return
      }
    }
    this.amenitiesArr.push(amen)
    amen.check = true
    console.log(this.amenitiesArr);
  }

  sendAmenData() {
    let data = {
      action: 'property_features',
      id: this.taskDetailsService.propID,
      features: this.amenitiesArr
    }
    this.postAmenities(data)
  }
  postAmenities(data) {
    this.taskDetailsService.postPropertyData(data).subscribe(res => {
      console.log(res);

    })
  }

  ngOnDestroy(): void {
    console.log('Destroyed');

  }
}
