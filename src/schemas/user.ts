import {
    gql
} from "@apollo/client";

export const GET_USERS = gql`
    query GET_USERS ($meta: IndexMeta) {
        getUsers(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                name
                role {
                    id
                    title
                }
                status
                verifiedAt
                email
                avatar
            }
        }
    }
`;

export const GET_USERS_BY_IDS =  gql`
    query GET_USERS_BY_IDS($ids: [ID]) {
        getUsersByIds(ids: $ids) {
            id
            name
            email
        }
    }
`;

export const GET_USER = gql`
    query GET_USER($id: String!) {
        getUser (id: $id) {
            id
            name
            email
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser(
        $name: String,
        $email: String,
) {
        createUser(payload: {
            name: $name,
            email: $email,
        }
    ) {
            id
            name
            email
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser(
        $id: ID!,
        $name: String,
        $email: String,
        $avatar: Upload,
        $role: ID,
        $oldPassword: String,
        $password: String,
        $passwordConfirmation: String,
        $status: Int,
        $verifiedAt: DateTime,
        $preferred: PreferredInput
    ) {
        updateUser(
            id: $id,
            payload: {
                name: $name,
                email: $email,
                avatar: $avatar,
                role: $role,
                oldPassword: $oldPassword,
                password: $password,
                passwordConfirmation: $passwordConfirmation,
                status: $status,
                verifiedAt: $verifiedAt,
                preferred: $preferred
            }
        ) {
            id
            name
            email
            verifiedAt
            role {
                title
            }
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation updateProfile(
            $avatar: Upload,        
            $name: String,           
            $email: String,
            $oldPassword: String,
            $password: String,
            $passwordConfirmation: String,
            $categories: [ID],
            $targetGroups: [ID]
        ) {
            updateProfile(
                payload: {
                    avatar: $avatar,
                    name: $name,
                    email: $email,
                    oldPassword: $oldPassword,
                    password: $password,
                    passwordConfirmation: $passwordConfirmation,
                    preferred: {
                        categories: $categories,
                        targetGroups: $targetGroups
                    }
                }
        ) {
            id
            name
            email
        }
    }
`;

export const GET_STATS = gql`
    query getStats {
        getStats {
            totalCampaigns
            totalCategories
            totalTargetGroups
            totalTools
            totalPartnerPrograms
            totalELearningResources
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($ids: [ID]!) {
        deleteUser(ids: $ids) {
            successful
        }
    }
`;

export const CHOOSE_PLAN = gql`
    mutation choosePlan($id: ID!, $unit: String, $callbackUrl: String) {
      choosePlan(id: $id, unit: $unit, callbackUrl: $callbackUrl) {
        success
        payload {
            sessionUrl      
        }
      }
    }
`;

export const COMPLETE_SUBSCRIPTION = gql`
    mutation completeSubscription($id: ID!) {
        completeSubscription(id: $id) {
            success
        }
    }      
`;

export const REGISTER_PRODUCT_INTERACTION = gql`
    mutation registerProductInteraction($id: ID!, $interactionType: InteractionType) {
      registerProductInteraction(id: $id, payload: { interactionType: $interactionType }) {
        success       
      }
    }
`;