import React, {FC, useCallback, useEffect, useState} from "react";
import {
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    Scrollbar,
    Checkbox,
    Image,
    Typography,
    Skeleton
} from "my-lib";

import {useQuery} from "@apollo/client";
import {GET_PARTNERPROGRAMS} from "@schemas/partnerProgram";
import ListHead from "./ListHead"

const TABLE_HEAD = [
    {id: 'productImg', label: 'Image', alignRight: false},
    {id: 'title', label: 'Name', alignRight: false},
    {id: 'performance', label: 'Performance', alignRight: false},
    {id: 'commissionInPercent', label: 'Commission', alignRight: false},
    {id: 'commissionFixed', label: 'Commission', alignRight: false},
    {id: 'earningsPerSale', label: 'Verdienst', alignRight: false},
    {id: 'averageSalesPrice', label: 'Verkaufspreis', alignRight: false},
    {id: 'salesPrestige', label: 'Verkaufsrang', alignRight: false},
    {id: 'cartConversionInPercent', label: 'cartConversionInPercent', alignRight: false},
    {id: 'cancellationRateInPercent', label: 'cancellationRateInPercent', alignRight: false},
    {id: 'directActivation', label: 'directActivation', alignRight: false}
];
const limit = 10;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
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

export const ProductsList: FC<any> = () => {
    // sort
    const [direction, setDirection] = useState(1);
    const [sortBy, setSortBy] = useState("title");

    const [searchValue, setSearchValue] = useState("");

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const [productList, setProductList] = useState([]);
    const [total, setTotal] = useState(0);
    const [refreshState, setRefreshState] = useState(true);

    // filter
    const [filtersList, setFiltersList] = useState([
        {
            title: "Commission",
            key: "commissionInPercent",
            type: "range",
            showEmpty: true,
            settings: {
                type: "percent",
                min: 0,
                max: 100
            }
        },
        {
            title: "Verdienst pro Verkauf",
            key: "earningsPerSale",
            type: "range",
            showEmpty: true,
            settings: {
                type: "price",
                min: 0,
                max: 1000
            }
        },
        {
            title: "Durchscnittlicher Verkaufspreis",
            key: "averageSalesPrice",
            type: "range",
            showEmpty: true,
            settings: {
                type: "price",
                min: 0,
                max: 12000
            }
        },
        {
            title: "Popularität",
            key: "performance",
            type: "range",
            showEmpty: true,
            settings: {
                type: "number",
                min: 0,
                max: 5
            }
        },
        // {
        //     title: "Verkaufsrang",
        //     key: "salesPrestige",
        //     type: "range",
        //     showEmpty: true,
        //     settings: {
        //         type: "number",
        //         min: 0,
        //         max: 150
        //     }
        // },
        {
            title: "Processingtime",
            key: "processingTime",
            type: "range",
            showEmpty: true,
            settings: {
                type: "number",
                min: 0,
                max: 120
            }
        },
        {
            title: "Cart Conversion",
            key: "cartConversionInPercent",
            type: "range",
            showEmpty: true,
            settings: {
                type: "percent",
                min: 0,
                max: 100
            }
        },
        {
            title: "Stornoquote",
            key: "cancellationRateInPercent",
            type: "range",
            showEmpty: true,
            settings: {
                type: "percent",
                min: 0,
                max: 100
            }
        },
        {
            title: "Kategorie",
            key: "categories",
            type: "category",
            showEmpty: true,
            settings: {
                showTitle: false,
                options: []
            }
        },
        {
            title: "Advertisement Types",
            key: "advertisementAssets",
            type: "category",
            showEmpty: true,
            settings: {
                showTitle: false,
                options: []
            }
        },
        {
            title: "Target Groups",
            key: "targetGroups",
            type: "category",
            showEmpty: true,
            settings: {
                showTitle: false,
                options: []
            }
        },
        {
            title: "Tracking Types",
            key: "trackingTypes",
            type: "category",
            showEmpty: true,
            settings: {
                showTitle: false,
                options: []
            }
        },
        {
            title: "Bezahlart",
            key: "salaryModel",
            type: "category",
            showEmpty: true,
            settings: {
                showTitle: false,
                options: []
            }
        },
        {
            title: "Direct Activation",
            key: "directActivation",
            type: "options",
            value: 0,
            showEmpty: true,
            settings: {
                showTitle: true,
                options: [
                    {
                        value: 0,
                        title: "all"
                    },
                    {
                        value: 1,
                        title: "yes"
                    },
                    {
                        value: 2,
                        title: "no",
                    }
                ]
            }
        }
    ]);
    const [filter, setFilter] = useState(filtersList.map(filterItem => ({
        key: filterItem.key,
        type: filterItem.type,
        showEmpty: filterItem.showEmpty,
        value: filterItem.type === "range" ? [filterItem.settings.min, filterItem.settings.max] : filterItem.type === "options" ? 0 : []
    })));

    const getGraphQlFilters = () => {
        const rangeFilter = filter.filter(filterItem => filterItem.type === "range").map(filterItem => ({
            searchParam: filterItem.key,
            range: filterItem.value,
            showEmpty: filterItem.showEmpty
        }));
        const multiSelectFilter = filter.filter(filterItem => filterItem.type === "category").map(filterItem => ({
            searchParam: filterItem.key,
            items: filterItem.value,
            showEmpty: filterItem.showEmpty
        }));
        const optionsFilter = filter.filter(filterItem => filterItem.type === "options").map(filterItem => ({
            searchParam: filterItem.key,
            value: filterItem.value
        }));
        const searchValueFilter = {searchParam: "title", searchQuery: searchValue};

        // console.log("filter", filter, [...rangeFilter, ...multiSelectFilter, searchValueFilter, ...optionsFilter], filter[0]);

        return [...rangeFilter, ...multiSelectFilter, searchValueFilter, ...optionsFilter];
    };

    const getInitialQueryVariables = useCallback(() => ({
        variables: {page, direction, sortBy, limit, filters: getGraphQlFilters()}
    }), []);

    const {refetch, loading, error, data} = useQuery(GET_PARTNERPROGRAMS, getInitialQueryVariables());

    useEffect(() => {
        setTimeout(() => {
            if (data) setTotal(data.getPartnerPrograms.pageInfo.total);
            if (data) setProductList(data.getPartnerPrograms.pageInfo.page > 0 ? [...productList, ...data.getPartnerPrograms.items] : data.getPartnerPrograms.items);
        }, 1200)
    }, [data]);


    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = productList.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteProduct = (productId) => {
        const deleteProduct = productList.filter((product) => product.id !== productId);
        setSelected([]);
        setProductList(deleteProduct);
    };

    const handleDeleteMultiProduct = (selected) => {
        const deleteProducts = productList.filter((product) => !selected.includes(product.name));
        setSelected([]);
        setProductList(deleteProducts);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

    const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredProducts.length && Boolean(filterName);

    return <Box><Scrollbar>
        <TableContainer>
            <Table>
                <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={productList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                    { !!(productList.length === 0) && Array(rowsPerPage).fill(
                        <TableRow>
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
                            commissionInPercent,
                            commissionFixed,
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
                                <TableCell>
                                    <Image
                                        disabledEffect
                                        alt={title}
                                        src={productImg}
                                        sx={{borderRadius: 1.5, width: 32, mr: 2}}
                                    />
                                </TableCell>
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
                                        {commissionInPercent ? commissionInPercent + '%' : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" noWrap>
                                        {commissionFixed ? commissionFixed + '%' : '-'}
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