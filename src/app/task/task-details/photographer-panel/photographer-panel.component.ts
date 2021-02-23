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
      this.updatePHImageURL(fileToUpload)
      console.log('done Uploaded');
    }
  }

  uploadFileToActivity(uploadedFIle) {
    this.taskDetailsService.postFileUpload(uploadedFIle, this.taskDetailsService.propID).subscribe(res => { });
  }
  // Update Photographer URL
  updatePHImageURL(file) {
    this.taskDetailsService.updatePhotographerImageURL(file, this.taskDetailsService.phImageURL.data.id).subscribe(res => {
      console.log('Response From PH ' + res);

    })
  }

  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      console.log(`Receiver From Designer Component : ...... ${res}`);
    }, err => {
    }, () => {

    })
  }

}
