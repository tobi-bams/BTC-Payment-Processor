import { Link } from "react-router-dom";

const InvoiceTable = (props) => {

    const thClass =
        "px-4 py-4 text-left bg-primary text-white text-sm font-medium"
    const tdClass = "px-4 py-4 border-t border-b border-gray-300 text-sm"
    const trClass = "border-gray-300"
    return (
        <table className="w-full table-auto rounded-sm">
            <thead>
                <tr>
                    <th className={thClass}>Date</th>
                    <th className={thClass}>Order Id</th>
                    <th className={thClass}>Invoice Id</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Amount</th>
                    <th className={thClass}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.invoices.map((invoice) => (
                    <tr className={trClass} key={invoice.id}>
                        <td className={tdClass}>{invoice.created_at}</td>
                        <td className={tdClass}>{invoice.order_id}</td>
                        <td className={tdClass}>{invoice.id}</td>
                        <td className={tdClass}>{invoice.status}</td>
                        <td className={tdClass}>{invoice.amount} (USD)</td>
                        <td className={tdClass}>
                            <Link className="bg-secondary py-1 px-2 text-white" to={`/invoices/${invoice.id}`}>Details</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default InvoiceTable;