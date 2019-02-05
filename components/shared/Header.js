import React from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

const BsNavLink = (props) => {
  const { route, text } = props;

  return (
    <Link href={route}>
      <a className="nav-link">{text}</a>
    </Link>
  )
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Istvan Acs</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <BsNavLink route="/" text="Home"/>
              </NavItem>
              <NavItem>
                <BsNavLink route="/about" text="About"/>
              </NavItem>
              <NavItem>
                <BsNavLink route="/portfolios" text="Portfolio"/>
              </NavItem>
              <NavItem>
                <BsNavLink route="/blogs" text="Blog"/>
              </NavItem>
              <NavItem>
                <BsNavLink route="/cv" text="CV"/>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}