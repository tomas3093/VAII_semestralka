import { Component, OnInit } from '@angular/core';
import {Measurement} from "../../../_models";
import {ActivatedRoute} from "@angular/router";
import {MeasurementService} from "../../../_services/measurement.service";
import {Constants} from "../Constants";

@Component({
  selector: 'app-measurement-detail',
  templateUrl: './measurement-detail.component.html'
})
export class MeasurementDetailComponent implements OnInit {

  measurement: Measurement;
  constants: Constants;

  constructor(
    private route: ActivatedRoute,
    private measurementService: MeasurementService) {

    this.measurement = new Measurement();
    this.constants = new Constants();
  }

  ngOnInit() {
    // Ziskanie id z URL parametra
    let id = this.route.snapshot.params['id'];
    this.measurementService.getMeasurementById(id)
      .subscribe(
        data => {
          this.measurement = data;
        },
        error => {
          console.log(JSON.stringify(error));
        }
      )
  }


  deleteMeasurement() {
    // TODO
  }

}
