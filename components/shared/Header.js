import React, { Component } from 'react';
import Link from 'next/link';
import '../../styles/main.scss';


class Header extends Component {
  render() {

    return (
      <React.Fragment>
        <p className="customStyle">blblu</p>
         <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/portfolios">
          <a>Portfolio</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
        <Link href="/blogs">
          <a>Blog</a>
        </Link>
      </React.Fragment>
    )
  }
}

export default Header
