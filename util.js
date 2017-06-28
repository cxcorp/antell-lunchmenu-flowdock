const weekdaysFinnish = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai']
const weekdaysEnglish = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

/** @returns {string | undefined}
 */
function getTodaysDateInFinnish() {
  return getTodaysDay(weekdaysFinnish)
}

function getTodaysDateInEnglish() {
  return getTodaysDay(weekdaysEnglish)
}

function getTodaysDay(days) {
  const day = new Date().getDay()
  return day < days.length ? days[day] : undefined
}

module.exports = { getTodaysDateInEnglish, getTodaysDateInFinnish }
