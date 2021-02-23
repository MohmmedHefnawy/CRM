import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/shared/socket/socket.service';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';

@Component({
  selector: 'app-designers-panel',
  templateUrl: './designers-panel.component.html',
  styleUrls: ['./designers-panel.component.css']
})
export class DesignersPanelComponent implements OnInit {
  // unSubscribe: Subscription
  inpUploadDesigner;
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public socketService: SocketService) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.socketON('Uploaded')
    this.socketON('Error_Uploaded')
  }

  changeValue(val) {
    console.log(val.Package3DPhoto);
    this.inpUploadDesigner = val.Package3DPhoto
  }
  handleFileInput(files: FileList) {
    let fileToUpload = files.item(0);
    if (fileToUpload) {
      this.uploadFileToActivity(fileToUpload)
    }
  }

  uploadFileToActivity(uploadedFIle) {
    this.taskDetailsService.postFileUpload(uploadedFIle).subscribe(res => {
      console.log(res);

    });
  }
  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      this.changeValue(res)
      console.log(`Receiver From Designer Component : ...... ${res}`);
    }, err => {
    }, () => {
    })
  }
}
