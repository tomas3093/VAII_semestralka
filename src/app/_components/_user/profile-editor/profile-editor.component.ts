import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService, UserService} from "../../../_services";
import {AccessToken, User} from "../../../_models";
import {Constants} from "../../_core/Constants";
import {MyLib} from "../../_core/MyLib";

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html'
})
export class ProfileEditorComponent implements OnInit {

  profileForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  constants: Constants;

  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {

    this.loading = false;
    this.submitted = false;
    this.constants = new Constants();

    // Ziskanie aktualneho uzivatela
    this.user = new User();
    let userToken: AccessToken = MyLib.getLoggedUserToken();
    this.userService.getById(userToken.userId)
      .subscribe(
        data => {
          this.user.id = data.id;
          this.user.email = data.email;
          this.user.username = data.username;
          this.user.password = data.password;
        },
        error => {
          this.alertService.error("Failed to load profile data");
          console.log(JSON.stringify(error));
        }
      )
  }


  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      email: [
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$'),
          Validators.maxLength(this.constants.FORM_USER_EMAIL_MAX_LENGTH)
        ])],
      username: [
        Validators.compose([
          Validators.maxLength(this.constants.FORM_USER_USERNAME_MAX_LENGTH),
          Validators.minLength(this.constants.FORM_USER_USERNAME_MIN_LENGTH),
          Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9]*')
        ])
      ]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;

    let values = {
      "email": this.f['email'].value,
      "username": this.f['username'].value
    };

    // Zapisanie zmien do db
    this.userService.updateUser(this.user.id, values)
      .subscribe(
        data => {
          this.alertService.success('Profile information successfully updated', true);
          this.router.navigate([Constants.ROUTE_IDENTIFIER_DASHBOARD]);
        },
        error => {
          this.alertService.error("Error during update");
          this.loading = false;
          console.log(JSON.stringify(error));
        });
  }

}
