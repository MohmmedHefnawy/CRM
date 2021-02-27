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

  // ! Controller

  // Change input Value
  boxModel(packageID) {
    let data
    return data = {
      title: '',
      image_link: '',
      id: packageID
    }
  }
  // ! API POST And PATCH
  // postPhotographerPackage() {
  //   let data: any = {
  //     PostID: this.taskDetailsService.propID
  //   };
  //   this.taskDetailsService.postPhotographerBoxRow(data).subscribe(res => {
  //     console.log(res);
  //     this.taskDetailsService.tour3DPackage.push(this.boxModel(res.id))
  //     console.log(this.taskDetailsService?.tour3DPackage);
  //   });
  // }
  deletePhotographerPackage(boxRowID, index) {
    this.taskDetailsService.deletePhotographerPackage(boxRowID).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.taskDetailsService.tour3DPackage.splice(index, 1)

    })
  }
  updatePhotographerPackage(boxRowID, title: any = false, file: any = false, currentStatus: any = false) {
    // let data: any = {};
    // // console.log(currentStatus);

    // if (file) {
    //   let filePackage = file.item(0);
    //   const formData: FormData = new FormData();
    //   formData.append('file', filePackage);
    //   console.log(formData)
    //   // formData.append('unzip', 'false');
    //   data = formData
    // } else if (currentStatus == 0 || currentStatus == 1) {
    //   currentStatus == 1 ? data.current_status = '0' : data.current_status = '1'
    // } else if (title || title != '') {
    //   data.title = title
    // }
    // this.taskDetailsService.updatePhotographerPackage(boxRowID, data).subscribe((res: any) => {
    //   let updatedPackage = res.data
    //   for (let package3D of this.taskDetailsService.tour3DPackage) {
    //     package3D.id == updatedPackage.id ? package3D.current_status = updatedPackage.current_status : false
    //   }
    //   console.log(updatedPackage);

    // })
  }
  // ! Socket Handler
  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      console.log(`Receiver From Designer Component : ...... ${res}`);
    }, err => {
    }, () => {
    })
  }
}
