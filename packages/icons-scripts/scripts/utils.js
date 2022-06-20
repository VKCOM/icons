function debugInfo(...message) {
  console.info('[icons-scripts]', ...message);
}

function debugError(...message) {
  console.error('[icons-scripts]', ...message);
  process.exit(1);
}

/**
 * @param {string[]} array
 * @return {string[]}
 */
function sortArrayAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

/**
 * @param {string} dash
 * @return {string}
 */
 function dashToCamel(dash) {
  const dashSplitted = dash.split('_');
  return dashSplitted.reduce((res, piece) => {
    piece = piece.charAt(0).toUpperCase() + piece.slice(1);
    return res + piece;
  }, '');
}

module.exports = {
  debugInfo,
  debugError,
  sortArrayAlphabetically,
  dashToCamel,
}
