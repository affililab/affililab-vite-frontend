import {
    gql
} from "@apollo/client";

export const GET_RECOMMENDATION_BY_PREFERENCES = gql`
     query GET_RECOMMENDATION_BY_PREFERENCES ($categoryGroups: [ID]!, $campaignSupportCategories: [ID]!, $tools: [ID]!, $marketingChannels: [String]!) {
        getRecommendationsByPreferences(categoryGroups: $categoryGroups, campaignSupportCategories: $campaignSupportCategories, tools: $tools, marketingChannels: $marketingChannels) {
            title
            description
            productImg
            categories {
                id
                title
            }
            commissionInPercent
                commissionFixed
                earningsPerSale
                earningsPerCartVisitor
                performance
                averageSalesPrice
                rank
                salesPrestige
                products
                trackingLifetime
                trackingTypes {
                    title
                }
                cartConversionInPercent
                cancellationRateInPercent
                salaryModel {
                    id
                    title
                }
                vendor
                created
                revenueType {
                    id
                    title
                }
                processingTime
                lastUpdated
                semHints
                summary
                salesPageUrl
                targetGroups {
                    title
                }
                directActivation
                affiliateSupportURL
                advertisementAssets {
                    id
                    title
                }
                sources {
                    signupLink
                    source {
                        title
                    }
                }
                createdAt
                updatedAt                
        }
     }
`;