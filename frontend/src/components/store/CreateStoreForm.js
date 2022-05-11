import { useRef } from 'react';
import Button from '../ui/Button';
import FormGroup from '../ui/FormGroup';
import InputGroup from '../ui/InputGroup';

function CreateStoreForm(props) {
    const nameInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;

        const storeData = {
            name: enteredName,
        };

        props.onCreateStore(storeData);

    }
    return (
        <>
            <form className="w-full mx-auto text-center" onSubmit={submitHandler}>
                <FormGroup>
                    <InputGroup type="text" name="name" placeholder="Name of your store" ref={nameInputRef} />
                </FormGroup>
                <FormGroup>
                    <Button text="Create my store" submit full />
                </FormGroup>
            </form>
        </>
    )
}

export default CreateStoreForm;