import { TaskDetailsService } from 'src/app/task/services/task-details.service';
import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';

type NewType = any;

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  constructor(public taskDetailsService: TaskDetailsService) { }
  ngOnInit(): void {

  }
}
