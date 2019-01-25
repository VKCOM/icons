const glob = require('glob');
const path = require('path');

/**
 * @return {*}
 */
function iconsMap () {
  return glob.sync(path.join(process.cwd(), 'src/svg/**/*.svg')).map((iconPath) => {
    const match = iconPath.match(/\/(\d\d)\/(.+)_(\d\d)\.svg/);
    const size = match[1];
    const id = match[2];
    return { id, size };
  });
}

module.exports.iconsMap = iconsMap;
