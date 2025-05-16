import { Job, JobProgress, Worker } from 'bullmq';
import { ReminderService } from '../services/reminder.service';
import { EChannel, EStatus, IReminder } from '../models/reminder.model';
import sendEmail from '../utils/mailer.util';
import sendMessage from '../utils/whatsapp.util';
import { connection } from '../config/bullmq.config';
import { ProducerQueue } from './producer.queue';
import { ManagerQueue } from './manager.queue';
import { Logger } from '../config/logger.config';

const logger = new Logger('ProcessorQueue');

export class ProcessorQueue {
  private static instance: ProcessorQueue;

  private readonly reminderService: ReminderService;
  private readonly producerQueue: ProducerQueue;
  private readonly managerQueue: ManagerQueue;

  constructor() {
    this.reminderService = new ReminderService();
    this.producerQueue = new ProducerQueue();
    this.managerQueue = ManagerQueue.getInstance();
  }

  public static getInstance(): ProcessorQueue {
    if (!ProcessorQueue.instance) {
      ProcessorQueue.instance = new ProcessorQueue();
    }
    return ProcessorQueue.instance;
  }

  async processReminder() {
    const worker = new Worker(
      'reminder',
      async (job: Job) => {
        const jobData: IReminder = job.data;
        let result;

        switch (jobData.channel) {
          case EChannel.EMAIL:
            if (jobData.email)
              result = await sendEmail(jobData.email, 'reminder.hbs', {
                title: jobData.title,
                message: jobData.message,
                eventDate: jobData.schedule,
              });
          case EChannel.WHATSAPP:
            if (jobData.phoneNumber) result = await sendMessage(jobData.phoneNumber, jobData.message);
        }

        return result;
      },
      { connection },
    );

    worker.on('progress', (job: Job, progress: JobProgress) => {
      // ? TODO: Atualizar status no banco de dados para saber que está em progresso

      this.reminderService.update(job.data._id, { status: EStatus.PROGRESS });
    });

    worker.on('failed', (job: Job | undefined, error: Error, prev: string) => {
      // ? TODO: Atualizar status no banco de dados para saber que está com falha

      logger.error(`Error on process job: ${error}`);
      if (job) {
        this.reminderService.update(job.data._id, { status: EStatus.ERROR, payload: error });
      }
    });

    worker.on('completed', (job: Job | undefined, result: any) => {
      // ? TODO: Atualizar status no banco de dados para saber que foi finalizado
      if (job) {
        this.reminderService.update(job.data._id, { status: EStatus.SENDED });
      }
    });
  }

  async processScheduler() {
    const worker = new Worker(
      'scheduler',
      async (job: Job) => {
        const schedules = await this.reminderService.get({
          status: EStatus.SCHEDULED,
          $or: [{ schedule: new Date() }, { schedule: { $lte: new Date() } }],
        });

        if (!schedules || schedules.length < 1) return;
        const reminderQueue = this.managerQueue.getOrCreateQueue('reminder');
        for (const schedule of schedules) {
          this.producerQueue.produce(reminderQueue, schedule.title, schedule);
        }

        console.log(schedules);
      },
      { connection },
    );

    worker.on('progress', (job: Job, progress: JobProgress) => {
      // ? TODO: Atualizar status no banco de dados para saber que está em progresso
    });

    worker.on('failed', (job: Job | undefined, error: Error, prev: string) => {
      // ? TODO: Atualizar status no banco de dados para saber que está com falha
    });

    worker.on('completed', (job: Job | undefined, result: any) => {
      // ? TODO: Atualizar status no banco de dados para saber que foi finalizado
    });
  }
}
