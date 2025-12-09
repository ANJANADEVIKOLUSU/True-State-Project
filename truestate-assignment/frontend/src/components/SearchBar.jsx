// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Name, Phone no."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
