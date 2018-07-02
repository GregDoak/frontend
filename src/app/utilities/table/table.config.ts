export const tableConfig = {
  exporting: {
    enabled: true,
    filename: 'export'
  },
  filtering: {
    enabled: true,
    placeholder: 'Filter',
    searchTerm: '',
  },
  pagination: {
    enabled: true,
    boundaryLinks: true,
    collectionSize: 0,
    directionLinks: true,
    end: 0,
    itemsPerPage: 10,
    maxSize: 5,
    page: 1,
    start: 0
  },
  sorting: {
    enabled: true,
    column: {
      name: null,
      order: null
    }
  },
  toggling: {
    enabled: true
  }
};
