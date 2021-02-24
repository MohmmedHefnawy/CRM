import { SocketService } from 'src/app/shared/socket/socket.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';

@Component({
  selector: 'app-photographer-panel',
  templateUrl: './photographer-panel.component.html',
  styleUrls: ['./photographer-panel.component.css']
})
export class PhotographerPanelComponent implements OnInit {
  arr = []
  changeText: boolean;
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public socketService: SocketService) {
    this.changeText = false;
  }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.socketON('Uploaded')
    this.socketON('Error_Uploaded')
  }

  // ! Controller
  // postPhotographerPackage(val) {
  //   this.taskDetailsService.tour3DPackage.push(this.taskDetailsService.tour3DPackage.length)

  // }

  handleFileInput(files: FileList) {
    let fileToUpload = files.item(0);
    if (fileToUpload) {
      // let fileToUpload = files.item(0);
      // const formData: FormData = new FormData();
      // formData.append('file', file);
      // formData.append('unzip', 'false');
    }

    // this.postPhotographerPackage(fileToUpload)
    // console.log('done Uploaded');
  }
  updatePackageTitle(title) {
    // this.postPhotographerPackage(title)
    // if (file != '') {
    //   const formData: FormData = new FormData();
    //   formData.append('file', file);
    // formData.append('PostID', this.taskDetailsService.propID);
    // formData.append('unzip', 'true');
    //   data.title = title
    //   data.file = formData
    // }
    // data.title = title
  }
  // ! API POST & Patch

  postPhotographerPackage() {
    let data: any = {
      PostID: this.taskDetailsService.propID
    };
    this.taskDetailsService.postPhotographerBoxRow(data).subscribe(res => {
      this.taskDetailsService?.tour3DPackage.push(res.data)
      console.log(res);
    });
  }
  deletePhotographerPackage(boxRowID) {
    this.taskDetailsService.deletePhotographerPackage(boxRowID).subscribe(res => {
      console.log(res);
    })
  }
  updatePhotographerPackage(boxRowID, title: any = false, file: any = false) {
    console.log(boxRowID)
    let data: any = {};
    if (file) {
      let filePackage = file.item(0);
      const formData: FormData = new FormData();
      formData.append('file', filePackage);
      console.log(formData)
      // formData.append('unzip', 'false');
      data = formData
    } else if (title || title != '') {
      data.title = title
    }
    this.taskDetailsService.updatePhotographerPackage(boxRowID, data).subscribe(res => {
      console.log(res);
    })
  }
  // ! Socket Handler

  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      console.log(`Receiver From PhotoGraphers Component : ...... ${res}`, JSON.stringify(res));
    }, err => { }, () => { })
  }

}
