import {
    gql
} from "@apollo/client";

export const GET_ALL_CATEGORY_GROUPS = gql`
    query GET_ALL_CATEGORY_GROUPS {
        getAllCategoryGroups {
                id
                title
                cover              
                categories {
                    id
                    title
                }
                description
                totalPartnerPrograms
        }
    }
`;

export const GET_CATEGORYGROUPS = gql`
    query GET_CATEGORYGROUPS ($meta: IndexMeta) {
        getCategoryGroups(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
                shortDescription
                cover
                approved
            }
        }
    }
`;

export const GET_CATEGORYGROUPS_BY_IDS =  gql`
    query GET_CATEGORYGROUPS_BY_IDS($ids: [ID]) {
        getCategoryGroupsByIds(ids: $ids) {
            id
            title
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const GET_CATEGORYGROUP = gql`
    query GET_CATEGORYGROUP($id: String!) {
        getCategoryGroup (id: $id) {
            id
            title
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const CREATE_CATEGORYGROUP = gql`
    mutation createCategoryGroup(
        $title: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createCategoryGroup(payload: {
            title: $title,
            description: $description,
            shortDescription: $shortDescription,
            cover: $cover,
            approved: $approved,
        }
    ) {
            id
            title
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const UPDATE_CATEGORYGROUP = gql`
    mutation updateCategoryGroup(
        $id: ID!,
        $title: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateCategoryGroup(
            id: $id,
            payload: {
                title: $title,
                description: $description,
                shortDescription: $shortDescription,
                cover: $cover,
                approved: $approved,
            }
        ) {
            id
            title
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const DELETE_CATEGORYGROUP = gql`
    mutation deleteCategoryGroup($ids: [ID]!) {
        deleteCategoryGroup(ids: $ids) {
            successful
        }
    }
`;