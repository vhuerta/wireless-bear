/**
 * 
 * @param {Object} params
 * @param {Number} params.count
 * @param {Number} params.page
 * @param {Number} params.limit
 */
const makePagination = ({ total, page = 1, limit = 30 }) => {
  const totalPages = Math.ceil(total / limit);
  page = totalPages > page ? (page > 0 ? page : 1) : totalPages;
  let offset = limit * page - limit;
  offset = offset < 0 ? 0 : offset;
  return { total, limit, offset, page, totalPages };
};

module.exports = { makePagination };
