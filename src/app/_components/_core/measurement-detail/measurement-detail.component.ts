import { Component, OnInit } from '@angular/core';
import {Agent, AgentStatistics, AgentType, Measurement} from "../../../_models";
import {ActivatedRoute, Router} from "@angular/router";
import {MeasurementService} from "../../../_services/measurement.service";
import {Constants} from "../Constants";
import {AlertService} from "../../../_services";

@Component({
  selector: 'app-measurement-detail',
  templateUrl: './measurement-detail.component.html'
})
export class MeasurementDetailComponent implements OnInit {

  measurement: Measurement;
  measurementAgentType: AgentType;
  allAgents: AgentStatistics;

  constants: Constants;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private measurementService: MeasurementService,
    private alertService: AlertService) {

    this.measurement = new Measurement();
    this.measurementAgentType = new AgentType();
    this.allAgents = new AgentStatistics();

    this.constants = new Constants();
  }

  ngOnInit() {
    // Ziskanie id merania z URL parametra
    let id = this.route.snapshot.params['id'];
    this.measurementService.getMeasurementById(id)
      .subscribe(
        data => {
          this.measurement = data;

          // Parsovanie datumov
          this.measurement.startTime = Date.parse('' + this.measurement.startTime);
          if (this.measurement.stopTime) {
            this.measurement.stopTime = Date.parse('' + this.measurement.stopTime);
          }

          // Ziskanie agent typu
          if (this.measurement.agentTypeId) {
            this.measurementService.getAgentTypeById(this.measurement.agentTypeId)
              .subscribe(
                data => {
                  this.measurementAgentType = data;

                  // Ziskanie vsetkych agentov merania
                  this.measurementService.getMeasurementAgents(this.measurement.measurementId)
                    .subscribe(
                      data => {

                        let retrievedAgents: Agent[] = <Agent[]>data;
                        for(let i = 0; i < retrievedAgents.length; i++) {
                          this.allAgents.add(retrievedAgents[i]);
                        }
                      },
                      error => {
                        console.log(JSON.stringify(error));
                      }
                    )
                },
                error => {
                  console.log(JSON.stringify(error));
                }
              )
          }
        },
        error => {
          console.log(JSON.stringify(error));
          this.router.navigate(['/' + this.constants.ROUTE_NOT_FOUND]);
        }
      )
  }


  deleteMeasurement() {
    // Confirm dialog
    if (confirm('Are you sure you want to delete this measurement?')) {

      // Delete all measurement agents
      this.measurementService.deleteMeasurementAgents(this.measurement.measurementId)
        .subscribe(
          data => {

            // Delete measurement itself
            this.measurementService.deleteMeasurement(this.measurement.measurementId)
              .subscribe(
                data => {
                  this.router.navigate([Constants.ROUTE_IDENTIFIER_ROOT]);
                  this.alertService.success("Measurement has been deleted", true);
                },
                error => {
                  this.alertService.error("Error during measurement agents deletion");
                }
              );
          },
          error => {
            this.alertService.error("Error during measurement deletion");
          }
        )
    } else {
      // Do nothing!
    }
  }
}
