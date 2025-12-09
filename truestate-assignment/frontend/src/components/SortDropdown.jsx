// src/components/SortDropdown.jsx
export default function SortDropdown({
  sortBy,
  sortOrder,
  onChangeSortBy,
  onChangeSortOrder
}) {
  return (
    <div className="sort">
      <select value={sortBy} onChange={(e) => onChangeSortBy(e.target.value)}>
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onChangeSortOrder(e.target.value)}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
