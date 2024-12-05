export function debugInfo(...message) {
  console.info('[icons-scripts]', ...message);
}

export function debugError(...message) {
  console.error('[icons-scripts]', ...message);
  process.exit(1);
}

/**
 * @param {string[]} array
 * @return {string[]}
 */
export function sortArrayAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

/**
 * @param {string} dash
 * @return {string}
 */
export function dashToCamel(dash) {
  const dashSplitted = dash.split('_');
  return dashSplitted.reduce((res, piece) => {
    piece = piece.charAt(0).toUpperCase() + piece.slice(1);
    return res + piece;
  }, '');
}

export function longestCommonPrefix(...strings) {
  if (!strings.length) {
    return '';
  }

  for (let i = 0; i <= strings[0].length; i++) {
    if (strings.some((string) => string[i] !== strings[0][i])) {
      return strings[0].slice(0, i);
    }
  }

  return strings[0];
}
