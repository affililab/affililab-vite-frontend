import {
    gql
} from "@apollo/client";

export const GET_ALL_TARGETGROUPTYPES = gql`
    query GET_ALL_TARGETGROUPTYPES {
        getAllTargetGroupTypes {
                id
                title
                shortDescription
                description
        }
    }
`;

export const GET_TARGETGROUPTYPES = gql`
    query GET_TARGETGROUPTYPES ($meta: IndexMeta) {
        getTargetGroupTypes(meta: $meta) {
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

export const GET_TARGETGROUPTYPES_BY_IDS =  gql`
    query GET_TARGETGROUPTYPES_BY_IDS($ids: [ID]) {
        getTargetGroupTypesByIds(ids: $ids) {
            id
            title
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const GET_TARGETGROUPTYPE = gql`
    query GET_TARGETGROUPTYPE($id: String!) {
        getTargetGroupType (id: $id) {
            id
            title
            description
            shortDescription
            cover
            approved
        }
    }
`;

export const CREATE_TARGETGROUPTYPE = gql`
    mutation createTargetGroupType(
        $title: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createTargetGroupType(payload: {
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

export const UPDATE_TARGETGROUPTYPE = gql`
    mutation updateTargetGroupType(
        $id: ID!,
        $title: String,
        $description: String,
        $shortDescription: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateTargetGroupType(
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

export const DELETE_TARGETGROUPTYPE = gql`
    mutation deleteTargetGroupType($ids: [ID]!) {
        deleteTargetGroupType(ids: $ids) {
            successful
        }
    }
`;