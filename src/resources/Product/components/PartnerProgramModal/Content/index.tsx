import {
    Box,
    Icon,
    Image, Scrollbar,
    Grid,
    styled,
    ToggleButton,
    Tooltip,
    Typography,
    useAuth,
    fRenderedHTML, IconButton, fDate
} from "my-lib";

import {InformationTabs} from "./InformationTabs";
import {SmallItem} from "../../SmallItem"
import React, {FC, useEffect} from "react";
import {toggleNoticedPartnerProgram} from "@slices/noticedPartnerPrograms";
import {useProductInteraction} from "@resources/User/hooks/useProductInteraction";

export const Content: FC<any> = ({
                            item,
                            toggleExternalLink,
                            isNoticed,
                            addToCampaign,
                            toggleModal,
                            toggleNoticed,
                            actionItems = [
                                (item, isAuthenticated) => isAuthenticated && <Box>
                                    <Tooltip title={"add to campaign"} arrow>
                                        <IconButton
                                            value={isNoticed ? 'checked' : 'unchecked'} onClick={() => addToCampaign(item.id)}
                                            color="secondary" aria-label="add to campaign"
                                        >
                                            <Icon
                                                color={"text.disabled"}
                                                width={24}
                                                height={24}
                                                 icon={"codicon:add"}/>
                                        </IconButton>
                                        {/*<ToggleButton*/}
                                        {/*    sx={{ height: "42px", width: "42px" }}*/}
                                        {/*    value={isNoticed ? 'checked' : 'unchecked'} onClick={() => addToCampaign(item.id)}*/}
                                        {/*    color="primary" aria-label="add to campaign">*/}
                                        {/*    <Icon*/}
                                        {/*        width={19}*/}
                                        {/*        height={19}*/}
                                        {/*        sx={(theme) => ({*/}
                                        {/*        color: theme.palette.primary.dark*/}
                                        {/*    })} icon={"carbon:add-alt"}/>*/}
                                        {/*</ToggleButton>*/}
                                    </Tooltip>
                                </Box>,
                                (item) => <Box>
                                    <Tooltip title={"merken"} arrow>
                                        <IconButton
                                            value={isNoticed ? 'checked' : 'unchecked'} onClick={() => toggleNoticedPartnerProgram(item)}
                                            color="secondary" aria-label="toggle noticed partnerprogram"
                                        >
                                            <Icon
                                                color={"text.disabled"}
                                                width={24}
                                                height={24}
                                                icon={isNoticed ? "bi:bookmark-star-fill" : "bi:bookmark-star"}/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ],
                        }) => {

    const { registerInteraction } = useProductInteraction();

    useEffect(() => {
        // view partnerprogram
        (async () => {
            await registerInteraction(item.id, "viewed");
        })();
    }, []);

    const ActionButtonsContainer = styled(Box)(({theme}) => ({
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: theme.spacing(2)
    }));

    const GeneralContainer = styled(Box)(({theme}) => ({
        display: "flex",
        flex: 1,
        justifyContent: "flex-start",
        gap: theme.spacing(2),
        paddingRight: theme.spacing(12),
        paddingLeft: theme.spacing(12),
    }));

    const ProductImageContainer = styled(Box)(({theme}) => ({
        flex: 1,
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2),
        width: "256px",
        height: "100%"
    }));

    const auth = useAuth();

    const {
        id,
        programId,
        description,
        title,
        productImg,
        categories,
        commissionInPercent,
        commissionFixed,
        earningsPerSale,
        earningsPerCartVisitor,
        performance,
        averageSalesPrice,
        salesPrestige,
        products,
        lastUpdated,
        trackingLifetime,
        tracking,
        cartConversionInPercent,
        cancellationRateInPercent,
        salaryModel,
        vendor,
        created,
        processingTime,
        semHints,
        summary,
        salespage,
        salesPageURL,
        targetGroups,
        directActivation,
        affiliateSupportURL,
        advertisementAssets,
        sources,
        createdAt,
        updatedAt
    } = item;

    const similar = [
        item,
        item,
        item,
        item
    ];

    return <Box sx={(theme) => ({display: "flex", flexDirection: "column", gap: theme.spacing(2)})}>
        {/* action buttons */}
        <ActionButtonsContainer>
            {actionItems.map(actionItem => actionItem(item, auth.isAuthenticated))}
            <Box>
                <Tooltip title={"schließen"} arrow>
                    <IconButton color="secondary" aria-label="close" onClick={() => toggleModal(item)}>
                        <Icon
                            color={"text.disabled"}
                            width={34}
                            height={34}
                            icon={'ei:close'} />
                    </IconButton>
                </Tooltip>
                {/*<Tooltip title={"schließen"} arrow>*/}
                {/*    <ToggleButton sx={{*/}
                {/*        height: "42px",*/}
                {/*        width: "42px"*/}
                {/*    }} value="checked" onClick={() => toggleModal(item)}*/}
                {/*                  color="primary"*/}
                {/*                  aria-label={"close partnerprogram"}>*/}
                {/*        <Icon width={19} height={19} sx={(theme) => ({*/}
                {/*            color: theme.palette.primary.dark*/}
                {/*        })} icon={"tabler:arrows-minimize"}/>*/}
                {/*    </ToggleButton>*/}
                {/*</Tooltip>*/}
            </Box>
        </ActionButtonsContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", gap: (theme) => theme.spacing(2) }}>
            <GeneralContainer>
                <Box sx={{alignSelf: "center"}}>
                    {/* TODO: image box */}
                    <ProductImageContainer>
                        <Box sx={{ background: "rgb(255, 255, 255)", p: 2 }}>
                            <Image src={productImg} alt={productImg} sx={{maxHeight: "256px"}}/>
                        </Box>
                    </ProductImageContainer>
                </Box>
                <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    {/* TODO: title box */}
                    <Typography color="textPrimary" variant="subtitle1" align={"left"}>
                        {title}
                    </Typography>
                    <Typography color="textinfo" variant="caption" align={"left"}>
                        {fDate(created)}
                    </Typography>
                    <Box sx={(theme) => ({
                        width: "100%",
                        minHeight: "256px",
                        maxHeight: "256px",
                        borderRadius: "2px"
                    })}>
                        <Scrollbar
                            sx={(theme) => ({
                                // maxHeight: "256px",
                                minHeight: "256px",
                                height: "256px",
                                "ul": {
                                    marginLeft: "2rem"
                                }
                            })}
                            forceVisible="y" autoHide={true}>
                            <Box
                                py={2}
                                px={6}
                                sx={(theme) => ({
                                    minHeight: "256px",
                                    height: "100%",
                                    borderRadius: "2px",
                                    bgcolor: theme.palette.background.neutral,
                                })}
                            >
                                <Typography variant={"body2"} component="span">
                                    {fRenderedHTML(description)}
                                </Typography>
                            </Box>
                        </Scrollbar>
                    </Box>
                </Box>
            </GeneralContainer>

            {/* TODO: information tabs */}
            <Box sx={{ minHeight: "464px", flex: 1, display: "flex", flexDirection: "column", px: 12}}>
            {/*<Box sx={{height: "286px", px: 12}}>*/}
                <InformationTabs item={item}/>
            </Box>

            {/* TODO: similar products - implement when functionality is ready*/}
            {/*<Box sx={{width: "100%", px: 12}}>*/}
            {/*    <Typography color="textPrimary" my={2} variant="subtitle2" align={"left"}>*/}
            {/*        Diese Produkte könnten Sie auch interessieren*/}
            {/*    </Typography>*/}
            {/*    <Grid justifyContent={"center"} alignItems={"center"} container spacing={6}>*/}
            {/*        {similar.map(similarItem => <Grid xs={3} item><SmallItem item={similarItem}/></Grid>)}*/}
            {/*    </Grid>*/}
            {/*</Box>*/}
        </Box>
    </Box>
}