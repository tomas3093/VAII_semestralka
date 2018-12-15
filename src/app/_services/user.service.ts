import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '../../environments/environment';
import {User} from '../_models';
import {Observable} from "rxjs/index";
import {MyLib} from "../_components/_core/MyLib";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

  /**
   * Vrati uzivatela podla id
   * @param {number} userId
   * @returns {Observable<User>}
   */
    getById(userId: number): Observable<User> {
      return this.http.get<User>(
        `${environment.apiUrl}/CustomUsers/${userId}?${MyLib.getTokenString()}`
      );
    }

  /**
   * Registruje noveho uzivatela
   * @param {User} user
   * @returns {Observable<Object>}
   */
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/CustomUsers`, user);
    }

  /**
   * Aktualizuje udaje o uzivatelovi
   * @returns {Observable<Object>}
   * @param userId
   * @param values Objekt s atributmi, ktore chceme zmenit
   */
    update(userId: number, values) {
      return this.http.patch(
        `${environment.apiUrl}/CustomUsers/${userId}?${MyLib.getTokenString()}`,
        values
        );
    }

  /**
   * Odstrani daneho uzivatela
   * @param {number} userId - id uzivatela, ktoreho chceme odstranit
   * @returns {Observable<Object>}
   */
    delete(userId: number) {
      return this.http.delete(
        `${environment.apiUrl}/CustomUsers/${userId}?${MyLib.getTokenString()}`
      );
    }
}
