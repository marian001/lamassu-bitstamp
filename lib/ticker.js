const BigNumber = require('bignumber.js')
const common = require('./common')

function ticker (currencies, cryptoCode) {
  if (cryptoCode !== 'BTC') {
    return Promise.reject(new Error('Unsupported crypto: ' + cryptoCode))
  }

  try {
    const promises = currencies.map(currency => {
      if (currency === 'USD') return 'btcusd'
      if (currency === 'EUR') return 'btceur'
      throw new Error('Unsupported fiat: ' + currency)
    })
    .map(r => common.request('/ticker/' + r, 'GET'))

    return Promise.all(promises)
    .then(a => {
      const result = {}
      currencies.forEach((currency, i) => {
        const tickerRec = a[i]
        result[currency] = {
          rates: {
            ask: new BigNumber(tickerRec.ask),
            bid: new BigNumber(tickerRec.bid)
          }
        }
      })

      return result
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  ticker
}

