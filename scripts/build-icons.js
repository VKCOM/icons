const { generateIcons } = require('@vkontakte/icons-scripts');

generateIcons({
  srcDirectory: './src',
  distDirectory: './dist',
  tsFilesDirectory: './ts',
});
