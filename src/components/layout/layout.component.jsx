import React from 'react';

export const WrapLayout = ({ component: Component, ...rest }) => (
    //Layout HOC   
    <Component {...rest} />
);