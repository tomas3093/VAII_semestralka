import { Component, OnInit } from '@angular/core';
import {AlertService, AuthenticationService, UserService} from "../../../_services";
import {Router} from "@angular/router";
import {AccessToken} from "../../../_models";
import {MyLib} from "../../_core/MyLib";
import {Constants} from "../../_core/Constants";

@Component({
  selector: 'app-account-deleter',
  templateUrl: './account-deleter.component.html'
})
export class AccountDeleterComponent implements OnInit {

  constants: Constants;

  constructor(private userService: UserService,
              private alertService: AlertService,
              private router: Router) {

    this.constants = new Constants();
  }


  ngOnInit() {
  }

  deleteAccount() {

    let userToken: AccessToken = MyLib.getLoggedUserToken();

    this.userService.deleteUser(userToken.userId)
      .subscribe(
        data => {
          AuthenticationService.logout();
          this.router.navigate([Constants.ROUTE_IDENTIFIER_ROOT]);
          this.alertService.success("Your account has been permanently deleted", true);
        },
        error => {
          this.alertService.error("Error during account deletion");
        }
      );
  }

}
