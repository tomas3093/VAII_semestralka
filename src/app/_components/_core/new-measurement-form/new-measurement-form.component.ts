import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AgentType, Measurement } from "../../../_models";
import {Constants} from "../Constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../_services";
import {MeasurementService} from "../../../_services/measurement.service";
import {MyLib} from "../MyLib";

@Component({
  selector: 'app-new-measurement-form',
  templateUrl: './new-measurement-form.component.html'
})
export class NewMeasurementFormComponent implements OnInit {

  @Output()
  messageEvent: EventEmitter<Measurement>;

  measurementForm: FormGroup;   // samotny formular
  loading: boolean;             // ci sa nacitava formular
  submitted: boolean;           // ci bol submitnuty form

  // Data
  measurement: Measurement;
  agentTypes: AgentType[];

  constants: Constants;


  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private measurementService: MeasurementService) {

    this.messageEvent = new EventEmitter<Measurement>();

    this.loading = false;
    this.submitted = false;

    this.measurement = new Measurement();
    this.agentTypes = [];

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

          // Sem pojde emit vytvoreneho merania, ktore prislo ako response
          this.measurement = <Measurement>data;
          this.messageEvent.emit(this.measurement);
        },
        error => {
          this.alertService.error("Error during creation of measurement");
          this.loading = false;
          console.log(JSON.stringify(error));
        });
  }

}
