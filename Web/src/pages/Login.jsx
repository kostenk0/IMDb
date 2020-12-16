import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import InputValidator from '../components/validation/InputValidator.jsx';
import ValidatedComponent from '../components/validation/ValidatedComponent.jsx';
import * as Actions from '../redux/actions/AuthActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Form, Col, Button, Row } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      canSubmit: false
    };

    this.popup = null;

    this.changeUser = this.changeUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.login = this.login.bind(this);
    this.redirectIfAuthed = this.redirectIfAuthed.bind(this);
  }

  login(e) {
    e.preventDefault();

    if (this.props.isComponentValid()) {
      this.props.login(this.state.username, this.state.password);
    }
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthed(nextProps);
  }

  redirectIfAuthed(props) {
    var {token, match, history} = props;
    if (token) {
      if (match.params.redirectTo) {
        history.push(match.params.redirectTo);
      }
      else {
        history.push('/');
      }
    }
  }

  render() {
    var {username, password, canSubmit} = this.state;
    var {errors} = this.props;

    return (
      <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">

          <Form.Label column sm={2}>
            User name
    </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="User name" errors={errors.username} shouldValidateOnBlur={true}
            value={username} onChange={this.changeUser}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" errors={errors.password} shouldValidateOnBlur={true}
            value={password} onChange={this.changePassword}/>
            <Form.Text className="text-muted">
            <a href='/signup'>Create a new account </a>
          </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 5 }}>
            <Button type="submit" onClick={this.login} disabled={!canSubmit}>Log in</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }

  changeUser(event) {
    var canSubmit = this.state.password && event.target.value;
    this.setState({
      username: event.target.value,
      canSubmit: canSubmit
    });
  }

  changePassword(event) {
    var canSubmit = this.state.username && event.target.value;
    this.setState({
      password: event.target.value,
      canSubmit: canSubmit
    });
  }
}

Login.displayName = 'Login';

Login.propTypes = {
  query: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
  return {...state.auth};
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidatedComponent(withRouter(Login)));
