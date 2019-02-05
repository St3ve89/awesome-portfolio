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
      <a className="nav-link port-navbar-link">{text}</a>
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
        <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">Istvan Acs</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/" text="Home"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/about" text="About"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolios" text="Portfolio"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/blogs" text="Blog"/>
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/cv" text="CV"/>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}