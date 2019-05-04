import React, { Component } from "react";
import Container from "./../container/Authenticator";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import Block from "../components/Block";
import { Form, Text, Radio } from "../components/Form";

const styles = theme => {
  return {};
};

class Authenticator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loginForm: true,
      login: {
        user: "",
        password: "",
        error: false
      },
      resetCredentialsForm: false,
      resetCredentials: {
        type: "", //password || usernameAndPassword
        state: "selectType", //selectType || setEmail || success || error
        email: ""
      },
      challengesForm: false,
      challenges: {
        required: [],
        user: "",
        password: "",
        passwordTwo: "",
        session: "",
        errors: {
          user: false,
          password: false,
          passwordTwo: false
        }
      }
    };
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.renderResetCredentialsForm = this.renderResetCredentialsForm.bind(
      this
    );
    this.reset = this.reset.bind(this);
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      authenticated: this.props.autoLogin(this.props.on)
    });
  }
  async reset(formActions) {
    const { email, type } = this.state.resetCredentials;
    formActions.togglePending(true);
    try {
      if (type === "password") await this.props.resetPassword(email);
      if (type === "account") await this.props.resetAccount(email);
      formActions.togglePending(false);
      let newState = { ...this.state };
      newState.resetCredentials.state = "success";
      this.setState(newState);
    } catch (err) {
      let newState = { ...this.state };
      newState.resetCredentials.state = "error";
      this.setState(newState);
    }
  }
  async login(formActions) {
    const { user, password } = this.state.login;
    formActions.togglePending(true);
    try {
      const resp = await this.props.login(user, password, this.props.on);
      if (resp === true) {
        this.setState({ ...this.state, authenticated: true });
        return true;
      }
      if (resp.challenges.length) {
        formActions.togglePending(false);
        let newState = { ...this.state };
        newState.loginForm = false;
        newState.challengesForm = true;
        newState.challenges.required = resp.challenges;
        newState.challenges.session = resp.session;
        this.setState(newState);
      } else {
      }
      //make challenges
    } catch (err) {
      formActions.togglePending(false);
      let newState = { ...this.state };
      if (
        err.code === "forbidden" &&
        err.errors.filter(item => {
          return (
            (item.key === "username" || item.key === "password") &&
            item.error === "notValid"
          );
        }).length === 2
      ) {
        newState.login.error = "invalidCredentials";
      } else {
        newState.login.error = "generalError";
      }
      this.setState(newState);
    }
  }
  async challenge(formActions) {
    const {
      required,
      user,
      password,
      passwordTwo,
      session
    } = this.state.challenges;
    if (password !== passwordTwo) {
      let newState = { ...this.state };
      newState.challenges.errors.passwordTwo =
        'Dieses Passwort entspricht nicht dem im Feld "Passwort".';
      this.setState(newState);
      return false;
    }
    formActions.togglePending(true);
    let challenges = required.map(challenge => {
      let challengeResponse = {
        type: challenge
      };
      if (
        challenge === "change_invitation_username" ||
        challenge === "change_username"
      )
        challengeResponse.username = user;
      else if (
        challenge === "change_password" ||
        challenge === "change_invitation_password"
      )
        challengeResponse.password = password;
      else throw { code: "unknownUserChallenge", message: challenge };
      return challengeResponse;
    });
    try {
      await this.props.challenge(challenges, session, this.props.on);
      this.setState({ ...this.state, authenticated: true });
    } catch (error) {
      if (error.code === "validationError") {
        let newState = { ...this.state };
        newState.challenges.errors = {
          user: false,
          password: false,
          passwordTwo: false
        };
        error.errors.forEach(field => {
          let errorTranslation = field.error;
          switch (field.error) {
            case "outOfRange":
              errorTranslation =
                "Dieses Feld benötigt eine Mindestlänge von " +
                field.min +
                " und eine Maximiallänge von " +
                field.max +
                " zeichen.";
              break;
            case "notSet":
              errorTranslation = "Dieses Feld ist ein Pflichtfeld.";
              break;
          }
          switch (field.key) {
            case "username":
              newState.challenges.errors.user = errorTranslation;
              break;
            case "password":
              newState.challenges.errors.password = errorTranslation;
              break;
          }
        });
        this.setState(newState);
      } else {
        throw error;
      }
    }
    formActions.togglePending(false);
  }
  renderLoginForm() {
    const actions = formActions => (
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={12} sm={6} style={{ paddingTop: "9px" }}>
          <Typography
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={e => {
              e.preventDefault();
              let newState = {
                ...this.state,
                resetCredentialsForm: true,
                loginForm: false
              };
              newState.resetCredentials.state = "selectType";
              this.setState(newState);
            }}
          >
            Zugangsdaten vergessen?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={e => {
              e.preventDefault();
              this.login(formActions);
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
    return (
      <Block label="Anmelden" primary>
        <Form actions={actions}>
          <Text
            xs={12}
            label="Benutzername"
            value={this.state.login.user}
            onChange={value => {
              let newState = { ...this.state };
              newState.login.user = value;
              this.setState(newState);
            }}
            error={
              this.state.login.error === "invalidCredentials"
                ? "Benutzername oder Passwort falsch!"
                : false
            }
          />
          <Text
            xs={12}
            label="Passwort"
            type="password"
            value={this.state.login.password}
            onChange={value => {
              let newState = { ...this.state };
              newState.login.password = value;
              this.setState(newState);
            }}
            error={
              this.state.login.error === "invalidCredentials" ? true : false
            }
          />
        </Form>
      </Block>
    );
  }
  renderChallenges() {
    const { required } = this.state.challenges;

    const firstLogin =
      required.indexOf("change_invitation_username") > -1 &&
      required.indexOf("change_invitation_password") > -1;

    const resetUsername =
      required.indexOf("change_username") > -1 ||
      required.indexOf("change_invitation_username") > -1;

    const actions = formActions => (
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={e => {
              e.preventDefault();
              this.challenge(formActions);
            }}
          >
            Ändern
          </Button>
        </Grid>
      </Grid>
    );

    return (
      <Block label={firstLogin ? "Erster Login" : "Zurückgestellt"} primary>
        {firstLogin && (
          <Typography variant="body1">
            Da dies Ihre erste Anmeldung ist bitten wir Sie Ihren Benutzernamen
            und Ihr Passwort zu ändern
          </Typography>
        )}
        {!firstLogin && (
          <Typography variant="body1">
            Sie haben eine {resetUsername ? "Account" : "Passwort"}{" "}
            Zurücksetzung beantragt.
          </Typography>
        )}
        <Form actions={actions}>
          {resetUsername && (
            <Text
              xs={12}
              label="Neuer Benutzername"
              value={this.state.challenges.user}
              autoComplete={false}
              onChange={value => {
                let newState = { ...this.state };
                newState.challenges.user = value;
                this.setState(newState);
              }}
              error={this.state.challenges.errors.user}
            />
          )}
          <Text
            xs={12}
            label="Neues Passwort"
            type="password"
            autoComplete={false}
            value={this.state.challenges.password}
            onChange={value => {
              let newState = { ...this.state };
              newState.challenges.password = value;
              this.setState(newState);
            }}
            error={this.state.challenges.errors.password}
          />
          <Text
            xs={12}
            label="Neues Passwort Wiederholen"
            type="password"
            autoComplete={false}
            value={this.state.challenges.passwordTwo}
            onChange={value => {
              let newState = { ...this.state };
              newState.challenges.passwordTwo = value;
              this.setState(newState);
            }}
            error={this.state.challenges.errors.passwordTwo}
          />
        </Form>
      </Block>
    );
  }
  renderResetCredentialsForm() {
    if (this.state.resetCredentials.state === "setEmail") {
      const actions = formActions => (
        <Grid container direction="row" justify="flex-end">
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="default"
              onClick={e => {
                e.preventDefault();
                let newState = {
                  ...this.state,
                  loginForm: true,
                  resetCredentialsForm: false
                };
                newState.resetCredentials.state = "selectType";
                this.setState(newState);
              }}
            >
              Abbrechen
            </Button>
            <Button
              variant="contained"
              disabled={this.state.resetCredentials.type === ""}
              color="primary"
              type="submit"
              style={{ marginLeft: "8px" }}
              onClick={e => {
                e.preventDefault();
                this.reset(formActions);
              }}
            >
              Zurücksetzen
            </Button>
          </Grid>
        </Grid>
      );
      return (
        <Block label="Zurücksetzen" primary>
          <Typography variant="h5">
            Wie lautet die Emailadresse Ihres Accounts?
          </Typography>
          <Form actions={actions}>
            <Text
              xs={12}
              label="Email"
              value={this.state.resetCredentials.email}
              onChange={value => {
                let newState = { ...this.state };
                newState.resetCredentials.email = value;
                this.setState(newState);
              }}
            />
          </Form>
        </Block>
      );
    } else if (this.state.resetCredentials.state === "success") {
      return (
        <Block label="Erfolg" primary>
          <Typography variant="h4">
            {this.state.resetCredentials.type === "password"
              ? "Passwort"
              : "Account"}{" "}
            zurückgesetzt!
          </Typography>
          <Typography style={{ marginTop: "16px" }}>
            Sollte ein Account mit dieser Email-Adresse verknüpft sein, erhalten
            Sie{" "}
            {this.state.resetCredentials.type === "password"
              ? "ein neues Passwort."
              : "neue Zugangsdaten."}
            <br />
            Melden Sie sich mit diesen an und folgen Sie den Instruktionen.
          </Typography>
          <div style={{ textAlign: "right", paddingTop: "16px" }}>
            <Button
              variant="contained"
              color="default"
              type="submit"
              onClick={e => {
                e.preventDefault();
                this.setState({
                  ...this.state,
                  resetCredentialsForm: false,
                  loginForm: true
                });
              }}
            >
              Zum Login
            </Button>
          </div>
        </Block>
      );
    } else {
      const actions = formActions => (
        <Grid container direction="row" justify="flex-end">
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="default"
              onClick={e => {
                e.preventDefault();
                let newState = {
                  ...this.state,
                  loginForm: true,
                  resetCredentialsForm: false
                };
                newState.resetCredentials.state = "selectType";
                this.setState(newState);
              }}
            >
              Abbrechen
            </Button>
            <Button
              variant="contained"
              disabled={this.state.resetCredentials.type === ""}
              color="primary"
              type="submit"
              style={{ marginLeft: "8px" }}
              onClick={e => {
                e.preventDefault();
                let newState = {
                  ...this.state
                };
                newState.resetCredentials.state = "setEmail";
                this.setState(newState);
              }}
            >
              Weiter
            </Button>
          </Grid>
        </Grid>
      );
      return (
        <Block label="Zurücksetzen" primary>
          <Typography variant="h5">Was möchten Sie zurücksetzen?</Typography>
          <Form actions={actions}>
            <Radio
              options={[
                {
                  label: "Passwort",
                  value: "password"
                },
                {
                  label: "Benutzername & Passwort",
                  value: "account"
                }
              ]}
              value={this.state.resetCredentials.type}
              onChange={value => {
                let newState = { ...this.state };
                newState.resetCredentials.type = value;
                this.setState(newState);
              }}
            />
          </Form>
        </Block>
      );
    }
  }
  render() {
    const { authenticated } = this.state;
    const { children } = this.props;

    if (authenticated && children) return children;
    if (authenticated && !children) return <p>No Content Set</p>;
    return (
      <Grid
        style={{ marginTop: "25px" }}
        container
        spacing={8}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={5}>
          <div style={{ height: "100%" }}>
            {this.state.challengesForm && this.renderChallenges()}
            {this.state.loginForm && this.renderLoginForm()}
            {this.state.resetCredentialsForm &&
              this.renderResetCredentialsForm()}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Container(withStyles(styles)(Authenticator));
