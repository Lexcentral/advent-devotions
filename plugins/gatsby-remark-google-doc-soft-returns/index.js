const visit = require('unist-util-visit'); //version 2.0.3 required to work until Gatby allows import here.

module.exports = ({ markdownAST }) => {
  visit(markdownAST, ['text'], (node) => {
    // let { depth } = node;
    // // Skip if not an h1
    // if (depth !== 1) return;
    // Grab the innerText of the heading node
    // let text = toString(node);
    console.log(node);
    let html = node.value.replace(/\u000b/g, '<br/>');
    console.log(html);
    html = html.replace(/\*\*\*/g, '<hr/>');
    node.type = 'html';
    // node.children = undefined;
    node.value = html;
  });
  return markdownAST;
};
