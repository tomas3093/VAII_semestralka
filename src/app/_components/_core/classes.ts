import {Agent} from "../../_models";
import {Constants} from "./Constants";

/**
 * Polozka v zozname dlzok frontu
 */
export class QueueLengthListItem {
  time: number;
  value: number;
}


/**
 * Struktura ktora pocita statistiky o agentoch
 * Vsetky casy vracia v milisekundach
 */
export class AgentStatistics {
  private agents: Agent[];

  constructor() {
    this.agents = [];
  }

  add(agent: Agent) {
    this.agents.push(agent);
  }

  length(): number {
    return this.agents.length;
  }

  getLastInterarrivalTime(): number {
    if (this.agents.length < 2) {
      return Constants.COLLECTOR_STATISTICS_UNDEFINED_VAL;
    }

    let predposledny: number = this.agents[this.agents.length - 2].arrival;
    let posledny: number = this.agents[this.agents.length - 1].arrival;

    return (posledny - predposledny);
  }

  minWaitingTime(): number {
    if (this.agents.length === 0) {
      return Constants.COLLECTOR_STATISTICS_UNDEFINED_VAL;
    }

    let min: number = Number.MAX_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].waitingTime < min)
        min = this.agents[i].waitingTime;
    }

    return min;
  }

  maxWaitingTime(): number {
    if (this.agents.length === 0) {
      return Constants.COLLECTOR_STATISTICS_UNDEFINED_VAL;
    }

    let max: number = Number.MIN_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].waitingTime > max)
        max = this.agents[i].waitingTime;
    }

    return max;
  }

  avgWaitingTime(): number {
    if (this.agents.length === 0) {
      return Constants.COLLECTOR_STATISTICS_UNDEFINED_VAL;
    }

    let sum: number = 0;
    let count: number = 0;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].waitingTime) {
        sum += this.agents[i].waitingTime;
        count++;
      }
    }

    return sum / count;
  }

  minDelayTime(): number {
    if (this.agents.length === 0) {
      return Constants.COLLECTOR_STATISTICS_UNDEFINED_VAL;
    }

    let min: number = Number.MAX_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].delayTime < min)
        min = this.agents[i].delayTime;
    }

    return min;
  }

  maxDelayTime(): number {
    if (this.agents.length === 0) {
      return Constants.COLLECTOR_STATISTICS_UNDEFINED_VAL;
    }

    let max: number = Number.MIN_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].delayTime > max)
        max = this.agents[i].delayTime;
    }

    return max;
  }

  avgDelayTime(): number {
    if (this.agents.length === 0) {
      return Constants.COLLECTOR_STATISTICS_UNDEFINED_VAL;
    }

    let sum: number = 0;
    let count: number = 0;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].delayTime) {
        sum += this.agents[i].delayTime;
        count++;
      }
    }

    return sum / count;
  }
}
