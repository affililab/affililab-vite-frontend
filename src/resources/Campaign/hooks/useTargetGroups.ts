import {useLazyQuery} from "@apollo/client";
import {GET_CAMPAIGN_TARGET_GROUPS} from "@schemas/campaigns";

export const useTargetGroups = (campaignId: string) => {
    const [getCampaignTargetGroupsItems] = useLazyQuery(GET_CAMPAIGN_TARGET_GROUPS);

    const getTargetGroups = async () => {
        const response = await getCampaignTargetGroupsItems({variables: { id: campaignId }});
        return response.data.getCampaignTargetGroups;
    }

    return {
        getTargetGroups
    }
}