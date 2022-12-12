import {
    gql
} from "@apollo/client";

export const GET_ALL_SALARYMODELS = gql`
    query GET_ALL_SALARYMODELS {
        getAllSalaryModels {           
            id
            title
            icon
            cover
            approved
        }       
    }
`;

export const GET_SALARYMODELS = gql`
    query GET_SALARYMODELS ($meta: IndexMeta) {
        getSalaryModels(meta: $meta) {
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

export const GET_SALARYMODELS_BY_IDS =  gql`
    query GET_SALARYMODELS_BY_IDS($ids: [ID]) {
        getSalaryModelsByIds(ids: $ids) {
            id
            title
            cover
            approved
        }
    }
`;

export const GET_SALARYMODEL = gql`
    query GET_SALARYMODEL($id: String!) {
        getSalaryModel (id: $id) {
            id
            title
            cover
            approved
        }
    }
`;

export const CREATE_SALARYMODEL = gql`
    mutation createSalaryModel(
        $title: String,
        $cover: Upload,
        $approved: Boolean,
) {
        createSalaryModel(payload: {
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

export const UPDATE_SALARYMODEL = gql`
    mutation updateSalaryModel(
        $id: ID!,
        $title: String,
        $cover: Upload,
        $approved: Boolean,
    ) {
        updateSalaryModel(
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

export const DELETE_SALARYMODEL = gql`
    mutation deleteSalaryModel($ids: [ID]!) {
        deleteSalaryModel(ids: $ids) {
            successful
        }
    }
`;