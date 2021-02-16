import { Component, OnInit } from '@angular/core';
import { InLoadingService } from '../../../services/in-loading.service';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.css']
})
export class TeamModalComponent implements OnInit {
  today =  new Date().toJSON().slice(0,10).replace(/-/g,'/');
  searchTask
  porpDetails
  constructor(public loading: InLoadingService) { }
  teamPopUp(theUser){
    $('#openTeamPop').click()
    this.porpDetails = theUser
  }

  ngOnInit(): void {
  }

}
