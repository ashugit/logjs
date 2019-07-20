/**
 *
 *
 * @export
 * @enum {number}
 */
export enum  LogLevel {
    trace =  1<<1,
    debug =  1<<2,
    info =  1<<3,
    warn =  1<<4,
    error =  1<<5,
    none = 1 << 10
};

/**
 *
 *
 * @export
 * @interface LogAppender
 */
export interface LogAppender {
    append: (...args : any[]) => void;
}

/**
 *
 *
 * @export
 * @interface LogModule
 */
export interface LogModule {
    name: string,
    level?: LogLevel,
    appender?: LogAppender
};

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum LogAppenderTag{
    console = 1,
    syslog = 2,
    rollingfile = 3
}

