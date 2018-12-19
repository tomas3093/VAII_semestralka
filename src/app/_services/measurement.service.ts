import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Agent, AgentType, Measurement} from "../_models";
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
  getMeasurementById(id: number): Observable<Measurement> {
    return this.http.get<Measurement>(
      `${environment.apiUrl}/Measurements/${id}?${MyLib.getTokenString()}`);
  }


  /**
   * Vrati vsetky measurementy daneho usera
   * @param {number} userId
   * @returns {Observable<Measurement[]>}
   */
  getMeasurementsByUser(userId: number) {
    let header = new HttpHeaders()
      .set('userId', `${userId}`);

    return this.http.get<Measurement[]>(
      `${environment.apiUrl}/Measurements/?${MyLib.getTokenString()}`, {headers: header});
  }


  /**
   * Vytvori nove meranie
   * @param {Measurement} measurement
   * @returns {Observable<Object>}
   */
  createMeasurement(measurement: Measurement) {
    return this.http.post(
      `${environment.apiUrl}/Measurements/?${MyLib.getTokenString()}`, measurement);
  }


  /**
   * Nastavi stopTime na aktualny cas
   * @param {number} measurementId
   * @returns {Observable<Object>}
   */
  setMeasurementStopTime(measurementId: number) {
    let values = {
      stopTime: new Date().toISOString()
    };

    return this.http.patch(
      `${environment.apiUrl}/Measurements/${measurementId}?${MyLib.getTokenString()}`,
      values
    );
  }


  /**
   * Nastavi startTime na aktualny cas
   * @param {number} measurementId
   * @returns {Observable<Object>}
   */
  setMeasurementStartTime(measurementId: number) {
    let values = {
      startTime: new Date().toISOString()
    };

    return this.http.patch(
      `${environment.apiUrl}/Measurements/${measurementId}?${MyLib.getTokenString()}`,
      values
    );
  }


  /**
   * Vrati vsetkych nameranych agentov v danom merani
   * @param {number} measurementId
   * @returns {Observable<Object>}
   */
  getMeasurementAgents(measurementId: number) {
    return this.http.get(
      `${environment.apiUrl}/Measurements/${measurementId}/agents?${MyLib.getTokenString()}`
    );
  }


  /**
   * Odstrani dane meranie
   * @param {number} measurementId
   * @returns {Observable<Object>}
   */
  deleteMeasurement(measurementId: number) {
    return this.http.delete(
      `${environment.apiUrl}/Measurements/${measurementId}?${MyLib.getTokenString()}`
    );
  }


  /**
   * Vytvori agenta pre zadane meranie
   * @param {Agent} agent
   * @param measurementId
   */
  createMeasurementAgent(measurementId: number, agent: Agent) {
    return this.http.post(
      `${environment.apiUrl}/Agents/?${MyLib.getTokenString()}`, agent);
  }


  /**
   * Odstrani vsetkych agentov daneho merania
   * @param {number} measurementId
   */
  deleteMeasurementAgents(measurementId: number) {
    return this.http.delete(
      `${environment.apiUrl}/Measurements/${measurementId}/Agents?${MyLib.getTokenString()}`
    );
  }


  /**
   * Vrati vsetky existujuce typy agentov
   * @returns {Observable<AgentType[]>}
   */
  getAgentTypes() {
    return this.http.get<AgentType[]>(
      `${environment.apiUrl}/AgentTypes?${MyLib.getTokenString()}`
    );
  }


  /**
   * Vrati agent type podla zadaneho id
   * @param {number} id
   * @returns {Observable<AgentType>}
   */
  getAgentTypeById(id: number) {
    return this.http.get<AgentType>(
      `${environment.apiUrl}/AgentTypes/${id}?${MyLib.getTokenString()}`
    );
}


  /**
   * Vytvori novy typ agenta
   * @param {AgentType} agentType
   * @returns {Observable<Object>}
   */
  createAgentType(agentType: AgentType) {
    return this.http.post(
      `${environment.apiUrl}/AgentTypes/?${MyLib.getTokenString()}`, agentType);
  }
}
