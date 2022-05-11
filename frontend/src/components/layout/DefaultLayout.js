// import node module libraries
import React, { Fragment, useEffect } from 'react';

// import layouts
import NavBar from '../../elements/NavBar';

const DefaultLayout = (props) => {
    useEffect(() => {
        document.body.style.backgroundColor = '#f5f4f8';
    });
    return (
        <Fragment>
            <NavBar />
            {props.children}
        </Fragment>
    );
};

export default DefaultLayout;
