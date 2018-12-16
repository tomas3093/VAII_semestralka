export class Measurement {
  measurementId: number;
  name: string;
  description: string;
  startTime: number;    // timestamp
  stopTime: number;     // timestamp

  // FKs
  userId: number;
  agentTypeId: number;
}
