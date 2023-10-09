import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    CREATE_CAMPAIGN,
    CREATE_TOOLTYPE,
    DELETE_CAMPAIGN, GET_CAMPAIGN, GET_CAMPAIGN_STATS,
    GET_CAMPAIGNS,
    UPDATE_CAMPAIGN,
    UPDATE_TOOLTYPE
} from "@schemas";
import {useSnackbar} from "my-lib";
import {useProductInteraction} from "@resources/User/hooks/useProductInteraction";

export const useDataItem = (itemId: string) => {

    const { registerInteraction } = useProductInteraction();

    const { enqueueSnackbar } = useSnackbar();
    const [item, setItem] = useState([]);


    const refetchingOptions = [
        { query: GET_CAMPAIGN, variables: { id: itemId }},
        { query: GET_CAMPAIGN_STATS, variables: { id: itemId }}
    ];

    const {refetch, loading, error, data, called, networkStatus} = useQuery(
        GET_CAMPAIGN, { variables: { id: itemId } }
    );

    const [editMutation, { error: updateCampaignError }] = useMutation(UPDATE_CAMPAIGN, {
        refetchQueries: refetchingOptions
    });

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

    const edit = async (resource: {key: string, id: string}, id: string, data: any) => {
        await editMutation({variables: {id, ...data}});
        if (resource.key === 'partnerPrograms') {
            registerInteraction(resource.id, "removed_from_campaign");
        }
        enqueueSnackbar('Edit successfull!');
    };

    return {
        item,
        loading,
        called,
        deleteItems,
        refetchingOptions,
        createMutation: CREATE_CAMPAIGN,
        editMutation: UPDATE_CAMPAIGN,
        edit
    }
};