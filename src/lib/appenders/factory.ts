import { LogAppender, LogAppenderTag } from './../types';

import ConsoleAppender from './console';
import RollingFileAppender from './rollingfile';
import SyslogAppender from './syslog';

export default class AppenderFactory{

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