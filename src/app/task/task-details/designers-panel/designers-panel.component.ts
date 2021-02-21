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

  fileToUpload: File = null;

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public socketService: SocketService) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.socketService.listenOnUploading()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload) {
      this.uploadFileToActivity()
    }
  }

  uploadFileToActivity() {
    this.taskDetailsService.postFileUpload(this.fileToUpload, this.taskDetailsService.propID).subscribe(res => {
      console.log(res);
      this.socketService.listenOnUploading()

    }, err => {
      console.log(err);
      this.socketService.listenOnUploading()

    }, () => {
      // console.log('File Is Uploaded Omar Allam Gamed Fash5');
      this.socketService.listenOnUploading()

    });
  }

}
