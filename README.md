# Gekko [![npm](https://img.shields.io/npm/dm/gekko.svg)]() [![Build Status](https://travis-ci.org/askmike/gekko.png)](https://travis-ci.org/askmike/gekko) [![Build status](https://ci.appveyor.com/api/projects/status/github/askmike/gekko?branch=stable&svg=true)](https://ci.appveyor.com/project/askmike/gekko)

![Gordon Gekko](http://mikevanrossum.nl/static/gekko.jpg)

*The most valuable commodity I know of is information.*

-Gordon Gekko

Gekko is a Bitcoin TA trading and backtesting platform that connects to popular Bitcoin exchanges. It is written in JavaScript and runs on [Node.js](http://nodejs.org).


A Node.js script to update the Gekko exchange .json files which specify which currencies and assets the exchange supports.

Change the "exchangeId" (lower case) to the desired exchange
For the list of exchanges that this script via CCXT supports, see:
https://github.com/ccxt/ccxt

The script requires CCXT to run.

npm i ccxt

node ./Gekko_CCXT_Exchange_update.js

Script will generate the .json file in the same directory that the script is run.
The .json file then needs to be moved to [Gekko install dir]/exchange/wrappers

Start Gekko.
 

 
Note: this script does not include or generate the exchange wrapper files required for Gekko to use the .json config files.
