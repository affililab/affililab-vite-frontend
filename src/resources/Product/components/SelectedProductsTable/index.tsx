import {Image, makeStyles, Typography, useTheme} from "my-lib";
import React, {FC, useState} from "react";
import {TableComponent} from "@components/Table";
import {PercentageBarChartComponent2} from "@components/Charts/PercentageBarChartComponent2";
import {ListView} from "@resources/Product/components/NoticedPartnerProgramsModal/ListView";

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
        key: "commissionInPercent",
        label: "Commission %",
        alignRight: false,
        renderCell: (row, value) => (value !== null ? <PercentageBarChartComponent2 percentage={value} width={56} height={46} /> : <Typography variant="subtitle2" noWrap>
            -
        </Typography>)
    },
    {
        key: "commissionFixed",
        label: "Commission €",
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
        renderCell: (row, value) => value !== null ?  <PercentageBarChartComponent2 percentage={value} width={56} height={46} /> : <Typography variant="subtitle2" noWrap>
            -
        </Typography>
    },
    {
        key: "cancellationRateInPercent",
        label: "Absprungsrate",
        alignRight: false,
        renderCell: (row, value) => value !== null ?  <PercentageBarChartComponent2 percentage={value} width={56} height={46} /> : <Typography variant="subtitle2" noWrap>
            -
        </Typography>
    },
    {
        key: "directActivation",
        label: "Direktaktivierung",
        alignRight: false,
        renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
            {value ? "Ja" : "Nein"}
        </Typography>
    }
];

export const SelectedProductsTable: FC<any> = ({items, selectedItems, handleSelected}) => {

    const theme = useTheme();

    const classes = useStyles();

    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [page, setPage] = useState(0);
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

    const handleSearch = (value) => {
        setSearchValue(value);
    }

    return <TableComponent
        height={"calc(70vh - 64px)"}
        embedded
        resource={"products"}
        activeFilterCount={0}
        columns={TableColumns}
        rows={filteredProducts.filter((item, index) => index >= page * rowsPerPage && index < ( (page * rowsPerPage) + rowsPerPage ))}
        page={page}
        rowsPerPage={rowsPerPage}
        order={order}
        orderBy={orderBy}
        total={items.length}
        selected={selectedItems}
        setSelected={handleSelected}
        handleSearch={handleSearch}
        handleRequestSort={handleRequestSort}
        changePageHandler={(event, page) => setPage(page)}
        changeRowsPerPageHandler={handleChangeRowsPerPage}
        moreMenuOnlyItems
        disableToolbar={true}
        disableMenu={true}
    />
}