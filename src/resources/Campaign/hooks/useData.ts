import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_CAMPAIGN, DELETE_CAMPAIGN, GET_CAMPAIGNS, UPDATE_CAMPAIGN} from "@schemas";
import {useSnackbar} from "my-lib";

export const useData = (meta = {direction: 1, sortBy: "createdAt", limit: 10, filters: []}) => {

    const { enqueueSnackbar } = useSnackbar();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('createdAt');
    const [rowsPerPage, setRowsPerPage] = useState(meta.limit);

    const refetchingOptions = [{
        query: GET_CAMPAIGNS,
        variables: {
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage },
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }
        }
    }];

    const {refetch, loading, error, data, called, networkStatus} = useQuery(GET_CAMPAIGNS, {
        variables: {
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage },
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }
        }
    });

    const [deleteMutation, {deleteErrors}] = useMutation(DELETE_CAMPAIGN, {
        refetchQueries: refetchingOptions
    });

    const refetchItems = async () => {
        // refetch with new page
        return await refetch({
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage },
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }})
    };

    useEffect(() => {
        // reset items
        if (data) {
            setTotal(data.getCampaigns.pageInfo.total);
            setItems(data.getCampaigns.items);
        }
    }, [data]);

    useEffect( () => {
        const refetch = async () => {
            await refetchItems()
        }
        refetch()
    }, [order, orderBy, rowsPerPage, limit, page, searchValue]);

    const deleteItems = async (ids: any[]) => {
        await deleteMutation({variables: {ids}});
        enqueueSnackbar('Delete successfull!');
    }

    const fetchNext = async () => {
        if (loading) return;
        setPage(page + 1);
    };

    return {
        items,
        page,
        setPage,
        loading,
        called,
        total,
        searchValue,
        setSearchValue,
        emptyData: !(!!data?.getCampaigns?.items?.length),
        limit,
        setLimit,
        order,
        orderBy,
        setOrderBy,
        setOrder,
        rowsPerPage,
        setRowsPerPage,
        deleteItems,
        createMutation: CREATE_CAMPAIGN,
        editMutation: UPDATE_CAMPAIGN,
        refetchingOptions,
        fetchNext
    }
};