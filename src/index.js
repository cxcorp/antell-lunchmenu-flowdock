require('dotenv').config()
const fetch = require('node-fetch')
const { antellMenuUrl, flowdockFlowTokens, userAgent } = require('./config')
const { getTodaysWeekdayInFinnish } = require('./util')
const { parseLunchMenu } = require('./lunch-menu-parser')
const { submitMenuToFlowdock } = require('./flowdock-submitter')

exitIfMissingVars()

getLunchMenu().then(weekMenu => {
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

  return submitMenuToFlowdock(menu)
})

function exitIfMissingVars() {
  let exit = false
  if (flowdockFlowTokens.length < 1) {
    exit = true
    console.error('FLOWDOCK_FLOW_TOKENS are not set!')
  }
  if (!antellMenuUrl) {
    exit = true
    console.error('ANTELL_MENU_URL is not set!')
  }
  if (exit) {
    process.exit(1)
  }
}

function getLunchMenu() {
  return fetch(antellMenuUrl, { headers: { 'User-Agent': userAgent } })
    .then(body => body.text())
    .then(parseLunchMenu)
}
