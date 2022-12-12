import {
    gql
} from "@apollo/client";


export const GET_ALL_CAMPAIGNSUPPORTCATEGORIES = gql`
    query GET_ALL_CAMPAIGNSUPPORTCATEGORIES {
        getAllCampaignSupportCategories {
                id
                title
                icon
                description
                shortDescription
                cover
        }
    }
`;

export const GET_CAMPAIGNSUPPORTCATEGORIES_WITH_NUMBERS = gql`
    query GET_CAMPAIGNSUPPORTCATEGORIES_WITH_NUMBERS {
        getCampaignSupportCategoryWithNumbers {                      
            id
            title
            icon
            description
            shortDescription
            cover
            totalTools
            totalELearningResources
        }
    }
`;

export const GET_CAMPAIGNSUPPORTCATEGORIES = gql`
    query GET_CAMPAIGNSUPPORTCATEGORIES ($meta: IndexMeta) {
        getCampaignSupportCategories(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                icon
                description
                shortDescription
                cover
            }
        }
    }
`;

export const GET_CAMPAIGNSUPPORTCATEGORIES_BY_IDS =  gql`
    query GET_CAMPAIGNSUPPORTCATEGORIES_BY_IDS($ids: [ID]) {
        getCampaignSupportCategoriesByIds(ids: $ids) {
            id
            title
            icon
            description
            shortDescription
            cover
        }
    }
`;

export const GET_CAMPAIGNSUPPORTCATEGORY = gql`
    query GET_CAMPAIGNSUPPORTCATEGORY($id: String!) {
        getCampaignSupportCategory (id: $id) {
            id
            title
            icon
            description
            shortDescription
            cover
        }
    }
`;

export const CREATE_CAMPAIGNSUPPORTCATEGORY = gql`
    mutation createCampaignSupportCategory(
        $title: String,
        $icon: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
) {
        createCampaignSupportCategory(payload: {
            title: $title,
            icon: $icon,
            description: $description,
            shortDescription: $shortDescription,
            cover: $cover,
        }
    ) {
            id
            title
            icon
            description
            shortDescription
            cover
        }
    }
`;

export const UPDATE_CAMPAIGNSUPPORTCATEGORY = gql`
    mutation updateCampaignSupportCategory(
        $id: ID!,
        $title: String,
        $icon: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
    ) {
        updateCampaignSupportCategory(
            id: $id,
            payload: {
                title: $title,
                icon: $icon,
                description: $description,
                shortDescription: $shortDescription,
                cover: $cover,
            }
        ) {
            id
            title
            icon
            description
            shortDescription
            cover
        }
    }
`;

export const DELETE_CAMPAIGNSUPPORTCATEGORY = gql`
    mutation deleteCampaignSupportCategory($ids: [ID]!) {
        deleteCampaignSupportCategory(ids: $ids) {
            successful
        }
    }
`;