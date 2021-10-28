const visit = require('unist-util-visit'); //version 2.0.3 required to work until Gatby allows import here.

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'text', (node) => {
    // let { depth } = node;
    // // Skip if not an h1
    // if (depth !== 1) return;
    // Grab the innerText of the heading node
    // let text = toString(node);
    // let html = node.value.replace(/\u000b/g, '<br/>');
    let html = node.value.replace(/\*\*\*/g, '<hr/>');
    node.type = 'html';
    node.children = undefined;
    node.value = html;
  });
  return markdownAST;
};
