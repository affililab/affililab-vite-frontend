import {
    gql
} from "@apollo/client";
export const CATEGORIES_SALARYMODELS = gql`
    query CATEGORIES_SALARYMODELS {
        getAllCategories {
            id
            title
        }
        
        getAllAdvertisementAssets {
            id
            title
        }
        
        getAllTrackingTypes {
            id
            title
        }

        getAllTargetGroups {
            id
            title
        }
        
        getAllSalaryModels {
            id
            title
        }
    }
`;