import { JobData, Queue } from 'bullmq';
import { connection } from '../config/bullmq.config';

export class ManagerQueue {
  private static instance: ManagerQueue;
  private queues: Map<string, Queue<JobData>>;

  constructor() {
    this.queues = new Map();
  }

  public static getInstance(): ManagerQueue {
    if (!ManagerQueue.instance) {
      ManagerQueue.instance = new ManagerQueue();
    }
    return ManagerQueue.instance;
  }

  getOrCreateQueue(queueName: string): Queue<JobData> {
    if (!this.queues.has(queueName)) {
      const queue = new Queue(queueName, { connection });
      this.queues.set(queueName, queue);
    }

    return this.queues.get(queueName)!;
  }
}
