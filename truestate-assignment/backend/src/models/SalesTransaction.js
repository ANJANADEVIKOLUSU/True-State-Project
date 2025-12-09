// src/models/SalesTransaction.js
const mongoose = require('mongoose');

const SalesTransactionSchema = new mongoose.Schema(
  {
    transactionId: Number,
    date: Date,
    customerId: String,
    customerName: { type: String, index: true },
    phoneNumber: { type: String, index: true },
    gender: String,
    age: Number,
    customerRegion: String,
    customerType: String,
    productId: String,
    productName: String,
    brand: String,
    productCategory: String,
    tags: [String],
    quantity: Number,
    pricePerUnit: Number,
    discountPercentage: Number,
    totalAmount: Number,
    finalAmount: Number,
    paymentMethod: String,
    orderStatus: String,
    deliveryType: String,
    storeId: String,
    storeLocation: String,
    salespersonId: String,
    employeeName: String
  },
  { timestamps: false }
);

SalesTransactionSchema.index({ customerName: 1 });
SalesTransactionSchema.index({ phoneNumber: 1 });
SalesTransactionSchema.index({ date: -1 });

module.exports = mongoose.model('SalesTransaction', SalesTransactionSchema);
