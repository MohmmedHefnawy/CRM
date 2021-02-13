import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';

@Component({
  selector: 'app-designers-panel',
  templateUrl: './designers-panel.component.html',
  styleUrls: ['./designers-panel.component.css']
})
export class DesignersPanelComponent implements OnInit {

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
  }

}
