import { Component, OnInit } from '@angular/core';
import {User, Measurement, AccessToken} from "../../../_models";
import {UserService} from "../../../_services";
import {MeasurementService} from "../../../_services/measurement.service";
import {MyLib} from "../MyLib";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  // Recent measurements of current user
  measurements: Measurement[];

  constructor(private userService: UserService,
              private measurementService: MeasurementService) {

    this.currentUser = new User();
    this.measurements = [];
  }


  ngOnInit() {

    let userToken: AccessToken = MyLib.getLoggedUserToken();

    // Ziskanie aktualne prihlaseneho usera
    this.userService.getById(userToken.userId)
      .subscribe(
        data => {
          this.currentUser = data;

          // Ziskanie measurementov daneho usera
          this.measurementService.getByUser(this.currentUser.id)
            .subscribe(
              data => {
                this.measurements = data;
              },
              error => {
                console.log(JSON.stringify(error));
              }
            )
        },
        error => {
          console.log(JSON.stringify(error));
        });
  }

}
