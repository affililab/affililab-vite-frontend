import {
    gql
} from "@apollo/client";

export const GET_TRACKINGTYPES = gql`
    query GET_TRACKINGTYPES ($meta: IndexMeta) {
        getTrackingTypes(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
                approved
            }
        }
    }
`;

export const GET_TRACKINGTYPES_BY_IDS =  gql`
    query GET_TRACKINGTYPES_BY_IDS($ids: [ID]) {
        getTrackingTypesByIds(ids: $ids) {
            id
            title
            description
            approved
        }
    }
`;

export const GET_TRACKINGTYPE = gql`
    query GET_TRACKINGTYPE($id: String!) {
        getTrackingType (id: $id) {
            id
            title
            description
            approved
        }
    }
`;

export const CREATE_TRACKINGTYPE = gql`
    mutation createTrackingType(
        $title: String,
        $description: String,
        $approved: Boolean,
) {
        createTrackingType(payload: {
            title: $title,
            description: $description,
            approved: $approved,
        }
    ) {
            id
            title
            description
            approved
        }
    }
`;

export const UPDATE_TRACKINGTYPE = gql`
    mutation updateTrackingType(
        $id: ID!,
        $title: String,
        $description: String,
        $approved: Boolean,
    ) {
        updateTrackingType(
            id: $id,
            payload: {
                title: $title,
                description: $description,
                approved: $approved,
            }
        ) {
            id
            title
            description
            approved
        }
    }
`;

export const DELETE_TRACKINGTYPE = gql`
    mutation deleteTrackingType($ids: [ID]!) {
        deleteTrackingType(ids: $ids) {
            successful
        }
    }
`;