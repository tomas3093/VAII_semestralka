import { Component, OnInit } from '@angular/core';
import {User, Measurement, AccessToken} from "../../../_models";
import {UserService} from "../../../_services";
import {MeasurementService} from "../../../_services/measurement.service";
import {MyLib} from "../MyLib";
import {Constants} from "../Constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  // Recent measurements of current user
  measurements: Measurement[];

  constants: Constants;

  constructor(private userService: UserService,
              private measurementService: MeasurementService) {

    this.currentUser = new User();
    this.measurements = [];

    this.constants = new Constants();
  }


  ngOnInit() {

    let userToken: AccessToken = MyLib.getLoggedUserToken();

    // Ziskanie aktualne prihlaseneho usera
    this.userService.getById(userToken.userId)
      .subscribe(
        data => {
          this.currentUser = data;

          // Ziskanie measurementov daneho usera
          this.measurementService.getMeasurementsByUser(this.currentUser.id)
            .subscribe(
              data => {
                this.measurements = data;

                // Parsovanie datumov (ISO to timestamp)
                for (let i = 0; i< this.measurements.length; i++) {
                  this.measurements[i].startTime = Date.parse('' + this.measurements[i].startTime);
                  if (this.measurements[i].stopTime) {
                    this.measurements[i].stopTime = Date.parse('' + this.measurements[i].stopTime);
                  }
                }
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
