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

    this.measurement.startTime = 0;
    this.elapsedTimeLabel = "0:0";

    this.allAgents = new AgentStatistics();
    this.agentsQueue = [];
    this.queueLengths = [];
    this.statsEnabled = false;

    this.constants = new Constants();
  }

  ngOnInit() {  }


  receiveMessage($event: Measurement) {
    this.measurementStarted = true;
    this.measurement = $event;
    setInterval(this.updateTime, 1000);   // spustenie pocitadla uplynuteho casu
  }


  /**
   * Kliknutie na tlacidlo save. Ulozi vsetkych nameranych agentov do daneho merania.
   */
  onSave() {
    this.alertService.success("Measurement has been saved", true);
    this.router.navigate([this.constants.ROUTE_IDENTIFIER_ROOT]);
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
    agent.arrival = new Date();
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
      let delayTime: number = Date.now() - (sinkedAgent.arrival.getTime() + sinkedAgent.waitingTime);
      sinkedAgent.delayTime = delayTime;
      this.delayHist.data[0].x.push(delayTime);

      // Ulozi agenta do databazy
      this.measurementService.createMeasurementAgent(this.measurement.measurementId, sinkedAgent)
        .subscribe(
          data => {

            // Ak caka v rade dalsi agent
            if (this.agentsQueue.length > 0) {
              let firstInQueue: Agent = this.agentsQueue[0];

              // Vypocet casu cakania
              let waitingTime: number = Date.now() - firstInQueue.arrival.getTime();
              firstInQueue.waitingTime = waitingTime;

              // Pridanie casu cakania do histogramu
              this.waitingHist.data[0].x.push(waitingTime);
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
