import { LogAppender, LogAppenderTag } from './../types';

import ConsoleAppender from './console';
import RollingFileAppender from './rollingfile';
import SyslogAppender from './syslog';

/**
 *
 *
 * @export
 * @class AppenderFactory
 */
export default class AppenderFactory{
    /**
     *
     *
     * @param {LogAppenderTag} tag
     * @returns {LogAppender}
     * @memberof AppenderFactory
     */
    getAppender(tag: LogAppenderTag):LogAppender{
        switch(tag){
            case LogAppenderTag.rollingfile:
                return new RollingFileAppender();
            case LogAppenderTag.syslog:
                return new SyslogAppender();
            case LogAppenderTag.console:
            default:
                return new ConsoleAppender();
        }
    }
}