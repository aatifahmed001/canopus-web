import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import VerifyEmail from "./auth/verify-email";
import { routes } from "../config/routes";
import _ from "lodash";
import { PrivateRoute, RenderLocaleLabel } from "../components";
import { LocalizationContext } from "../contexts";
import { LocaleKeys, languages, userActionTypes } from "../constants";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { SignInApi, SignOutApi, SignUpApi, VerifyEmailApi } from "../actions";

axios.interceptors.request.use(
  async config => {
    //TODO

    return config;
    // or throw new Error('User required')
  },
  // I don't think this function is required
  function(error) {
    return Promise.reject(error);
  }
);

const App = props => {
  const { defaultLocale } = React.useContext(LocalizationContext);
  let locale;
  try {
    locale = require(`../assets/localization/${props.user.language.toLowerCase()}.json`);
  } catch (err) {}

  return (
    <LocalizationContext.Provider value={{ locale, defaultLocale }}>
      <header>
        <div class="tb-color">
          <div class="container-fluid">
            <div class="row top-bar clearfix">
              <div class="col-md-4 col-sm-3 col-xs-6 d-flex align-items-center h60">
                <div class="logo">
                  <img
                    class="pull-left"
                    src={require("./../assets/images/canopus.png")}
                    alt="Logo"
                  />
                </div>
              </div>
              <div class="m-head col-md-8 col-sm-9">
                <div class="article-wrapper float-right d-flex align-items-center h60">
                  <ul class="nav header-nav d-flex align-items-center">
                    <li>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="Secondary"
                          id="dropdown-language"
                        >
                          <RenderLocaleLabel
                            localeKey={LocaleKeys.LANGUAGE_LABEL}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {_.map(languages, language => (
                            <Dropdown.Item
                              onSelect={() =>
                                props.setLanguage(language.isoCode)
                              }
                            >
                              <RenderLocaleLabel localeKey={language.label} />
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                    <li>
                      <i class="fa fa-envelope"></i>info@ascendtek.com
                    </li>
                    <li>
                      {props.user.isAuthenticated ? (
                        <span onClick={props.signOut}>Logout</span>
                      ) : (
                        <span onClick={() => props.history.push("/login")}>
                          Login
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            render={() =>
              props.user.isAuthenticated ? (
                <Redirect to={"/patients"} />
              ) : (
                <Redirect to={"/login"} />
              )
            }
          />
          <Route
            exact
            path={"/signup"}
            render={() =>
              !props.user.verifySuccess && !props.user.isAuthenticated ? (
                !props.user.signupSuccess ? (
                  <Signup
                    onSubmit={props.onSignupSubmit}
                    locale={props.user.language}
                  />
                ) : (
                  <VerifyEmail
                    onSubmit={data =>
                      props.onVerifySubmit(data, props.user.username)
                    }
                    locale={props.user.language}
                  />
                )
              ) : (
                <Redirect to={"/login"} />
              )
            }
          />
          <Route
            path={"/login"}
            render={() =>
              props.user.isAuthenticated ? (
                <Redirect to={"/patients"} />
              ) : (
                <Login
                  onSubmit={props.onLoginSubmit}
                  locale={props.user.language}
                />
              )
            }
          />

          {_.map(routes, ({ component: Component, ...rest }, index) => (
            <PrivateRoute
              {...rest}
              userLoggedIn={props.user.isAuthenticated}
              component={Component}
              key={"private-route-" + index}
            />
          ))}
        </Switch>
      </Router>
    </LocalizationContext.Provider>
  );
};

const mapStateToProps = state => state.userReducer;

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmit: values => {
      console.log("values====>", values);
      SignInApi(
        values.username,
        values.password,
        tokens => {
          dispatch({
            type: userActionTypes.LOGIN_SUCCESS,
            loginTokens: tokens
          });
        },
        error => {
          dispatch({ type: userActionTypes.LOGIN_FAILURE, LoginError: error });
        }
      );
    },
    setLanguage: language =>
      dispatch({ type: userActionTypes.SET_LANGUAGE, language }),
    signOut: () =>
      SignOutApi(() => {
        dispatch({ type: userActionTypes.LOGOUT_SUCCESS });
      }),
    onSignupSubmit: data => {
      console.log("values====>", data);
      SignUpApi(data, username => {
        dispatch({ type: userActionTypes.SIGNUP_SUCCESS, username });
      });
    },
    onVerifySubmit: (data, username) =>
      VerifyEmailApi({ ...data, username }, verified => {
        dispatch({ type: userActionTypes.VERIFY_SUCCESS });
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
