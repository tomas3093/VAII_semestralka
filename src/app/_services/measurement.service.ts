import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Measurement} from "../_models";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/index";
import {MyLib} from "../_components/_core/MyLib";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  /**
   * Vrati meranie podla id
   * @param {number} id
   * @returns {Observable<Measurement>}
   */
  getById(id: number): Observable<Measurement> {
    return this.http.get<Measurement>(
      `${environment.apiUrl}/measurements/${id}?access_token=${MyLib.getLoggedUserToken().id}`);
  }


  /**
   * Vrati vsetky measurementy daneho usera
   * @param {number} userId
   * @returns {Observable<Measurement[]>}
   */
  getByUser(userId: number) {
    return this.http.get<Measurement[]>(
      `${environment.apiUrl}/CustomUsers/${userId}/measurements?access_token=${MyLib.getLoggedUserToken().id}`);
  }
}
