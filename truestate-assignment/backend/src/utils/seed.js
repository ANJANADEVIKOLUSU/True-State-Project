// src/utils/seed.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const SalesTransaction = require('../models/SalesTransaction');

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Mongo connected for seeding');

    const filePath = path.join(
      __dirname,
      '../../../data/truestate_assignment_dataset.csv'
    );

    const batchSize = 5000;        // insert 5000 at a time
    let batch = [];
    let totalCount = 0;

    // clear old data first
    await SalesTransaction.deleteMany({});
    console.log('🧹 Existing data cleared');

    const stream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of stream) {
      const doc = {
        transactionId: Number(row['Transaction ID']),
        date: new Date(row['Date']),
        customerId: row['Customer ID'],
        customerName: row['Customer Name'],
        phoneNumber: row['Phone Number'],
        gender: row['Gender'],
        age: Number(row['Age']),
        customerRegion: row['Customer Region'],
        customerType: row['Customer Type'],
        productId: row['Product ID'],
        productName: row['Product Name'],
        brand: row['Brand'],
        productCategory: row['Product Category'],
        tags: row['Tags']
          ? row['Tags'].split(',').map((t) => t.trim())
          : [],
        quantity: Number(row['Quantity']),
        pricePerUnit: Number(row['Price per Unit']),
        discountPercentage: Number(row['Discount Percentage']),
        totalAmount: Number(row['Total Amount']),
        finalAmount: Number(row['Final Amount']),
        paymentMethod: row['Payment Method'],
        orderStatus: row['Order Status'],
        deliveryType: row['Delivery Type'],
        storeId: row['Store ID'],
        storeLocation: row['Store Location'],
        salespersonId: row['Salesperson ID'],
        employeeName: row['Employee Name']
      };

      batch.push(doc);
      totalCount++;

      if (batch.length === batchSize) {
        await SalesTransaction.insertMany(batch, { ordered: false });
        console.log(`🚚 Inserted ${totalCount} records so far...`);
        batch = [];
      }
    }

    // insert any remaining docs
    if (batch.length > 0) {
      await SalesTransaction.insertMany(batch, { ordered: false });
    }

    console.log(`🎉 Seeding completed. Total records inserted: ${totalCount}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
