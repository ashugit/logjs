import { LogAppender } from './../types';
import Enums from '../enums';

export default class ConsoleAppender implements LogAppender {
  append(logType: string, moduleName: string, args: any[]) {
    switch (logType) {
      case Enums.LOG_TYPE.LOG:
        console.log(moduleName, ...args);
        break;
      case Enums.LOG_TYPE.INFO:
        console.info(moduleName, ...args);
        break;
      case Enums.LOG_TYPE.WARN:
        console.warn(moduleName, ...args);
        break;
      case Enums.LOG_TYPE.ERROR:
        console.error(moduleName, ...args);
        break;
      default:
        console.log(moduleName, ...args);
    }
  }
}
