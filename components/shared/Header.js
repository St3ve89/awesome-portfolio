import React, { Component } from 'react'
import Link from 'next/link';


class Header extends Component {
  render() {
    debugger;
    const title = this.props.title;

    this.props.children
    return (
      <React.Fragment>
        <p>{title}</p>
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
