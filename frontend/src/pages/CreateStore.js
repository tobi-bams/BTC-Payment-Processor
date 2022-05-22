import CreateStoreForm from "../components/forms/CreateStoreForm";
import { useHistory } from 'react-router-dom';
import Button from "../components/ui/Button";

const CreateStorePage = () => {

    const history = useHistory();

    return (
        <>
            <h1 className="text-xl font-bold text-gray-800">Hi. We need a name for your store</h1>
            <CreateStoreForm />

            <Button text="Go back" type="link" size="sm" onClick={history.goBack} />
        </>

    );
}

export default CreateStorePage;