#!/usr/bin/env node
const fetch = require('node-fetch')
const yargs = require('yargs')
const { userAgent } = require('./config')
const { getTodaysWeekdayInFinnish } = require('./util')
const { parseLunchMenu } = require('./lunch-menu-parser')
const { submitMenuToFlowdock } = require('./flowdock-submitter')

const yargv = yargs
  .usage('$0 [args]')
  .option('u', {
    alias: 'url',
    demandOption: true,
    describe: 'url of the lunch list',
    type: 'string'
  })
  .option('f', {
    alias: 'flow',
    demandOption: true,
    describe: 'flow source token of the target flow',
    type: 'string'
  })
  .option('t', {
    alias: 'tags',
    demandOption: false,
    describe: 'tags of the message sent',
    type: 'array'
  })
  .help()
  .argv

getLunchMenu(yargv).then(weekMenu => {
  const key = getTodaysWeekdayInFinnish()
  if (key === 'Lauantai' || key === 'Sunnuntai') {
    console.log('Weekend; not posting menu')
    process.exit(0)
  }
  const menu = weekMenu[key]
  if (!menu) {
    console.error(`No lunch menu found for ${key}. Lunch menus found: ${Object.keys(weekMenu)}`)
    process.exit(1)
  }

  return submitMenuToFlowdock(menu, yargv)
})

function getLunchMenu(argv) {
  return fetch(argv.url, { headers: { 'User-Agent': userAgent } })
    .then(body => body.text())
    .then(parseLunchMenu)
}
