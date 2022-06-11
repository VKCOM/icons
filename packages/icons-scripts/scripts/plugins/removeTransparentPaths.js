"use strict";

/**
 * @typedef {import('svgo/lib/types').PathDataItem} PathDataItem
 */

const { visitSkip, detachNodeFromParent } = require("svgo/lib/xast.js");

exports.type = "visitor";
exports.name = "removeTransparentPaths";
exports.description = "removes paths that are transparent";

/**
 * Remove paths that are transparent.
 *
 * @type {import('svgo/lib/types').Plugin<void>}
 */
exports.fn = (root) => {
  /**
   * @type {WeakMap<import('svgo/lib/types').XastNode, string>}
   */
  const fillMap = new WeakMap();

  /**
   * @type {WeakMap<import('svgo/lib/types').XastNode, string>}
   */
  const strokeMap = new WeakMap();

  // https://www.w3.org/TR/SVG/painting.html#FillProperties
  fillMap.set(root, "black");

  // https://www.w3.org/TR/SVG/painting.html#SpecifyingStrokePaint
  strokeMap.set(root, "none");

  return {
    element: {
      enter: (node, parentNode) => {
        if (node.name === "defs" || node.name === "clipPath") {
          return visitSkip;
        }

        if (node.attributes.fill) {
          fillMap.set(node, node.attributes.fill);
        } else {
          fillMap.set(node, fillMap.get(parentNode));
        }

        if (node.attributes.stroke) {
          strokeMap.set(node, node.attributes.stroke);
        } else {
          strokeMap.set(node, strokeMap.get(parentNode));
        }

        if (
          node.name === "path" &&
          fillMap.get(node) === "none" &&
          strokeMap.get(node) === "none"
        ) {
          detachNodeFromParent(node, parentNode);
        }
      },
    },
  };
};
