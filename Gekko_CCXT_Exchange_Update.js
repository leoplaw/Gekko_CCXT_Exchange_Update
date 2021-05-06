 
// const asTable = require ('as-table')
const ccxt = require ('ccxt')
const fs = require('fs');
const path = require('path');

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

;(async () => {

  const exchangeId = 'binance'
  const exchangeClass = ccxt[exchangeId]
  , exchange = new exchangeClass ({
      'apiKey': 'YOUR_API_KEY',
      'secret': 'YOUR_SECRET',
      'timeout': 60000,
      'enableRateLimit': true,
  })
  console.log ('Instantiating',exchangeId,'exchange.')

  let markets = await exchange.load_markets ()

  console.log (exchange.id, markets)
  // console.log (asTable.configure ({ delimiter: ' | ' }) (Object.values (markets)))

  markets = Object.keys(markets).sort().reduce(
    (obj, key) => { 
      obj[key] = markets[key]; 
      return obj;
    }, 
    {}
  );

  let exMarkets = {"assets": [], "currencies": [], "markets": []}
  let i = 0

  for (const [key, val] of Object.entries(markets)) {
    // console.log(`${key}: ${val}`);
    exMarkets.markets[i++] = {
      "pair": [val.quote, val.base], 
      "minimalOder": {"amount": val.limits.amount.min, 
                      "price": val.limits.price.min, 
                      "order": val.limits.cost.min
                    }
    }
    exMarkets.currencies.sort()

    if (exMarkets.currencies.indexOf(val.quote) === -1 ) {
      exMarkets.currencies.push(val.quote)
    }
    if (exMarkets.assets.indexOf(val.base) === -1 ) {
      exMarkets.assets.push(val.base)
    }
  }
  console.log(exMarkets)

  let json = JSON.stringify(exMarkets);
//   let filePath = path.join(__dirname, "../../wrappers/", exchangeId+"-markets.json")
  let filePath = path.join(__dirname, exchangeId+"-markets.json")
  let write = await writeFile(filePath, json)
}) ()
