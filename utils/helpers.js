/** Local date as YYYY-MM-DD, offset by a number of days from today (for date inputs). */
function formatDate(daysFromToday = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Extracts the first number from text such as "202 views" or "Views: 1,234". */
function parseCount(text) {
  const match = /(\d[\d,]*)/.exec(text ?? '');
  if (!match) {
    throw new Error(`No number found in "${text}"`);
  }
  return Number(match[1].replace(/,/g, ''));
}

module.exports = { formatDate, parseCount };
