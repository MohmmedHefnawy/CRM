import { of, Subscription } from 'rxjs';
import { SocketService } from 'src/app/shared/socket/socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-designers-panel',
  templateUrl: './designers-panel.component.html',
  styleUrls: ['./designers-panel.component.css']
})
export class DesignersPanelComponent implements OnInit, OnDestroy {
  // url: SafeResourceUrl;
  // unSubscribe: Subscription
  imageBaseURL = environment.imageBaseurl
  inpUploadDesigner;
  // packageSafeURL: SafeResourceUrl
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public socketService: SocketService) {
  }


  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.socketON('Uploaded')
    this.socketON('Error_Uploaded')
  }

  // ! Controller

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
    currentStatus == '1' ? data.current_status = '0' : data.current_status = '1'
    this.taskDetailsService.updatePhotographerPackage(boxRowID, data).subscribe((res: any) => {

    }, err => { }, () => { })
  }

  // ! Socket Handler
  socketON(listner) {
    let package3d
    this.socketService.socketON(listner).subscribe((res: any) => {
      console.log(res.Package3D);
      package3d = res.Package3D
      this.taskDetailsService.designertour3DPackage.Package3D = package3d
    })
  }
  ngOnDestroy(): void {
    console.log('Designer Comp Is Destroyed');
  }

}
