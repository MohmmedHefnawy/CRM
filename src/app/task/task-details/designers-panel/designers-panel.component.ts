import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/shared/socket/socket.service';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-designers-panel',
  templateUrl: './designers-panel.component.html',
  styleUrls: ['./designers-panel.component.css']
})
export class DesignersPanelComponent implements OnInit {
  // unSubscribe: Subscription
  imageBaseURL = environment.imageBaseurl
  inpUploadDesigner;
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public socketService: SocketService) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.socketON('Uploaded')
    this.socketON('Error_Uploaded')
  }

  // ! Controller


  // ! API POST And PATCH


  // ! Socket Handler
  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      console.log(`Receiver From Designer Component : ...... ${res}`);
    }, err => {
    }, () => {
    })
  }
}
