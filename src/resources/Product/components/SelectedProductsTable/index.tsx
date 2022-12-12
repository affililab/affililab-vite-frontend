import {BaseOptionChart, Image, makeStyles, ReactApexChart, Typography, useTheme, merge} from "my-lib";
import React, {FC, useState} from "react";
import {TableComponent} from "@components/Table";

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

const useStyles = makeStyles(theme => ({
    chartColumn: {
        ...theme.typography.body2,
        display: "flex",
        justifyContent: "center"
    }
}));

export const SelectedProductsTable: FC<any> = ({items, addToCampaign, embedded, toggleDetailedModal, toggleNoticedPartnerProgram}) => {

    const theme = useTheme();

    const classes = useStyles();

    const TableColumns = [
        {
            key: "productImg",
            label: "Image",
            alignRight: false,
            renderCell: (row, value) => <Image
                disabledEffect
                alt={row.title}
                src={value}
                sx={{borderRadius: 1.5, width: 32, mr: 2}}
            />
        },
        {
            key: "title",
            label: "Name",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value ?? "-"}
            </Typography>
        },
        {
            key: "rank",
            label: "Rank",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value ?? "-"}
            </Typography>
        },
        {
            key: "performance",
            label: "Performance",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value ?? "-"}
            </Typography>
        },
        {
            key: "provisionInPercent",
            label: "Provision %",
            alignRight: false,
            renderCell: (row, value) => (value !== null ? <ReactApexChart
                className={classes.chartColumn}
                options={chartOptions(value)}
                width={56}
                height={46}
                type="bar"
                series={[{
                    data: [value]
                }]}
            /> : <Typography variant="subtitle2" noWrap>
                -
            </Typography>)
        },
        {
            key: "provisionFixed",
            label: "Provision €",
            alignRight: false,
            renderCell: (row, value) => {
                const val = value ?? row['earningsPerSale'];
                return val ? <Typography variant="subtitle2" noWrap>
                    {val} €
                </Typography> : <Typography variant="subtitle2" noWrap>
                    -
                </Typography>
            }
        },
        {
            key: "averageSalesPrice",
            label: "⌀ Verkaufspreis",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value ?? "-"}
            </Typography>
        },
        {
            key: "salesPrestige",
            label: "Verkaufsrang",
            alignRight: false,
            renderCell: (row, value) => value ? <Typography variant="subtitle2" noWrap>
                {value}
            </Typography> : <Typography variant="subtitle2" noWrap>
                -
            </Typography>
        },
        {
            key: "cartConversionInPercent",
            label: "Abschlussrate",
            alignRight: false,
            renderCell: (row, value) => value !== null ? <ReactApexChart
                className={classes.chartColumn}
                options={chartOptions(value)}
                width={56}
                height={46}
                type="bar"
                series={[{
                    data: [value]
                }]}
            /> : <Typography variant="subtitle2" noWrap>
                -
            </Typography>
        },
        {
            key: "cancellationRateInPercent",
            label: "Absprungsrate",
            alignRight: false,
            renderCell: (row, value) => value !== null ? <ReactApexChart
                className={classes.chartColumn}
                options={chartOptions(value)}
                width={56}
                height={46}
                type="bar"
                series={[{
                    data: [value]
                }]}
            /> : <Typography variant="subtitle2" noWrap>
                -
            </Typography>
        },
        {
            key: "directActivation",
            label: "Direktaktivierung",
            alignRight: false,
            renderCell: (row, value) => value ? <Typography variant="subtitle2" noWrap>
                {value} %
            </Typography> : <Typography variant="subtitle2" noWrap>
                -
            </Typography>
        }
    ];

    // TODO: Outsource to completly own chart component
    const chartOptions = (value) => (merge(BaseOptionChart(), {
        chart: {
            type: "bar",
            stacked: true,
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            width: 0,
            curve: 'smooth',
            lineCap: 'round'
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "20%",
                borderRadius: 0,
                colors: {
                    backgroundBarColors: ["#40475D"],
                }
            }
        },
        colors: [theme.palette.primary.lighter],
        subtitle: {
            floating: true,
            align: "right",
            offsetY: -2,
            offsetX: 8,
            text: value + "%",
            style: {
                color: theme.palette.text.primary,
                fontSize: 14
            }
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            categories: ["Process 1"]
        },
        yaxis: {
            max: 100
        },
        fill: {
            opacity: 1,
            type: "gradient",
            gradient: {
                gradientToColors: [theme.palette.primary.darker],
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 1
            }
        },
    }));

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const filteredProducts = applySortFilter(items, getComparator(order, orderBy), filterName).filter(item => item.title.includes(searchValue) || item.description.includes(searchValue));

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

    const handleSearch = (value) => {
        setSearchValue(value);
    }

    return <TableComponent
        resource={"products"}
        height={embedded ? "100%" : "70vh"}
        activeFilterCount={0}
        columns={TableColumns}
        rows={filteredProducts.filter((item, index) => index >= page * rowsPerPage && index < ( (page * rowsPerPage) + rowsPerPage ))}
        page={page}
        rowsPerPage={rowsPerPage}
        order={order}
        orderBy={orderBy}
        total={items.length}
        selected={selected}
        setSelected={setSelected}
        handleSearch={handleSearch}
        handleRequestSort={handleRequestSort}
        changePageHandler={(event, page) => setPage(page)}
        changeRowsPerPageHandler={handleChangeRowsPerPage}
        moreMenuOnlyItems
        toolbarItems={[]}
        selectedToolbarItems={[]}
        menuItems={[
            {
                title: "remove",
                click: (row) => {
                    toggleNoticedPartnerProgram(row);
                    // setShowAddToCampaignModal(true)
                    // setAddToCampaignProducts([row.id])
                },
                // style: { color: 'error.main' },
                icon: "ep:remove"
            },
            {
                title: "add to campaign",
                click: (row) => {
                    addToCampaign(row.id)
                    // setShowAddToCampaignModal(true)
                    // setAddToCampaignProducts([row.id])
                },
                // style: { color: 'error.main' },
                icon: 'carbon:add-alt'
            },
            {
                title: "show",
                click: (row) => {
                    toggleDetailedModal(row)
                },
                // style: { color: 'error.main' },
                icon: 'tabler:arrows-maximize'
            }
        ]}
    />
}