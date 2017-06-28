require('dotenv').config()
const fetch = require('node-fetch')
const { antellMenuUrl, flowdockFlowToken, userAgent } = require('./config')
const { getTodaysDateInFinnish } = require('./util')
const { parseLunchMenu } = require('./lunch-menu-parser')
const { submitToFlowdock } = require('./flowdock-submitter')

exitIfMissingVars()

getLunchMenu().then(weekMenu => {
  const menu = getTodaysMenu(weekMenu)
  if (!menu) {
    console.error('Failed to get today\'s menu')
    process.exit(1)
  }

  return submitToFlowdock(menu)
})

function exitIfMissingVars() {
  let exit = false
  if (!flowdockFlowToken) {
    exit = true
    console.error('FLOWDOCK_TOKEN is not set!')
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

function getTodaysMenu(weekMenu) {
  const key = getTodaysDateInFinnish()
  return weekMenu[key]
}
