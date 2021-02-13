import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from 'src/app/task/services/task-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    // this.getPropById(this.taskDetailsService.propID)
  }
  ngAfterViewInit() {
    // console.log('after aslkfnlkasnflkn');

  }
  // getPropById(ID) {
  //   this.taskDetailsService.getTaskById(ID).subscribe((res: any) => {
  //     this.taskDetailsService.taskDetails = res.data
  //     console.log('Details', this.taskDetailsService.taskDetails);
  //   }, err => { }, () => {
  //     this.taskDetailsService.propID = ID;
  //   })
  // }
  onSubmit(form: NgForm) {
    console.log(form);

  }

}
