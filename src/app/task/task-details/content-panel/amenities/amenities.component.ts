import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
  }

}
