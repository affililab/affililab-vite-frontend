import {useCallback, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_PARTNERPROGRAMS} from "@schemas/partnerProgram";

export const usePartnerPrograms: any = (resetScroll, getGraphQlFilters, direction, sortBy, limit = 2) => {

    const [partnerprograms, setPartnerprograms] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);

    const getInitialQueryVariables = useCallback(() => ({
        variables: { meta: { page, direction, sortBy, limit, filters: getGraphQlFilters() }}
    }), []);

    const {refetch, loading, error, data, networkStatus, called} = useQuery(GET_PARTNERPROGRAMS, getInitialQueryVariables());

    // set partnerprograms at new data
    useEffect(() => {
        if (data) setTotal(data.getPartnerPrograms.pageInfo.total);
        if (data) setPartnerprograms(data.getPartnerPrograms.pageInfo.page > 0 ? [...partnerprograms, ...data.getPartnerPrograms.items] : data.getPartnerPrograms.items);
    }, [data]);

    const refreshPartnerprograms = async (pSortBy) => {

        setPage(0);

        // reset scroll
        resetScroll();

        await refetch({ meta: {
                page: 0,
                direction: direction,
                sortBy: pSortBy ? pSortBy : sortBy,
                limit: limit,
                filters: getGraphQlFilters()
            }
        });
    };

    const fetchNext = async (param) => {
        if (loading) return;
        await refetch({ meta : { page: page + 1, direction, sortBy, limit, filters: getGraphQlFilters()} });
        setPage(page + 1);
    };

    return {
        refreshPartnerprograms,
        fetchNext,
        called,
        loading,
        partnerprograms,
        data,
        setPartnerprograms,
        total,
        setTotal,
        page,
        setPage
    }
}