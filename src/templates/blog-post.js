import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const PostTemplate = ({ location, data: { post, site } }) => (
  <Layout location={location} title={site.siteMetadata?.title}>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Layout>
);

export default PostTemplate;

// You need to enable `gatsby-transformer-remark` to query `markdownRemark`.
// If you don't use it, query `googleDocs`
// If you use convertImgToNode then add googleDocImages query
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "us")
      }
      fields {
        author
      }
    }
  }
`;
