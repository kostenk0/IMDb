import React from 'react';
import { withRouter } from 'react-router';
import validatedComponent from '../components/validation/ValidatedComponent.jsx';
import * as Actions from '../redux/actions/ProfileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Col, Button, Row } from 'react-bootstrap';

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };

    this.createUser = this.createUser.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthed(nextProps);
  }

  redirectIfAuthed(props) {
    var { match, history, auth } = props;
    if (auth.token) {
      if (match.params.redirectTo) {
        history.push(match.params.redirectTo);
      }
      else {
        history.push('/');
      }
    }
  }

  createUser(event) {
    event.preventDefault();
    var { username, password } = this.state;

    if (this.props.isComponentValid()) {
      this.props.createProfile({ username, password });
    }
  }

  onChange(fieldName, e) {
    this.setState({ [fieldName]: e.target.value });
  }

  validateConfirmPassword() {
    var { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return 'Both passwords must be equal';
    }
  }

  render() {
    var { state } = this;
    var { errors } = this.props;
    return (
      <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">

          <Form.Label column sm={2}>
            User name
    </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="User name" errors={errors.username} shouldValidateOnBlur={true}
              value={state.username} onChange={this.onChange.bind(this, 'username')} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
    </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" onChange={this.onChange.bind(this, 'password')}
              value={state.password} errors={errors.password} onChange={this.onChange.bind(this, 'password')} value={state.password} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 5 }}>
            <Button type="submit" onClick={this.createUser}>Sign up</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

Signup.displayName = 'Signup';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
  return { ...state.signup, auth: { ...state.auth } };
}

export default connect(mapStateToProps, mapDispatchToProps)(validatedComponent(withRouter(Signup)));
