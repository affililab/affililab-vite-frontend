import { useQuery } from "@apollo/client";
import {GET_ALL_CATEGORY_GROUPS} from "@schemas/categoryGroup";
import {useEffect, useState} from "react";

export const useGetAllWithNumbers = () => {
    const {refetch, loading, error, data, called, networkStatus} = useQuery(GET_ALL_CATEGORY_GROUPS);

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([]);
        if (data) {
            setItems(data.getAllCategoryGroups);
        }
    }, [data]);

    return {
        items,
        loading
    }
}