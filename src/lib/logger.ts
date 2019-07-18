import Configuration, { ConfigureClass } from './configuration';
import {LogLevel, LogModule} from './types';

/**
 *
 *
 * @export
 * @param {*} name
 * @param {*} level
 */
export default class Logger{
    name: string;
    level: LogLevel;
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
        return level >= this.configuration.getLevel(this.name);
    }


    /**
     *
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    trace(...args: any[]){
        if(this.canLog(LogLevel.trace)){
            this.configuration.getAppender(this.name).append(args.unshift(`TRACE::${module}::>`));
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
            this.configuration.getAppender(this.name).append(args.unshift(`DEBUG::${module}::>`));
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
            this.configuration.getAppender(this.name).append(args.unshift(`INFO::${module}::>`));
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
            this.configuration.getAppender(this.name).append(args.unshift(`WARN::${module}::>`));
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
            this.configuration.getAppender(this.name).append(args.unshift(`ERROR::${module}::>`));
        }
    };


}