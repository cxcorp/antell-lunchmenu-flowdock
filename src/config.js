const tokens = process.env.FLOWDOCK_FLOW_TOKENS
  ? process.env.FLOWDOCK_FLOW_TOKENS.split(',')
  : []

module.exports = {
  userAgent: 'Antell Lunch Menu Scraper (github.com/cxcorp/antell-lunchmenu-flowdock)',
  antellMenuUrl: process.env.ANTELL_MENU_URL,
  flowdockFlowTokens: tokens
}
