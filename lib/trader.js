const common = require('./common')

let cfg

function config (_cfg) {
  cfg = _cfg
}

function buildMarket (fiatCode, cryptoCode) {
  if (cryptoCode !== 'BTC') throw new Error('Unsupported crypto: ' + cryptoCode)
  if (fiatCode === 'USD') return 'btcusd'
  if (fiatCode === 'EUR') return 'btceur'
  throw new Error('Unsupported fiat: ' + fiatCode)
}

function purchase (cryptoAtoms, fiatCode, cryptoCode) {
  return trade('buy', cryptoAtoms, fiatCode, cryptoCode)
}

function sell (cryptoAtoms, fiatCode, cryptoCode) {
  return trade('sell', cryptoAtoms, fiatCode, cryptoCode)
}

function handleErrors (data) {
  if (!data.reason || !data.reason.__all__) return data

  const err = new Error(data.reason.__all__[0])

  if (data.reason.__all__[0].indexOf('Minimum order size is') === 0) {
    err.name = 'orderTooSmall'
  }

  throw err
}

function trade (type, cryptoAtoms, fiatCode, cryptoCode) {
  try {
    const market = buildMarket(fiatCode, cryptoCode)
    const options = {amount: cryptoAtoms.div(1e8).toFixed(8)}

    return common.authRequest(cfg, '/' + type + '/market/' + market, options)
    .catch(e => {
      if (e.response) handleErrors(e.response.data)
      throw e
    })
    .then(handleErrors)
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  config,
  purchase,
  sell
}
