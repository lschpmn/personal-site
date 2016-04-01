'use strict';

const path = require('path');
const LOG_TEMPLATE = (level, fileName, message) => `${level}: ${fileName} - ${new Date().toLocaleString()} - ${message}`;

class Log {
  constructor(filePath) {
    this.fileName = path.basename(filePath, '.js');
  }
  
  /**
   * Writes formatted message to stdout
   * @param {*} message
   */
  info(message) {
    const parsedMessage = this.inputToString(message);
    
    console.log(LOG_TEMPLATE('LOG', this.fileName, parsedMessage));
  }
  
  /**
   * Writes formatted message to stderr
   * @param {*} message
   */
  error(message) {
    const parsedMessage = this.inputToString(message);
    
    console.error(LOG_TEMPLATE('ERROR', this.fileName, parsedMessage));
  }
  
  /**
   * 
   * @param {*} input
   * @returns {String}
   */
  inputToString(input) {
    if(input == null) {
      return '';
    }else if(typeof input === 'object') {
      try {
        return JSON.stringify(input);
      } catch(err) {
        console.error(LOG_TEMPLATE('ERROR', this.fileName, 'Error trying to parse input: ' + input));
        console.error(LOG_TEMPLATE('ERROR', this.fileName, err.stack));
        return '';
      }
    } else {
      return input.toString();
    }
    
  }
}

module.exports = Log;