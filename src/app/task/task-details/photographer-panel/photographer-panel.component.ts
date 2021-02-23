import { SocketService } from 'src/app/shared/socket/socket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';

@Component({
  selector: 'app-photographer-panel',
  templateUrl: './photographer-panel.component.html',
  styleUrls: ['./photographer-panel.component.css']
})
export class PhotographerPanelComponent implements OnInit {
  changeText: boolean;
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public socketService: SocketService) {
    this.changeText = false;
  }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.socketON('Uploaded')
    this.socketON('Error_Uploaded')
  }
  imageTitle(val) {
    console.log(val);
  }
  handleFileInput(files: FileList) {
    let fileToUpload = files.item(0);
    if (fileToUpload) {
      this.uploadFileToActivity(fileToUpload)
      console.log('done Uploaded');
    }
  }

  uploadFileToActivity(uploadedFIle) {
    this.taskDetailsService.postFileUpload(uploadedFIle).subscribe(res => {
      console.log(res);
    });
  }
  // Update Photographer URL

  addRow() {
    this.taskDetailsService.phImageURL?.data.push(this.taskDetailsService.phImageURL?.data.length)
  }

  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      console.log(`Receiver From PhotoGraphers Component : ...... ${res}`);
    }, err => { }, () => { })
  }

}
