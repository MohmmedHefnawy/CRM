import { element } from 'protractor';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {
  runTimeServer_URL = environment.runTimeServer
  public socket: io;

  constructor() { }

  ngOnInit(): void {
    // this.listenOnUploading()
  }

  socketDisconnect() {
    this.socket.disconnect()
  }

  // [#] login with user id at socket
  loginSocket(listener, userID, callBack) {
    this.socket = io(this.runTimeServer_URL);
    return this.socket.emit(listener, userID, callBack);
  }
  listenOnUploading() {
    this.socket.on('Error_Uploaded', res => {
      console.log('res is done');
    })
  }
}
