import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_PARTNERPROGRAMS, GET_PARTNERPROGRAMS_BY_IDS} from "@schemas/partnerProgram";

export const usePartnerPrograms = (resetScroll = false, filter = {}, getGraphQlFilters = () => [], selectedIds = [], direction = 1, sortBy = "createdAt", limit = 10) => {

    const [partnerprograms, setPartnerprograms] = useState([]);
    const [selectedPartnerPrograms, setSelectedPartnerPrograms] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        return () => {
            setPartnerprograms([]);
        }
    }, []);

    const getInitialQueryVariables = () => ({
        variables: { meta: { page, direction, sortBy, limit, filters: [...getGraphQlFilters(), { searchParam: "title", searchQuery: searchValue }]} }
    });

    const {refetch, loading, error, data, networkStatus} = useQuery(GET_PARTNERPROGRAMS, getInitialQueryVariables());
    const {refetch: refetchSelected, loading: loadingSelected, error: errorSelected, data: dataSelected, networkStatus: networkStatusSelected} = useQuery(GET_PARTNERPROGRAMS_BY_IDS, { variables: { ids: [] } });

    const refetchPartnerPrograms = async () => {
        // reset partnerprograms
        setPartnerprograms([]);
        // refetch with new page
        await refetch({meta: { page, direction, sortBy, limit, filters: [...getGraphQlFilters(), { searchParam: "title", searchQuery: searchValue }]}})
    }

    useEffect( () => {
        const refetch = async () => {
            await refetchPartnerPrograms()
        }
        refetch()
    }, [limit, page]);

    // set partnerprograms at new data
    useEffect(() => {
        if (data) setTotal(data.getPartnerPrograms.pageInfo.total);
        if (data) setPartnerprograms(data.getPartnerPrograms.items);
    }, [data]);

    const refreshPartnerprograms = async (pSortBy) => {
        setPage(0);
        // reset scroll
        resetScroll();

        await refetch({
            page: 0,
            direction: direction,
            sortBy: pSortBy ? pSortBy : sortBy,
            limit: limit,
            filters: getGraphQlFilters()
        });
    };

    const fetchNext = async (param) => {
        if (loading) return;
        await refetch({page: page + 1, direction, sortBy, limit, filters: [...getGraphQlFilters(), { searchParam: "title", searchQuery: searchValue }]});
        setPage(page + 1);
    };

    return {
        refreshPartnerprograms,
        fetchNext,
        loading,
        loadingSelected,
        selectedPartnerPrograms,
        emptyData: !(!!data?.getPartnerPrograms?.items?.length),
        partnerprograms,
        setPartnerprograms,
        total,
        setTotal,
        searchValue,
        setSearchValue,
        page,
        setPage
    }
}