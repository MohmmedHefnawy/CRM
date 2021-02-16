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

  onSubmit(form: NgForm) {
    form.value.action = 'details'
    form.value.id = this.taskDetailsService.propID
    console.log(form.value);
    this.postDetailsData(form.value)
  }

  postDetailsData(data) {
    this.taskDetailsService.postPropertyData(data).subscribe(res => {
      console.log(res);
    })
  }
}
