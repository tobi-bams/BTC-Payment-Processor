import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CheckoutBox from "../elements/CheckoutBox";

const bip21 = require("bip21");
const kjua = require("kjua");
const Swal = require('sweetalert2')

const CheckoutPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [invoiceData, setInvoiceData] = useState([]);
    const [invoiceStatus, setInvoiceStatus] = useState("pending");

    const params = useParams();

    const history = useHistory();

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
                // get invoice data
                if (data.data.status == "expired") {
                    setInvoiceStatus("expired");
                } else if (data.data.status == "paid") {
                    setInvoiceStatus("paid");
                }
                setIsLoading(false);
            });
    }, []);

    const btcAddress = invoiceData.btc_address;
    const lightningAddress = invoiceData.lightning_invoice;
    const description = invoiceData.description;
    const orderId = invoiceData.order_id;
    const fiat_amount = invoiceData.amount;
    const amount = invoiceData.btc_amount


    const options = {
        label: `Payment for ${description}`,
        message: `Payment for ${description}`,
        amount: amount,
        lightning: lightningAddress,
    };

    const uri = bip21.encode(btcAddress, options);

    const bip21qrcode = kjua({
        text: uri,
        render: "image",
        crisp: true,
        size: 280,
        back: "#f2f2f2",
        fill: "#252746",
        rounded: 10
    })

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <div className="w-5/6 sm:w-2/3 md:w-1/3 my-12 py-6 px-6 shadow mx-auto bg-white rounded-sm">
            <div className="text-center">
                <div className="text-center py-3 border-b border-gray-300">
                    <span className="w-full font-medium text-center">Payment for: {description}</span><br />
                    <span className="text-center">{amount} BTC <span className="text-blue-800">(${fiat_amount}.00 USD)</span> </span>
                </div>
            </div>
            <div className="my-4">
                {isLoading && (
                    <p>Loading...</p>
                )}
                {!isLoading && invoiceStatus == "pending" && (
                    <CheckoutBox qrcode={bip21qrcode} lightning={lightningAddress} bitcoin={btcAddress} />
                )}
                {!isLoading && invoiceStatus == "expired" && (
                    Swal.fire({
                        title: 'Expired!',
                        text: 'This invoice has expired',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    }).then(function () {
                        window.location = "/dashboard/overview"; // assumes user is logged in
                    })
                )}
                {!isLoading && invoiceStatus == "paid" && (
                    Swal.fire({
                        title: 'Paid!',
                        text: 'This invoice has been paid',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    }).then(function () {
                        window.location = "/dashboard/overview"; // assumes user is logged in
                    })
                )}
            </div>
            <p className="text-sm">Powered by Bitcoin Payment Processor</p>
        </div>

    )
};

export default CheckoutPage;
