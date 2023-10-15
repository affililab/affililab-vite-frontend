import React, {FC, useContext, useEffect, useState} from "react";
import {TableComponent} from "@components/Table";
import {FilterModal} from "@components/FilterModal";
import {
    useTheme,
    BaseOptionChart,
    Image,
    ReactApexChart,
    Router as ReactRouter,
    Typography,
    makeStyles, Chip, HeaderItemsContext, SearchInput
} from "my-lib";
import {useSavedFilter} from "@resources/SavedFilter/hooks/useSavedFilter";
import {SavedFilterDeleteModal} from "../SavedFilterDeleteModal";
import {SaveFilterModal} from "@resources/SavedFilter/components/SaveFilterModal"
import {DeleteModal} from "@components/DeleteModal";
const {useNavigate} = ReactRouter;

/* TODO: outsource renderer too hook */
const RangeTypeRenderer = (row, value) => {
    return value ? <Typography variant="subtitle2" noWrap>{value.value[0]} - {value.value[1]}</Typography> : "-"
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

export const SavedFiltersTable: FC<any> = ({embedded = false, applyFilter}) => {

    /* table states TODO: outsource to another */
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [currentItem, setCurrentItem] = useState(null);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    /* modal */
    const [deleteModalState, setDeleteModalState] = useState(false);

    const changeRowsPerPageHandler = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    const handleRequestSort = (param) => {
        setOrderBy(param);
        setOrder(order === "asc" ? "desc" : "asc")
    }

    const changePageHandler = (e, page) => {
        setPage(page);
    }
    /* end table states */

    /* filter modal */
    const [showFilterModal, setShowFilterModal] = useState(false);
    const handleCloseFilterModal = () => {
        setShowFilterModal(false);
    }
    /* end filter modal */

    const {
        savedFilters,
        emptyData,
        loading,
        searchValue,
        setSearchValue,
        page,
        setPage,
        total,
        filtersList,
        deleteSavedFilter,
        getFilterArray
    } = useSavedFilter({direction: order === 'asc' ? 1 : -1, sortBy: orderBy, limit: rowsPerPage, filters: []});

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche aus deinen Suchprofilen ..."} searchValue={searchValue} updateInput={setSearchValue} key={1} />]);
    }, []);

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
    }

    const TableColumns = [
        {
            key: "title",
            label: "Title",
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

    const moreMenuItems = embedded ? [
        {
            title: "apply",
            click: (row) => {
                applyFilter(getFilterArray(row));
            },
            // style: { color: 'error.main' },
            icon: 'ic:round-manage-search'
        }
    ] : [
        {
            title: "apply",
            click: (row) => {
                navigate("/app/products/" + row.id);
            },
            icon: 'ic:round-manage-search'
        },
        {
            title: "searchprofile",
            click: (row) => {

            },
            icon: 'fluent:receipt-search-20-regular'
        },
        {
            title: "edit",
            click: (row) => {
                setCurrentItem(row);
                setShowFilterModal(true)
            },
            icon: 'fluent:text-bullet-list-square-edit-20-regular'
        },
        {
            title: "delete",
            click: (row) => {
                setCurrentItem(row);
                setDeleteModalState(true);
            },
            style: {color: 'error.main'},
            icon: 'fluent:delete-48-regular'
        },
    ] ;

    return <>
        <DeleteModal resourceName={"Saved Filter"}  isModalOpen={deleteModalState} handleCloseModal={() => {
            setDeleteModalState(false)
        }} agree={async () => {
            // delete items
            !!selected.length ? await deleteSavedFilter(selected) : await deleteSavedFilter([currentItem.id]);
            setSelected([]);
            setDeleteModalState(false);
        }}/>

        <SaveFilterModal
            update
            item={currentItem}
            searchValue={currentItem?.searchValue}
            filterSettings={filtersList}
            filter={currentItem ? getFilterArray(currentItem) : []}
            isModalOpen={showFilterModal}
            handleCloseModal={handleCloseFilterModal}/>

        <TableComponent
            activeFilterCount={0}
            disableFilter
            showCheckbox={!embedded}
            columns={TableColumns}
            rows={loading ? [] : savedFilters}
            emptyData={emptyData}
            page={page}
            loading={loading}
            rowsPerPage={rowsPerPage}
            order={order}
            orderBy={orderBy}
            total={total}
            selected={selected}
            setSelected={setSelected}
            handleSearch={handleSearch}
            handleRequestSort={handleRequestSort}
            changePageHandler={changePageHandler}
            changeRowsPerPageHandler={changeRowsPerPageHandler}
            moreMenuOnlyItems={embedded}
            selectedToolbarItems={[
                {
                    title: "delete", onAction: (selected) => {
                        setDeleteModalState(true);
                        setSelected(selected)
                    }, icon: 'fluent:delete-48-regular'
                }
            ]}
            menuItems={moreMenuItems}
        />
    </>
}

