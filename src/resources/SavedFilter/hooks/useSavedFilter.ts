import React, {useState, useEffect} from "react";
import {useMutation, useQuery, useLazyQuery} from "@apollo/client";
import {useSnackbar} from "my-lib"
import _ from "lodash"
import {
    GET_SAVED_FILTERS,
    GET_SAVED_FILTER,
    DELETE_SAVED_FILTER
} from "@schemas/savedFilters";
import { CATEGORIES_SALARYMODELS } from "@schemas/categoriesSalaryModels"

export const useSavedFilter = (meta = {direction: 1, sortBy: "name", limit: 10, filters: []}) => {
    const {enqueueSnackbar} = useSnackbar();
    const [savedFilters, setSavedFilters] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [filtersList, setFiltersList] = useState([
        {
            title: "Provision",
            key: "provisionInPercent",
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
            title: "Advertisment Types",
            key: "advertismentAssets",
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
    const {refetch, loading, error, data, networkStatus} = useQuery(GET_SAVED_FILTERS, {
        variables: {
            meta: {
                ...meta,
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }
        }
    });
    const [getSavedFilter, {
        loading: loadingSavedFilter,
        error: errorSavedFilter,
        data: dataAppliedSavedFilter
    }] = useLazyQuery(GET_SAVED_FILTER);
    /* filter functionality */
    const {data: categorySalaryModelsData} = useQuery(CATEGORIES_SALARYMODELS);

    const [deleteSavedFilterMutation, {deleteSavedFilterErrors}] = useMutation(DELETE_SAVED_FILTER, {
        refetchQueries: [
            {
                query: GET_SAVED_FILTERS,
                variables: {
                    meta: {
                        ...meta,
                        page,
                        filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
                    }
                }
            }
        ]
    });


    useEffect(() => {
        if (data) {
            if (data.getSavedFilters) {
                setTotal(data.getSavedFilters?.pageInfo?.total);
                setSavedFilters(mapSavedFiltersTypes(data.getSavedFilters?.items));
            }
        }
    }, [data]);

    useEffect(() => {
        refetch({meta: {...meta, page, filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]}})
    }, []);

    useEffect(() => {
        if (!categorySalaryModelsData) return;
        setFiltersList(filtersList.map(filterItem => {
            if (!["categories", "salaryModel", "advertismentAssets", "trackingTypes", "targetGroups", "directActivation"].includes(filterItem.key)) return filterItem;
            if (filterItem.key === "categories") filterItem.settings.options = categorySalaryModelsData.getAllCategories;
            if (filterItem.key === "advertismentAssets") filterItem.settings.options = categorySalaryModelsData.getAllAdvertismentAssets;
            if (filterItem.key === "trackingTypes") filterItem.settings.options = categorySalaryModelsData.getAllTrackingTypes;
            if (filterItem.key === "targetGroups") filterItem.settings.options = categorySalaryModelsData.getAllTargetGroups;
            if (filterItem.key === "salaryModel") filterItem.settings.options = categorySalaryModelsData.getAllSalaryModels;
            return filterItem;
        }));
    }, [categorySalaryModelsData]);

    const getSavedFilterById = async (id) => {
        const response = await getSavedFilter({variables: {id}});
        return response?.data?.getSavedFilter ? getFilterArray(response?.data?.getSavedFilter) : null;
    };

    const deleteSavedFilter = async (ids) => {
        await deleteSavedFilterMutation({variables: {ids}});
        enqueueSnackbar('Delete successfull!');
    }

    const getRelationships = (key, value) => {
        const queryMapper = {
            categories: "getCategories",
            advertismentAssets: "getAdvertismentAssets",
            trackingTypes: "getTrackingTypes",
            targetGroups: "getTargetGroups",
            salaryModel: "getSalaryModels",
        }
        return categorySalaryModelsData && value?.map(valueItem => categorySalaryModelsData[queryMapper[key]].find(item => item.id === valueItem));
    }

    // to render by value type
    const savedFiltersTypeMapperObject = {
        id: "text",
        title: "text",
        searchValue: "text",
        description: "string",
        provisionInPercent: "range",
        earningsPerSale: "range",
        averageSalesPrice: "range",
        performance: "range",
        processing_time: "range",
        cartConversionInPercent: "range",
        cancellationRateInPercent: "range",
        categories: "category",
        processingTime: "range",
        advertismentAssets: "category",
        targetGroups: "category",
        trackingTypes: "category",
        salaryModel: "category",
        directActivation: "options",
    };

    const mapSavedFiltersTypes = (savedFilters) => {
        return savedFilters.map(savedFilterItem => {
            let mappedFilterItem = {};
            Object.keys(savedFilterItem).forEach(itemKey => {
                if (["id", "title", "description", "searchValue"].includes(itemKey)) {
                    mappedFilterItem[itemKey] = savedFilterItem[itemKey];
                    return;
                }
                let relationship = {};
                if (savedFiltersTypeMapperObject[itemKey] === "categories") {
                    // TODO: map relationships
                    relationship = {value: getRelationships(itemKey, savedFilterItem[itemKey].value)};
                }
                mappedFilterItem[itemKey] = {
                    ...savedFilterItem[itemKey],
                    type: savedFiltersTypeMapperObject[itemKey], ...relationship
                };
            })
            return _.pick(mappedFilterItem, Object.keys(savedFiltersTypeMapperObject));
        });
    }

    const _getFilterItemValue = (filterItem, value) => {
        if (filterItem.type === "range") return value?.length ? value : [filterItem.settings.min, filterItem.settings.max];
        if (filterItem.type === "options") return value ?? filterItem.settings.options[0].value;
        if (filterItem.type === "category") return value?.length ? value.map(item => item.id) : [];
        return [];
    }

    const getFilterArray = (filterObject) => {
        return filtersList.map(filterItem => {
            const {title, key, type} = filterItem;
            const {showEmpty, value} = filterObject[key];
            return {title, key, type, showEmpty, value: _getFilterItemValue(filterItem, value)}
        });
    };

    return {
        savedFilters,
        getSavedFilterById,
        emptyData: !(!!data?.getSavedFilters?.items?.length),
        loading,
        page,
        setPage,
        searchValue,
        setSearchValue,
        total,
        deleteSavedFilter,
        filtersList,
        getFilterArray
    }
}