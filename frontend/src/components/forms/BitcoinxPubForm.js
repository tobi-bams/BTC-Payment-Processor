import React from 'react';
import Button from '../ui/Button';
import FormGroup from '../ui/FormGroup';

const BitcoinxPubForm = (props) => {

    const xPubInputRef = React.createRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredXpub = xPubInputRef.current.value;

        const xpubData = {
            xpub: enteredXpub
        };

        props.onEnteredXpub(xpubData);

    }
    return (
        <>
            <form className="w-full mx-auto text-center" onSubmit={submitHandler}>
                <FormGroup>
                    <textarea className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" rows="3" required id="xpub" ref={xPubInputRef} placeholder="Enter xPub here" />
                </FormGroup>
                <FormGroup>
                    <Button text="Submit" submit full />
                </FormGroup>
            </form>
        </>
    )
}

export default BitcoinxPubForm;