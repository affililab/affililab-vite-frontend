import {
    gql
} from "@apollo/client";

export const GET_ALL_ROLES = gql`
    query GET_ALL_ROLES {
        getAllRoles {
                id
                title
                description
        }
    }
`;

export const GET_ROLES = gql`
    query GET_ROLES ($meta: IndexMeta) {
        getRoles(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
            }
        }
    }
`;

export const GET_ROLES_BY_IDS = gql`
    query GET_ROLES_BY_IDS($ids: [ID]) {
        getRolesByIds(ids: $ids) {
            id
            title
            description
        }
    }
`;

export const GET_ROLE = gql`
    query GET_ROLE($id: String!) {
        getRole (id: $id) {
            id
            title
            description
        }
    }
`;

export const CREATE_ROLE = gql`
    mutation createRole(
        $title: String,
        $description: String,
) {
        createRole(payload: {
            title: $title,
            description: $description,
        }
    ) {
            id
            title
            description
        }
    }
`;

export const UPDATE_ROLE = gql`
    mutation updateRole(
        $id: ID!,
        $title: String,
        $description: String,
    ) {
        updateRole(
            id: $id,
            payload: {
                title: $title,
                description: $description,
            }
        ) {
            id
            title
            description
        }
    }
`;

export const DELETE_ROLE = gql`
    mutation deleteRole($ids: [ID]!) {
        deleteRole(ids: $ids) {
            successful
        }
    }
`;