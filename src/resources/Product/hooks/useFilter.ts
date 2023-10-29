import React, {useEffect, useState} from "react"

export const useFilter = (categorySalaryModelsData) => {

    // search
    const [searchValue, setSearchValue] = useState("");
    const [activeFilterCount, setActiveFilterCount] = useState(0);

    const [filtersList, setFiltersList] = useState([
        {
            title: "Provisionen %",
            key: "commissionInPercent",
            type: "range",
            showEmpty: true,
            settings: {
                type: "percent",
                min: 0,
                max: 100
            }
        },
        // {
        //     title: "Verdienst pro Verkauf",
        //     key: "earningsPerSale",
        //     type: "range",
        //     showEmpty: true,
        //     settings: {
        //         type: "price",
        //         min: 0,
        //         max: 1000
        //     }
        // },
        // {
        //     title: "Durchscnittlicher Verkaufspreis",
        //     key: "averageSalesPrice",
        //     type: "range",
        //     showEmpty: true,
        //     settings: {
        //         type: "price",
        //         min: 0,
        //         max: 12000
        //     }
        // },
        // {
        //     title: "Popularität",
        //     key: "performance",
        //     type: "range",
        //     showEmpty: true,
        //     settings: {
        //         type: "number",
        //         min: 0,
        //         max: 5
        //     }
        // },
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
            title: "Bearbeitungszeit",
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
            title: "Rating",
            key: "rating",
            type: "range",
            showEmpty: true,
            settings: {
                type: "number",
                min: 0,
                max: 5
            }
        },
        // {
        //     title: "Cart Conversion",
        //     key: "cartConversionInPercent",
        //     type: "range",
        //     showEmpty: true,
        //     settings: {
        //         type: "percent",
        //         min: 0,
        //         max: 100
        //     }
        // },
        // {
        //     title: "Stornoquote",
        //     key: "cancellationRateInPercent",
        //     type: "range",
        //     showEmpty: true,
        //     settings: {
        //         type: "percent",
        //         min: 0,
        //         max: 100
        //     }
        // },
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
            title: "Werbemittel",
            key: "advertisementAssets",
            type: "category",
            showEmpty: true,
            settings: {
                showTitle: false,
                options: []
            }
        },
        // {
        //     title: "Zielgruppen",
        //     key: "targetGroups",
        //     type: "category",
        //     showEmpty: true,
        //     settings: {
        //         showTitle: false,
        //         options: []
        //     }
        // },
        {
            title: "Tracking",
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
            key: "revenueType",
            type: "category",
            showEmpty: true,
            settings: {
                showTitle: false,
                options: []
            }
        },
        {
            title: "Sofortige Freischaltung",
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

    useEffect(() => {
        activeFilters(filter)
    }, [filter]);


    /* useEffects filter */
    useEffect(() => {
        if (!categorySalaryModelsData) return;
        setFiltersList(filtersList.map(filterItem => {
            if (!["categories", "salaryModel", "advertisementAssets", "trackingTypes", "targetGroups", "directActivation"].includes(filterItem.key)) return filterItem;
            if (filterItem.key === "categories") filterItem.settings.options = categorySalaryModelsData.getAllCategories;
            if (filterItem.key === "advertisementAssets") filterItem.settings.options = categorySalaryModelsData.getAllAdvertisementAssets;
            if (filterItem.key === "trackingTypes") filterItem.settings.options = categorySalaryModelsData.getAllTrackingTypes;
            if (filterItem.key === "targetGroups") filterItem.settings.options = categorySalaryModelsData.getAllTargetGroups;
            if (filterItem.key === "salaryModel") filterItem.settings.options = categorySalaryModelsData.getAllSalaryModels;
            return filterItem;
        }));
    }, [categorySalaryModelsData]);


    const applyFilter = (filter) => {
        setFilter(filter);
    }

    const resetFilter = () => {
        setFilter(filtersList.map(filterItem => ({
            key: filterItem.key,
            type: filterItem.type,
            showEmpty: filterItem.showEmpty,
            value:  filterItem.type === "range" ? [filterItem.settings.min, filterItem.settings.max] : filterItem.type === "options" ? 0 : []
        })));
    }

    const resetAll = () => {
        setFilter(filtersList.map(filterItem => ({
            key: filterItem.key,
            type: filterItem.type,
            showEmpty: filterItem.showEmpty,
            value:  filterItem.type === "range" ? [filterItem.settings.min, filterItem.settings.max] : filterItem.type === "options" ? 0 : []
        })));
        setSearchValue("");
    };

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
            value: 0
        }));
        const searchValueFilter = {searchParam: "title", searchQuery: searchValue};

        // console.log("filter", filter, [...rangeFilter, ...multiSelectFilter, searchValueFilter, ...optionsFilter], filter[0]);

        return [...rangeFilter, ...multiSelectFilter, searchValueFilter, ...optionsFilter];
    };

    // count filters
    const activeFilters = (filter) => {
        let filterChanges = 0;
        filter.forEach(filterItem => {
            const defaultFilter = filtersList.find(filtersListItem => filtersListItem.key === filterItem.key);
            if (!defaultFilter) return;
            if (defaultFilter.type === "range") {
                if(JSON.stringify(filterItem.value) !== JSON.stringify([defaultFilter.settings.min, defaultFilter.settings.max])) filterChanges += 1;
                return;
            }
            if (defaultFilter.type === "options") {
              if(filterItem.value !== defaultFilter.value) filterChanges += 1;
              return;
            }
            if(JSON.stringify(filterItem.value) !== JSON.stringify([])) filterChanges += 1;
        })
        setActiveFilterCount(filterChanges)
    }

    return { resetFilter, resetAll, getGraphQlFilters, applyFilter, setFiltersList, filtersList, filter, searchValue, setSearchValue, activeFilterCount }

}