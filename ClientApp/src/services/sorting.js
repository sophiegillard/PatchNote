export const handleSort = (sortColumn, setSortColumn, sortDirection, setSortDirection, columnName) => {

        setSortColumn(columnName);
        setSortDirection(sortDirection === 'false' ? 'true' : 'false');

};