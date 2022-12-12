import {
    gql
} from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
    query GET_ALL_CATEGORIES {
        getAllCategories {
                id
                title
                icon
                description
                cover
                approved
        }
    }
`;

export const GET_CATEGORIES = gql`
    query GET_CATEGORIES ($meta: IndexMeta) {
        getCategories(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                icon
                description
                categoryGroup {
                    id
                    title
                    description
                }
                cover
                approved
            }
        }
    }
`;

export const GET_CATEGORIES_BY_IDS =  gql`
    query GET_CATEGORIES_BY_IDS($ids: [ID]) {
        getCategoriesByIds(ids: $ids) {
            id
            title
            icon
            description
            cover
            categoryGroup {
                id
                title
                description
            }
            approved
        }
    }
`;

export const GET_CATEGORY = gql`
    query GET_CATEGORY($id: String!) {
        getCategory (id: $id) {
            id
            title
            icon
            description
            cover
            categoryGroup {
                id
                title
                description
            }
            approved
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation createCategory(
        $title: String,
        $icon: String,
        $description: String,
        $cover: Upload,
        $categoryGroup: ID,
        $approved: Boolean,
) {
        createCategory(payload: {
            title: $title,
            icon: $icon,
            description: $description,
            cover: $cover,
            categoryGroup: $categoryGroup,
            approved: $approved,
        }
    ) {
            id
            title
            icon
            description
            cover
            categoryGroup {
                id
                title
                description
            }
            approved
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation updateCategory(
        $id: ID!,
        $title: String,
        $icon: String,
        $description: String,
        $cover: Upload,
        $categoryGroup: ID,
        $approved: Boolean,
    ) {
        updateCategory(
            id: $id,
            payload: {
                title: $title,
                icon: $icon,
                description: $description,
                cover: $cover,
                categoryGroup: $categoryGroup,
                approved: $approved,
            }
        ) {
            id
            title
            icon
            description
            cover
            categoryGroup {
                id
                title
                description
            }
            approved
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($ids: [ID]!) {
        deleteCategory(ids: $ids) {
            successful
        }
    }
`;