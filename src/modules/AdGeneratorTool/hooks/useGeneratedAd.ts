import {useLazyQuery} from "@apollo/client";
import {GET_GENERATED_AD} from "@schemas/adGeneration";

export const useGeneratedAd = () => {
    const [getGeneratedAdLQuery] = useLazyQuery(GET_GENERATED_AD);

    const getGeneratedAd = async (productId: string, targetGroupIds: string[]) => {
        const response = await getGeneratedAdLQuery({variables: {data: {productId, targetGroupIds}}});
        return response.data.getAdGeneration;
    };

    return {
        getGeneratedAd
    }
};
