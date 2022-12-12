import {
    gql
} from "@apollo/client";

export const GET_CRAWLINGSOURCES = gql`
    query GET_CRAWLINGSOURCES ($meta: IndexMeta) {
        getCrawlingSources(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                cover
                approved
            }
        }
    }
`;

export const GET_CRAWLINGSOURCES_BY_IDS =  gql`
    query GET_CRAWLINGSOURCES_BY_IDS($ids: [ID]) {
        getCrawlingSourcesByIds(ids: $ids) {
            id
            title
            cover
            approved
        }
    }
`;

export const GET_CRAWLINGSOURCE = gql`
    query GET_CRAWLINGSOURCE($id: String!) {
        getCrawlingSource (id: $id) {
            id
            title
            cover
            approved
        }
    }
`;

export const CREATE_CRAWLINGSOURCE = gql`
    mutation createCrawlingSource(
        $title: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createCrawlingSource(payload: {
            title: $title,
            cover: $cover,
            approved: $approved,
        }
    ) {
            id
            title
            cover
            approved
        }
    }
`;

export const UPDATE_CRAWLINGSOURCE = gql`
    mutation updateCrawlingSource(
        $id: ID!,
        $title: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateCrawlingSource(
            id: $id,
            payload: {
                title: $title,
                cover: $cover,
                approved: $approved,
            }
        ) {
            id
            title
            cover
            approved
        }
    }
`;

export const DELETE_CRAWLINGSOURCE = gql`
    mutation deleteCrawlingSource($ids: [ID]!) {
        deleteCrawlingSource(ids: $ids) {
            successful
        }
    }
`;