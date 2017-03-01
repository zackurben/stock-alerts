'use strict';

const cli = require('cli');
const getStock = require('get-stock');
const notifier = require('node-notifier');
const timer = require('timers');

module.exports = () => cli.main((args) => {
  let timeout = 1000 * 60 * 10;
  let tickers = args.map((item) => item.toUpperCase());

  timer.setInterval(() => {
    getStock(tickers)
    .then((response) => {
      let data = [];
      response.results.forEach((item) => {
        data.push(`${item.ChangeinPercent}\t${item.Name}`)
      });

      notifier.notify({
        title: `Stock Alerts`,
        message: data.join(`\n`),
        subtitle: void 0,
        wait: true,
        time: 60000
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }, timeout);
});

