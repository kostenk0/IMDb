import React from 'react';
import { logout } from '../redux/actions/AuthActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import logoImg from '../assets/logo.jpg';
import { Navbar, Nav, Button } from 'react-bootstrap';


class Header extends React.Component {
  render() {
    var { props } = this;
    var profile = _.get(props, 'profile');
    var isLoggedIn = !!_.get(props, 'auth.token');

    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logoImg}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
      What to watch?
    </Navbar.Brand>
        <Nav className="ml-auto">
          {
            profile ? <Nav.Link href="/profile" to="/profile">{profile.username}</Nav.Link> : null
          }
          <p>&ensp;</p>
          {isLoggedIn ? <Button onClick={this.logout.bind(this)} variant="outline-danger">Log out</Button> 
          : <Button href="/login" variant="success">Log in</Button>}
          <p>&ensp;</p>
          {isLoggedIn ? null : <Button href="/signup" variant="primary">Sign up</Button>}
        </Nav>
      </Navbar>
    );
  }

  logout() {
    this.props.dispatch(logout());
  }
}

Header.displayName = 'Header';

export default connect()(Header);
