import {
    gql
} from "@apollo/client";

export const GET_SOURCES = gql`
    query GET_SOURCES ($meta: IndexMeta) {
        getSources(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                source
                cover
                smallLogo
                approved
            }
        }
    }
`;

export const GET_SOURCES_BY_IDS =  gql`
    query GET_SOURCES_BY_IDS($ids: [ID]) {
        getSourcesByIds(ids: $ids) {
            id
            source
            cover
            smallLogo
            approved
        }
    }
`;

export const GET_SOURCE = gql`
    query GET_SOURCE($id: String!) {
        getSource (id: $id) {
            id
            source
            cover
            smallLogo
            approved
        }
    }
`;

export const CREATE_SOURCE = gql`
    mutation createSource(
        $source: String,
        $cover: Upload,
        $smallLogo: Upload,
        $approved: Boolean,
) {
        createSource(payload: {
            source: $source,
            cover: $cover,
            smallLogo: $smallLogo,
            approved: $approved,
        }
    ) {
            id
            source
            cover
            smallLogo
            approved
        }
    }
`;

export const UPDATE_SOURCE = gql`
    mutation updateSource(
        $id: ID!,
        $source: String,
        $cover: Upload,
        $smallLogo: Upload,
        $approved: Boolean,
    ) {
        updateSource(
            id: $id,
            payload: {
                source: $source,
                cover: $cover,
                smallLogo: $smallLogo,
                approved: $approved,
            }
        ) {
            id
            source
            cover
            smallLogo
            approved
        }
    }
`;

export const DELETE_SOURCE = gql`
    mutation deleteSource($ids: [ID]!) {
        deleteSource(ids: $ids) {
            successful
        }
    }
`;
