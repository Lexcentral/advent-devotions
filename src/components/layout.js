import React from 'react';
import { Link } from 'gatsby';
import Logo from '../components/logo';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <div className='logoWrapper'>
        <Logo icon={true} />
        <h1 className='main-heading'>
          <Link to='/'>{title}</Link>
        </h1>
      </div>
    );
  } else {
    header = (
      <Link className='header-link-home' to='/'>
        <svg height='24px' viewBox='0 0 24 24' width='24px' fill='currentColor'>
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' />
        </svg>
        {title}
      </Link>
    );
  }

  return (
    <div className='global-wrapper' data-is-root-path={isRootPath}>
      <header className='global-header'>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}
        {` `}
        <a href='https://www.lexcentral.com'>
          Central Baptist Church, Lexington, KY
        </a>
      </footer>
    </div>
  );
};

export default Layout;
