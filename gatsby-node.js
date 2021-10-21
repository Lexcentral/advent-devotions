const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions;

//   // Define a template for blog post
//   const blogPost = path.resolve(`./src/templates/blog-post.js`);

//   // Get all markdown blog posts sorted by date
//   const result = await graphql(
//     `
//       {
//         allMarkdownRemark(
//           sort: { fields: [frontmatter___date], order: ASC }
//           limit: 1000
//         ) {
//           nodes {
//             id
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     `
//   );

//   if (result.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your blog posts`,
//       result.errors
//     );
//     return;
//   }

//   const posts = result.data.allMarkdownRemark.nodes;

//   // Create blog posts pages
//   // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
//   // `context` is available in the template as a prop and as a variable in GraphQL

//   if (posts.length > 0) {
//     posts.forEach((post, index) => {
//       const previousPostId = index === 0 ? null : posts[index - 1].id;
//       const nextPostId =
//         index === posts.length - 1 ? null : posts[index + 1].id;

//       createPage({
//         path: post.fields.slug,
//         component: blogPost,
//         context: {
//           id: post.id,
//           previousPostId,
//           nextPostId,
//         },
//       });
//     });
//   }
// };

exports.onCreateNode = ({ node, actions }) => {
  // You need to enable `gatsby-transformer-remark` to transform `GoogleDocs` type to `MarkdownRemark` type.
  if (node.internal.type === `MarkdownRemark`) {
    const customSlug = node.frontmatter.slug; // If you add extra data `slug` with description field
    actions.createNodeField({
      name: `slug`,
      node,
      value: customSlug || node.frontmatter.path,
    });
    actions.createNodeField({
      name: `date`,
      node,
      value: node.frontmatter.date,
    });
    actions.createNodeField({
      name: `path`,
      node,
      value: node.frontmatter.path,
    });
    actions.createNodeField({
      name: `author`,
      node,
      value: node.frontmatter.author,
    });
  }
};

exports.createPages = async ({ graphql, actions }) =>
  graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
                path
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    result.data.allMarkdownRemark.edges.forEach((post, index) => {
      actions.createPage({
        path: post.node.fields.path,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: post.node.fields.slug,
        },
      });
    });
  });

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog posts are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       twitter: String
//     }

//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: Fields
//     }

//     type Frontmatter {
//       title: String
//       description: String
//       date: Date @dateformat
//     }

//     type Fields {
//       slug: String
//     }
//   `);
// };
