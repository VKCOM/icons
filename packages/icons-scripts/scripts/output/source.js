async function createSourceIcon({
  id,
  content,
  width,
  height,
  componentName,
  deprecated,
  replacement,
}) {
  let jsdoc = '';
  if (deprecated) {
    const replacementNotice = replacement ? `. Замените на ${replacement}` : '';

    jsdoc = `/**
 * @deprecated Иконка устарела${replacementNotice}
 */
`;
  }

  return (
    `${jsdoc}
export function ${componentName}() {
  return {
    icon: '${content}',
    name: '${id}',
  };
}
`.trim() + '\n'
  );
}

module.exports = { createSourceIcon };
