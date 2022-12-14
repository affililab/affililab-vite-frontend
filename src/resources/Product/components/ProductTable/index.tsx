import {
    Box,
    Checkbox,
    Scrollbar,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from "my-lib";
import React, {FC, useState} from "react";
import {ProductTableHead} from "./TableHead"

const TABLE_HEAD = [
    // {id: 'productImg', label: 'Image', alignRight: false},
    {id: 'title', label: 'Name', alignRight: false},
    {id: 'performance', label: 'Performance', alignRight: false},
    {id: 'provisionInPercent', label: 'Provision', alignRight: false},
    {id: 'provisionFixed', label: 'Provision', alignRight: false},
    {id: 'earningsPerSale', label: 'Verdienst', alignRight: false},
    {id: 'averageSalesPrice', label: 'Verkaufspreis', alignRight: false},
    {id: 'salesPrestige', label: 'Verkaufsrang', alignRight: false},
    {id: 'cartConversionInPercent', label: 'cartConversionInPercent', alignRight: false},
    {id: 'cancellationRateInPercent', label: 'cancellationRateInPercent', alignRight: false},
    {id: 'directActivation', label: 'directActivation', alignRight: false}
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
}

export const ProductTable: FC<any> = ({items}) => {
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0);
    const [filterName, setFilterName] = useState('');

    const filteredProducts = applySortFilter(items, getComparator(order, orderBy), filterName);

    const isNotFound = !items.length && Boolean(filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = items.map((n) => n.title);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    return <Box><Scrollbar>
        <TableContainer>
            <Table>
                <ProductTableHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={items.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                    {!!(items.length === 0) && Array.from(Array(rowsPerPage)).map(i =>
                        <TableRow key={i}>
                            {Array(TABLE_HEAD.length + 1).fill(
                                <TableCell>
                                    <Skeleton variant="text" sx={{width: "100%", height: 16}}/>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                    {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const {
                            id,
                            title,
                            productImg,
                            provisionInPercent,
                            provisionFixed,
                            earningsPerSale,
                            performance,
                            averageSalesPrice,
                            salesPrestige,
                            cartConversionInPercent,
                            cancellationRateInPercent,
                            directActivation
                        } = row;
                        const isItemSelected = selected.indexOf(title) !== -1;
                        return (
                            <TableRow
                                hover
                                key={id}
                                tabIndex={-1}
                                role="checkbox"
                                selected={isItemSelected}
                                aria-checked={isItemSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isItemSelected}
                                              onClick={() => handleClick(name)}/>
                                </TableCell>
                                {/*<TableCell>*/}
                                {/*    <Image*/}
                                {/*        disabledEffect*/}
                                {/*        alt={title}*/}
                                {/*        src={productImg}*/}
                                {/*        sx={{borderRadius: 1.5, width: 32, mr: 2}}*/}
                                {/*    />*/}
                                {/*</TableCell>*/}
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {performance}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {provisionInPercent ? provisionInPercent + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {provisionFixed ? provisionFixed + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {earningsPerSale ? earningsPerSale + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {averageSalesPrice ? averageSalesPrice + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {salesPrestige ? salesPrestige + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {cartConversionInPercent ? cartConversionInPercent + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {cancellationRateInPercent ? cancellationRateInPercent + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {directActivation ? directActivation + '%' : '-'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                {isNotFound && (
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                {/*<SearchNotFound searchQuery={filterName} />*/}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    </Scrollbar>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
}