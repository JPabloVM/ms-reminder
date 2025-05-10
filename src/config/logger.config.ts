import dayjs from 'dayjs';

const formatDateLog = (timestamp: number) =>
  dayjs(timestamp)
    .toDate()
    .toString()
    .replace(/\sGMT.+/, '');

enum Type {
  LOG = 'LOG',
  WARN = 'WARN',
  INFO = 'INFO',
  DARK = 'DARK',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
  VERBOSE = 'VERBOSE',
}

export class Logger {
  constructor(private context = 'Logger') {}

  private instance: string | null = null;

  public setContext(value: string) {
    this.context = value;
  }

  public setInstance(value: string) {
    this.instance = value;
  }

  private console(value: any, type: Type) {
    const types = ['ERROR', 'WARN', 'DEBUG', 'INFO', 'LOG', 'VERBOSE', 'DARK', 'WEBHOOKS'];

    const typeValue = typeof value;
    if (types.includes(type)) {
      console.log(
        '[MS REMINDER]',
        this.instance ? `[${this.instance}]` : '',
        process.pid.toString(),
        '-',
        `${formatDateLog(Date.now())}  `,
        `${type} `,
        `[${this.context}]`,
        `[${typeValue}]`,
        value,
      );
    }
  }

  public log(value: any) {
    this.console(value, Type.LOG);
  }

  public info(value: any) {
    this.console(value, Type.INFO);
  }

  public warn(value: any) {
    this.console(value, Type.WARN);
  }

  public error(value: any) {
    this.console(value, Type.ERROR);
  }

  public verbose(value: any) {
    this.console(value, Type.VERBOSE);
  }

  public debug(value: any) {
    this.console(value, Type.DEBUG);
  }

  public dark(value: any) {
    this.console(value, Type.DARK);
  }
}
