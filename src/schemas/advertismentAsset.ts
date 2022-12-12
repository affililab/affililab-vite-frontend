import {
    gql
} from "@apollo/client";

export const GET_AdvertismentAssets = gql`
    query GET_AdvertismentAssets ($meta: IndexMeta) {
        getAdvertismentAssets(meta: $meta) {
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

export const GET_AdvertismentAssets_BY_IDS =  gql`
    query GET_AdvertismentAssets_BY_IDS($ids: [ID]) {
        getAdvertismentAssetsByIds(ids: $ids) {
            id
            title
            cover
            approved
        }
    }
`;

export const GET_AdvertismentAsset = gql`
    query GET_AdvertismentAsset($id: String!) {
        getAdvertismentAsset (id: $id) {
            id
            title
            cover
            approved
        }
    }
`;

export const CREATE_AdvertismentAsset = gql`
    mutation createAdvertismentAsset(
        $title: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createAdvertismentAsset(payload: {
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

export const UPDATE_AdvertismentAsset = gql`
    mutation updateAdvertismentAsset(
        $id: ID!,
        $title: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateAdvertismentAsset(
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

export const DELETE_AdvertismentAsset = gql`
    mutation deleteAdvertismentAsset($ids: [ID]!) {
        deleteAdvertismentAsset(ids: $ids) {
            successful
        }
    }
`;