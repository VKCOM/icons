import BrowserSprite from 'svg-baker-runtime/browser-sprite';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

let browserSprite;

if (canUseDOM) {
  browserSprite = new BrowserSprite({ attrs: { id: '__SVG_SPRITE_NODE__' } });
  if (document.querySelector('body')) {
    browserSprite.mount();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      browserSprite.mount();
    });
  }
} else {
  browserSprite = null;
}

export default browserSprite;
