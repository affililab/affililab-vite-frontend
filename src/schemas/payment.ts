import {gql} from "@apollo/client";

export const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
           name
           description
            prices {
                id
                active 
                billing_scheme
                currency
                unit_amount
                recurring {
                    interval
                    interval_count
                    usage_type
                    type
                    unit_amount
                }
            }
        }
    }
`;