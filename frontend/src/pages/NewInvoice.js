import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/ui/Button";
import FormGroup from "../components/ui/FormGroup";

const NewInvoicePage = () => {

    const history = useHistory()

    const amountInputRef = React.createRef();
    const orderIdInputRef = React.createRef();
    const descriptionInputRef = React.createRef();
    const customerEmailInputRef = React.createRef();

    const userToken = localStorage.getItem('token');

    const [isLoading, setIsLoading] = useState(false)


    function submitHandler(event) {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredOrderId = orderIdInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCustomerEmail = customerEmailInputRef.current.value;

        setIsLoading(true);

        fetch("http://localhost:5000/invoice/create",
            {
                method: 'POST',
                body: JSON.stringify({
                    amount: enteredAmount,
                    description: enteredDescription,
                    orderId: enteredOrderId,
                    email: enteredCustomerEmail
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
                        let errorMsg = 'Invoice creation failed!';
                        throw new Error(errorMsg);
                    });
                }
            }).then(data => {
                console.log(data);
                history.replace("/dashboard/invoices");
            })
            .catch(err => {
                alert(err.message);
            });
    }

    return (
        <>
            <h1 className="text-3xl text-dark font-bold mb-4">Create new invoice</h1>
            <form className="w-full mx-auto text-center" onSubmit={submitHandler}>
                <FormGroup>
                    <input className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" type="text" id="orderId" ref={orderIdInputRef} placeholder="Order Id" />
                </FormGroup>
                <FormGroup>
                    <input className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" type="number" required id="amount" ref={amountInputRef} placeholder="Amount in USD" />
                </FormGroup>
                <FormGroup>
                    <input className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" type="text" id="description" ref={descriptionInputRef} placeholder="Description" />
                </FormGroup>
                <FormGroup>
                    <input className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" type="email" id="email" ref={customerEmailInputRef} placeholder="Customer email address" />
                </FormGroup>
                <FormGroup>
                    {!isLoading && <Button className="mb-2" type="primary" text="Create invoice" full submit></Button>}
                    {isLoading && <div className="w-full px-6 py-3 rounded-sm border text-gray-800 bg-gray-200 border-gray-300" role="alert">Creating invoice...</div>}
                </FormGroup>
            </form>
        </>
    )
}

export default NewInvoicePage;