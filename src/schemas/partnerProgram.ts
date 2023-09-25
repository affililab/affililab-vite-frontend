import {
    gql
} from "@apollo/client";

export const GET_PARTNERPROGRAMS = gql`
    query GET_PARTNERPROGRAMS ($meta: IndexMeta) {
        getPartnerPrograms(meta: $meta) {
            pageInfo {
                total
                page
            }
            items {
                id
                programId
                description

                title
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
                salesPageURL
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
                approved
            }
        }
    }
`;

export const GET_PARTNERPROGRAMS_BY_IDS = gql`
    query GET_PARTNERPROGRAMS_BY_IDS($ids: [ID]) {
        getPartnerProgramsByIds(ids: $ids) {
            id
            programId
            description

            title
            productImg
            categories {
                id
                title
            }
            commissionInPercent
            commissionFixed
            earningsPerSale
            earningsPerCartVisitor
            rank
            performance
            revenueType {
                id
                title
            }
            averageSalesPrice
            salesPrestige
            products
            trackingLifetime
            trackingTypes {
                id  
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
            processingTime
            lastUpdated
            semHints
            summary           
            salesPageURL
            targetGroups {
                title
            }
            directActivation
            affiliateSupportURL
            advertisementAssets {
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
            approved
        }
    }
`;

export const GET_PARTNERPROGRAM = gql`
    query GET_PARTNERPROGRAM($id: String!) {
        getPartnerProgram (id: $id) {
            id
            programId
            description

            title
            productImg
            categories {
                id
                title
            }
            commissionInPercent
            commissionFixed
            earningsPerSale
            earningsPerCartVisitor
            rank
            performance
            averageSalesPrice
            revenueType
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
            processingTime
            lastUpdated
            semHints
            summary
            salesPageURL
            targetGroups {
                title
            }
            directActivation
            affiliateSupportURL
            advertisementAssets {
                title
            }
            sources {
                signupLink
                source {
                    title
                    smallLogo
                }
            }
            createdAt
            updatedAt
            approved
        }
    }
`;

export const CREATE_PARTNERPROGRAM = gql`
    mutation createPartnerProgram(
        $title: String!,
        $description: String!,
        $programId: String,
        $productImg: Upload,
        $categories: [ID],
        $commissionInPercent: Float,       
        $earningsPerSale: Float,
        $earningsPerCartVisitor: Float,
        $averageSalesPrice: Float,
        $performance: Float,
        $salesPrestige: Float,
        $products: [String],
        $trackingLifetime: Int,
        $trackingTypes: [ID],
        $cartConversionInPercent: Float,
        $cancellationRateInPercent: Float,
        $salaryModel: [ID],
        $vendor: String,
        $created: Date,
        $lastUpdated: Date,
        $processingTime: String,
        $semHints: [String],
        $summary: [String],
        $salesPageURL: String,
        $targetGroups: [ID],
        $directActivation: Boolean,
        $affiliateSupportURL: String,
        $advertisementAssets: [ID],
        $source: String,
        $sources: [ID],
        $createdAt: Date,
        $updatedAt: Date,
        $approved: Boolean,
) {
        createPartnerProgram(payload: {
            title: $title,
            programId: $programId,
            description: $description,
            productImg: $productImg,
            categories: $categories,
            commissionInPercent: $commissionInPercent,       
            earningsPerSale: $earningsPerSale,
            earningsPerCartVisitor: $earningsPerCartVisitor,
            averageSalesPrice: $averageSalesPrice,
            performance: $performance,
            salesPrestige: $salesPrestige,
            products: $products,
            trackingLifetime: $trackingLifetime,
            trackingTypes: $trackingTypes,
            cartConversionInPercent: $cartConversionInPercent,
            cancellationRateInPercent: $cancellationRateInPercent,
            salaryModel: $salaryModel,
            vendor: $vendor,
            created: $created,
            lastUpdated: $lastUpdated,
            processingTime: $processingTime,
            semHints: $semHints,
            summary: $summary,
            salesPageURL: $salesPageURL,
            targetGroups: $targetGroups,
            directActivation: $directActivation,
            affiliateSupportURL: $affiliateSupportURL,
            advertisementAssets: $advertisementAssets,
            source: $source,
            sources: $sources,
            createdAt: $createdAt,
            updatedAt: $updatedAt,
            approved: $approved,
        }
    ) {
            id
            programId
            description

            title
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
            salesPrestige
            products
            rank
            trackingLifetime
            trackingTypes {
                title
            }
            cartConversionInPercent
            cancellationRateInPercent
            salaryModel {
                title
            }
            vendor
            created
            processingTime
            lastUpdated
            semHints
            summary
            salesPageURL
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
                    smallLogo
                }
            }
            createdAt
            updatedAt
            approved
        }
    }
`;

export const UPDATE_PARTNERPROGRAM = gql`
    mutation updatePartnerProgram(
        $id: ID!,
        $title: String!,
        $description: String!,
        $programId: String,
        $productImg: Upload,
        $categories: [ID],
        $commissionInPercent: Float,       
        $earningsPerSale: Float,
        $earningsPerCartVisitor: Float,
        $averageSalesPrice: Float,
        $performance: Float,
        $salesPrestige: Float,
        $products: [String],
        $trackingLifetime: Int,
        $trackingTypes: [ID],
        $cartConversionInPercent: Float,
        $cancellationRateInPercent: Float,
        $salaryModel: [ID],
        $vendor: String,
        $created: Date,
        $lastUpdated: Date,
        $processingTime: String,
        $semHints: [String],
        $summary: [String],
        $salesPageURL: String,
        $targetGroups: [ID],
        $directActivation: Boolean,
        $affiliateSupportURL: String,
        $advertisementAssets: [ID],
        $source: String,
        $sources: [ID],
        $createdAt: Date,
        $updatedAt: Date
        $approved: Boolean
    ) {
        updatePartnerProgram(
            id: $id,
            payload: {
                title: $title,
                programId: $programId,
                description: $description,
                productImg: $productImg,
                categories: $categories,
                commissionInPercent: $commissionInPercent,       
                earningsPerSale: $earningsPerSale,
                earningsPerCartVisitor: $earningsPerCartVisitor,
                averageSalesPrice: $averageSalesPrice,
                performance: $performance,
                salesPrestige: $salesPrestige,
                products: $products,
                trackingLifetime: $trackingLifetime,
                trackingTypes: $trackingTypes,
                cartConversionInPercent: $cartConversionInPercent,
                cancellationRateInPercent: $cancellationRateInPercent,
                salaryModel: $salaryModel,
                vendor: $vendor,
                created: $created,
                lastUpdated: $lastUpdated,
                processingTime: $processingTime,
                semHints: $semHints,
                summary: $summary,
                salesPageURL: $salesPageURL,
                targetGroups: $targetGroups,
                directActivation: $directActivation,
                affiliateSupportURL: $affiliateSupportURL,
                advertisementAssets: $advertisementAssets,
                source: $source,
                sources: $sources,
                createdAt: $createdAt,
                updatedAt: $updatedAt,
                approved: $approved           
            }
        ) {
            id
            programId
            description

            title
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
            salesPrestige
            products
            rank
            trackingLifetime
            trackingTypes {
                title
            }
            cartConversionInPercent
            cancellationRateInPercent
            salaryModel {
                title
            }
            vendor
            created
            processingTime
            lastUpdated
            semHints
            summary           
            salesPageURL
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
                    smallLogo
                }
            }
            createdAt
            updatedAt
            approved
        }
    }
`;

export const GET_RECOMMENDET_PARTNER_PROGRAMS = gql`
        query GET_RECOMMENDET_PARTNER_PROGRAMS {
            getRecommendetPartnerPrograms {
                id
                programId
                description

                title
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
                salesPageURL
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

export const GET_RECOMMENDET_PARTNER_PROGRAMS_BY_CAMPAIGN = gql`
        query GET_RECOMMENDET_PARTNER_PROGRAMS_BY_CAMPAIGN ($id: ID!) {
            getRecommendetPartnerProgramsByCampaign (id: $id) {
                id
                programId
                description

                title
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
                salesPageURL
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

export const GET_RECOMMENDET_PARTNER_PROGRAMS_BY_SELECTION = gql`
        query GET_RECOMMENDET_PARTNER_PROGRAMS_BY_SELECTION ($categories: [ID], $targetGroups: [ID]) {
            getRecommendetPartnerProgramsBySelection (categories: $categories, targetGroups: $targetGroups) {
                title
                categories {
                    title
                }
            }
        }
`;

export const DELETE_PARTNERPROGRAM = gql`
    mutation deletePartnerProgram($ids: [ID]!) {
        deletePartnerProgram(ids: $ids) {
            successful
        }
    }
`;