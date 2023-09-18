import {
    gql
} from "@apollo/client";

export const GET_TOOLTYPES = gql`
    query GET_TOOLTYPES ($meta: IndexMeta) {
        getToolTypes(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
                cover
                approved
            }
        }
    }
`;

export const GET_ALL_TOOLTYPES = gql`
    query GET_ALL_TOOLTYPES {
        getAllTooltypes {
                id
                title               
                description               
                cover
        }
    }
`;

export const GET_TOOLTYPES_BY_IDS =  gql`
    query GET_TOOLTYPES_BY_IDS($ids: [ID]) {
        getToolTypesByIds(ids: $ids) {
            id
            title
            description
            cover
            approved
        }
    }
`

export const GET_TOOLTYPE = gql`
    query GET_TOOLTYPE($id: String!) {
        getToolType (id: $id) {
            id
T            title
            description
            cover
            approved
        }
    }
`

export const CREATE_TOOLTYPE = gql`
    mutation createToolType(
        $title: String,
        $description: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createToolType(payload: {
            title: $title,
            description: $description,
            cover: $cover,
            approved: $approved,
        }
    ) {
            id
            title
            description
            cover
            approved
        }
    }
`

export const UPDATE_TOOLTYPE = gql`
    mutation updateToolType(
        $id: ID!,
        $title: String,
        $description: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateToolType(
            id: $id,
            payload: {
                title: $title,
                description: $description,
                cover: $cover,
                approved: $approved,
            }
        ) {
            id
            title
            description
            cover
            approved
        }
    }
`

export const DELETE_TOOLTYPE = gql`
    mutation deleteToolType($ids: [ID]!) {
        deleteToolType(ids: $ids) {
            successful
        }
    }
`