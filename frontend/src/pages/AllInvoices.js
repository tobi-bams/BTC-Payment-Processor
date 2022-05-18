import { useState, useEffect } from 'react';
import InvoiceTable from "../elements/InvoiceTable";

function AllInvoicesPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedInvoices, setLoadedInvoices] = useState([]);

    const userToken = localStorage.getItem('token');

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/invoice/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }).then(res => {
            return res.json();
        })
            .then(data => {
                const invoices = [];
                for (const key in data.data) {
                    const invoice = {
                        // get the key
                        id: key,
                        // push the key into the object to form proper json
                        ...data.data[key]
                    };
                    invoices.push(invoice);
                    console.log("invoices: ", invoices);
                }
                setIsLoading(false);
                setLoadedInvoices(invoices);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <>
            <h2 className="text-3xl text-dark font-bold mb-4">All invoices</h2>
            <InvoiceTable invoices={loadedInvoices} />
        </>
    )
}

export default AllInvoicesPage;