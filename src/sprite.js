import BrowserSprite from 'svg-baker-runtime/browser-sprite';

const spriteNodeId = '__SVG_SPRITE_NODE__';

const browserSprite = new BrowserSprite({ attrs: { id: spriteNodeId } });

browserSprite.mount();

export default browserSprite;
