import React, { Component } from "react";
import { Nav, Navbar, Form } from "react-bootstrap";
import SwitchBtn from "./switch";
import WithCallbacks from "./asyncSelect";
import { NavLink } from "react-router-dom";
import ReactToolTip from "react-tooltip";

class NavBar extends Component {
  onSearch = (event) => {
    event.stopPropagation();
    this.props.onSearch();
  };

  render() {
    return (
      <Navbar id="Bar" bg="primary" variant="dark" expand="lg">
        <Form inline id="searchForm" /*onSubmit={this.onSearch}*/>
          <WithCallbacks
            clear={this.props.clear}
            onSubmit={this.props.onSearch}
          />
        </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/world">
              World
            </NavLink>
            <NavLink className="nav-link" to="/politics">
              Politics
            </NavLink>
            <NavLink className="nav-link" to="/business">
              Business
            </NavLink>
            <NavLink className="nav-link" to="/technology">
              Technology
            </NavLink>
            <NavLink className="nav-link" to="/sports">
              Sports
            </NavLink>
          </Nav>
          <Nav>
            <NavLink
              className="nav-link"
              to="/favorite"
              data-tip="Bookmark"
              data-for="bookmark"
            >
              {this.props.bookmark}
            </NavLink>
            <ReactToolTip place="bottom" effect="solid" id="bookmark" />
          </Nav>
          <Form inline className={this.props.showSwitch} id="switchForm">
            <Navbar.Text className="mx-lg-2">NYTimes</Navbar.Text>
            <SwitchBtn com={this.props.com} onSwitch={this.props.onSwitch} />
            <Navbar.Text className="mx-lg-2">Guardian</Navbar.Text>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
