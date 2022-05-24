import { useState, useEffect } from "react";
import StatCard from "../components/ui/StatCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faFileInvoice,
  faBitcoinSign,
} from "@fortawesome/free-solid-svg-icons";
import InvoiceTable from "../elements/InvoiceTable";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedInvoices, setLoadedInvoices] = useState([]);

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/invoice/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const invoices = [];
        for (const key in data.data) {
          const invoice = {
            // get the key
            id: key,
            // push the key into the object to form proper json
            ...data.data[key],
          };
          invoices.push(invoice);
          console.log("invoices: ", invoices);
        }
        setIsLoading(false);
        setLoadedInvoices(invoices);
      });
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user")) || [];

  const userHasStore = currentUser.data.store;

  // sum paid amounts to get wallet balance
  let walletBalance = 0;
  loadedInvoices?.forEach((invoice) => {
    if (invoice.satoshi_paid) {
      walletBalance += invoice.satoshi_paid;
    }
  });
  // count paid invoices
  const paidInvoices = loadedInvoices?.filter(
    (invoice) => invoice.status === "paid"
  );

  return (
    <>
      <div className="mb-10">
        {userHasStore ? (
          <h2 className="text-3xl text-dark font-bold mb-4">
            {userHasStore.name} Overview
          </h2>
        ) : (
          <h2 className="text-3xl text-dark font-bold mb-4">Overview</h2>
        )}
        <div className="flex flex-wrap justify-between">
          <StatCard
            title="BTC Wallet balance"
            stat={walletBalance.toFixed(8)}
            link="/"
            icon={<FontAwesomeIcon icon={faBitcoinSign} />}
            statSize="text-3xl"
            className="mb-6 xl:mb-0"
          />
          <StatCard
            title="Total Invoices"
            stat={loadedInvoices?.length}
            link="/"
            icon={<FontAwesomeIcon icon={faFileInvoice} />}
            statSize="text-3xl"
            className="mb-6 xl:mb-0"
          />
          <StatCard
            title="Paid Invoices"
            stat={paidInvoices.length}
            link="/"
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            statSize="text-3xl"
            className="mb-6 xl:mb-0"
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="max-w-full border border-gray-300 rounded-sm bg-white">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Recent Invoices</h2>
            <div className="mt-4 flex">
              <InvoiceTable invoices={loadedInvoices} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
