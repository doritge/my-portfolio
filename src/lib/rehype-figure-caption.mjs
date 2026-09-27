// Turns a standalone markdown image `![caption](src)` into
// <figure><img /><figcaption>caption</figcaption></figure>,
// using the image's alt text as the caption.
export default function rehypeFigureCaption() {
  return (tree) => transform(tree);
}

function transform(node) {
  if (!node.children) return;

  node.children = node.children.map((child) => {
    const img = getSoleImage(child);
    if (img) {
      const alt = img.properties?.alt;
      if (alt) {
        return {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [
            img,
            {
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [{ type: 'text', value: alt }],
            },
          ],
        };
      }
    }
    transform(child);
    return child;
  });
}

function getSoleImage(node) {
  if (node.type === 'element' && node.tagName === 'p' && node.children.length === 1) {
    const only = node.children[0];
    if (only.type === 'element' && only.tagName === 'img') return only;
  }
  return null;
}
