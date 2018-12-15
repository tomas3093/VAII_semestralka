import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import {AccessToken} from "../_models";
import {Constants} from "../_components/_core/Constants";

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    /**
     * Vykona sa post do DB tabulky CustomAccessToken a vytvori sa token aj v db aj v localStorage
     * @param {string} email
     * @param {string} password
     * @returns {Observable<AccessToken>}
     */
    login(email: string, password: string) {

      AuthenticationService.logout();

      let userCredentials = {
        email: email,
        password: password,
        ttl: Constants.USER_LOGIN_DEFAULT_TTL
      };

      return this.http.post<AccessToken>(`${environment.apiUrl}/CustomUsers/login`, userCredentials)
            .pipe(map(res => {
                // login successful if there's a jwt token in the response

                if (res && res.id) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(Constants.USER_ACCESS_TOKEN_COOKIE_KEY, JSON.stringify(res));
                }

                return res;
            }));
    }


    /**
     * Odhlasi usera
     */
    public static logout() {
      if (localStorage.getItem(Constants.USER_ACCESS_TOKEN_COOKIE_KEY)) {
        localStorage.removeItem(Constants.USER_ACCESS_TOKEN_COOKIE_KEY);
      }
    }
}
