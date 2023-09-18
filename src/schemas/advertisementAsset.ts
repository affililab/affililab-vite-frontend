import {
    gql
} from "@apollo/client";

export const GET_AdvertisementAssets = gql`
    query GET_AdvertisementAssets ($meta: IndexMeta) {
        getAdvertisementAssets(meta: $meta) {
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

export const GET_AdvertisementAssets_BY_IDS =  gql`
    query GET_AdvertisementAssets_BY_IDS($ids: [ID]) {
        getAdvertisementAssetsByIds(ids: $ids) {
            id
            title
            cover
            approved
        }
    }
`;

export const GET_AdvertisementAsset = gql`
    query GET_AdvertisementAsset($id: String!) {
        getAdvertisementAsset (id: $id) {
            id
            title
            cover
            approved
        }
    }
`;

export const CREATE_AdvertisementAsset = gql`
    mutation createAdvertisementAsset(
        $title: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createAdvertisementAsset(payload: {
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

export const UPDATE_AdvertisementAsset = gql`
    mutation updateAdvertisementAsset(
        $id: ID!,
        $title: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateAdvertisementAsset(
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

export const DELETE_AdvertisementAsset = gql`
    mutation deleteAdvertisementAsset($ids: [ID]!) {
        deleteAdvertisementAsset(ids: $ids) {
            successful
        }
    }
`;