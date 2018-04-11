import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Container, Header, Form, Input, Button, Message } from "semantic-ui-react";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class Login extends Component {
  state = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: ""
  };

  handleSubmit = () => {
    const { username, password } = this.state;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <Mutation mutation={LOGIN}>
        {(login, { loading, error }) => (
          <Container text>
            <Header as="h2">Login</Header>
            <Form 
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await login({
                  variables: { username, password }
                });
                const { ok, token, refreshToken } = response.data.login;
                if (ok) {
                  localStorage.setItem("token", token);
                  localStorage.setItem("refreshToken", token);
                }
              }}
            >
              <Form.Field>
                <label>Username</label>
                <Input
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  placeholder="Username"
                  fluid
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  value={password}
                  placeholder="Password"
                  fluid
                />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default Login;