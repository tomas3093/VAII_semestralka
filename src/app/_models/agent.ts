export class Agent {
  agentId: number;
  arrival: Date;
  delayTime: number;
  waitingTime: number;
  invalidValue: boolean;

  // FKs
  measurementId: number;
}
