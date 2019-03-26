// documents https://log4js-node.github.io/log4js-node/dateFile.html
module.exports = {
  appenders: {
    dateFile: {
      type: 'dateFile',
      filename: 'logs/chat.log',
      pattern: 'yyyy-MM-dd', /* roll log in days */
      daysToKeep: 30, /* keep log for 30 days */
      layout: { type: 'json', separator: ',' }
    }
  },
  categories: {
    default: { appenders: ['dateFile'], level: 'trace' }
  }
}