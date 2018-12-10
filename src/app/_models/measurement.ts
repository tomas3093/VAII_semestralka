export class Measurement {
  measurementId: number;
  name: string;
  description: string;
  startTime: Date;
  stopTime: Date;

  // FKs
  userId: number;
  agentTypeId: number;
}
