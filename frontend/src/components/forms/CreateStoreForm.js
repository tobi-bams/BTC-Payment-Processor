import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../ui/Button';
import FormGroup from '../ui/FormGroup';

const CreateStoreForm = (props) => {

    const nameInputRef = React.createRef();

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const userToken = localStorage.getItem('token');

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;

        setIsLoading(true);
        fetch('http://localhost:5000/store/create',
            {
                method: 'POST',
                body: JSON.stringify({
                    name: enteredName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            }).then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMsg = 'Something went wrong. Store was not created!';
                        throw new Error(errorMsg);
                    });
                }
            }).then(data => {
                localStorage.setItem('storeData', JSON.stringify(data));
                setIsLoading(false);
                history.replace("/dashboard/getting-started");
            })
            .catch(err => {
                alert(err.message);
            });
    }
    return (
        <>
            <form className="w-full mx-auto text-center" onSubmit={submitHandler}>
                <FormGroup>
                    <input className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" type="text" required id="name" ref={nameInputRef} placeholder="Name of your store" />
                </FormGroup>
                <FormGroup>
                    {!isLoading && <Button text="Create my store" submit full />}
                    {isLoading && <div className="w-full px-6 py-3 rounded-sm border text-gray-800 bg-gray-200 border-gray-300" role="alert">Creating store...</div>}
                </FormGroup>
            </form>
        </>
    )
}

export default CreateStoreForm;