import { SocketService } from 'src/app/shared/socket/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.listenOnUploading('Uploaded').subscribe(res => {
      console.log(res);
      console.log('here in designers comp');
    })
  }

}
