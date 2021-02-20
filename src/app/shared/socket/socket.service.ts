import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  runTimeServer_URL = environment.runTimeServer
  public socket: io;

  constructor() {
    // this.socket = io.connect('http://localhost:8000');

  }
  socketDisconnect() {
    this.socket.disconnect()
  }
  // [#] login with user id at socket
  loginSocket(listener, userID, callBack) {
    this.socket = io(this.runTimeServer_URL);
    return this.socket.emit(listener, userID, callBack);
  }
}
