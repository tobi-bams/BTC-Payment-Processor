import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InvoiceDetailsPage() {

    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    const invoices = []

    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/invoices/get/'
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                const invoices = [];

                for (const key in data) {
                    const invoice = {
                        // get the key
                        id: key,
                        // push the key into the object to form proper json
                        ...data[key]
                    };
                    invoices.push(invoice);
                }
                setIsLoading(false);
            });
    }, []);

    const invoice = invoices.find((invoice) => invoice.id === params.invoiceId);

    if (!invoice) {
        return <p>No invoice found</p>;
    }

    return (
        <>
            <h2 className="text-3xl text-dark font-bold mb-4">Invoice {invoice.id}</h2>
        </>
    )
}

export default InvoiceDetailsPage;