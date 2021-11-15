module.exports = {
  siteMetadata: {
    title: `Advent Devotions`,
    author: {
      name: `Central Baptist Church, Lexington, KY`,
      summary: `Advent devotions from a loving, healthy, and progressive family of faith.`,
    },
    description: `Advent devotions from a loving, healthy, and progressive family of faith.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          // `gatsby-remark-smartypants`,
          // `gatsby-remark-google-doc-soft-returns`,
          // `gatsby-remark-custom-excerpts`,
          `gatsby-remark-add-hr`,
          `gatsby-remark-code-to-blockquote`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.path,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { fields: [frontmatter___date], order: DESC }
                  filter: { isFuture: { eq: false } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug 
                        date
                        path
                        author
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Advent Devotions - Central Baptist Church, Lexington, KY",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // https: //www.gatsbyjs.com/plugins/gatsby-source-google-docs-team/?=source%20google%20docs
    {
      resolve: 'gatsby-source-google-docs',
      options: {
        // Mandatory
        // --------
        folder: '16v6ZiH5-bUHg5Do_9pDhWP8Je1IL8y1l', // folders Ids can be found in Google Drive URLs
        // Optional
        // --------
        fields: ['createdTime'], // https://developers.google.com/drive/api/v3/reference/files#resource
        fieldsMapper: {}, // To rename fields
        fieldsDefault: { draft: false }, // To add default fields values
        convertImgToNode: true, // To convert images to remote node files
        skipCodes: true,
        // skipQuotes: true,
      },
    },
  ],
};
