const ticker = require('./lib/ticker')
const trader = require('./lib/trader')

const SUPPORTED_MODULES = ['ticker', 'trader']
const NAME = 'BitStamp'

exports.purchase = trader.purchase
exports.sell = trader.sell

exports.balance = require('./lib/common').balance

function config (cfg) {
  trader.config(cfg)
}

module.exports = {
  NAME,
  SUPPORTED_MODULES,
  purchase: trader.purchase,
  sell: trader.sell,
  ticker: ticker.ticker,
  config: config
}
