import { Logger, LogLevel, LogConfiguation } from '../src/index';

describe('Logger Init Check', () => {
  test('Checking module name', () => {
    const logger = new Logger('TEST1', LogLevel.trace);
    expect(logger.name).toBe('TEST1');
  });
});

describe('Log Level Checks', () => {
  test('Checking error log levels', () => {
    const logger = new Logger('TEST1', LogLevel.error);
    expect(logger.canLog(LogLevel.trace)).toBe(false);
    expect(logger.canLog(LogLevel.debug)).toBe(false);
    expect(logger.canLog(LogLevel.info)).toBe(false);
    expect(logger.canLog(LogLevel.warn)).toBe(false);
    expect(logger.canLog(LogLevel.error)).toBe(true);
  });

  test('Checking warn log levels', () => {
    const logger = new Logger('TEST1', LogLevel.warn);
    expect(logger.canLog(LogLevel.trace)).toBe(false);
    expect(logger.canLog(LogLevel.debug)).toBe(false);
    expect(logger.canLog(LogLevel.info)).toBe(false);
    expect(logger.canLog(LogLevel.warn)).toBe(true);
    expect(logger.canLog(LogLevel.error)).toBe(true);
  });

  test('Checking info log levels', () => {
    const logger = new Logger('TEST1', LogLevel.info);
    expect(logger.canLog(LogLevel.trace)).toBe(false);
    expect(logger.canLog(LogLevel.debug)).toBe(false);
    expect(logger.canLog(LogLevel.info)).toBe(true);
    expect(logger.canLog(LogLevel.warn)).toBe(true);
    expect(logger.canLog(LogLevel.error)).toBe(true);
  });

  test('Checking debug log levels', () => {
    const logger = new Logger('TEST1', LogLevel.debug);
    expect(logger.canLog(LogLevel.trace)).toBe(false);
    expect(logger.canLog(LogLevel.debug)).toBe(true);
    expect(logger.canLog(LogLevel.info)).toBe(true);
    expect(logger.canLog(LogLevel.warn)).toBe(true);
    expect(logger.canLog(LogLevel.error)).toBe(true);
  });

  test('Checking debug log levels', () => {
    const logger = new Logger('TEST1', LogLevel.debug);
    expect(logger.canLog(LogLevel.trace)).toBe(false);
    expect(logger.canLog(LogLevel.debug)).toBe(true);
    expect(logger.canLog(LogLevel.info)).toBe(true);
    expect(logger.canLog(LogLevel.warn)).toBe(true);
    expect(logger.canLog(LogLevel.error)).toBe(true);
  });

  test('Checking trace log levels', () => {
    const logger = new Logger('TEST1', LogLevel.trace);
    expect(logger.canLog(LogLevel.trace)).toBe(true);
    expect(logger.canLog(LogLevel.debug)).toBe(true);
    expect(logger.canLog(LogLevel.info)).toBe(true);
    expect(logger.canLog(LogLevel.warn)).toBe(true);
    expect(logger.canLog(LogLevel.error)).toBe(true);
  });

  test('Checking none log levels', () => {
    const logger = new Logger('TEST1', LogLevel.none);
    expect(logger.canLog(LogLevel.trace)).toBe(false);
    expect(logger.canLog(LogLevel.debug)).toBe(false);
    expect(logger.canLog(LogLevel.info)).toBe(false);
    expect(logger.canLog(LogLevel.warn)).toBe(false);
    expect(logger.canLog(LogLevel.error)).toBe(false);
  });
});

describe('Console Outputs', () => {
  test('Checking console log outputs', () => {
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData += moduleName + msg);
    console['log'] = jest.fn(storeLog);

    const logger = new Logger('EXAMPLE', LogLevel.trace);
    logger.trace('Hello World');
    expect(outputData).toBe('TRACE::EXAMPLE::>Hello World');
  });

  test('Checking console info outputs', () => {
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData += moduleName + msg);
    console['info'] = jest.fn(storeLog);

    const logger = new Logger('EXAMPLE', LogLevel.trace);
    logger.info('Hello World');
    expect(outputData).toBe('INFO::EXAMPLE::>Hello World');
  });

  test('Checking console warn outputs', () => {
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData += moduleName + msg);
    console['warn'] = jest.fn(storeLog);

    const logger = new Logger('EXAMPLE', LogLevel.trace);
    logger.warn('Hello World');
    expect(outputData).toBe('WARN::EXAMPLE::>Hello World');
  });

  test('Checking console error outputs', () => {
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData += moduleName + msg);
    console['error'] = jest.fn(storeLog);

    const logger = new Logger('EXAMPLE', LogLevel.trace);
    logger.error('Hello World');
    expect(outputData).toBe('ERROR::EXAMPLE::>Hello World');
  });

  test('Checking console debug outputs', () => {
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData += moduleName + msg);
    console['log'] = jest.fn(storeLog);

    const logger = new Logger('EXAMPLE', LogLevel.trace);
    logger.debug('Hello World');
    expect(outputData).toBe('DEBUG::EXAMPLE::>Hello World');
  });
});

describe('Configuration Checks', () => {
  const LOG_MODULES = [
    {
      name: 'T1',
      level: LogLevel.none
    },
    {
      name: 'T2',
      level: LogLevel.trace
    },
    {
      name: 'T3',
      level: LogLevel.info
    },
    {
      name: 'T4',
      level: LogLevel.debug
    },
    {
      name: 'T5',
      level: LogLevel.warn
    },
    {
      name: 'T6',
      level: LogLevel.error
    }
  ];

  LogConfiguation.initialize(LOG_MODULES, LogLevel.none);

  test('Checking module initialized with none log level to print nothing', () => {
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData = moduleName + msg);
    console['error'] = jest.fn(storeLog);
    const l1 = new Logger('T1');
    outputData = '';
    l1.error('Hello World');
    expect(outputData).toBe('');
  });

  test('Checking module initialized with trace level to print logs on trace', () => {
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData = moduleName + msg);
    console['log'] = jest.fn(storeLog);
    const l2 = new Logger('T2');
    l2.trace('Hello World');
    expect(outputData).toBe('TRACE::T2::>Hello World');
  });

  test('Checking default log level none should print noting', () => {
    const log = new Logger('TEMP');
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData = moduleName + msg);
    console['info'] = jest.fn(storeLog);
    log.info('Hello World');
    expect(outputData).toBe('');
  });

  test('Checking error log level should not print anything below error', () => {
    const log = new Logger('T6');
    let outputData = '';
    let storeLog = (moduleName, msg) => (outputData = moduleName + msg);
    console['info'] = jest.fn(storeLog);
    log.debug('Hello World');
    expect(outputData).toBe('');
  });

});
