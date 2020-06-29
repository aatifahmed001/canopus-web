import React from 'react';
import { FormControl } from 'react-bootstrap';

export const FormControlInput = ({ input, type, placeholder, className, min, max, meta: { touched, error, warning, asyncValidating } }) => {
    return (
        <React.Fragment>
            <FormControl
                type={type}
                placeholder={placeholder}
                min={min}
                className={className}
                max={max}
                value={input.value}
                onChange={input.onChange} />
            {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
        </React.Fragment>
    )
}
