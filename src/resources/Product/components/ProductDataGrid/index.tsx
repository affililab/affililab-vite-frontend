import React, {FC} from "react";
import {DataGrid} from "my-lib";
import _ from "lodash"

const TABLE_HEAD = [
    // {field: 'id', label: 'ID', alignRight: false},
    {field: 'title', headerName: 'Name', alignRight: false, editable: true},
    {field: 'performance', headerName: 'Performance', alignRight: false, editable: true},
    {field: 'provisionInPercent', headerName: 'Provision', alignRight: false, editable: true},
    {field: 'provisionFixed', headerName: 'Provision', alignRight: false, editable: true},
    {field: 'earningsPerSale', headerName: 'Verdienst', alignRight: false, editable: true},
    {field: 'averageSalesPrice', headerName: 'Verkaufspreis', alignRight: false, editable: true},
    {field: 'salesPrestige', headerName: 'Verkaufsrang', alignRight: false, editable: true},
    {field: 'cartConversionInPercent', headerName: 'cartConversionInPercent', alignRight: false, editable: true},
    {field: 'cancellationRateInPercent', headerName: 'cancellationRateInPercent', alignRight: false, editable: true},
    {field: 'directActivation', headerName: 'directActivation', alignRight: false, editable: true}
];
const applySortFilter = (array, comparator, query) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return array.filter((_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export const ProductDataGrid: FC<any> = ({items}) => {

    return <DataGrid
            rows={items.map(item => _.pick(item, ["id", "title", "performance", "provisionInPercent", "provisionFixed", "earningsPerSale", "averageSalesPrice", "salesPrestige", "cartConversionInPercent", "cancellationRateInPercent", "directActivation"]))}
            autoHeight={true}
            columns={TABLE_HEAD}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
        />
}