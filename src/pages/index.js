import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import Logo from '../components/logo';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndex = ({ data, location }) => {
  const blogYear = data.allMarkdownRemark.nodes[0].frontmatter.year;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={`${siteTitle} ${blogYear}`}>
        <SEO title='All posts' />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      location={location}
      title={
        <>
          <div className='title'>{siteTitle}</div>{' '}
          <div className='year'>{blogYear}</div>
        </>
      }
    >
      <SEO title='Advent Devotions' />
      <div className='logoWrapper'>
        <p className='info'>
          Daily devotions from Central Baptist Church, Lexington, KY
          <br /> — a loving, progressive, and inclusive family of faith.
        </p>
        <Logo icon={true} />
      </div>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.fields.author || post.fields.slug;
          console.log(post);
          return (
            <li>
              <article
                className='post-list-item'
                itemScope
                itemType='http://schema.org/Article'
              >
                <header>
                  <h3>
                    <Link to={post.fields.path}>
                      <div className='dateBox'>
                        <span className='weekday'>
                          {post.frontmatter.weekday}
                        </span>
                        <span className='dateLabel'>
                          {post.frontmatter.date}
                        </span>
                      </div>
                      <span className='listTitle' itemProp='headline'>
                        {title}
                      </span>
                    </Link>
                  </h3>
                </header>
                <section>
                  <p
                    className='excerptText'
                    dangerouslySetInnerHTML={{
                      __html: post.fields.excerpt,
                    }}
                    itemProp='description'
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { isFuture: { eq: false } }
    ) {
      nodes {
        excerpt
        fields {
          slug
          path
          author
          excerpt
        }
        frontmatter {
          date(formatString: "MMM. DD")
          weekday: date(formatString: "ddd")
          year: date(formatString: "YYYY")
          title
          description
        }
      }
    }
  }
`;
