import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit, OnDestroy {

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    // this.checkIfSelected()
  }
  ngOnDestroy(): void {
    console.log('Destroyed');

  }
  // checkIfSelected(){
  //   let propStaticData = this.taskDetailsService.propStaticData?.property_features,
  //     taskDetails = this.taskDetailsService.taskDetails?.property_features
  //   for (let staticDatta of propStaticData){
  //     if (taskDetails.includes(staticDatta.name)){
  //       staticDatta.check = false
  //     }else{
  //       staticDatta.check = true
  //     }
  //   }
  // }
}
