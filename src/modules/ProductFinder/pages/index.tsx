import React, {useContext, useEffect} from "react";
import {CATEGORIES_SALARYMODELS} from "@schemas/categoriesSalaryModels";
import {useQuery} from "@apollo/client";
import {ProductsListContent} from "../components/ProductsListContent";
import {useFilter} from "@resources/Product/hooks/useFilter";
import {HeaderItemsContext, SearchInput} from "my-lib";

function RightElementsProductFinder() {
    return null;
}

export const IndexPage = () => {

    const { centerItems, setCenterItems, setRightItems } = useContext(HeaderItemsContext);

    /* filter functionality */
    const {data: categorySalaryModelsData} = useQuery(CATEGORIES_SALARYMODELS);
    // get filter hooks
    const filterHook = useFilter(categorySalaryModelsData);

    const {
        searchValue,
        setSearchValue,
    } = filterHook;

    return <>
        <ProductsListContent filterHook={filterHook} />
    </>;
};