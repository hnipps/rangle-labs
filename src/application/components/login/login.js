import React, { Component } from "react";

import ContentContainer from "../../../lib/components/content-container/content-container";

class Login extends Component {
  render() {
    return (
      <ContentContainer>
        <div className="helvetica center tc mw6">
          <h1>You need to sign in before you can use Rangle Labs <span role="img" aria-label="Policeman">👮‍♂️</span></h1>
          <a href="http://localhost:8080/users/auth/google">
            Sign In with Google
          </a>
        </div>
      </ContentContainer>
    );
  }
}

export default Login;
