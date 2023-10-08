import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    CREATE_CAMPAIGN,
    CREATE_TOOLTYPE,
    DELETE_CAMPAIGN, GET_CAMPAIGN,
    GET_CAMPAIGNS,
    UPDATE_CAMPAIGN,
    UPDATE_TOOLTYPE
} from "@schemas";
import {useSnackbar} from "my-lib";

export const useDataItem = (itemId: string) => {

    const { enqueueSnackbar } = useSnackbar();
    const [item, setItem] = useState([]);


    const refetchingOptions = [{ query: GET_CAMPAIGN, variables: { id: itemId }}];

    const {refetch, loading, error, data, called, networkStatus} = useQuery(
        GET_CAMPAIGN, { variables: { id: itemId } }
    );

    const [deleteMutation, {deleteErrors}] = useMutation(DELETE_CAMPAIGN, {
        refetchQueries: refetchingOptions
    });

    const refetchItems = async () => {
        return await refetch({ id: itemId });
    };

    useEffect( () => {
        const refetch = async () => {
            const { data } = await refetchItems();
            console.log("campaign", data.getCampaign);
            setItem(data.getCampaign);
        }
        refetch()
    }, [itemId]);

    useEffect(() => {
        setItem(data?.getCampaign);
    }, [data])

    const deleteItems = async (ids: any[]) => {
        await deleteMutation({variables: {ids}});
        enqueueSnackbar('Delete successfull!');
    }
    return {
        item,
        loading,
        called,
        deleteItems,
        refetchingOptions,
        createMutation: CREATE_CAMPAIGN,
        editMutation: UPDATE_CAMPAIGN
    }
};