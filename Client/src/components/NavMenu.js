import React, { useState, useEffect } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { useSelector, useDispatch } from "react-redux";

const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  }

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            LMS Lite
          </NavbarBrand>
          <NavbarToggler onClick={() => toggleNavbar()} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink
                  tag={Link}
                  className="text-dark"
                  to="/"
                  style={{ color: "black" }}
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  className="text-dark"
                  to="/counter"
                  style={{ color: "black" }}
                >
                  Counter
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag={Link}
                  className="text-dark"
                  to="/login"
                  style={{ color: "black" }}
                >
                  Login
                </NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ color: "black" }}>
                  Account
                </DropdownToggle>
                <DropdownMenu
                  style={{ marginTop: "10px", marginRight: "50px" }}
                >
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Certificates</DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem>Sign Out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;