import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../../../_services';
import {User} from "../../../_models";
import {Constants} from "../../_core/Constants";

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean;
  submitted: boolean;

  constants: Constants;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {

    this.loading = false;
    this.submitted = false;

    this.constants = new Constants();
  }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['',
              Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$'),
                Validators.maxLength(this.constants.FORM_USER_EMAIL_MAX_LENGTH)
            ])],
            username: ['',
              Validators.maxLength(this.constants.FORM_USER_USERNAME_MAX_LENGTH)
            ],
            password: ['',
              Validators.compose([
                Validators.required,
                Validators.minLength(this.constants.FORM_USER_PASSWORD_MIN_LENGTH)
              ])]
        });
    }

  /**
   * convenience getter for easy access to form fields
   * @returns {{[p: string]: AbstractControl}}
   */
  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
          console.log("Invalid form");
          return;
        }

        this.loading = true;

        let user: User = new User();
        user.email = this.f['email'].value;
        user.username = this.f['username'].value;
        user.password = this.f['password'].value;

        this.userService.register(user)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate([Constants.ROUTE_IDENTIFIER_LOGIN]);
                },
                error => {
                    this.alertService.error("Error during registration");
                    this.loading = false;
                });
    }
}
