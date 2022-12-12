import {
    gql
} from "@apollo/client";

export const GET_CAMPAIGNS = gql`
    query GET_CAMPAIGNS ($meta: IndexMeta) {
        getCampaigns (meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
                partnerPrograms {
                    id
                }
                eLearningResources {
                    id
                }
                tools {
                    id
                }
            }
        }
    }
`;

export const GET_CAMPAIGN = gql`
    query GET_CAMPAIGN($id: ID!) {
        getCampaign (id: $id) {
            id
            title
            description
            partnerPrograms {
                id
            }
            tools {
                id
            }
            eLearningResources {
                id
            }
        }
    }
`;

export const UPDATE_CAMPAIGN = gql`
    mutation updateCampaign($id: ID!, $title: String, $description: String, $tools: RelationshipEditInput, $partnerPrograms: RelationshipEditInput, $eLearningResources: RelationshipEditInput) {
        updateCampaign(id: $id, payload: { title: $title, description: $description, relationships: { tools: $tools, partnerPrograms: $partnerPrograms, eLearningResources: $eLearningResources}} ) {
            title
            description
        }
    }
`;

export const CREATE_CAMPAIGN = gql`
    mutation createCampaign($title: String!, $description: String) {
        createCampaign(payload: { title: $title, description: $description}) {
            title
            description
        }
    }
`;

export const DELETE_CAMPAIGN = gql`
    mutation deleteCampaign($ids: [ID]!) {
        deleteCampaign(ids: $ids) {
            successful
        }
    }
`;

export const GET_CAMPAIGN_CATEGORIES = gql`
    query GET_CAMPAIGN_CATEGORIES ($id: ID!) {
        getCampaignCategories(id: $id) {
            id
            title
            icon
            description
            cover
            approved
        }
    }
`;

export const GET_CAMPAIGN_TARGET_GROUPS = gql`
    query GET_CAMPAIGN_TARGET_GROUPS ($id: ID!) {
        getCampaignTargetGroups(id: $id) {
            id
            title
            description
            cover
            approved
        }
    }
`;

export const GET_CAMPAIGN_STATS = gql`
    query getStats($id: ID!) {
        getCampaignStats (id: $id) {           
            totalCategories
            totalTargetGroups
            totalTools
            totalPartnerPrograms
            totalELearningResources
        }
    }
`;