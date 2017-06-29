const { JSDOM } = require('jsdom')
const { weekdaysFinnish } = require('./util')

function parseLunchMenu(html) {
  const { document } = new JSDOM(html).window
  const [...contentBlocks] = document.querySelectorAll('#lunch-content-table .show')
  const dayBlocks = contentBlocks.filter(isBlockADaysMenu)
  const dayMenus = dayBlocks.map(parseDayMenu)
  return groupByDay(dayMenus)
}

function groupByDay(arr) {
  return arr.reduce(
    (acc, curr) => { acc[curr.day] = curr; return acc },
    {}
  )
}

const weekDaysMap/*: { [day: string]: true }*/ = weekdaysFinnish.reduce(
  (acc, day) => { acc[day] = true; return acc },
  {}
)

/** Returns whether a content block is a container for a day's lunch menu
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isBlockADaysMenu(element) {
  const firstRow = element.querySelector('tr')
  if (!firstRow) return false
  const tds = firstRow.getElementsByTagName('td')
  if (tds.length < 4) return false
  const weekday = tds[1].textContent.trim()
  return !!weekDaysMap[weekday]
}

/** Parses a day's menu from a day content block
 * @param {HTMLElement} dayBlock
 * @returns {any}
 */
function parseDayMenu(dayBlock) {
  const [...rows] = dayBlock.querySelectorAll('tr:not([class])')
  const [dayNameCell, ...menuItemCell] = rows.map(getContentCell)

  const day = dayNameCell.textContent.trim()
  const menuItems = menuItemCell.map(td => {
    const description = td.childNodes[0].textContent.trim()
    const allergyInfo = td.childNodes.length > 1 && td.childNodes[1].textContent.trim()
    return { description, allergyInfo }
  })

  return { day, menuItems }
}

/** @param {HTMLTableRowElement} row
 * @returns {HTMLTableDataCellElement}
 */
function getContentCell(row) {
  return row.getElementsByTagName('td')[1]
}

module.exports = { parseLunchMenu }
