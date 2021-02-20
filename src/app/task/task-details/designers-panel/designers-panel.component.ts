import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';

@Component({
  selector: 'app-designers-panel',
  templateUrl: './designers-panel.component.html',
  styleUrls: ['./designers-panel.component.css']
})
export class DesignersPanelComponent implements OnInit {

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
  }
  uploadMyImage(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.updateImage.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  updateImage(e) {
    // let imageObj = { image: 'data:image/png;base64,' + btoa(e.target.result) }
    let data = {
      file: btoa(e.target.result),
      PostID: this.taskDetailsService.propID
    }
    this.taskDetailsService.postFileUpload(data).subscribe(res => {
      // this.authService.user = res
      console.log(res);

    })
  }

}
