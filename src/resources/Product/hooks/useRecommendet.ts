import {useLazyQuery} from "@apollo/client";
import {GET_RECOMMENDET_PARTNER_PROGRAMS, GET_RECOMMENDET_PARTNER_PROGRAMS_BY_CAMPAIGN} from "@schemas/partnerProgram";
import {GET_RECOMMENDATION_BY_PREFERENCES} from "@schemas";

export const useRecommendet = () => {
    const [getRecommendedByPreferencesItems] = useLazyQuery(GET_RECOMMENDATION_BY_PREFERENCES);
    const [getRecommendetItems] = useLazyQuery(GET_RECOMMENDET_PARTNER_PROGRAMS);
    const [getRecommendetByCampaignItems] = useLazyQuery(GET_RECOMMENDET_PARTNER_PROGRAMS_BY_CAMPAIGN);

    const getRecommendet = async () => {
        const response = await getRecommendetItems();
        return response.data.getRecommendetPartnerPrograms;
    }

    const getRecommendetByCampaign = async (id) => {
        const response = await getRecommendetByCampaignItems({variables: { id }});
        return response.data.getRecommendetPartnerProgramsByCampaign;
    }

    const getRecommendedByPreferences = async (categoryGroups: string[], campaignSupportCategories: string[], tools: string[], marketingChannels: string[]) => {
        const response = await getRecommendedByPreferencesItems({variables: { categoryGroups, campaignSupportCategories, tools, marketingChannels }});
        return response.data.getRecommendationsByPreferences;
    }

    return {
        getRecommendet,
        getRecommendetByCampaign,
        getRecommendedByPreferences
    }
}