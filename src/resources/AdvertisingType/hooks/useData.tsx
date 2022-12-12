import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_ADVERTISINGTYPE, GET_ADVERTISINGTYPES, CREATE_ADVERTISINGTYPE, UPDATE_ADVERTISINGTYPE } from "@schemas/advertisingType";
import { useSnackbar } from "my-lib"

export const useData = (meta = {direction: 1, sortBy: "name", limit: 10, filters: []}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const refetchingOptions = [{
        query: GET_ADVERTISINGTYPES,
        variables: {
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage, filters: [] },
                page,
                filters: [{searchParam: "title", searchQuery: searchValue}]
            }
        }
    }];

    const {refetch, loading, error, data, called, networkStatus} = useQuery(GET_ADVERTISINGTYPES, {
        variables: {
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage, filters: [] },
                page,
                filters: [{searchParam: "title", searchQuery: searchValue}]
            }
        }
    });

    const [deleteMutation, {deleteErrors}] = useMutation(DELETE_ADVERTISINGTYPE, {
        refetchQueries: refetchingOptions
    });

    const refetchELearningResources = async () => {
        // refetch with new page
        await refetch({
            meta: {
                ...meta,
                ...{direction: order === "asc" ? 1 : -1, sortBy: orderBy, limit: rowsPerPage, filters: [] },
                page,
                filters: [{searchParam: "title", searchQuery: searchValue}]
            }})
    }

    useEffect(() => {
        // reset eLearningResources
        setItems([]);
        if (data) {
            setTotal(data.getAdvertisingTypes.pageInfo.total);
            setItems(data.getAdvertisingTypes.items);
        }
    }, [data]);

    useEffect( () => {
        const refetch = async () => {
            await refetchELearningResources()
        }
        refetch()
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
        order,
        orderBy,
        setOrderBy,
        setOrder,
        setLimit,
        rowsPerPage,
        setRowsPerPage,
        deleteItems,
        createMutation: CREATE_ADVERTISINGTYPE,
        editMutation: UPDATE_ADVERTISINGTYPE,
        refetchingOptions
    }
}
