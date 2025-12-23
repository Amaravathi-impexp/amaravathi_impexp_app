const invoices = [
  {
    id: 1,
    invoiceNo: 'INV-2024-001',
    party: 'Global Exports Ltd',
    amount: '45,250.00',
    currency: 'USD',
    dueDate: 'Dec 28, 2024',
    status: 'Pending',
  },
  {
    id: 2,
    invoiceNo: 'INV-2024-002',
    party: 'Ocean Freight Co',
    amount: '28,500.00',
    currency: 'EUR',
    dueDate: 'Dec 25, 2024',
    status: 'Paid',
  },
  {
    id: 3,
    invoiceNo: 'INV-2024-003',
    party: 'Asia Imports Inc',
    amount: '62,800.00',
    currency: 'USD',
    dueDate: 'Dec 30, 2024',
    status: 'Overdue',
  },
  {
    id: 4,
    invoiceNo: 'INV-2024-004',
    party: 'Continental Shipping',
    amount: '15,750.00',
    currency: 'GBP',
    dueDate: 'Jan 05, 2025',
    status: 'Pending',
  },
  {
    id: 5,
    invoiceNo: 'INV-2024-005',
    party: 'Pacific Trade Corp',
    amount: '38,900.00',
    currency: 'USD',
    dueDate: 'Dec 22, 2024',
    status: 'Paid',
  },
  {
    id: 6,
    invoiceNo: 'INV-2024-006',
    party: 'Mediterranean Logistics',
    amount: '52,300.00',
    currency: 'EUR',
    dueDate: 'Dec 20, 2024',
    status: 'Overdue',
  },
  {
    id: 7,
    invoiceNo: 'INV-2024-007',
    party: 'Nordic Freight Solutions',
    amount: '19,450.00',
    currency: 'USD',
    dueDate: 'Jan 10, 2025',
    status: 'Pending',
  },
  {
    id: 8,
    invoiceNo: 'INV-2024-008',
    party: 'Trans-Atlantic Cargo',
    amount: '71,200.00',
    currency: 'USD',
    dueDate: 'Dec 27, 2024',
    status: 'Paid',
  },
];

export function PaymentsInvoicing() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Payments & Invoicing</h1>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Invoice No
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Party
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{invoice.invoiceNo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{invoice.party}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{invoice.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{invoice.currency}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{invoice.dueDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
