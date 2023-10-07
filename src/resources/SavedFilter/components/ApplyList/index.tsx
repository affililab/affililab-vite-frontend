import {
    Scrollbar,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    IconButton, Icon, makeStyles, fShortenNumber,
    useTheme, Skeleton, Typography, Chip, useAuth
} from "my-lib"
import React, {useEffect, useState} from "react";
import {useSavedFilter} from "@resources/SavedFilter/hooks/useSavedFilter";
import {openModal} from '@slices/auth';

const useStyles = makeStyles(theme => ({
    tableRow: {
        '&:hover': {
            background: theme.palette.background.neutral,
        },
        m: 2
    },
    stickyColumn: {
        position: "sticky",
        background: theme.palette.background.neutral,
        borderLeft: `solid 1px ${theme.palette.divider}`,
        right: 0
    },
    tableCell: {
        boxShadow: "none !important"
    }
}));

export const ApplyList = ({
                              applyFilter = () => {}, height='456px'
                          }) => {

    const classes = useStyles();
    const theme = useTheme();
    const {isAuthenticated} = useAuth();

    const {
        savedFilters,
        loading,
        searchValue,
        setSearchValue,
        page,
        setPage,
        total,
        filtersList,
        deleteSavedFilter,
        getFilterArray
    } = useSavedFilter({direction: 1, sortBy: "title", limit: 10, filters: []});

    /* TODO: outsource renderer too hook */
    const RangeTypeRenderer = (row, value) => {
        return <Typography variant="subtitle2" noWrap>{value.value[0]} - {value.value[1]}</Typography>
    };

    const CategoryTypeRenderer = (row, value) => {
        if (!value?.value?.length) return "-"
        return value.value.map((categoryItem, index) => <Chip key={index} size="small" title={categoryItem.title}
                                                              label={categoryItem.title}/>)
    }

    const OptionsTypeRenderer = (row, value) => {
        const optionValueMappingArray = ["all", "yes", "no"]
        return <Typography variant="subtitle2" noWrap>
            {optionValueMappingArray[parseInt(value.value)]}
        </Typography>
    }

    const TextTypeRenderer = (row, value) => {
        return <Typography variant="subtitle2" noWrap>
            {value ?? "-"}
        </Typography>
    }

    const cellTypeMapperObject = {
        "category": CategoryTypeRenderer,
        "range": RangeTypeRenderer,
        "options": OptionsTypeRenderer,
        "text": TextTypeRenderer
    }

    /* end */

    const TableColumns = [
        {
            key: "title",
            label: "Title",
            alignRight: false,
            renderCell: cellTypeMapperObject["text"]
        },
        {
            key: "description",
            label: "Description",
            alignRight: false,
            renderCell: cellTypeMapperObject["text"]
        },
        {
            key: "commissionInPercent",
            label: "Commission",
            alignRight: false,
            renderCell: cellTypeMapperObject["range"]
        },
        {
            key: "earningsPerSale",
            label: "Earnings",
            alignRight: false,
            renderCell: cellTypeMapperObject["range"]
        },
        {
            key: 'averageSalesPrice',
            label: 'Salesprice',
            alignRight: false,
            renderCell: cellTypeMapperObject["range"]
        },
        {
            id: 'performance',
            label: 'Performance',
            alignRight: false,
            renderCell: cellTypeMapperObject["range"]
        },
        {
            key: 'processingTime',
            label: 'Processing Time',
            alignRight: false,
            renderCell: cellTypeMapperObject["range"]
        },
        {
            key: 'cartConversionInPercent',
            label: 'Cart Conversion',
            alignRight: false,
            renderCell: cellTypeMapperObject["range"]
        },
        {
            key: 'cancellationRateInPercent',
            label: 'Cancellation Rate',
            alignRight: false,
            renderCell: cellTypeMapperObject["range"]
        },
        {
            key: 'categories',
            label: 'Category',
            alignRight: false,
            renderCell: cellTypeMapperObject["category"]
        },
        {
            key: 'advertisementAssets',
            label: 'Advertisement',
            alignRight: false,
            renderCell: cellTypeMapperObject["category"]
        },
        {
            key: 'targetGroups',
            label: 'Target Groups',
            alignRight: false,
            renderCell: cellTypeMapperObject["category"]
        },
        {
            key: 'trackingTypes',
            label: 'Tracking Types',
            alignRight: false,
            renderCell: cellTypeMapperObject["category"]
        },
        {
            key: 'salaryModel',
            label: 'Salary Model',
            alignRight: false,
            renderCell: cellTypeMapperObject["category"]
        },
        {
            key: 'directActivation',
            label: 'Direct Activation',
            alignRight: false,
            renderCell: cellTypeMapperObject["options"]
        }
    ];

    useEffect(() => {

        if (!isAuthenticated) {
            openModal();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) return <></>;

    return <TableContainer sx={{ height: "100%" }}>
            <Scrollbar sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                p: 2,
                pt: 4,
                ".simplebar-content-wrapper": {
                    height: "100%",
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
            <Table size="small" sx={{borderCollapse: "separate"}} stickyHeader>
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        {TableColumns.map((headCell, index) => (
                            <TableCell
                                key={index}
                                className={classes.tableCell}
                                align={'center'}
                            >
                                {headCell.label}
                            </TableCell>))}
                        <TableCell className={[classes.stickyColumn, classes.tableCell]} align={"center"}
                                   padding="checkbox">
                            Apply
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {savedFilters.map((row, index) => (
                        <TableRow style={{height: "100px"}} className={classes.tableRow} key={index + row.title}>
                            {TableColumns.map(({key}, index) => {
                                const rowValue = row[key];
                                const column = TableColumns.find(({key: columnKey}) => columnKey === key);
                                if (!rowValue) return <TableCell className={classes.tableCell} key={index}
                                                                 align="center">-</TableCell>;
                                return <TableCell
                                    className={classes.tableCell}
                                    key={index}
                                    align="center">{column.renderCell(row, rowValue) ?? rowValue}</TableCell>;
                            })}
                            <TableCell className={[classes.stickyColumn, classes.tableCell]}
                                       align={"center"}>
                                <IconButton onClick={() => {
                                    applyFilter(getFilterArray(row))
                                }}>
                                    <Icon icon={'ic:round-manage-search'}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Scrollbar>
        </TableContainer>
}