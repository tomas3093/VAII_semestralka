import { Component, OnInit } from '@angular/core';
import {User, Measurement} from "../../../_models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  // Recent measurements of current user
  measurements: Measurement[];

  constructor() {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.currentUser = new User();
    this.currentUser.username = "Tom";

    let m = new Measurement();
    m.name = "My first measrmnt";
    m.startTime = new Date();
    this.measurements = [m];
  }

  ngOnInit() {
  }

}
