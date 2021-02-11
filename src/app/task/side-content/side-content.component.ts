import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service'
import { Location } from '@angular/common';
@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})
export class SideContentComponent implements OnInit {
  propID;
  constructor(public taskDetailsService: TaskDetailsService, public Activerouter: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

  }
}
