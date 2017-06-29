const fetch = require('node-fetch')
const { userAgent } = require('./config')
const { getTodaysWeekdayInEnglish, formatDateRfc } = require('./util')

/**
 * @param {any} menu
 * @returns {Promise<string>} flowdock server response
 */
function submitMenuToFlowdock(menu, argv) {
  const fields = menuToFields(menu)
  const body = getMessageBody(fields)
  const payload = {
    flow_token: argv.flow,
    event: 'activity',
    title: `Today's lunch`,
    body,
    author: { name: 'Antell' },
    external_thread_id: getThreadId(argv.url),
    thread: {
      title: getThreadTitle(),
      fields: fields,
      external_url: argv.url
    },
    tags: argv.tags
  }

  return submitBodyToFlow(payload)
}

function submitBodyToFlow(payload) {
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': userAgent
  }
  const opts = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  }

  return fetch('https://api.flowdock.com/messages', opts)
    .then(body => body.text())
}

function menuToFields(menu) {
  return menu.menuItems.map(item => {
    return {
      label: item.description,
      value: item.allergyInfo
    }
  })
}

function getMessageBody(fields) {
  if (fields.length === 0) return 'No info'
  const andMore = fields.length > 1 ? ' and more...' : ''
  return `<span style="font-weight:bold">${fields[0].label}</span>${andMore}`
}

function getThreadId(antellMenuUrl) {
  // just generate some random ID so that the messages don't get grouped
  return `${antellMenuUrl}?id=${new Date().getTime()}`
}

function getThreadTitle() {
  return `${getTodaysWeekdayInEnglish()}'s lunch menu (${formatDateRfc(new Date())})`
}

module.exports = { submitMenuToFlowdock }
