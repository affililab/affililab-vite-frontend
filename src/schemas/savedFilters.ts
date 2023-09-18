import {
    gql
} from "@apollo/client";

export const GET_SAVED_FILTERS = gql`
    query GET_SAVED_FILTERS ($meta: IndexMeta) {
        getSavedFilters(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                title
                description
                searchValue
                commissionInPercent {
                    showEmpty
                    value
                }
                earningsPerSale {
                    showEmpty
                    value
                }
                averageSalesPrice {
                    showEmpty
                    value
                }
                performance {
                    showEmpty
                    value
                }
                processingTime {
                    showEmpty
                    value
                }
                targetGroups {
                    showEmpty
                    value {
                        id
                        title
                    }
                }
                trackingTypes {
                    showEmpty
                    value {
                        id
                        title
                    }
                }
                salaryModel {
                    showEmpty
                    value {
                        id
                        title
                    }
                }
                cartConversionInPercent {
                    showEmpty
                    value
                }
                cancellationRateInPercent {
                    showEmpty
                    value
                }
                categories {
                    showEmpty
                    value {
                        id
                        title
                    }
                }
                advertisementAssets {
                    showEmpty
                    value {
                        id
                        title
                    }
                }
                directActivation {
                    showEmpty
                    value
                }
            }
        }
    }
`;

export const GET_SAVED_FILTER = gql`
    query GET_SAVED_FILTER($id: String!) {
        getSavedFilter (id: $id) {
            id
            title
            description
            searchValue
            commissionInPercent {
                showEmpty
                value
            }
            earningsPerSale {
                showEmpty
                value
            }
            averageSalesPrice {
                showEmpty
                value
            }
            performance {
                showEmpty
                value
            }
            processingTime {
                showEmpty
                value
            }
            targetGroups {
                showEmpty
                value {
                    id
                    title
                }
            }
            trackingTypes {
                showEmpty
                value {
                    id
                    title
                }
            }
            salaryModel {
                showEmpty
                value {
                    id
                    title
                }
            }
            cartConversionInPercent {
                showEmpty
                value
            }
            cancellationRateInPercent {
                showEmpty
                value
            }
            categories {
                showEmpty
                value {
                    id
                    title
                }
            }
            advertisementAssets {
                showEmpty
                value {
                    id
                    title
                }
            }
            directActivation {
                showEmpty
                value
            }
        }
    }
`;

export const UPDATE_SAVED_FILTER = gql`
    mutation updateSavedFilter($id: ID!, $title: String!, $description: String, $searchValue: String, $commissionInPercent: RangeTypeInput, $earningsPerSale: RangeTypeInput, $averageSalesPrice: RangeTypeInput, $performance: RangeTypeInput, $processingTime: RangeTypeInput, $cartConversionInPercent: RangeTypeInput, $cancellationRateInPercent: RangeTypeInput, $trackingTypes: RelationTypeInput, $targetGroups: RelationTypeInput, $categories: RelationTypeInput, $advertisementAssets: RelationTypeInput, $directActivation: SwitchTypeInput) {
        updateSavedFilter(id: $id, payload: { title: $title, description: $description, searchValue: $searchValue, commissionInPercent: $commissionInPercent, earningsPerSale: $earningsPerSale, averageSalesPrice: $averageSalesPrice, performance: $performance, processingTime: $processingTime, cartConversionInPercent: $cartConversionInPercent, cancellationRateInPercent: $cancellationRateInPercent,  trackingTypes: $trackingTypes, targetGroups: $targetGroups, categories: $categories, advertisementAssets : $advertisementAssets, directActivation: $directActivation }) {
            id
            title
            description
            searchValue
            commissionInPercent {
                showEmpty
                value
            }
            earningsPerSale {
                showEmpty
                value
            }
            averageSalesPrice {
                showEmpty
                value
            }
            performance {
                showEmpty
                value
            }
            processingTime {
                showEmpty
                value
            }
            targetGroups {
                showEmpty
                value {
                    id
                    title
                }
            }
            trackingTypes {
                showEmpty
                value {
                    id
                    title
                }
            }
            salaryModel {
                showEmpty
                value {
                    id
                    title
                }
            }
            cartConversionInPercent {
                showEmpty
                value
            }
            cancellationRateInPercent {
                showEmpty
                value
            }
            categories {
                showEmpty
                value {
                    id
                    title
                }
            }
            advertisementAssets {
                showEmpty
                value {
                    id
                    title
                }
            }
            directActivation {
                showEmpty
                value
            }
        }
    }
`;

export const CREATE_SAVED_FILTER = gql`
    mutation createSavedFilter($title: String!, $description: String, $searchValue: String, $commissionInPercent: RangeTypeInput, $earningsPerSale: RangeTypeInput, $averageSalesPrice: RangeTypeInput, $performance: RangeTypeInput, $processingTime: RangeTypeInput, $cartConversionInPercent: RangeTypeInput, $cancellationRateInPercent: RangeTypeInput, $trackingTypes: RelationTypeInput, $targetGroups: RelationTypeInput, $categories: RelationTypeInput, $salaryModel: RelationTypeInput, $advertisementAssets: RelationTypeInput, $directActivation: SwitchTypeInput) {
        createSavedFilter(payload: { title: $title, description: $description, searchValue: $searchValue, commissionInPercent: $commissionInPercent, earningsPerSale: $earningsPerSale, averageSalesPrice: $averageSalesPrice, performance: $performance, processingTime: $processingTime, cartConversionInPercent: $cartConversionInPercent, cancellationRateInPercent: $cancellationRateInPercent,  trackingTypes: $trackingTypes, targetGroups: $targetGroups, categories: $categories, salaryModel: $salaryModel, advertisementAssets : $advertisementAssets, directActivation: $directActivation}) {
            id
            title
            description
            searchValue
            commissionInPercent {
                showEmpty
                value
            }
            earningsPerSale {
                showEmpty
                value
            }
            averageSalesPrice {
                showEmpty
                value
            }
            performance {
                showEmpty
                value
            }
            processingTime {
                showEmpty
                value
            }
            targetGroups {
                showEmpty
                value {
                    id
                    title
                }
            }
            trackingTypes {
                showEmpty
                value {
                    id
                    title
                }
            }
            salaryModel {
                showEmpty
                value {
                    id
                    title
                }
            }
            cartConversionInPercent {
                showEmpty
                value
            }
            cancellationRateInPercent {
                showEmpty
                value
            }
            categories {
                showEmpty
                value {
                    id
                    title
                }
            }
            advertisementAssets {
                showEmpty
                value {
                    id
                    title
                }
            }
            directActivation {
                showEmpty
                value
            }
        }
    }
`;

export const DELETE_SAVED_FILTER = gql`
    mutation deleteSavedFilter($ids: [ID]!) {
        deleteSavedFilter(ids: $ids) {
            successful
        }
    }
`;