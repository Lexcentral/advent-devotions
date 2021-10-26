import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const PostTemplate = ({ location, data: { post } }) => (
  <Layout location={location} siteTitle={post.title}>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Layout>
);

export default PostTemplate;

// You need to enable `gatsby-transformer-remark` to query `markdownRemark`.
// If you don't use it, query `googleDocs`
// If you use convertImgToNode then add googleDocImages query
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "us")
      }
    }
  }
`;
