import React, {FC, useEffect, useState} from "react";
import {
    BaseOptionChart,
    Box,
    Image,
    makeStyles,
    ReactApexChart,
    Router as ReactRouter,
    SearchInput,
    Typography,
    useSnackbar,
    useTheme
} from "my-lib";
import {TableComponent} from "@components/Table";
import {CATEGORIES_SALARYMODELS} from "@schemas/categoriesSalaryModels";
import {usePartnerPrograms} from "../../hooks/usePartnerProgramsForOverview";
import {useFilter} from "@resources/Product/hooks/useFilter";
import {useSavedFilter} from "@resources/SavedFilter/hooks/useSavedFilter"
import {useQuery} from "@apollo/client";
import {merge} from "lodash";
import {PercentageBarChartComponent2} from "@components/Charts/PercentageBarChartComponent2";

const {useParams} = ReactRouter;


const useStyles = makeStyles(theme => ({
    chartColumn: {
        ...theme.typography.body2,
        display: "flex",
        justifyContent: "center"
    }
}));

export const SelectTable: FC<any> = ({ multiple = true, handleSelectedItems = (selected) => {}}) => {

    let {savedFilterId} = useParams();

    const {enqueueSnackbar} = useSnackbar();

    const classes = useStyles();

    const theme = useTheme();

    const [selected, setSelected] = useState([]);

    const handleSelected = (selected) => {
        setSelected(selected);
        handleSelectedItems(selected);
    }

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
            renderCell: (row, value) => value !== null ? <PercentageBarChartComponent2 percentage={value} width={56} height={46} /> : <Typography variant="subtitle2" noWrap>
                -
            </Typography>
        },
        {
            key: "cancellationRateInPercent",
            label: "Absprungsrate",
            alignRight: false,
            renderCell: (row, value) => value !== null ? <PercentageBarChartComponent2 percentage={value} width={56} height={46} /> : <Typography variant="subtitle2" noWrap>
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

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('rank');
    const [rowsPerPage, setRowsPerPage] = useState(25);


    const {
        refreshPartnerprograms,
        selectedPartnerPrograms,
        emptyData,
        fetchNext,
        loadingSelected,
        partnerprograms,
        page,
        loading,
        total,
        setTotal,
        setPage,
        searchValue,
        setSearchValue
    } = usePartnerPrograms();

    const handleRequestSort = (param) => {
        setOrderBy(param);
        setOrder(order === "asc" ? "desc" : "asc")
    }

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
        setPage(0);
    }

    const changePageHandler = (e, page) => {
        setPage(page);
    }

    const changeRowsPerPageHandler = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    return <>
            <Box sx={{ p: 2, background: (theme) => theme.palette.background.paper, display: "flex", justifyContent: "center" }}>
                <SearchInput searchValue={searchValue} updateInput={setSearchValue} />
            </Box>
        <TableComponent
            height={"50vh"}
            embedded
            resource={"product"}
            columns={TableColumns}
            rows={loading ? [] : partnerprograms}
            emptyData={emptyData}
            page={page}
            loading={loading}
            rowsPerPage={rowsPerPage}
            order={order}
            orderBy={orderBy}
            singleSelect={!multiple}
            total={total}
            selected={selected}
            setSelected={handleSelected}
            handleSearch={handleSearch}
            handleRequestSort={handleRequestSort}
            changePageHandler={changePageHandler}
            changeRowsPerPageHandler={changeRowsPerPageHandler}
            moreMenuOnlyItems
            disableToolbar={true}
            disableMenu={true}
        />
    </>
}