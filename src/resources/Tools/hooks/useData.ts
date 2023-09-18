import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_TOOL, GET_TOOLS, CREATE_TOOL, UPDATE_TOOL } from "@schemas/tools";
import { useSnackbar } from "my-lib"

export const useData = (meta = {direction: 1, sortBy: "title", limit: 5, filters: []}) => {

    const { enqueueSnackbar } = useSnackbar();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [rowsPerPage, setRowsPerPage] = useState(meta.limit);

    const refetchingOptions = [{
        query: GET_TOOLS,
        variables: {
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage },
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }
        }
    }];

    const {refetch, loading, error, data, called, networkStatus} = useQuery(GET_TOOLS, {
        variables: {
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage },
                page,
                filters: [...meta?.filters, {searchParam: "title", searchQuery: searchValue}]
            }
        }
    });

    const [deleteMutation, {deleteErrors}] = useMutation(DELETE_TOOL, {
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

    useEffect( () => {
        const refetch = async () => {
            const { data } = await refetchItems();

            setItems([]);
            setTotal(data.getTools.pageInfo.total);
            setItems(data.getTools.items);
        }
        refetch()
    }, [order, orderBy, rowsPerPage, searchValue]);

    useEffect( () => {
        const refetch = async () => {
            const { data } = await refetchItems();
            setTotal(data.getTools.pageInfo.total);
            if (data?.getTools?.items) setItems([...items, ...data.getTools.items]);
        }
        refetch()
    }, [page]);

    const fetchNext = async () => {
        if (loading) return;
        console.log("page", page + 1);
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
        emptyData: !(!!data?.getTools?.items?.length),
        order,
        orderBy,
        setOrderBy,
        setOrder,
        rowsPerPage,
        setRowsPerPage,
        deleteItems,
        createMutation: CREATE_TOOL,
        editMutation: UPDATE_TOOL,
        refetchingOptions,
        fetchNext
    }
}
