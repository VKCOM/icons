import { generateIcons } from '@vkontakte/icons-scripts';
import { DEPRECATED_ICONS } from '../src/deprecated.js';

generateIcons({
  srcDirectory: './src',
  distDirectory: './dist',
  tsFilesDirectory: './ts',
  deprecatedIcons: DEPRECATED_ICONS,
});
