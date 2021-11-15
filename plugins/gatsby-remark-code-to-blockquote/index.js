const visit = require('unist-util-visit'); //version 2.0.3 required to work until Gatby allows import here.

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'code', (node) => {
    // let { depth } = node;
    // // Skip if not an h1
    // if (depth !== 1) return;
    // Grab the innerText of the heading node
    // let text = toString(node);
    // let html = node.value.replace(/\u000b/g, '<br/>');
    console.log('bc: ', node.value);
    let html = `<blockquote>${node.value}</blockquote>`;
    node.type = 'html';
    node.children = undefined;
    node.value = html;
  });
  return markdownAST;
};
