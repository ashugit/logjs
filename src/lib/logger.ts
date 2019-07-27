import Configuration, { ConfigureClass } from './configuration';
import {LogLevel, LogModule} from './types';
import Enums from './enums';

/**
 *
 *
 * @export
 * @param {*} name
 * @param {*} level
 */
export default class Logger{
    name: string;
    level?: LogLevel;
    configuration: ConfigureClass;


    /**
     *Creates an instance of Logger.
     * @param {string} name
     * @param {LogLevel} [level=LogLevel.debug]
     * @memberof Logger
     */
    constructor(name:string, level:LogLevel){
        this.name = name;
        this.configuration = Configuration;
        this.setLevel(level);
    };
    /**
     *
     *
     * @param {LogLevel} level
     * @memberof Logger
     */
    setLevel(level: LogLevel){
        const logModule: LogModule = {
            name: this.name,
            level: level
        };
        this.configuration.updateLevel(logModule);
    }

    /**
     *
     *
     * @param {LogLevel} level
     * @returns {boolean}
     * @memberof Logger
     */
    canLog(level:LogLevel):boolean{
        return true //level >= this.configuration.getLevel(this.name);
    }


    /**
     *
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    trace(...args: any[]){
        if(this.canLog(LogLevel.trace)){
            this.configuration
              .getAppender(this.name)
              .append(Enums.LOG_TYPE.LOG, `TRACE::${this.name}::>`, args);
        }
    };

    /**
     *
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    debug(...args: any[]){
        if(this.canLog(LogLevel.debug)){
            this.configuration
              .getAppender(this.name)
              .append(Enums.LOG_TYPE.LOG, `DEBUG::${this.name}::>`, args);
        }
    };

    /**
     *
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    info(...args: any[]){
        if(this.canLog(LogLevel.info)){
            this.configuration
              .getAppender(this.name)
              .append(Enums.LOG_TYPE.INFO, `INFO::${this.name}::>`, args);
        }
    };

    /**
     *
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    warn(...args: any[]){
        if(this.canLog(LogLevel.warn)){
            this.configuration
              .getAppender(this.name)
              .append(Enums.LOG_TYPE.WARN, `WARN::${this.name}::>`, args);
        }
    };

    /**
     *
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    error(...args: any[]){
        if(this.canLog(LogLevel.error)){
            this.configuration
              .getAppender(this.name)
              .append(Enums.LOG_TYPE.ERROR, `ERROR::${this.name}::>`, args);
        }
    };


}