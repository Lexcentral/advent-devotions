import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import Logo from '../components/logo';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndex = ({ data, location }) => {
  const blogYear =
    data.allMarkdownRemark.nodes[0]?.frontmatter.year ||
    new Date().getFullYear();
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  const getAdvent = (year) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    //in javascript months are zero-indexed. january is 0, december is 11
    let d = new Date(
      new Date(year, 11, 24, 0, 0, 0, 0).getTime() - 3 * 7 * 24 * 60 * 60 * 1000
    );
    while (d.getDay() != 0) {
      d = new Date(d.getTime() - 24 * 60 * 60 * 1000);
    }

    return d.toLocaleDateString('en-US', options);
  };

  if (posts.length === 0) {
    const adventStart = getAdvent(blogYear);
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

        <p className='info'>
          Daily devotions from Central Baptist Church — a loving, progressive,
          and inclusive family of faith.
        </p>
        <h3>Welcome to Central Baptist Church Advent Devotions. </h3>
        <p>
          You'll find devotions here for each day of Advent beginning{' '}
          {adventStart}. Or get them via email by signing up for our newsletter
          at <a href='http://lexcentral.com'>LexCentral.com</a>.
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

      <p className='info'>
        Daily devotions from Central Baptist Church — a loving, progressive, and
        inclusive family of faith.
      </p>

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
