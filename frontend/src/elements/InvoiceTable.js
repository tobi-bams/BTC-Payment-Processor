import { Link } from "react-router-dom";
import { getStatusColor } from "../helpers/utils";
import { format } from 'date-fns';


const InvoiceTable = (props) => {

    const sortedInvoices = props.invoices.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }).reverse();

    const thClass =
        "px-4 py-2 text-left bg-primary text-white text-sm font-medium"
    const tdClass = "px-4 py-4 border-t border-b border-gray-300 text-sm"
    const trClass = "border-gray-300"
    return (
        <table className="w-full table-auto rounded-sm">
            <thead>
                <tr>
                    <th className={thClass}>Date created</th>
                    <th className={thClass}>Order</th>
                    <th className={thClass}>Invoice Id</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Amount</th>
                    <th className={thClass}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedInvoices.map((invoice) => (
                    <tr className={trClass} key={invoice.id}>
                        <td className={tdClass}>{format(new Date(invoice.date), 'dd/MM/yyyy kk:mm:ss')}</td>
                        <td className={tdClass}>{invoice.order_id}</td>
                        <td className={tdClass}>{invoice.id}</td>
                        <td className={tdClass}>
                            <span className={`rounded-sm py-1 px-2 text-xs font-medium ${getStatusColor(invoice.status)}`}>{invoice.status}</span></td>
                        <td className={tdClass}>{invoice.amount}.00 (USD)</td>
                        <td className={tdClass}>
                            <Link className="bg-secondary py-1 px-2 text-white mr-2" to={`/dashboard/invoices/${invoice.id}`}>Details</Link>
                            <Link target="_blank" className="bg-primary py-1 px-2 text-white" to={`/dashboard/invoices/checkout/${invoice.id}`}>Checkout</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default InvoiceTable;