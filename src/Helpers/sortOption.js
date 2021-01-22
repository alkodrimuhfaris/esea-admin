module.exports = [
  {
    value: {sort: {createdAt: 'DESC'}},
    label: 'Terbaru',
  },
  {
    value: {sort: {createdAt: 'ASC'}},
    label: 'Terlama',
  },
  {
    value: {sort: {productName: 'ASC'}},
    label: 'Nama dari A - Z',
  },
  {
    value: {sort: {productName: 'DESC'}},
    label: 'Nama dari Z - A',
  },
  {
    value: {sort: {price: 'ASC'}},
    label: 'Harga (termurah)',
  },
  {
    value: {sort: {price: 'DESC'}},
    label: 'Harga (termahal)',
  },
];
