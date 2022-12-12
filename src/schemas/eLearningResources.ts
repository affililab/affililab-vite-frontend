import {
    gql
} from "@apollo/client";

export const GET_ELEARNINGRESOURCES = gql`
    query GET_ELEARNINGRESOURCES ($meta: IndexMeta) {
        getELearningResources(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                cover                   
                description
                shortDescription
                link
                learnAssets {
                    icon
                    title
                    description
                }
                approved
                categories {
                    id
                    title
                }
            }
        }
    }
`;

export const GET_ELEARNINGRESOURCES_BY_IDS = gql`
    query GET_ELEARNINGRESOURCES_BY_IDS($ids: [ID]) {
        getELearningResourcesByIds(ids: $ids) {
            id
            title
            cover
            description
            shortDescription
            link
            learnAssets {
                icon
                title
                description
            }
            approved
            categories {
                id
                title
            }
        }
    }
`;

export const GET_ELEARNINGRESOURCE = gql`
    query GET_ELEARNINGRESOURCE($id: String!) {
        getELearningResource (id: $id) {
            id
            title
            description
            shortDescription
            link
            learnAssets {
                icon
                title
                description
            }
            approved
            categories {
                id
                title
            }
        }
    }
`;

export const CREATE_ELEARNINGRESOURCE = gql`
    mutation createELearningResource(
        $title: String,
        $description: String,
        $categories: [ID],
        $cover: Upload,
        $images: [Upload],
        $link: String,
        $learnAssets: [LearnAssetInput],
        $approved: Boolean,
        $shortDescription: String) {
        createELearningResource(payload: { title: $title, description: $description, link: $link, categories: $categories, images: $images, cover: $cover, shortDescription: $shortDescription, approved: $approved, learnAssets: $learnAssets}) {
            id
            title
            description
            shortDescription
            link
            learnAssets {
                icon
                title
                description
            }
            approved
            categories {
                id
                title
            }
        }
    }
`;

export const UPDATE_ELEARNINGRESOURCE = gql`
    mutation updateELearningResource(
        $id: ID!,
        $title: String,
        $description: String,
        $cover: Upload,
        $images: [Upload],
        $categories: [ID],
        $learnAssets: [LearnAssetInput],
        $link: String,
        $approved: Boolean,
        $shortDescription: String) {
        updateELearningResource(id: $id, payload: { title: $title, description: $description, link: $link, categories: $categories, images: $images, cover: $cover, shortDescription: $shortDescription, approved: $approved, learnAssets: $learnAssets}) {
            id
            title
            description
            shortDescription
            link
            learnAssets {
                icon
                title
                description
            }
            approved
            categories {
                id
                title
            }
        }
    }
`;

export const DELETE_ELEARNINGRESOURCE = gql`
    mutation deleteELearningResource($ids: [ID]!) {
        deleteELearningResource(ids: $ids) {
            successful
        }
    }
`;