// src/utils/buildQuery.js
function toArrayParam(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value;
  return value.split(',').map((v) => v.trim()).filter(Boolean);
}

module.exports.buildSalesQuery = (params) => {
  const {
    search,
    regions,
    genders,
    ageMin,
    ageMax,
    categories,
    tags,
    paymentMethods,
    dateFrom,
    dateTo
  } = params;

  const query = {};

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ customerName: regex }, { phoneNumber: regex }];
  }

  const regionArr = toArrayParam(regions);
  if (regionArr) query.customerRegion = { $in: regionArr };

  const genderArr = toArrayParam(genders);
  if (genderArr) query.gender = { $in: genderArr };

  const categoryArr = toArrayParam(categories);
  if (categoryArr) query.productCategory = { $in: categoryArr };

  const tagsArr = toArrayParam(tags);
  if (tagsArr) query.tags = { $in: tagsArr };

  const methodsArr = toArrayParam(paymentMethods);
  if (methodsArr) query.paymentMethod = { $in: methodsArr };

  const minAge = ageMin ? Number(ageMin) : null;
  const maxAge = ageMax ? Number(ageMax) : null;
  if (minAge !== null || maxAge !== null) {
    query.age = {};
    if (!Number.isNaN(minAge)) query.age.$gte = minAge;
    if (!Number.isNaN(maxAge)) query.age.$lte = maxAge;
  }

  if (dateFrom || dateTo) {
    query.date = {};
    if (dateFrom) query.date.$gte = new Date(dateFrom);
    if (dateTo) query.date.$lte = new Date(dateTo);
  }

  return query;
};
