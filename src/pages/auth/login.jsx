import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form
} from "react-bootstrap";
import { FormControlInput, RenderLocaleLabel } from "../../components";
import { LocaleKeys } from "../../constants";
import { renderToString } from "react-dom/server";

const Login = props => {
  const { handleSubmit, pristine, submitting} = props;

  return (
    <div className="page_view container1">
      <div className="row login_page">
        <div className="col-md-6 split_panel box overlay red split_left">
          <div className="text">
            <h3>
              <RenderLocaleLabel localeKey={LocaleKeys.WELCOME_LABEL} />
            </h3>
            <p>
              <RenderLocaleLabel localeKey={LocaleKeys.LOGIN_PAGE_INTRO_TEXT} />
            </p>
          </div>
        </div>
        <div className="col-md-6 split_panel split_right common_fa">
          <Form className="login100-form validate-form" onSubmit={handleSubmit}>
          {/* <Form onSubmit={handleSubmit}> */}
            <div className="sidebar__logo">
              <div className="loginheader">
                <figure>
                  <img
                    src={require("./../../assets/images/canopus.png")}
                    alt="Logo"
                  />
                </figure>
              </div>
            </div>
            <div></div>
            <div className="form-row ">
              <div className="form-group col-md-12">
                <i className="fa fa-user username"></i>
                <Field
                  name="username"
                  component={FormControlInput}
                  type="text"
                  className="form-control"
                  placeholder={renderToString(
                    <RenderLocaleLabel localeKey={LocaleKeys.USERNAME_LABEL} />
                  )}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <i className="fa fa-lock password"></i>
                <Field
                  name="password"
                  component={FormControlInput}
                  type="password"
                  className="form-control"
                  placeholder={renderToString(
                    <RenderLocaleLabel localeKey={LocaleKeys.PASSWORD_LABEL} />
                  )}
                />
              </div>
            </div>
            <div className="checkbox">
              <input
                className="styled-checkbox"
                id="styled-checkbox-1"
                type="checkbox"
                value="value1"
                checked
              />
              <label for="styled-checkbox-1">
                <span>Remember</span>
              </label>
            </div>
            <div className="form-row login-btn">
              <Button
                type="submit"
                tabindex="3"
                className="btn btn-primary col-md-12"
                variant="primary"
                size="lg"
                block
                disabled={pristine}
                active={submitting}
              >
                <RenderLocaleLabel localeKey={LocaleKeys.LOGIN_BUTTON_LABEL} />
              </Button>
            </div>
            <div className="link_list">
              <a href="forgotpassword.html">Forgot password?</a>
              <a href="signup.html">
                Do you have an account? <b>Sign Up</b>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const LoginForm = reduxForm({
  form: "login"
})(Login);

export default LoginForm;