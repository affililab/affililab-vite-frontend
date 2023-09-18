import {
    gql
} from "@apollo/client";

export const GET_GENERATED_AD = gql`
    query GET_GENERATED_AD ($data: AdGenerationInput) {
        getAdGeneration(data: $data) {
            generatedTitle
            generatedText
        }
    }
`;