const BigNumber = require('bignumber.js')
const common = require('./common')

function ticker (account, fiatCode, cryptoCode) {
  return Promise.resolve()
  .then(() => {
    if (cryptoCode !== 'BTC') {
      throw new Error('Unsupported crypto: ' + cryptoCode)
    }
  })
  .then(() => {
    const market = common.buildMarket(fiatCode, cryptoCode)
    return common.request('/ticker/' + market, 'GET')
  })
  .then(r => ({
    rates: {
      ask: new BigNumber(r.ask),
      bid: new BigNumber(r.bid)
    }
  }))
}

module.exports = {
  ticker
}

