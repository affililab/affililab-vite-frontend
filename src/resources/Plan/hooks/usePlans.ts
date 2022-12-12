import {useLazyQuery} from "@apollo/client";
import {GET_ALL_PLANS} from "@schemas/plan";

export const usePlans = () => {
    const [getPlans, {loading, error, data, called}] = useLazyQuery(GET_ALL_PLANS);

    return {
        getPlans,
        data,
        loading
    }
};