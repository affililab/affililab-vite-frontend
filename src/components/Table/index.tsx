import React, {createRef, FC} from "react";
import {
    Box,
    Checkbox,
    EmptyContent,
    makeStyles,
    Scrollbar,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow, Typography, useScrollSticky, useTheme
} from "my-lib";
import {TableComponentHead} from "./Head"
import {TableComponentMoreMenu} from "./MoreMenu"
import {TableComponentToolbar} from "./Toolbar"
import {StickySubNavProvider} from "../../providers/StickyNavProvider";

const useStyles = makeStyles(theme => ({
    stickyColumn: {
        position: "sticky",
        background: theme.palette.background.paper,
        // borderLeft: `solid 1px ${theme.palette.divider}`,
        boxShadow: theme.customShadows.z24,
        right: 0
    },
    scrollbarContainer: {
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        "& > div": {
            display: "flex",
            flexDirection: "column",
            flex: 1
        }
    }
}));

export const TableComponent: FC<any> = ({
                                            resource = "item",
                                            height = "100%",
                                            filterName = "",
                                            emptyData = false,
                                            activeFilterCount = 0,
                                            showCheckbox = true,
                                            disableFilter = false,
                                            loading = false,
                                            columns = [],
                                            page = 0,
                                            rows = [],
                                            rowsPerPageOptions = [5, 10, 25],
                                            total = 0,
                                            rowsPerPage = 25,
                                            order = "performance",
                                            orderBy = "desc",
                                            menuItems = [],
                                            moreMenuOnlyItems = false,
                                            selectedToolbarItems = [],
                                            toolbarItems = [],
                                            openFilter = () => {
                                            },
                                            handleRequestSort = () => {
                                            },
                                            changePageHandler = (e, page) => {
                                            },
                                            handleSearch = () => {
                                            },
                                            changeRowsPerPageHandler = (event) => {
                                            },
                                            deleteHandler = (ids) => {
                                            },
                                            selected = [],
                                            setSelected
                                        }) => {

    const classes = useStyles();

    const isNotFound : boolean = emptyData && !loading;

    const theme = useTheme();

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    return <>
        <TableContainer sx={{flex: 1, flexDirection: "column", display: "flex"}}>
            <TableComponentToolbar
                numSelected={selected.length}
                onSearch={handleSearch}
                activeFilterCount={activeFilterCount}
                openFilter={openFilter}
                disableFilter={disableFilter}
                selected={selected}
                toolbarItems={toolbarItems}
                {...(selectedToolbarItems.length ? {selectedToolbarItems} : {
                    selectedToolbarItems: [{
                        title: "Delete",
                        onAction: () => deleteHandler(selected),
                        icon: 'mdi:delete-off-outline'
                    }]
                })}
            />
            <Scrollbar sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                ".simplebar-content-wrapper": {
                    // height: "100%",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",

                    overflow: "auto"
                },
                ".simplebar-content": {
                    // height: "100%",
                    flex: 1,
                }
            }} forceVisible="y" style={{height: "100%"}}>


            <Table  size="small" sx={{borderCollapse: "separate"}}>
                <TableComponentHead
                    showCheckbox={showCheckbox}
                    order={order}
                    orderBy={orderBy}
                    columns={columns}
                    rowCount={total < rowsPerPage ? total : rowsPerPage}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    stickyColumnClass={classes.stickyColumn}
                />
                <TableBody>
                    {!!(rows.length === 0 && loading) && Array(rowsPerPage).fill(
                        <TableRow sx={{background: "none !important", height: 40}}>
                            {Array(columns.length + 1).fill(
                                <TableCell>
                                    <Skeleton variant="text" sx={{height: 16}}/>
                                </TableCell>
                            )}
                        </TableRow>
                    )}

                    {rows.map((row, index) => {
                        const isItemSelected = selected.indexOf(row.id) !== -1;
                        return (<TableRow key={row.id + ' ' + index}>
                            {/* select checkbox cell */}
                            {showCheckbox && <TableCell>
                                <Checkbox checked={isItemSelected} onClick={() => handleClick(row.id)}/>
                            </TableCell>}
                            {/* render cell by rowvalue renderCell method of columns */}
                            {columns.map(({key}, index) => {
                                const rowValue = row[key];
                                const column = columns.find(({key: columnKey}) => columnKey === key);
                                return <TableCell align={'left'} key={key + " " + index}>{column.renderCell(row, rowValue) ?? rowValue}</TableCell>;
                            })}
                            {/* menu */}
                            <TableCell className={classes.stickyColumn}>
                                <TableComponentMoreMenu
                                    moreMenuOnlyItems={moreMenuOnlyItems} {...(menuItems.length && menuItems)}
                                    row={row}
                                    menuItems={menuItems}
                                    onDelete={() => deleteHandler(row.id)}/>
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>
                {isNotFound && (
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" colSpan={12} sx={{py: 3}}>
                                <EmptyContent
                                    title={"Keine " + resource + "s gefunden"}
                                    description={"Nach diesen Kriterien wurden keine " + resource + " gefunden"}
                                    img="/static/illustrations/illustration_empty.svg"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
            </Scrollbar>
        </TableContainer>
        <TablePagination
            sx={(theme) => ({
                position: "sticky",
                zIndex: 999,
                boxShadow: theme.customShadows.z24,
                background: theme.palette.background.paper,
                bottom: 0,
                left: 0,
                right: 0
            })}
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={changePageHandler}
            onRowsPerPageChange={changeRowsPerPageHandler}
        />
    </>

};