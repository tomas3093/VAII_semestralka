export class Agent {
  agentId: number;
  arrival: number;      // timestamp
  delayTime: number;
  waitingTime: number;
  invalidValue: boolean;

  // FKs
  measurementId: number;

  get ArrivalDate(): Date {return new Date(this.arrival)}
}
