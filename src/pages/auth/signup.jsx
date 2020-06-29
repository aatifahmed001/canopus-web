import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form } from 'react-bootstrap';
import { FormControlInput, RenderLocaleLabel } from '../../components';
import { LocaleKeys } from '../../constants';
import { getLocaleText } from '../../utils';

const required = (value, form, data) => value ? undefined : getLocaleText(data.locale, LocaleKeys.REQUIRED_VALIDATION_MESSAGE);

const usernamePattern = (value, form, data) =>
    value && !/^\S*$/i.test(value) ?
        getLocaleText(data.locale, LocaleKeys.USERNAME_VALIDATION_MESSAGE) : undefined;

const emailPattern = (value, form, data) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        getLocaleText(data.locale, LocaleKeys.EMAIL_VALIDATION_MESSAGE) : undefined;

const passwordPattern = (value, form, data) =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(value) ?
        getLocaleText(data.locale, LocaleKeys.PASSWORD_VALIDATION_MESSAGE) : undefined;

const matchPasswords = (value, form, data) =>
    value !== form.password ? getLocaleText(data.locale, LocaleKeys.CONFIRM_PASSWORD_VALIDATION_MESSAGE) : undefined;

const Signup = (props) => {

    const { handleSubmit, pristine, submitting} = props;

    return (
        <div className="page_view">           
            <Container>
                <br />
                <br />
                <h2><RenderLocaleLabel localeKey={LocaleKeys.WELCOME_LABEL} /> Healimpilo</h2>
                <h4><RenderLocaleLabel localeKey={LocaleKeys.SIGN_UP_PAGE_ACTION_TEXT} />
                </h4>
                <br />
                <br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label> <RenderLocaleLabel localeKey={LocaleKeys.FULLNAME_LABEL} /></Form.Label>
                        <Field
                            name="fullname"
                            component={FormControlInput}
                            type="text"
                            placeholder={getLocaleText(props.locale, LocaleKeys.FULLNAME_LABEL)}
                            validate={[required]}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> <RenderLocaleLabel localeKey={LocaleKeys.EMAIL_LABEL} /></Form.Label>
                        <Field
                            name="email"
                            component={FormControlInput}
                            type="email"
                            placeholder={getLocaleText(props.locale, LocaleKeys.EMAIL_LABEL)}
                            validate={[required, emailPattern]}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> <RenderLocaleLabel localeKey={LocaleKeys.USERNAME_LABEL} /></Form.Label>
                        <Field
                            name="username"
                            component={FormControlInput}
                            type="text"
                            placeholder={getLocaleText(props.locale, LocaleKeys.USERNAME_LABEL)}
                            validate={[required, usernamePattern]}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> <RenderLocaleLabel localeKey={LocaleKeys.PASSWORD_LABEL} /></Form.Label>
                        <Field
                            name="password"
                            component={FormControlInput}
                            type="password"
                            placeholder={getLocaleText(props.locale, LocaleKeys.PASSWORD_LABEL)}
                            validate={[required, passwordPattern]}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> <RenderLocaleLabel localeKey={LocaleKeys.CONFIRM_PASSWORD_LABEL} /></Form.Label>
                        <Field
                            name="confirmPassword"
                            component={FormControlInput}
                            type="password"
                            placeholder={getLocaleText(props.locale, LocaleKeys.CONFIRM_PASSWORD_LABEL)}
                            validate={[required, matchPasswords]}
                        />
                    </Form.Group>
                    <Button type="submit" variant="login" size="lg" disabled={pristine} active={submitting}>
                        <RenderLocaleLabel localeKey={LocaleKeys.SIGNUP_BUTTON_LABEL} />
                    </Button>
                </Form>
            </Container>           
        </div>
    )
}
const SignupForm = reduxForm({
    form: "signup"
})(Signup);

export default SignupForm;