// import node module libraries
import React, { Fragment, useEffect } from 'react';

const DefaultLayout = (props) => {
    useEffect(() => {
        document.body.style.backgroundColor = '#4564be';
    });
    return (
        <Fragment>
            <div className="w-full flex flex-col lg:flex-row lg:px-6">
                {props.children}
            </div>
        </Fragment>
    );
};

export default DefaultLayout;
