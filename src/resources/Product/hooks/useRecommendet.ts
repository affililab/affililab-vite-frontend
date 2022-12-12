import {useLazyQuery} from "@apollo/client";
import {GET_RECOMMENDET_PARTNER_PROGRAMS, GET_RECOMMENDET_PARTNER_PROGRAMS_BY_CAMPAIGN} from "@schemas/partnerProgram";

export const useRecommendet = () => {
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

    return {
        getRecommendet,
        getRecommendetByCampaign
    }
}