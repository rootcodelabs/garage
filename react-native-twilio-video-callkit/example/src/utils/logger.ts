const debug = 'debug';
const log = 'log';
const info = 'info';
const warn = 'warn';
const error = 'error';

const level = __DEV__ ? debug : error;

export const logger = {
  debug: function(...params: any[]) {
    if ([debug].indexOf(level) > -1) {
      console.log('logger debug:', ...params);
    }
  },
  log: function(...params: any[]) {
    if ([debug, log].indexOf(level) > -1) {
      console.log('logger log:', ...params);
    }
  },
  info: function(...params: any[]) {
    if ([debug, log, info].indexOf(level) > -1) {
      console.log('logger debug:', ...params);
    }
  },
  warn: function(...params: any[]) {
    if ([debug, log, info, warn].indexOf(level) > -1) {
      console.log('logger debug:', ...params);
    }
  },
  error: function(...params: any[]) {
    if ([debug, log, info, warn, error].indexOf(level) > -1) {
      console.log('logger debug:', ...params);
    }
  },
};
