const weekdaysFinnish = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai']
const weekdaysEnglish = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** @returns {string | undefined}
 */
function getTodaysWeekdayInFinnish() {
  return getTodaysDay(weekdaysFinnish)
}

function getTodaysWeekdayInEnglish() {
  return getTodaysDay(weekdaysEnglish)
}

function getTodaysDay(days) {
  const day = new Date().getDay()
  return day < days.length ? days[day] : undefined
}

function formatDateRfc(date) {
  const day = leftPad(`${date.getUTCDate()}`, '0', 2)
  const month = leftPad(`${date.getUTCMonth() + 1}`, '0', 2)
  const yr = date.getUTCFullYear()
  return [yr, month, day].join('-')
}

function leftPad(s, c, n) {
  // by InsOp - https://stackoverflow.com/a/36247412/996081
  s = s.toString()
  c = c.toString()
  return s.length > n
    ? s
    : c.repeat(n - s.length) + s
}


module.exports = {
  getTodaysWeekdayInEnglish,
  getTodaysWeekdayInFinnish,
  weekdaysEnglish,
  weekdaysFinnish,
  formatDateRfc
}
