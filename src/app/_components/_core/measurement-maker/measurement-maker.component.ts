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

  constants: Constants;

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

    this.constants = new Constants();
  }

  ngOnInit() {  }


  receiveMessage($event: Measurement) {
    this.measurementStarted = true;
    this.measurement = $event;
  }


  /**
   * Kliknutie na tlacidlo save. Ulozi vsetkych nameranych agentov do daneho merania.
   */
  onSave() {
    // TODO
  }


  /**
   * Pridanie noveho agenta do systemu
   */
  newAgentArrivalFunction() {
    let agent = new Agent();
    agent.arrival = new Date();
    agent.measurementId = this.measurement.measurementId;
    this.allAgents.add(agent);

    // Ak je front prazdny
    if (this.agentsQueue.length === 0) {
      agent.waitingTime = 0;
    }
    this.agentsQueue.push(agent);

    this.logQueueLength();
  }


  /**
   * Ukoncenie obsluhy aktualne obsluhovaneho agenta
   */
  endOfAgentDelayFunction() {

    // Ak existuju nejaky zakaznici
    if (this.agentsQueue.length > 0) {

      // Vyhodi z frontu zakaznika ktory bol prave obsluzeny
      let sinkedAgent: Agent = this.agentsQueue.shift();
      sinkedAgent.delayTime = Date.now() - (sinkedAgent.arrival.getTime() + sinkedAgent.waitingTime);

      // Ak caka v rade dalsi zakaznik
      if (this.agentsQueue.length > 0) {
        let firstInQueue: Agent = this.agentsQueue[0];
        firstInQueue.waitingTime = Date.now() - firstInQueue.arrival.getTime();
      }

      this.logQueueLength();
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
