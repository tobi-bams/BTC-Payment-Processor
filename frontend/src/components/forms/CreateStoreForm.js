import React, { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Button from '../ui/Button';
import FormGroup from '../ui/FormGroup';

function CreateStoreForm(props) {

    const authCtx = useContext(AuthContext);

    const nameInputRef = React.createRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;

        const storeData = {
            name: enteredName,
            userId: authCtx.currentUser.data.id
        };

        props.onCreateStore(storeData);

    }
    return (
        <>
            <form className="w-full mx-auto text-center" onSubmit={submitHandler}>
                <FormGroup>
                    <input className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" type="text" required id="name" ref={nameInputRef} placeholder="Name of your store" />
                </FormGroup>
                <FormGroup>
                    <Button text="Create my store" submit full />
                </FormGroup>
            </form>
        </>
    )
}

export default CreateStoreForm;