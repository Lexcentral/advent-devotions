const visit = require('unist-util-visit'); //version 2.0.3 required to work until Gatby allows import here.

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'text', (node) => {
    let { depth } = node;
    // Skip if not an h1
    // if (depth !== 1) return;
    // Grab the innerText of the heading node
    // let text = toString(node);
    node.type = 'excerpt';
    // node.children = undefined;
    node.value = node.value;
    console.log('excerpt test: ', node.value);
  });
  return markdownAST;
};
