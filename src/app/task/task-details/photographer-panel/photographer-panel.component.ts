import { SocketService } from 'src/app/shared/socket/socket.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-photographer-panel',
  templateUrl: './photographer-panel.component.html',
  styleUrls: ['./photographer-panel.component.css']
})
export class PhotographerPanelComponent implements OnInit {
  arr: [] = []
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
  boxModel(packageID) {
    let data
    return data = {
      title: '',
      image_link: '',
      current_status: 0,
      id: packageID
    }
  }
  // ! API POST & Patch

  postPhotographerPackage() {
    let data: any = {
      PostID: this.taskDetailsService.propID
    };
    let response
    this.taskDetailsService.postPhotographerBoxRow(data).subscribe(res => {
      response = res
    }, err => { }, () => {
      this.taskDetailsService.tour3DPackage.push(this.boxModel(response.id))
      console.log(this.taskDetailsService.tour3DPackage)
    });
  }
  updatePhStatus(boxRowID, currentStatus) {
    let data: any = {};
    let updatedPackage;
    currentStatus == '1' ? data.current_status = '0' : data.current_status = '1'
    this.taskDetailsService.updatePhotographerPackage(boxRowID, data).subscribe((res: any) => {
      updatedPackage = res.data
    }, err => { }, () => {
      for (let package3D of this.taskDetailsService.tour3DPackage) {
        package3D.id == updatedPackage.id ? package3D.current_status = updatedPackage.current_status : false
      }
    })
  }
  updatePhTitle(boxRowID, title) {
    let data: any = {};
    data.title = title
    this.taskDetailsService.updatePhotographerPackage(boxRowID, data).subscribe((res: any) => {
      console.log(res.data);
    })
  }
  updatePhImges(boxRowID, file) {
    let data: any = {};
    let filePackage = file.item(0);
    const formData: FormData = new FormData();
    formData.append('file', filePackage);
    // formData.append('unzip', 'false');
    data = formData
    this.taskDetailsService.updatePhotographerPackage(boxRowID, data).subscribe((res: any) => {
      console.log(res.data);
    })
  }
  deletePhotographerPackage(boxRowID, index) {
    this.taskDetailsService.deletePhotographerPackage(boxRowID).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.taskDetailsService.tour3DPackage.splice(index, 1)

    })
  }

  // ! Socket Handler

  socketON(listner) {
    let package3dObj;
    this.socketService.socketON(listner).subscribe((res: any) => {
      console.log(res);

      package3dObj = res.object
      for (let package3d of this.taskDetailsService.tour3DPackage) {
        package3d.id == package3dObj.id ? package3d.image_link = package3dObj.image_link : false
      }
    })
  }

} 
