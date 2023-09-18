import React, {useEffect, useState} from "react";
import {
    useTheme,
    TablePagination,
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Scrollbar,
    Checkbox,
    Typography,
    SearchNotFound,
    Skeleton,
    Chip
} from "my-lib";
import ListToolbar from "./Toolbar"
import ListHead from "./Head"
import MoreMenu from "./MoreMenu"

import { useSavedFilter } from "@resources/SavedFilter/hooks/useSavedFilter"

const TABLE_HEAD = [
    {
        id: 'title', label: 'Title', alignRight: false
    },
    {
        id: 'commissionInPercent', label: 'Commission', alignRight: false
    },
    {
        id: 'earningsPerSale', label: 'Earnings', alignRight: false
    },
    {
        id: 'averageSalesPrice', label: 'Salesprice', alignRight: false
    },
    {
        id: 'performance', label: 'Performance', alignRight: false
    },
    {
        id: 'processingTime', label: 'Processing Time', alignRight: false
    },
    {
        id: 'cartConversionInPercent', label: 'Cart Conversion', alignRight: false
    },
    {
        id: 'cancellationRateInPercent', label: 'Cancellation Rate', alignRight: false
    },
    {
        id: 'categories', label: 'Category', alignRight: false
    },
    {
        id: 'advertisementAssets', label: 'Advertisement', alignRight: false
    },
    {
        id: 'targetGroups', label: 'Target Groups', alignRight: false
    },
    {
        id: 'trackingTypes', label: 'Tracking Types', alignRight: false
    },
    {
        id: 'salaryModel', label: 'Salary Model', alignRight: false
    },
    {
        id: 'directActivation', label: 'Direct Activation', alignRight: false
    },
    {
        id: 'moreMenu', type: 'moreMenu'
    }
];

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

const RangeTypeRenderer = (range) => {
    return  <Typography variant="subtitle2" noWrap>{range[0]} - {range[1]}</Typography>;
};

const CategoryTypeRenderer = (categories) => {
    if (!categories.length) return "-"
    return categories.map((categoryItem, index) => <Chip key={index}  size="small" title={categoryItem.title} label={categoryItem.title}/>)
}

const OptionsTypeRenderer = (value) => {
    return value
}

export const SavedFiltersList = () => {

    const { savedFilters } = useSavedFilter();
    const [savedFilterList, setSavedFilterList] = useState([]);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setSavedFilterList(savedFilters);
    }, [savedFilters])

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = savedFilterList.map((n) => n.name);
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

    const handleDeleteSavedFilter = (savedFilterId) => {
        const deleteSavedFilter = savedFilterList.filter((savedFilter) => savedFilter.id !== savedFilterId);
        setSelected([]);
        setSavedFilterList(deleteSavedFilter);
    };

    const handleDeleteMultiSavedFilter = (selected) => {
        const deleteSavedFilters = savedFilterList.filter((savedFilter) => !selected.includes(savedFilter.name));
        setSelected([]);
        setSavedFilterList(deleteSavedFilters);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - savedFilterList.length) : 0;

    const filteredSavedFilters = applySortFilter(savedFilterList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredSavedFilters.length && Boolean(filterName);

    const CellItemTypeRenderer = (id, item, row) => {
        // console.log("cell - id, item, row", id, item, row);
        if (["id", "title", "description"].includes(id)) return <Typography variant="subtitle2" noWrap>{row}</Typography>
        if (item.renderItem) return item.renderItem(row.value)
        const cellTypeMapperObject = {
            "category": CategoryTypeRenderer,
            "range": RangeTypeRenderer,
            "options": OptionsTypeRenderer
        }
        const type = row.type;
        return cellTypeMapperObject[type](row.value)
    }
    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSavedFilterList(_savedFilters);
    //     }, 1200);
    // }, [])


    return <Box><ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        onDeleteSavedFilters={() => handleDeleteMultiSavedFilter(selected)}
    />

        <Scrollbar>
            <TableContainer sx={{minWidth: 800}}>
                <Table>
                    <ListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={savedFilterList.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        {!!(savedFilterList.length === 0) && Array(rowsPerPage).fill(
                            <TableRow>
                                {Array(TABLE_HEAD.length + 1).fill(
                                    <TableCell>
                                        <Skeleton variant="text" sx={{width: "100%", height: 16}}/>
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                        {filteredSavedFilters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const {id, title, role, status, company, avatarUrl, isVerified} = row;
                            const isItemSelected = selected.indexOf(id) !== -1;

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
                                        <Checkbox checked={isItemSelected} onClick={() => handleClick(id)}/>
                                    </TableCell>
                                    {TABLE_HEAD.map((item,index) => {
                                        if (item.type === "moreMenu") return <TableCell index={index} padding={"checkbox"}><MoreMenu onDelete={() => handleDeleteSavedFilter(id)} savedFilterName={name}/></TableCell>
                                        return <TableCell>{CellItemTypeRenderer(item.id, item, row[item.id])}</TableCell>
                                    })}
                                    {/*<TableCell sx={{display: 'flex', alignItems: 'center'}}>*/}
                                    {/*    <Avatar alt={name} src={avatarUrl} sx={{mr: 2}}/>*/}
                                    {/*    <Typography variant="subtitle2" noWrap>*/}
                                    {/*        {name}*/}
                                    {/*    </Typography>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="left">{company}</TableCell>*/}
                                    {/*<TableCell align="left">{role}</TableCell>*/}
                                    {/*<TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>*/}
                                    {/*<TableCell align="left">*/}
                                    {/*    <Label*/}
                                    {/*        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}*/}
                                    {/*        color={(status === 'banned' && 'error') || 'success'}*/}
                                    {/*    >*/}
                                    {/*        {sentenceCase(status)}*/}
                                    {/*    </Label>*/}
                                    {/*</TableCell>*/}

                                    {/*<TableCell align="right">*/}

                                    {/*</TableCell>*/}
                                </TableRow>
                            );
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
                                    <SearchNotFound searchQuery={filterName}/>
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
            count={savedFilterList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
}