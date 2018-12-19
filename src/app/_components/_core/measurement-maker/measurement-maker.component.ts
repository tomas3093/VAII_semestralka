import { Component, OnInit } from '@angular/core';
import {Agent, AgentStatistics, Measurement, QueueLengthListItem} from "../../../_models";
import {Constants} from "../Constants";
import {MeasurementService} from "../../../_services/measurement.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../_services";

@Component({
  selector: 'app-measurement-maker',
  templateUrl: './measurement-maker.component.html',
  styleUrls: ['./measurement-maker.component.css']
})
export class MeasurementMakerComponent implements OnInit {

  measurementStarted: boolean; // ci bolo spustene meranie
  measurement: Measurement;

  allAgents: AgentStatistics;
  agentsQueue: Agent[];
  queueLengths: QueueLengthListItem[];

  elapsedTimeLabel: string;
  statsEnabled: boolean;
  constants: Constants;

  // Plotly.js graphs
  arrivalsHist = {
    data: [{ x: [], type: 'histogram' }],
    layout: {width: 540, height: 350, title: 'Histogram of agent interarrival times [s]'}
  };
  delayHist = {
    data: [{ x: [], type: 'histogram' }],
    layout: {width: 540, height: 350, title: 'Histogram of agent delay times [s]'}
  };
  waitingHist = {
    data: [{ x: [], type: 'histogram' }],
    layout: {width: 540, height: 350, title: 'Histogram of agent waiting times [s]'}
  };

  constructor(private router: Router,
              private measurementService: MeasurementService,
              private alertService: AlertService) {

    this.measurementStarted = false;
    this.measurement = new Measurement();
    this.statsEnabled = false;

    this.resetMeasurement();

    this.constants = new Constants();
  }

  ngOnInit() {  }


  receiveMessage($event: Measurement) {
    this.measurementStarted = true;
    this.measurement = $event;
    setInterval(this.updateTime, 1000);   // spustenie pocitadla uplynuteho casu
  }


  /**
   * Kliknutie na tlacidlo save. Vypise hlasku ze meranie ulozene a presmeruje na '/'
   */
  onSave() {
    this.measurementService.setMeasurementStopTime(this.measurement.measurementId)
      .subscribe(
        data => {
          this.alertService.success("Measurement has been saved", true);
          this.router.navigate(['/' + this.constants.ROUTE_IDENTIFIER_ROOT]);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }


  /**
   * Reset merania
   */
  resetMeasurement() {
    this.measurement.startTime = new Date().getTime();

    this.elapsedTimeLabel = "0:0";

    this.allAgents = new AgentStatistics();
    this.agentsQueue = [];
    this.queueLengths = [];

    // histogramy
    this.arrivalsHist.data[0].x = [];
    this.delayHist.data[0].x = [];
    this.waitingHist.data[0].x = [];

    // Reset casu zaciatku
    this.measurementService.setMeasurementStartTime(this.measurement.measurementId)
      .subscribe(
        data => {
          // uspech
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }


  /**
   * Kliknutie na tlacidlo reset. Vymaze vsetkych nameranych agentov aktualneho merania
   */
  onReset() {

    // Confirm dialog
    if (confirm('Are you sure you want to reset this measurement?')) {

      // Zmazanie agentov
      this.measurementService.deleteMeasurementAgents(this.measurement.measurementId)
        .subscribe(
          data => {
            this.alertService.success("Measurement has been resetted");

            // Reset lokalnych premennych
            this.resetMeasurement();

          },
          error => {
            console.log(JSON.stringify(error));
            this.alertService.error("Error during DB connection");
          }
        )

    } else {
      // Do nothing!
    }
  }


  /**
   * Kliknutie na tlacidlo delete. Vymaze vsetkych agentov a aj meranie samotne
   */
  onDelete() {

    // Confirm dialog
    if (confirm('Are you sure you want to permanently delete this measurement?')) {

      // Vymazanie agentov
      this.measurementService.deleteMeasurementAgents(this.measurement.measurementId)
        .subscribe(
          data => {

            // Ak sa vymazali agenti, vymaz aj meranie samotne
            this.measurementService.deleteMeasurement(this.measurement.measurementId)
              .subscribe(
                data => {
                  this.alertService.success("Measurement has been deleted", true);
                  this.router.navigate(['/' + this.constants.ROUTE_IDENTIFIER_ROOT]);
                },
                error => {
                  console.log(JSON.stringify(error));
                  this.alertService.error("Error during DB connection");
                }
              );
          },
          error => {
            console.log(JSON.stringify(error));
            this.alertService.error("Error during DB connection");
          }
        )

    } else {
      // Do nothing!
    }
  }


  /**
   * Zobrazenie statistik aktualneho merania
   */
  toggleStats() {
    this.statsEnabled = !this.statsEnabled;
  }


  /**
   * Pridanie noveho agenta do systemu
   */
  newAgentArrivalFunction() {

    // Vytvorenie a inicializovanie agenta
    let agent = new Agent();
    agent.agentId = this.allAgents.length() + 1;
    agent.arrival = new Date().getTime();
    agent.measurementId = this.measurement.measurementId;
    this.allAgents.add(agent);

    // pridanie casu medzi prichodmi do histogramu prichodov (+ prevod na sekundy)
    if (this.allAgents.length() >= 2) {
      this.arrivalsHist.data[0].x.push(this.allAgents.getLastInterarrivalTime() / 1000);
    }

    // Ak je front prazdny
    if (this.agentsQueue.length === 0) {
      agent.waitingTime = 0;

      // Pridanie casu cakania do histogramu
      this.waitingHist.data[0].x.push(0);
    }
    this.agentsQueue.push(agent);

    this.logQueueLength();
  }


  /**
   * Ukoncenie obsluhy aktualne obsluhovaneho agenta
   */
  endOfAgentDelayFunction() {

    // Ak existuju nejaky agenti
    if (this.agentsQueue.length > 0) {

      // Vyhodi z frontu agenta ktory bol prave obsluzeny
      let sinkedAgent: Agent = this.agentsQueue.shift();

      // Vypocet casu obsluhy
      let delayTime: number = Date.now() - (sinkedAgent.arrival + sinkedAgent.waitingTime);
      sinkedAgent.delayTime = delayTime;
      this.delayHist.data[0].x.push(delayTime / 1000);

      // Odstranenie agentId kvoli db validacii
      sinkedAgent.agentId = null;

      // Ulozi agenta do databazy
      this.measurementService.createMeasurementAgent(this.measurement.measurementId, sinkedAgent)
        .subscribe(
          data => {

            // Ak caka v rade dalsi agent
            if (this.agentsQueue.length > 0) {
              let firstInQueue: Agent = this.agentsQueue[0];

              // Vypocet casu cakania
              let waitingTime: number = Date.now() - firstInQueue.arrival;
              firstInQueue.waitingTime = waitingTime;

              // Pridanie casu cakania do histogramu
              this.waitingHist.data[0].x.push(waitingTime / 1000);
            }

            this.logQueueLength();

          },
          error => {
            this.alertService.error("Error during database connection");
            console.log(error);
          }
        );
    }
  }


  /**
   * Zaznamena aktualnu dlzku radu
   */
  logQueueLength(): void {
    let queueLen: QueueLengthListItem = new QueueLengthListItem();
    queueLen.time = Date.now();
    queueLen.value = this.queueLengths.length;

    this.queueLengths.push(queueLen);
  }


  /**
   * Funkcia na aktualizovanie casu, ktory uplynul od zaciatku simulacie
   */
  updateTime() {
    if(this.measurementStarted) {
      let dateDiff: Date = new Date(new Date().getTime() - this.measurement.startTime);
      let seconds: number = dateDiff.getSeconds();
      let minutes: number = dateDiff.getMinutes();
      let hours: number = dateDiff.getHours() - 1;
      let days: number = dateDiff.getDate() - 1;

      if(days > 0) {
        this.elapsedTimeLabel = days + " days, " + hours + ":" + minutes + ":" + seconds;
      } else {
        if (hours > 0)
          this.elapsedTimeLabel = hours + ":" + minutes + ":" + seconds;
        else
          this.elapsedTimeLabel = minutes + ":" + seconds;
      }
    }
  }

}
