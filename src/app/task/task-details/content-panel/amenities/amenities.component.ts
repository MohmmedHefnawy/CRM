import { LoginComponent } from './../../../../auth/components/login/login.component';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit, OnDestroy {
  // amenitiesArr = this.taskDetailsService.selectedAmen

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
  }
  selectedAmenity(amen) {
    for (let singleAmen of this.taskDetailsService.selectedAmen) {
      if (singleAmen == amen.id) {
        this.taskDetailsService.selectedAmen.splice(this.taskDetailsService.selectedAmen.indexOf(singleAmen), 1)
        amen.check = false
        return
      }
    }
    this.taskDetailsService.selectedAmen.push(amen.id)
    amen.check = true
    console.log(this.taskDetailsService.selectedAmen);
  }

  sendAmenData() {
    let data = {
      action: 'property_features',
      id: this.taskDetailsService.propID,
      features: this.taskDetailsService.selectedAmen
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
