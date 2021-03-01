import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/shared/socket/socket.service';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-designers-panel',
  templateUrl: './designers-panel.component.html',
  styleUrls: ['./designers-panel.component.css']
})
export class DesignersPanelComponent implements OnInit {
  // url: SafeResourceUrl;
  // unSubscribe: Subscription
  imageBaseURL = environment.imageBaseurl
  inpUploadDesigner;
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public socketService: SocketService, private sanitizer: DomSanitizer) {
    this.transform();
  }


  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.socketON('Uploaded')
    this.socketON('Error_Uploaded')
  }

  // ! Controller
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.taskDetailsService.designertour3DPackage?.Package3D);
  }
  // ! API POST And PATCH
  updateDesignerImges(file) {
    let data: any = {};
    let filePackage = file.item(0);
    const formData: FormData = new FormData();
    formData.append('file', filePackage);
    data = formData
    this.taskDetailsService.updateDesignerPackage(this.taskDetailsService.propID, data).subscribe((res: any) => {
      console.log(res);
    })
  }

  uploadDesignerImges(file) {
    let data: any = {};
    console.log("in Upload");

    let filePackage = file.item(0);
    const formData: FormData = new FormData();

    formData.append('file', filePackage);
    formData.append('PostID', this.taskDetailsService.propID);
    formData.append('unzip', 'true');
    data = formData
    this.taskDetailsService.uploadDesignerPackage(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateDesignerStatus(boxRowID, currentStatus) {
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

  // ! Socket Handler
  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      console.log(`Receiver From Designer Component : ...... ${res}`);
    }, err => {
    }, () => {
    })
  }
}
