import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormGroup from "../components/ui/FormGroup";

function InvoiceDetailsPage(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [invoiceData, setInvoiceData] = useState([])

    const params = useParams();

    const userToken = localStorage.getItem('token');

    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/invoice/' + params.invoiceId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }).then(response => {
            return response.json();
        })
            .then(data => {
                setInvoiceData(data.data);
                setIsLoading(false);
            });
    }, []);

    const currentUser = JSON.parse(localStorage.getItem('user')) || [];

    const userStore = currentUser.data.store.name;

    const balanceofSatoshi = invoiceData.btc_amount - invoiceData.satoshi_paid; // calculated from backend

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <>
            <h2 className="text-3xl text-dark font-bold mb-4">Invoice {invoiceData.id}</h2>
            <div className="border border-gray-300 rounded-sm p-4 mt-8">
                <div className="border-b border-gray-300">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-lg">Invoice summary</span>
                    </div>
                    <div className="mt-4">
                        <div className="mb-2 flex justify-between items-center">
                            <span>Total Fiat Amount Due</span>
                            <span className="text-lg font-medium">${invoiceData.amount}.00</span>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                            <span>Order Id</span>
                            <span className="text-lg font-medium">{invoiceData.order_id}</span>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                            <span>Date Created</span>
                            <span className="text-lg font-medium">{invoiceData.date}</span>
                        </div>

                    </div>
                </div>
                <div className="pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium text-lg">Product details</span>
                    </div>
                    <div className="mt-4">
                        <div className="mb-2 flex justify-between items-center">
                            <span>Description</span><span className="font-normal">{invoiceData.description}</span>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                            <span>Customer email</span
                            ><span className="font-normal">{invoiceData.customer_email}</span>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                            <span>Store</span>
                            <span className="text-lg font-medium">{userStore}</span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl text-dark font-bold my-6">Invoice summary</h2>
            <table className="w-full table-auto rounded-sm text-left">
                <thead>
                    <tr>
                        <th>Payment method</th>
                        <th>Address</th>
                        <th>Rate</th>
                        <th>Paid</th>
                        <th>Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>BTC (On-chain)</td>
                        <td>{invoiceData.btc_address}</td>
                        <td>${invoiceData.exchange_rate} (USD)</td>
                        <td>{invoiceData.satoshi_paid} BTC</td>
                        <td>{balanceofSatoshi} BTC</td>
                    </tr>
                </tbody>
            </table>

            <h2 className="text-gray-600 font-bold mt-6">BOLT 11 Lightning Invoice</h2>
            <FormGroup>
                <textarea className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" rows="3" value={invoiceData.lightning_invoice} />
            </FormGroup>



        </>
    )
}

export default InvoiceDetailsPage;