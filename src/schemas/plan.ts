import {
    gql
} from "@apollo/client";

export const GET_PLANS = gql`
    query GET_PLANS ($meta: IndexMeta) {
        getPlans(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
                shortDescription
                monthlyPrice
                yearlyPrice
                features {
                    amount
                    title
                    disabled
                }
            }
        }
    }
`;

export const GET_ALL_PLANS = gql`
    query GET_ALL_PLANS {
        getAllPlans {
            id
            title
            description
            shortDescription
            monthlyPrice
            yearlyPrice
            features {
                amount
                title
                disabled
            }
        }
    }
`;

export const GET_PLANS_BY_IDS =  gql`
    query GET_PLANS_BY_IDS($ids: [ID]) {
        getPlansByIds(ids: $ids) {
            id
            title
            description
            shortDescription
            monthlyPrice
            yearlyPrice
            features {
                amount
                title
                disabled
            }
        }
    }
`;

export const GET_PLAN = gql`
    query GET_PLAN($id: String!) {
        getPlan (id: $id) {
            id
            title
            description
            shortDescription
            monthlyPrice
            yearlyPrice
            features {
                amount
                title
                disabled
            }
        }
    }
`;

export const CREATE_PLAN = gql`
    mutation createPlan(
        $title: String,
        $description: String,
        $shortDescription: String,
        $monthlyPrice: Float,
        $yearlyPrice: Float,
        $features: [PlanFeatureInput],
    ) {
        createPlan(payload: {
            title: $title,
            description: $description,
            shortDescription: $shortDescription,
            monthlyPrice: $monthlyPrice,
            yearlyPrice: $yearlyPrice,
            features: $features,
        }
        ) {
            id
            title
            description
            shortDescription
            monthlyPrice
            yearlyPrice
            features {
                amount
                title
                disabled
            }
        }
    }
`;

export const UPDATE_PLAN = gql`
    mutation updatePlan(
        $id: ID!,
        $title: String,
        $description: String,
        $shortDescription: String,
        $monthlyPrice: Float,
        $yearlyPrice: Float,
        $features: [PlanFeatureInput],
    ) {
        updatePlan(
            id: $id,
            payload: {
                title: $title,
                description: $description,
                shortDescription: $shortDescription,
                monthlyPrice: $monthlyPrice,
                yearlyPrice: $yearlyPrice,
                features: $features
            }
        ) {
            id
            title
            description
            shortDescription
            monthlyPrice
            yearlyPrice
            features {
                amount
                title
                disabled
            }
        }
    }
`;

export const DELETE_PLAN = gql`
    mutation deletePlan($ids: [ID]!) {
        deletePlan(ids: $ids) {
            successful
        }
    }
`;