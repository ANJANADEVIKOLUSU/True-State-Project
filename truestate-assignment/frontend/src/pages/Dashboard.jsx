// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchSales } from "../services/api";
import SearchBar from "../components/SearchBar";
import FiltersPanel from "../components/FiltersPanel";
import SortDropdown from "../components/SortDropdown";
import TransactionsTable from "../components/TransactionsTable";
import PaginationControls from "../components/PaginationControls";

const initialFilters = {
  regions: [],
  genders: [],
  ageMin: "",
  ageMax: "",
  categories: [],
  tags: [],
  paymentMethods: [],
  dateFrom: "",
  dateTo: "",
};

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState("customerName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    items: [],
    total: 0,
    totalPages: 1,
    aggregates: {
      totalUnitsSold: 0,
      totalAmount: 0,
      totalDiscount: 0,
    },
  });

  const loadData = async () => {
    const params = {
      search: search || undefined,
      sortBy,
      sortOrder,
      page,
      limit: 15,
      regions: filters.regions.length ? filters.regions.join(",") : undefined,
      genders: filters.genders.length ? filters.genders.join(",") : undefined,
      ageMin: filters.ageMin || undefined,
      ageMax: filters.ageMax || undefined,
      categories: filters.categories.length
        ? filters.categories.join(",")
        : undefined,
      tags: filters.tags.length ? filters.tags.join(",") : undefined,
      paymentMethods: filters.paymentMethods.length
        ? filters.paymentMethods.join(",")
        : undefined,
      dateFrom: filters.dateFrom || undefined,
      dateTo: filters.dateTo || undefined,
    };

    const res = await fetchSales(params);
    setData(res);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters, sortBy, sortOrder, page]);

  const handleFilterChange = (updated) => {
    setFilters(updated);
    setPage(1);
  };

  const aggregates = data.aggregates || {
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0,
  };

  return (
    <div className="app-shell">
      {/* LEFT SIDEBAR */}
            
      <aside className="sidebar">
        {/* top app + user block */}
        <div className="sidebar-header-card">
          <div className="sidebar-header-main">
            <div className="sidebar-logo-icon">V</div>
            <div className="sidebar-header-text">
              <div className="sidebar-app-name">Vault</div>
              <div className="sidebar-user-name">ANJANA KOLUSU</div>
            </div>
          </div>
          <div className="sidebar-header-chevron">⌄</div>
        </div>

        {/* main navigation */}
        <div className="sidebar-section-card">
          <button className="sidebar-item sidebar-item-active">
            <span className="sidebar-item-icon">🏠</span>
            <span className="sidebar-item-label">Dashboard</span>
          </button>
          <button className="sidebar-item">
            <span className="sidebar-item-icon">👤</span>
            <span className="sidebar-item-label">Nexus</span>
          </button>
          <button className="sidebar-item">
            <span className="sidebar-item-icon">📥</span>
            <span className="sidebar-item-label">Intake</span>
          </button>
        </div>

        {/* Services group */}
        <div className="sidebar-section-label">Services</div>
        <div className="sidebar-section-card">
          <button className="sidebar-item">
            <span className="sidebar-dot-icon" />
            <span className="sidebar-item-label">Pre-active</span>
          </button>
          <button className="sidebar-item">
            <span className="sidebar-dot-icon" />
            <span className="sidebar-item-label">Active</span>
          </button>
          <button className="sidebar-item">
            <span className="sidebar-dot-icon" />
            <span className="sidebar-item-label">Blocked</span>
          </button>
          <button className="sidebar-item">
            <span className="sidebar-dot-icon" />
            <span className="sidebar-item-label">Closed</span>
          </button>
        </div>

        {/* Invoices group */}
        <div className="sidebar-section-label">Invoices</div>
        <div className="sidebar-section-card">
          <button className="sidebar-item sidebar-item-active-secondary">
            <span className="sidebar-item-icon">📄</span>
            <span className="sidebar-item-label">Proforma Invoices</span>
          </button>
          <button className="sidebar-item">
            <span className="sidebar-item-icon">📄</span>
            <span className="sidebar-item-label">Final Invoices</span>
          </button>
        </div>
      </aside>


      {/* RIGHT MAIN AREA */}
      <div className="main-area">
        {/* Header */}
        <header className="main-header">
          <div>
            <h1 className="main-title">Sales Management System</h1>
            <p className="main-subtitle">
              Monitor customer activity, revenue and order details.
            </p>
          </div>
        </header>

        {/* Toolbar */}
        <section className="toolbar">
          <div className="toolbar-left">
            <FiltersPanel filters={filters} onChange={handleFilterChange} />
          </div>

          <div className="toolbar-right">
            <SearchBar value={search} onChange={setSearch} />
            <SortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onChangeSortBy={setSortBy}
              onChangeSortOrder={setSortOrder}
            />
          </div>
        </section>

        {/* Metrics cards */}
        <section className="metrics-row">
          <div className="metric-card">
            <div className="metric-label">Total units sold</div>
            <div className="metric-value">
              {aggregates.totalUnitsSold.toLocaleString("en-IN")}
            </div>
            <div className="metric-extra"></div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total amount</div>
            <div className="metric-value">
              ₹{" "}
              {aggregates.totalAmount.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="metric-extra"></div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total discount</div>
            <div className="metric-value">
              ₹{" "}
              {aggregates.totalDiscount.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="metric-extra">
              
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="table-card">
          <TransactionsTable items={data.items} />
          <PaginationControls
            page={page}
            totalPages={data.totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(data.totalPages, p + 1))}
          />
        </section>
      </div>
    </div>
  );
}
