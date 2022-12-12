import {useLazyQuery} from "@apollo/client";
import {GET_PRODUCTS} from "@schemas/payment";

export const useProducts = () => {
    const [getProducts, {loading, error, data, called}] = useLazyQuery(GET_PRODUCTS);

    return {
        getProducts,
        data,
        loading
    }
}