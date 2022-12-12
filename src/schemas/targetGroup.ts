import {
    gql
} from "@apollo/client";

export const GET_TARGETGROUPS = gql`
    query GET_TARGETGROUPS ($meta: IndexMeta) {
        getTargetGroups(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
                cover
                targetGroupType {
                    id
                    cover
                    title
                    description
                    shortDescription
                }
                approved
            }
        }
    }
`;

export const GET_TARGETGROUPS_BY_IDS =  gql`
    query GET_TARGETGROUPS_BY_IDS($ids: [ID]) {
        getTargetGroupsByIds(ids: $ids) {
            id
            title
            description
            cover
            targetGroupType {
                id
                cover
                title
                description
                shortDescription
            }
            approved
        }
    }
`;

export const GET_TARGETGROUP = gql`
    query GET_TARGETGROUP($id: String!) {
        getTargetGroup (id: $id) {
            id
            title
            description
            cover
            targetGroupType {
                id
                cover
                title
                description
                shortDescription
            }
            approved
        }
    }
`;

export const CREATE_TARGETGROUP = gql`
    mutation createTargetGroup(
        $title: String,
        $description: String,
        $cover: Upload,
        $targetGroupType: ID,
        $approved: Boolean,
) {
        createTargetGroup(payload: {
            title: $title,
            description: $description,
            cover: $cover,
            targetGroupType: $targetGroupType,
            approved: $approved,
        }
    ) {
            id
            title
            description
            cover
            targetGroupType {
                id
                cover
                title
                description
                shortDescription
            }
            approved
        }
    }
`;

export const UPDATE_TARGETGROUP = gql`
    mutation updateTargetGroup(
        $id: ID!,
        $title: String,
        $description: String,
        $cover: Upload,
        $targetGroupType: ID,
        $approved: Boolean,
    ) {
        updateTargetGroup(
            id: $id,
            payload: {
                title: $title,
                description: $description,
                cover: $cover,
                targetGroupType: $targetGroupType,
                approved: $approved,
            }
        ) {
            id
            title
            description
            cover
            targetGroupType {
                id               
                title
                description
                shortDescription
            }
            approved
        }
    }
`;

export const DELETE_TARGETGROUP = gql`
    mutation deleteTargetGroup($ids: [ID]!) {
        deleteTargetGroup(ids: $ids) {
            successful
        }
    }
`;