// src/services/salesService.js
const SalesTransaction = require("../models/SalesTransaction");
const { buildSalesQuery } = require("../utils/buildQuery");

exports.getSales = async (params) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "date",
    sortOrder = "desc",
  } = params;

  const pageNum = Number(page) || 1;
  const pageSize = Number(limit) || 10;

  const query = buildSalesQuery(params);

  // sorting
  const sort = {};
  if (sortBy === "date") {
    sort.date = sortOrder === "asc" ? 1 : -1;
  } else if (sortBy === "quantity") {
    sort.quantity = sortOrder === "asc" ? 1 : -1;
  } else if (sortBy === "customerName") {
    sort.customerName = sortOrder === "desc" ? -1 : 1;
  }

  // 1) paginated items
  const itemsPromise = SalesTransaction.find(query)
    .sort(sort)
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  // 2) total count
  const totalPromise = SalesTransaction.countDocuments(query);

  // 3) aggregates for ALL matching docs (not just current page)
  const aggregatesPromise = SalesTransaction.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalUnitsSold: { $sum: "$quantity" },
        // choose what "Total amount" means – here we use Final Amount
        totalAmount: { $sum: "$finalAmount" },
        // discount = Total Amount - Final Amount
        totalDiscount: {
          $sum: { $subtract: ["$totalAmount", "$finalAmount"] },
        },
      },
    },
  ]);

  const [items, total, aggResult] = await Promise.all([
    itemsPromise,
    totalPromise,
    aggregatesPromise,
  ]);

  const agg = aggResult[0] || {
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0,
  };

  return {
    items,
    total,
    page: pageNum,
    limit: pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    aggregates: {
      totalUnitsSold: agg.totalUnitsSold || 0,
      totalAmount: agg.totalAmount || 0,
      totalDiscount: agg.totalDiscount || 0,
    },
  };
};
