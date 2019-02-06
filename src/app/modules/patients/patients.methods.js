// const { makePagination } = require('../../../utils/pagination');

// function _builsPatientsQuery(filters = {}) {
//   const queryCriteria = {};

//   if (filters.name) queryCriteria.name = new RegExp(`^${filters.name}`);
//   if (filters.fathersSurname)
//     queryCriteria.fathersSurname = new RegExp(`^${filters.fathersSurname}`);
//   if (filters.mothersSurname)
//     queryCriteria.mothersSurname = new RegExp(`^${filters.mothersSurname}`);

//   return queryCriteria;
// }

// /**
//  * 
//  * @param {*} Model 
//  */
// function makeFindPaginated(Model) {
//   /**
//    * 
//    */
//   return async ({ page: _page, filters: _filters, limit: _limit }) => {
//     const _query = _builsPatientsQuery(_filters);
//     const _total = await Model.countDocuments(_query);

//     const { total, limit, offset, page, totalPages } = makePagination({
//       total: _total,
//       page: _page,
//       limit: _limit
//     });

//     const found = await Model.find(_query)
//       .skip(offset)
//       .limit(limit)
//       .lean();

//     return { total, page, totalPages, limit, found };
//   };
  
// }

// module.exports = { makeFindPaginated };
