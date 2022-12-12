import {
    gql
} from "@apollo/client";

export const GET_ADVERTISINGTYPES = gql`
    query GET_ADVERTISINGTYPES ($meta: IndexMeta) {
        getAdvertisingTypes(meta: $meta) {
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
                approved
            }
        }
    }
`;

export const GET_ADVERTISINGTYPES_BY_IDS =  gql`
    query GET_ADVERTISINGTYPES_BY_IDS($ids: [ID]) {
        getAdvertisingTypesByIds(ids: $ids) {
            id
            title
            icon
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const GET_ADVERTISINGTYPE = gql`
    query GET_ADVERTISINGTYPE($id: String!) {
        getAdvertisingType (id: $id) {
            id
            title
            icon
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const CREATE_ADVERTISINGTYPE = gql`
    mutation createAdvertisingType(
        $title: String,
        $icon: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createAdvertisingType(payload: {
            title: $title,
            icon: $icon,
            description: $description,
            shortDescription: $shortDescription,
            cover: $cover,
            approved: $approved,
        }
    ) {
            id
            title
            icon
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const UPDATE_ADVERTISINGTYPE = gql`
    mutation updateAdvertisingType(
        $id: ID!,
        $title: String,
        $icon: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateAdvertisingType(
            id: $id,
            payload: {
                title: $title,
                icon: $icon,
                description: $description,
                shortDescription: $shortDescription,
                cover: $cover,
                approved: $approved,
            }
        ) {
            id
            title
            icon
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const DELETE_ADVERTISINGTYPE = gql`
    mutation deleteAdvertisingType($ids: [ID]!) {
        deleteAdvertisingType(ids: $ids) {
            successful
        }
    }
`;