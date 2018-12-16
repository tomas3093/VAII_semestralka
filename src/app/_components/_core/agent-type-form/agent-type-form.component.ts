import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../../_services';
import {AgentType} from "../../../_models";
import {MeasurementService} from "../../../_services/measurement.service";
import {Constants} from "../Constants";
import {MyLib} from "../MyLib";

@Component({
  selector: 'app-agent-type-form',
  templateUrl: './agent-type-form.component.html'
})
export class AgentTypeFormComponent implements OnInit {

  formEnabled: boolean;

  agentTypes: AgentType[];

  inputForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  constants: Constants;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private measurementService: MeasurementService,
    private alertService: AlertService) {

    this.formEnabled = false;

    this.agentTypes = [];

    this.loading = false;
    this.submitted = false;
    this.constants = new Constants();
  }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      typeName: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(this.constants.FORM_AGENTTYPE_NAME_MIN_LENGTH),
          Validators.maxLength(this.constants.FORM_AGENTTYPE_NAME_MAX_LENGTH),
          Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9-]*$')
        ])]
    });

    // Ziskanie existujucich typov agentov
    this.loadAgentTypes();
  }

  /**
   * convenience getter for easy access to form fields
   * @returns {{[p: string]: AbstractControl}}
   */
  get f() { return this.inputForm.controls; }


  /**
   * Zobrazi alebo skryje formular pre zadanie noveho typu agenta
   */
  toggleForm() {
    this.formEnabled = !this.formEnabled;
  }


  /**
   * Ziskanie existujucich typov agentov
   */
  loadAgentTypes() {
    this.measurementService.getAgentTypes()
      .subscribe(
        data => {
          this.agentTypes = data;
        },
        error => {
          console.log(JSON.stringify(error));
        }
      )
  }


  /**
   * Submit formulara
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.inputForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    let agentType: AgentType = new AgentType();
    agentType.typeName = MyLib.capitalizeFirstLetter(this.f['typeName'].value);

    this.measurementService.createAgentType(agentType)
      .subscribe(
        data => {
          this.alertService.success('Agent type has been sucessfully created');

          // Reset formu a aktualizovanie zoznamu
          this.loadAgentTypes();
          this.loading = false;
          this.inputForm.reset();
          this.formEnabled = false;
          this.router.navigate([Constants.ROUTE_IDENTIFIER_AGENT_TYPE_EDITOR]);
        },
        error => {
          this.alertService.error("Error: such agent type already exists");
          this.loading = false;
        });
  }
}

