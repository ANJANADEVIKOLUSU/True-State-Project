// src/components/FiltersPanel.jsx
export default function FiltersPanel({ filters, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const toggleFromArray = (field, option) => {
    const current = filters[field];
    if (current.includes(option)) {
      updateField(
        field,
        current.filter((o) => o !== option)
      );
    } else {
      updateField(field, [...current, option]);
    }
  };

  // demo options – you can later replace with actual unique values from DB if needed
  const regions = ["North", "South", "East", "West", "Central"];
  const genders = ["Male", "Female", "Other"];
  const categories = ["Clothing", "Electronics", "Groceries"];
  const methods = ["UPI", "Credit Card", "Debit Card", "Cash"];

  // NEW: Tags options (example set – adjust to your dataset tags if you want)
  const tagsOptions = [
  "portable",
  "gadgets",
  "wireless",
];



  return (
    <div className="filters-row">
      {/* Customer Region */}
      <details className="filter-pill">
        <summary>
          <span className="filter-label">Customer Region</span>
          <span className="filter-value">
            {filters.regions.length ? filters.regions.join(", ") : "All"}
          </span>
        </summary>
        <div className="filter-dropdown">
          {regions.map((r) => (
            <label key={r}>
              <input
                type="checkbox"
                checked={filters.regions.includes(r)}
                onChange={() => toggleFromArray("regions", r)}
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Gender */}
      <details className="filter-pill">
        <summary>
          <span className="filter-label">Gender</span>
          <span className="filter-value">
            {filters.genders.length ? filters.genders.join(", ") : "All"}
          </span>
        </summary>
        <div className="filter-dropdown">
          {genders.map((g) => (
            <label key={g}>
              <input
                type="checkbox"
                checked={filters.genders.includes(g)}
                onChange={() => toggleFromArray("genders", g)}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Age Range */}
      <details className="filter-pill">
        <summary>
          <span className="filter-label">Age Range</span>
          <span className="filter-value">
            {filters.ageMin || filters.ageMax
              ? `${filters.ageMin || "0"} - ${filters.ageMax || "100"}`
              : "Any"}
          </span>
        </summary>
        <div className="filter-dropdown filter-age">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => updateField("ageMin", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => updateField("ageMax", e.target.value)}
          />
        </div>
      </details>

      {/* Product Category */}
      <details className="filter-pill">
        <summary>
          <span className="filter-label">Product Category</span>
          <span className="filter-value">
            {filters.categories.length ? filters.categories.join(", ") : "All"}
          </span>
        </summary>
        <div className="filter-dropdown">
          {categories.map((c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => toggleFromArray("categories", c)}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </details>

      {/* 🔥 NEW: Tags (multi-select) */}
      <details className="filter-pill">
        <summary>
          <span className="filter-label">Tags</span>
          <span className="filter-value">
            {filters.tags && filters.tags.length
              ? filters.tags.join(", ")
              : "All"}
          </span>
        </summary>
        <div className="filter-dropdown">
          {tagsOptions.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => toggleFromArray("tags", tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Payment Method */}
      <details className="filter-pill">
        <summary>
          <span className="filter-label">Payment Method</span>
          <span className="filter-value">
            {filters.paymentMethods.length
              ? filters.paymentMethods.join(", ")
              : "All"}
          </span>
        </summary>
        <div className="filter-dropdown">
          {methods.map((m) => (
            <label key={m}>
              <input
                type="checkbox"
                checked={filters.paymentMethods.includes(m)}
                onChange={() => toggleFromArray("paymentMethods", m)}
              />
              <span>{m}</span>
            </label>
          ))}
        </div>
      </details>

      {/* Date Range */}
      <details className="filter-pill">
        <summary>
          <span className="filter-label">Date</span>
          <span className="filter-value">
            {filters.dateFrom || filters.dateTo ? "Custom" : "Any"}
          </span>
        </summary>
        <div className="filter-dropdown filter-date">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => updateField("dateFrom", e.target.value)}
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => updateField("dateTo", e.target.value)}
          />
        </div>
      </details>
    </div>
  );
}
