import React from 'react';
import Link from 'next/link';
import ActiveLink from '../ActiveLink';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
 } from 'reactstrap';

import auth0 from '../../services/auth0';

const BsNavLink = (props) => {
  const { route, text } = props;
  const className = props.className || '';

  return (
    <ActiveLink activeClassName="active" route={route}>
      <a className={`nav-link port-navbar-link ${className}`}>{text}</a>
    </ActiveLink>
  )
}

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">Login</span>
  );
};

const Logout = () => {
  return (
    <span onClick={auth0.logout} className="nav-link port-navbar-link clickable">Logout</span>
  );
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };


    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  renderBlogMenu() {
    const { isSiteOwner } = this.props;

    if(isSiteOwner) {
      return (
        <Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item" route="/blogs" text="Blogs"/>
            </DropdownItem>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item" route="/blogs/new" text="Create a Blog"/>
            </DropdownItem>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item" route="/blogs/dashboard" text="Blogs Dashboard"/>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
    }

    return (
      <NavItem className="port-navbar-item">
        <BsNavLink route="/blogs" text="Blog"/>
      </NavItem>
    )
  }


  render() {
    const { isAuthenticated, className } = this.props;
    const { isOpen } = this.state;

    const menuOpenClass = isOpen ? 'menu-open' : 'menu-close'

    return (
      <div>
        <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent" dark expand="md">
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
                <BsNavLink route="/portfolios" text="Experiences"/>
              </NavItem>
              {this.renderBlogMenu()}
              <NavItem className="port-navbar-item">
                <BsNavLink route="/cv" text="CV"/>
              </NavItem>
              { !isAuthenticated &&
                <NavItem className="port-navbar-item">
                  <Login />
                </NavItem>
              }
              { isAuthenticated &&
                <NavItem className="port-navbar-item">
                  <Logout />
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}