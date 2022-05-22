// import node module libraries
import React, { Fragment, useEffect } from 'react';

const OnboardingLayout = (props) => {
    useEffect(() => {
        document.body.style.backgroundColor = '#f8f8f8';
    });
    return (
        <Fragment>
            <div className="w-5/6 sm:w-2/3 md:w-1/2 my-12 py-6 px-6 shadow mx-auto rounded-sm">
                <h1 className="text-3xl text-primary font-bold mb-4 text-center mb-10">BTC Payment Processor</h1>
                {props.children}
            </div>
        </Fragment>
    );
};

export default OnboardingLayout;
