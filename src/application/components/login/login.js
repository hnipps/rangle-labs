import React, { Component } from "react";

import queryString from "query-string";

import ContentContainer from "../../../lib/components/content-container/content-container";

class Login extends Component {
  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.accessToken && query.user) {
      window.sessionStorage.setItem("jwt", query.accessToken);
      this.props.updateUser({ id: query.user, accessToken: query.accessToken });
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <ContentContainer>
        <div className="helvetica center tc mw6">
          <h1>
            You need to sign in before you can use Rangle Labs{" "}
            <span role="img" aria-label="Policeman">
              👮‍♂️
            </span>
          </h1>
          <a href="http://localhost:8080/users/auth/google">
            Sign In with Google
          </a>
        </div>
      </ContentContainer>
    );
  }
}

export default Login;
