import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_CAMPAIGNSUPPORTCATEGORIES_WITH_NUMBERS} from "@schemas/campaignSupportCategory";

export const useGetAllWithNumbers = () => {
    const {refetch, loading, error, data, called, networkStatus} = useQuery(GET_CAMPAIGNSUPPORTCATEGORIES_WITH_NUMBERS);

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([]);
        if (data) {
            setItems(data.getCampaignSupportCategoryWithNumbers);
        }
    }, [data]);

    return {
        items,
        loading
    }
};