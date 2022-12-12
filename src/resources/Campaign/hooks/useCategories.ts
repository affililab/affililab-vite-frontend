import {useLazyQuery} from "@apollo/client";
import {GET_CAMPAIGN_CATEGORIES} from "@schemas";

export const useCategories = (campaignId: string) => {
    const [getCampaignCategoriesItems] = useLazyQuery(GET_CAMPAIGN_CATEGORIES);

    const getCategories = async () => {
        const response = await getCampaignCategoriesItems({variables: { id: campaignId }});
        return response.data.getCampaignCategories;
    }

    return {
        getCategories
    }
};