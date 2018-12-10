import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import {Constants, LoginResponse} from "../_models";

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

  /**
   * Vykona sa post do DB tabulky CustomAccessToken a vytvori sa token aj v db aj v localStorage
   * @param {string} email
   * @param {string} password
   * @returns {Observable<any>}
   */
    login(email: string, password: string) {

      let userCredentials = {
        email: email,
        password: password,
        ttl: Constants.USER_LOGIN_DEFAULT_TTL
      };

      return this.http.post<LoginResponse>(`${environment.apiUrl}/CustomUsers/login`, userCredentials)
            .pipe(map(res => {
                // login successful if there's a jwt token in the response
                if (res && res.id) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(res));
                }

                return res;
            }));
    }

  /**
   * Odhlasi usera, tak ze nastavi tokenu v db TTL na 0 a vymaze ho z localStorage
   */
  logout() {

    // TODO
    localStorage.removeItem('currentUser');
  }
}
