import CreateStoreForm from "../components/forms/CreateStoreForm";
import { useHistory } from 'react-router-dom';

function CreateStorePage() {

    const history = useHistory();
    const userToken = localStorage.getItem('token');

    function createStoreHandler(storeData) {
        fetch('http://localhost:5000/store/create',
            {
                method: 'POST',
                body: JSON.stringify(storeData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            }).then(() => {
                // @todo: update user json in storage: logging in is required first currently.

                // if fetch promise fulfilled, navigate back to landing page
                history.replace('/dashboard/overview');
            });
    }

    return (
        <div className="w-5/6 sm:w-2/3 md:w-1/2 my-12 py-6 px-6 shadow mx-auto rounded-sm text-center">
            <h1 className="text-3xl font-bold text-gray-800">Hi. Lets create your store</h1>
            <small>You can't add invoices before you create a store. </small>
            <CreateStoreForm onCreateStore={createStoreHandler} />
        </div>

    );
}

export default CreateStorePage;