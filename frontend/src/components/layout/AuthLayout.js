// import node module libraries
import React, { Fragment, useEffect } from 'react';

const AuthLayout = (props) => {
    useEffect(() => {
        document.body.style.backgroundColor = '#f5f4f8';
    });
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

export default AuthLayout;
