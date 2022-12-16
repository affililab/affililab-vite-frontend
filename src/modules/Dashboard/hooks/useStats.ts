import {useQuery} from "@apollo/client";
import {GET_STATS} from "@schemas";

export const useStats = () => {
    const {refetch, loading, error, data, called, networkStatus} = useQuery(GET_STATS);

    return {
        data,
        loading
    }
}