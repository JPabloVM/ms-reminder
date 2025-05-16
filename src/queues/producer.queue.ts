import { JobSchedulerTemplateJson, JobSchedulerTemplateOptions, JobsOptions, Queue, RepeatOptions } from 'bullmq';

export class ProducerQueue {
  async produce(queue: Queue, jobName: string, data: any, jobOptions?: JobsOptions) {
    try {
      await queue.add(jobName, data, jobOptions);
    } catch (error) {
      throw error;
    }
  }

  async produceScheduler(
    queue: Queue,
    jobName: string,
    repeat: Omit<RepeatOptions, 'key'>,
    jobTemplate?: JobSchedulerTemplateJson,
  ) {
    try {
      await queue.upsertJobScheduler(jobName, repeat, jobTemplate);
    } catch (error) {
      throw error;
    }
  }
}
