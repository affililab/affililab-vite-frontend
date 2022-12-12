import {useLazyQuery} from "@apollo/client";
import {GET_CAMPAIGN_STATS} from "@schemas/campaigns";

export const useStats = (id: string) => {
    const [getStats, {loading, error, data, called}] = useLazyQuery(GET_CAMPAIGN_STATS, { variables: { id: id } });

    return {
        getStats,
        data,
        loading
    }
};