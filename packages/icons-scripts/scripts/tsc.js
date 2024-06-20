const ts = require('typescript');

/**
 * @type {ts.FormatDiagnosticsHost}
 */
const formatHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

/**
 * Компиляция ts файлов в js файлы
 *
 * @param {string[]} rootNames
 * @param {string} outDir
 */
function compile(rootNames, outDir) {
  /**
   * @type {ts.CompilerOptions}
   */
  const options = {
    outDir,
    emitDeclarationOnly: true,
    declaration: true,
    jsx: 'react',
    esModuleInterop: true,
    skipLibCheck: true,
  };

  const program = ts.createProgram(rootNames, options);

  const preEmitDiagnostics = ts.getPreEmitDiagnostics(program);
  if (preEmitDiagnostics.length) {
    console.log(ts.formatDiagnosticsWithColorAndContext(preEmitDiagnostics, formatHost));
    throw new Error('Pre-Emit diagnostics failed');
  }

  const emitResult = program.emit();
  if (emitResult.diagnostics.length) {
    console.log(ts.formatDiagnosticsWithColorAndContext(emitResult.diagnostics, formatHost));
    throw new Error('Compilation failed');
  }

  return emitResult;
}

module.exports = { compile };
