import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';

@Component({
  selector: 'app-photographer-panel',
  templateUrl: './photographer-panel.component.html',
  styleUrls: ['./photographer-panel.component.css']
})
export class PhotographerPanelComponent implements OnInit {

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']

  }

}
