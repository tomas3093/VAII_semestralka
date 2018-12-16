import { Component, OnInit } from '@angular/core';
import {Agent, AgentStatistics, AgentType, Measurement, QueueLengthListItem} from "../../../_models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../_services";
import {Router} from "@angular/router";
import {Constants} from "../Constants";
import {MeasurementService} from "../../../_services/measurement.service";
import {MyLib} from "../MyLib";

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.css']
})
export class CollectorComponent implements OnInit {

  measurementForm: FormGroup;
  loading: boolean;         // ci sa nacitava formular
  submitted: boolean;       // ci bol submitnuty form
  measurementOpen: boolean; // ci bolo spustene meranie

  // Data
  measurement: Measurement;
  agentTypes: AgentType[];

  allAgents: AgentStatistics;
  agentsQueue: Agent[];

  queueLengths: QueueLengthListItem[];
  elapsedTimeLabel: string;

  constants: Constants;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private measurementService: MeasurementService,
      private alertService: AlertService) {

    this.loading = false;
    this.submitted = false;
    this.measurementOpen = false;

    this.measurement = new Measurement();
    this.agentTypes = [];
    this.reset();

    this.constants = new Constants();
  }

  ngOnInit() {
    this.measurementForm = this.formBuilder.group({
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9-_]*$'),
          Validators.minLength(this.constants.FORM_MEASUREMENT_NAME_MIN_LENGTH),
          Validators.maxLength(this.constants.FORM_MEASUREMENT_NAME_MAX_LENGTH)
        ])],
      description: ['',
        Validators.maxLength(this.constants.FORM_MEASUREMENT_DESCRIPTION_MAX_LENGTH)
      ],
      typeOptions: ['']
    });

    // Ziskanie agent typov
    this.measurementService.getAgentTypes()
      .subscribe(
        data => {
          this.agentTypes = data;
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );


    // Update casu simulacie
    setInterval(() => {this.updateTime()}, 1000);
  }


  /**
   * convenience getter for easy access to form fields
   * @returns {{[p: string]: AbstractControl}}
   */
  get f() { return this.measurementForm.controls; }


  /**
   * Submit formulara measurementForm
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.measurementForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    // Measurement
    this.measurement.name = this.f['name'].value;
    this.measurement.startTime = new Date().getTime();
    this.measurement.description = this.f['description'].value;
    this.measurement.userId = MyLib.getLoggedUserToken().userId;

    this.measurementService.createMeasurement(this.measurement)
      .subscribe(
        data => {
          this.alertService.success('Measurement created');

          this.measurementOpen = true;
        },
        error => {
          this.alertService.error("Error during creation of measurement");
          this.loading = false;
          console.log(JSON.stringify(error));
        });
  }


  /**
   * Nastavi vsetky udaje aplikacie na default hodnoty
   */
  reset() {
    this.measurement.startTime = 0;

    this.allAgents = new AgentStatistics();
    this.agentsQueue = [];

    this.queueLengths = [];
    this.elapsedTimeLabel = "0:0";
  }


  /**
   * Pridanie noveho agenta do systemu
   */
  newAgentArrivalFunction() {
    let agent = new Agent();
    agent.agentId = this.allAgents.length();  // TODO toto je iba natvrdo
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
   * Ukoncenie obsluhy aktualne obsluhovaneho zakaznika
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
