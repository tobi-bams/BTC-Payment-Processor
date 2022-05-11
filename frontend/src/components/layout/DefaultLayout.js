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
            <div className="w-full flex flex-col lg:flex-row lg:px-6">
                {props.children}
            </div>
        </Fragment>
    );
};

export default DefaultLayout;
