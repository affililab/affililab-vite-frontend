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
import {PartnerProgramModal} from "../PartnerProgramModal";
import {FilterModal, NoticedPartnerProgramsModal} from "@resources/Product/components"
import {AddToModal} from "@resources/Campaign/components/AddToModal"

const {useParams} = ReactRouter;


const useStyles = makeStyles(theme => ({
    chartColumn: {
        ...theme.typography.body2,
        display: "flex",
        justifyContent: "center"
    }
}));

export const SelectTable: FC<any> = ({
                                           embedded = false, handleSelectedItems = (selected) => {
    }
                                       }) => { // handleSelectedItems is a prop to access selected items from parent element

    let {savedFilterId} = useParams();

    const {enqueueSnackbar} = useSnackbar();

    const classes = useStyles();

    const theme = useTheme();

    const [selected, setSelected] = useState([]);

    const handleSelected = (selected) => {
        setSelected(selected);
        handleSelectedItems(selected);
    }

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

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('rank');
    const [rowsPerPage, setRowsPerPage] = useState(25);

    /* add to campaign modal */
    const [showAddToCampaignModal, setShowAddToCampaignModal] = useState(false);
    const [addToCampaignProducts, setAddToCampaignProducts] = useState([]);
    /* end */

    /* partnerprogram modal */
    const [showPartnerProgramModal, setShowPartnerProgramModal] = useState(false);
    const [currentPartnerProgram, setCurrentPartnerProgram] = useState(null);
    const toggleDetailedPartnerProgramModal = (partnerProgram) => {
        setCurrentPartnerProgram(partnerProgram);
        setShowPartnerProgramModal(!showPartnerProgramModal);
    }
    /* end */

    /* noticed partnerprogram models */
    const [showNoticedPartnerPrograms, setShowNoticedPartnerPrograms] = useState(false);
    const handleCloseNoticedPartnerProgramsModal = () => {
        setShowNoticedPartnerPrograms(false);
    }
    /* end */

    /* filter modal */
    const [showFilterModal, setShowFilterModal] = useState(false);
    const handleCloseFilterModal = () => {
        setShowFilterModal(false);
    }
    /* end filter modal */

    const {data: categorySalaryModelsData} = useQuery(CATEGORIES_SALARYMODELS);

    const {
        resetFilter,
        resetAll,
        getGraphQlFilters,
        filtersList,
        filter,
        searchValue,
        setSearchValue,
        applyFilter,
        filterForm,
        activeFilterCount
    } = useFilter(categorySalaryModelsData);

    const {
        getSavedFilterById,
        dataAppliedSavedFilter,
        getFilterArray
    } = useSavedFilter();

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
        setPage
    } = usePartnerPrograms(() => {}, filter, getGraphQlFilters,  selected, order === 'asc' ? 1 : -1, orderBy, rowsPerPage);


    useEffect(() => {
        const getSavedFilter = async () => {
            const filterToApply = await getSavedFilterById(savedFilterId);
            if (filterToApply) {
                applyFilter(await getSavedFilterById(savedFilterId));
                enqueueSnackbar('Successfully applied filter !');
                return;
            }
            enqueueSnackbar('An Error occurred on trying to apply filter', {variant: 'error'});
        };
        if (savedFilterId) getSavedFilter();
    }, [savedFilterId]);



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
        <PartnerProgramModal
            isModalOpen={showPartnerProgramModal}
            toggleModal={toggleDetailedPartnerProgramModal}
            handleCloseModal={() => {
                setShowPartnerProgramModal(false)
            }}
            toggleNoticedPartnerProgram={() => {
            }}
            partnerprogram={currentPartnerProgram}
        />

        <AddToModal addToObjects={{partnerPrograms: addToCampaignProducts}} isModalOpen={showAddToCampaignModal}
                    handleCloseModal={() => {
                        setShowAddToCampaignModal(false)
                    }} resource={"Products"}/>

        <FilterModal
            filter={filter}
            resetFilter={resetFilter}
            filtersList={filtersList}
            applyFilter={applyFilter}
            isModalOpen={showFilterModal}
            handleCloseModal={handleCloseFilterModal}
        />

        <NoticedPartnerProgramsModal
            toggleDetailedModal={toggleDetailedPartnerProgramModal}
            noticedPartnerPrograms={selectedPartnerPrograms}
            isModalOpen={showNoticedPartnerPrograms}
            handleCloseModal={handleCloseNoticedPartnerProgramsModal} />
            <Box sx={{ p: 2, background: (theme) => theme.palette.background.paper, display: "flex", justifyContent: "center" }}>
                <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} updateInput={setSearchValue} />
            </Box>
                <TableComponent
                    embedded
                    resource={"product"}
                    activeFilterCount={activeFilterCount}
                    columns={TableColumns}
                    rows={loading ? [] : partnerprograms}
                    emptyData={emptyData}
                    page={page}
                    openFilter={() => setShowFilterModal(true)}
                    loading={loading}
                    rowsPerPage={rowsPerPage}
                    order={order}
                    orderBy={orderBy}
                    // showCheckbox={false}
                    singleSelect={true}
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