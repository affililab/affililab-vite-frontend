import {
    gql
} from "@apollo/client";

export const GET_ELEARNINGRESOURCESTYPES = gql`
    query GET_ELEARNINGRESOURCESTYPES ($meta: IndexMeta) {
        getELearningResourcesTypes(meta: $meta) {
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

export const GET_ELEARNINGRESOURCESTYPES_BY_IDS =  gql`
    query GET_ELEARNINGRESOURCESTYPES_BY_IDS($ids: [ID]) {
        getELearningResourcesTypesByIds(ids: $ids) {
            id
            title
            description
            cover
            approved
        }
    }
`;

export const GET_ELEARNINGRESOURCESTYPE = gql`
    query GET_ELEARNINGRESOURCESTYPE($id: String!) {
        getELearningResourcesType (id: $id) {
            id
            title
            description
            cover
            approved
        }
    }
`;

export const CREATE_ELEARNINGRESOURCESTYPE = gql`
    mutation createELearningResourcesType(
        $title: String,
        $description: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createELearningResourcesType(payload: {
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
`;

export const UPDATE_ELEARNINGRESOURCESTYPE = gql`
    mutation updateELearningResourcesType(
        $id: ID!,
        $title: String,
        $description: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateELearningResourcesType(
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
`;

export const DELETE_ELEARNINGRESOURCESTYPE = gql`
    mutation deleteELearningResourcesType($ids: [ID]!) {
        deleteELearningResourcesType(ids: $ids) {
            successful
        }
    }
`;