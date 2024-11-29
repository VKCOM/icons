import * as path from 'node:path';
import * as fs from 'node:fs';
import { debugError } from './utils.js';

/**
 * @typedef {Object.<string, string | null>} DeprecatedIcons
 */

/**
 * @typedef {Object} GenerateOptions
 * @property {string} srcDirectory
 * @property {string} distDirectory
 * @property {string} [tsFilesDirectory]
 * @property {boolean} [keepTSSources]
 * @property {string[]} [extraCategories] List of glob patterns for directory with icons
 * @property {string} [cwd]
 * @property {any[]} [svgoPlugins]
 * @property {DeprecatedIcons} [deprecatedIcons] List of deprecated icons
 */

/**
 * @param {GenerateOptions} options
 * @return {GenerateOptions}
 */
export function prepareOptions(options) {
  const {
    srcDirectory,
    distDirectory,
    tsFilesDirectory,
    keepTSSources,
    extraCategories = ['Unsorted'],
    cwd = process.cwd(),
    svgoPlugins = [],
    deprecatedIcons = {},
  } = options;

  if (!srcDirectory || !distDirectory) {
    debugError('You need to pass required options. See documentation');
  }

  const directoryPath = (dir) => {
    return path.resolve(cwd, dir);
  };

  if (!fs.existsSync(directoryPath(srcDirectory))) {
    debugError(`"${srcDirectory}" directory is not exists`);
  }

  return {
    srcDirectory: directoryPath(srcDirectory),
    distDirectory: directoryPath(distDirectory),
    keepTSSources: keepTSSources == null ? !!tsFilesDirectory : keepTSSources,
    tsFilesDirectory: tsFilesDirectory
      ? directoryPath(tsFilesDirectory)
      : path.resolve(distDirectory, '../ts'),
    extraCategories,
    cwd,
    svgoPlugins,
    deprecatedIcons,
  };
}
