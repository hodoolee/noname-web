import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Container, Header, Input, Button, Message, Form } from "semantic-ui-react";
import styled from 'styled-components';

const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: ""
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password, usernameError, passwordError } = this.state;
    const errorList = [];
    
    return (
      <Positioner>
        <Mutation mutation={REGISTER}>
          {(register, { loading, error }) => (
            <Container text>
              <Header as="h2">Register</Header>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  this.setState({
                    usernameError: "",
                    passwordError: ""
                  });

                  const { username, password } = this.state;
                  const response = await register({
                    variables: { username, password }
                  });
                  const { ok, errors } = response.data.register;

                  if (ok) {
                    this.props.history.push("/");
                  } else {
                    const err = {};
                    errors.forEach(({ path, message }) => {
                      err[`${path}Error`] = message;
                    });
                    this.setState(err);
                  }
                }}
              >
                <Form.Field>
                  <label>Username</label>
                  <Input
                    error={!!usernameError}
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                    placeholder="Username"
                    fluid
                  />
                </Form.Field>
                <Form.Field>
                  <label>Username</label>
                  <Input
                    error={!!passwordError}
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={password}
                    placeholder="Password"
                    fluid
                  />
                </Form.Field>
                <Button>Submit</Button>
              </Form>
              {loading && <p>Loading...</p>}
              {error || usernameError || passwordError ? (
                <Message error heaeder="Error :( Please try again" />
              ) : null}
            </Container>
          )}
        </Mutation>
      </Positioner>
    );
  }
}

export default Register;
