import React, { Component } from "react";

import ContentContainer from "../../../lib/components/content-container/content-container";
import LinkButton from "../../../lib/components/link-button/link-button";

class Login extends Component {
  render() {
    return (
      <ContentContainer>
        <div className="helvetica center tc mw6">
          <h1>You need to sign in before you can use Rangle Labs <span role="img" aria-label="Policeman">👮‍♂️</span></h1>
          <LinkButton to="/auth/google" color="dark-red">
            Sign In with Google
          </LinkButton>
        </div>
      </ContentContainer>
    );
  }
}

export default Login;
