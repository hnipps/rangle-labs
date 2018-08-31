import React, { Component } from "react";

import queryString from "query-string";

import ContentContainer from "../../../lib/components/content-container/content-container";

class Login extends Component {
  componentWillUpdate() {
    if (this.props.loggedIn) {
      return this.props.history.push("/");
    }
  }

  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.loggedIn) {
      this.props.logUserIn(this.props.history);
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
            <img
              src="./assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png"
              alt="Sign in with Google"
              onMouseOver={e =>
                (e.currentTarget.src =
                  "./assets/google_signin_buttons/web/1x/btn_google_signin_dark_focus_web.png")
              }
              onMouseOut={e =>
                (e.currentTarget.src =
                  "./assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png")
              }
              onMouseDown={e =>
                (e.currentTarget.src =
                  "./assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png")
              }
            />
          </a>
        </div>
      </ContentContainer>
    );
  }
}

export default Login;
