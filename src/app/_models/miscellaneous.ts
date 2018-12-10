import {Agent} from "./agent";

export class Constants {
  public static readonly USER_ROLE_ADMIN: number = 0;
  public static readonly USER_ROLE_MODERATOR: number = 1;
  public static readonly USER_ROLE_USER: number = 2;

  // 30 minutes TTL
  public static readonly USER_LOGIN_DEFAULT_TTL = 60 * 30;
}

/**
 * Polozka v zozname dlzok frontu
 */
export class QueueLengthListItem {
  time: number;
  value: number;
}


/**
 * Struktura ktora pocita statistiky o agentoch
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

  minWaitingTime(): number {
    let min: number = Number.MAX_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].waitingTime < min)
        min = this.agents[i].waitingTime;
    }

    return min;
  }

  maxWaitingTime(): number {
    let max: number = Number.MIN_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].waitingTime > max)
        max = this.agents[i].waitingTime;
    }

    return max;
  }

  avgWaitingTime(): number {
    let sum: number = 0;
    for(let i = 0; i < this.agents.length; i++) {
      sum += this.agents[i].waitingTime;
    }

    return sum / this.agents.length;
  }

  minDelayTime(): number {
    let min: number = Number.MAX_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].delayTime < min)
        min = this.agents[i].delayTime;
    }

    return min;
  }

  maxDelayTime(): number {
    let max: number = Number.MIN_VALUE;
    for(let i = 0; i < this.agents.length; i++) {
      if(this.agents[i].delayTime > max)
        max = this.agents[i].delayTime;
    }

    return max;
  }

  avgDelayTime(): number {
    let sum: number = 0;
    for(let i = 0; i < this.agents.length; i++) {
      sum += this.agents[i].delayTime;
    }

    return sum / this.agents.length;
  }
}


export class LoginResponse {
  id: string;
  ttl: number;
  created: string;
  userId: number;
}
