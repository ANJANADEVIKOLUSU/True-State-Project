// src/components/TransactionsTable.jsx
export default function TransactionsTable({ items }) {
  if (!items.length) {
    return <div style={{ padding: "8px 16px" }}>No results found.</div>;
  }

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer ID</th>
          <th>Customer name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Product Category</th>
          <th>Quantity</th>
          <th>Final Amount</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row) => (
          <tr key={row._id}>
            <td>{row.transactionId}</td>
            <td>{new Date(row.date).toLocaleDateString()}</td>
            <td>{row.customerId}</td>
            <td>{row.customerName}</td>
            <td>{row.phoneNumber}</td>
            <td>{row.gender}</td>
            <td>{row.age}</td>
            <td>{row.productCategory}</td>
            <td>{row.quantity}</td>
            <td>{row.finalAmount}</td>
            <td>{row.paymentMethod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
