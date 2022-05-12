import CreateStoreForm from "../components/store/CreateStoreForm";
import { useHistory } from 'react-router-dom';

function CreateStorePage() {

    const history = useHistory();

    function createStoreHandler(storeData) {
        fetch('',
            {
                method: 'POST',
                body: JSON.stringify(storeData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                // if fetch promise fulfilled, navigate back to landing page
                history.replace('/');
            });
    }

    return (
        <div className="w-5/6 sm:w-2/3 md:w-1/2 my-12 py-6 px-6 shadow mx-auto rounded-sm">
            <h1 className="text-3xl font-bold text-gray-800">Lets build your store</h1>
            <CreateStoreForm onCreateStore={createStoreHandler} />
        </div>

    );
}

export default CreateStorePage;