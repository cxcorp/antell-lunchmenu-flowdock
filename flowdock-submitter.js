const fetch = require('node-fetch')
const { userAgent, flowdockFlowToken, antellMenuUrl } = require('./config')
const { getTodaysWeekdayInEnglish, formatDateRfc } = require('./util')

/**
 * @param {any} menu
 * @returns {Promise<string>} flowdock server response
 */
function submitToFlowdock(menu) {
  const fields = menuToFields(menu)
  const body = getMessageBody(fields)
  const payload = {
    flow_token: flowdockFlowToken,
    event: 'activity',
    title: `Today's lunch`,
    body,
    author: { name: 'Antell' },
    external_thread_id: getThreadId(),
    thread: {
      title: getThreadTitle(),
      fields: fields,
      external_url: antellMenuUrl
    }
  }
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
  return fields.length > 0
    ? `<span style="font-weight:bold">${fields[0].label}</span> and more ...`
    : 'Nothing :('
}

function getThreadId() {
  // just generate some random ID so that the messages don't get grouped
  return `${antellMenuUrl}?id=${new Date().getTime()}`
}

function getThreadTitle() {
  return `${getTodaysWeekdayInEnglish()}'s lunch menu (${formatDateRfc(new Date())})`
}

module.exports = { submitToFlowdock }
