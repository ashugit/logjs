import {LogAppender, LogAppenderTag, LogLevel, LogModule} from './types';

import AppenderFactory from './appenders/factory';

/**
 *
 *
 * @export
 * @class ConfigureClass
 */
export class ConfigureClass{
    modules: any;
    defaultLevel: LogLevel = LogLevel.debug;
    appenderFactory:AppenderFactory;
    defaultAppender: LogAppender = undefined;

    /**
     *
     *
     * @param {Array<LogModule>} list
     * @memberof ConfigureClass
     */
    initialize(list: Array<LogModule>, defaultLevel: LogLevel = LogLevel.debug){
        let modules = {};
        list.forEach((e:LogModule) => {
            modules[e.name] = e;
        });
        this.modules = modules;

        if(!this.appenderFactory){
            this.appenderFactory = new AppenderFactory();
            this.defaultAppender = this.appenderFactory.getAppender(LogAppenderTag.console);
        }
    };
    /**
     *
     *
     * @param {LogModule} entry
     * @memberof ConfigureClass
     */
    updateLevel(entry:LogModule){
        this.modules[entry.name] = entry;
    }

    /**
     *
     *
     * @param {string} name
     * @returns {LogLevel}
     * @memberof ConfigureClass
     */
    getLevel(name: string):LogLevel{
        return this.modules[name] ? this.modules[name].level : this.defaultLevel;
    }

    /**
     *
     *
     * @param {string} name
     * @returns {LogAppender}
     * @memberof ConfigureClass
     */
    getAppender(name: string):LogAppender{
        return this.modules[name] ? this.modules[name].appender : this.defaultAppender;
    }
}
// Keeping a singleton export of configuration class
const Configuation = new ConfigureClass();
export default Configuation;


