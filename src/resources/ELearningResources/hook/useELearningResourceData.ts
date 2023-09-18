import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_ELEARNINGRESOURCE, GET_ELEARNINGRESOURCES, CREATE_ELEARNINGRESOURCE, UPDATE_ELEARNINGRESOURCE } from "@schemas/eLearningResources";
import { useSnackbar } from "my-lib"

export const useELearningResourceData = (meta = {direction: 1, sortBy: "name", limit: 10, filters: []}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const refetchingOptions = [{
        query: GET_ELEARNINGRESOURCES,
        variables: {
            meta: {
                ...meta,
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }
        }
    }];

    const {refetch, loading, error, data, called, networkStatus} = useQuery(GET_ELEARNINGRESOURCES, {
        variables: {
            meta: {
                ...meta,
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }
        }
    });

    const [deleteMutation, {deleteErrors}] = useMutation(DELETE_ELEARNINGRESOURCE, {
        refetchQueries: refetchingOptions
    });

    const refetchItems = async () => {
        // refetch with new page
        await refetch({
            meta: {
                ...meta,
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }})
    }

    useEffect(() => {
        // reset eLearningResources
        setItems([]);
        if (data) {
            setTotal(data.getELearningResources.pageInfo.total);
            setItems(data.getELearningResources.items);
        }
    }, [data]);

    useEffect( () => {
        if (data) {
            const refetch = async () => {
                await refetchItems()
            }
            refetch()
        }
    }, [order, orderBy, rowsPerPage, limit, page, searchValue]);

    const fetchNext = async (param) => {
        if (loading) return;
        setPage(page + 1);
    };

    const deleteItems = async (ids) => {
        await deleteMutation({variables: {ids}});
        enqueueSnackbar('Delete successfull!');
    }

    return {
        items,
        page,
        setPage,
        loading,
        called,
        total,
        searchValue,
        setSearchValue,
        emptyData: !(!!data?.getELearningResources?.items?.length),
        order,
        orderBy,
        setOrderBy,
        setOrder,
        setLimit,
        rowsPerPage,
        setRowsPerPage,
        deleteItems,
        createMutation: CREATE_ELEARNINGRESOURCE,
        editMutation: UPDATE_ELEARNINGRESOURCE,
        refetchingOptions
    }
}
