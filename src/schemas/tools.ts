import {
    gql
} from "@apollo/client";

export const GET_TOOLS = gql`
    query GET_TOOLS ($meta: IndexMeta) {
        getTools(meta: $meta) {
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
                logo              
                approved
                internal
                internalKey
                categories {
                    id
                    title
                }
                features {
                    icon
                    title
                    description
                    link
                }
                link
            }
        }
    }
`;

export const GET_TOOLS_BY_IDS = gql`
    query GET_TOOLS_BY_IDS($ids: [ID]) {
        getToolsByIds(ids: $ids) {
            id
            title
            description
            shortDescription
            cover
            logo
            approved
            internal
            internalKey
            categories {
                id
                title
            }
            features {
                icon
                title
                description
                link
            }
            link
        }
    }
`;

export const GET_TOOL = gql`
    query GET_TOOL($id: String!) {
        getTool (id: $id) {
            id
            title
            cover
            logo
            link
            internal
            internalKey
            features {
                icon
                title
                description
                link
            }
            approved
            description
        }
    }
`;

export const CREATE_TOOL = gql`
    mutation createTool(
    $title: String,
    $link: String,
    $description: String,
    $cover: Upload,
    $logo: Upload,
    $images: [Upload],
    $features: [FeatureInput],
    $categories: [ID],
    $approved: Boolean,
    $internal: Boolean,
    $internalKey: String,
    $shortDescription: String) {
        createTool(payload: { title: $title, approved: $approved, internal: $internal, internalKey: $internalKey, link: $link, description: $description, categories: $categories, images: $images, cover: $cover, logo: $logo, shortDescription: $shortDescription, features: $features }) {
            id
            title
            cover
            logo
            features {
                icon
                title
                description
                link
            }
            approved
            link
            description
            shortDescription
        }
    }
`;

export const UPDATE_TOOL = gql`
    mutation updateTool(
        $id: ID!,
        $title: String,
        $link: String,
        $cover: Upload,
        $logo: Upload,
        $images: [Upload],
        $categories: [ID],
        $features: [FeatureInput],
        $approved: Boolean,
        $description: String,
        $internal: Boolean,
        $internalKey: String,
        $shortDescription: String) {
        updateTool(id: $id, payload: {images: $images, cover: $cover, logo: $logo, categories: $categories, approved: $approved, internal: $internal, internalKey: $internalKey, title: $title, link: $link, description: $description, shortDescription: $shortDescription, features: $features }) {
            id
            title
            cover
            logo
            link
            internal
            internalKey
            features {
                icon
                title
                description
                link
            }
            approved
            description
            shortDescription
        }
    }
`;

export const DELETE_TOOL = gql`
    mutation deleteTool($ids: [ID]!) {
        deleteTool(ids: $ids) {
            successful
        }
    }
`;