const visit = require('unist-util-visit');
module.exports = ({ markdownAST }) => {
  visit(markdownAST, ['text'], (node) => {
    // let { depth } = node;
    // // Skip if not an h1
    // if (depth !== 1) return;
    // Grab the innerText of the heading node
    // let text = toString(node);
    console.log(node);
    let html = node.value.replace(/\u000b/g, '<br/>');

    // const html = `
    //     <h1 style="color: rebeccapurple">
    //       ${text}
    //     </h1>
    //   `;
    node.type = 'html';
    // node.children = undefined;
    node.value = html;
  });
  return markdownAST;
};
