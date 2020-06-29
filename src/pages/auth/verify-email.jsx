import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form } from 'react-bootstrap';
import { FormControlInput, RenderLocaleLabel } from '../../components';
import { LocaleKeys } from '../../constants';
import { getLocaleText } from '../../utils';

const required = (value, form, data) => value ? undefined : getLocaleText(data.locale, LocaleKeys.REQUIRED_VALIDATION_MESSAGE);

const VerifyEmail = (props) => {

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
                        <Form.Label> <RenderLocaleLabel localeKey={LocaleKeys.VERIFICATION_CODE} /></Form.Label>
                        <Field
                            name="verificationCode"
                            component={FormControlInput}
                            type="text"
                            placeholder={getLocaleText(props.locale, LocaleKeys.VERIFICATION_CODE)}
                            validate={[required]}
                        />
                    </Form.Group>
                    <Button type="submit" variant="login" size="lg" disabled={pristine} active={submitting}>
                        <RenderLocaleLabel localeKey={LocaleKeys.VERIFY_BUTTON_LABEL} />
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
const VerifyEmailFrom = reduxForm({
    form: "verifyEmail"
})(VerifyEmail);

export default VerifyEmailFrom;