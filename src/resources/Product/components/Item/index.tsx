import React, {FC, useState} from "react";
import {
    BaseOptionChart,
    Box,
    Button,
    Card,
    Chip,
    fCurrency,
    fDate,
    Grid,
    IconButton,
    Icon,
    Image,
    makeStyles,
    Menu,
    MenuItem,
    Rating,
    ReactApexChart,
    Scrollbar,
    styled,
    Tooltip,
    Typography,
    useAuth,
    useTheme,
    fRenderedHTML,
    ButtonBase, Link, Checkbox
} from 'my-lib';
import {merge} from "lodash";

import {partnerProgramsBackend} from "@config";
import {PercentageBarChartComponent} from "@components/Charts/PercentageBarChartComponent";

const useStyles = makeStyles(theme => ({
    content: {
        height: "100%"
    },
    tagItem: {
        maxWidth: 200
    }
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    }
}));

const SourceBox = styled('a')(({theme}) => ({
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    height: "32px",
    width: "32px",
    borderRadius: "2px"
}));

const InformationContainer = styled(Box)(({theme, sx}) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    ...sx
}));

const InformationItem = styled(Box)(({theme, sx, active}) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // background: active ? "rgb(33, 146, 255)" : null,
    background: active === "true" ? theme.palette.info.main : null,
    borderRadius: theme.shape.borderRadius,
    minHeight: "42px",
    padding: theme.spacing(2),
    ...sx
}));

const AnchorsItem = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    flexGrow: 1
}));

const ProductImageContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "256px",
    height: "100%"
}));

const StyledRating = styled(Rating)(({theme}) => ({
    '& .MuiRating-iconFilled': {
        color: theme.palette.primary.main
    },
    '& .MuiRating-iconEmpty': {
        color: theme.palette.grey[500_48]
    }
}));

const toStylelessDocument = (htmlString: string): string => {
    // TODO: with regex remove styles
    const regex = /style="(.*?)"/gm;
    const subst = ``;

    // The substituted value will be contained in the result variable
    return htmlString.replace(regex, subst);
};

export const Item: FC<any> = ({
                         item,
                         selectable = false,
                         selected = false,
                         toggleSelected = () => {},
                         toggleExternalLink,
                         isNoticed,
                         addToCampaign,
                         toggleModal,
                         toggleNoticedPartnerProgram,
                         embedded = false,
                         actionItems = [
                             (item: any, isAuthenticated: boolean) => isAuthenticated && <Box>
                                 <Tooltip title={"add to campaign"} arrow>
                                     <IconButton
                                         sx={(theme: any) => ({ color: theme.palette.text.secondary, height: "42px", width: "42px"  })}
                                         value={isNoticed ? 'checked' : 'unchecked'} onClick={() => addToCampaign(item.id)}
                                         aria-label="add to campaign"
                                     >
                                         <Icon
                                             width={24}
                                             height={24}
                                             sx={(theme) => ({
                                                 color: theme.palette.primary.dark
                                             })} icon={"codicon:add"}/>
                                     </IconButton>
                                 </Tooltip>
                             </Box>,
                             (item: any) => <Box>
                                 <Tooltip title={"merken"} arrow>
                                     <IconButton
                                         sx={(theme: any) => ({ color: theme.palette.text.secondary, height: "42px", width: "42px"  })}
                                         value={isNoticed ? 'checked' : 'unchecked'} onClick={() => toggleNoticedPartnerProgram(item)}
                                         color="info" aria-label="toggle noticed partnerprogram"
                                     >
                                         <Icon
                                             width={24}
                                             height={24}
                                             sx={(theme) => ({
                                                 color: theme.palette.primary.dark
                                             })} icon={isNoticed ? "bi:bookmark-star-fill" : "bi:bookmark-star"}/>
                                     </IconButton>
                                 </Tooltip>
                             </Box>,
                             (item: any) => <Box>
                                 <Tooltip title={"öffnen"} arrow>
                                     <IconButton sx={(theme: any) => ({ color: theme.palette.text.secondary, height: "42px", width: "42px"  })}
                                                 onClick={() => toggleModal(item)}
                                                 aria-label="open partnerprogram" component="label">
                                         <Icon
                                             width={24}
                                             height={24}
                                             sx={(theme) => ({
                                                 color: theme.palette.primary.dark
                                             })} icon={"akar-icons:eye-open"} />
                                     </IconButton>
                                     {/*<ToggleButton*/}
                                     {/*    sx={{ height: "42px", width: "42px" }}*/}
                                     {/*    value="checked" onClick={() => toggleModal(item)}*/}
                                     {/*              color="primary"*/}
                                     {/*              aria-label={"open partnerprogram"}>*/}
                                     {/*    <Icon*/}
                                     {/*        width={19}*/}
                                     {/*        height={19}*/}
                                     {/*        sx={(theme) => ({*/}
                                     {/*            color: theme.palette.primary.dark*/}
                                     {/*        })} icon={"tabler:arrows-maximize"} />*/}
                                     {/*</ToggleButton>*/}
                                 </Tooltip>
                             </Box>
                         ],
                     }) => {

    const classes = useStyles();
    const auth = useAuth();
    const theme = useTheme();

    // add Button
    const [isOpenAddMenu, setOpenAddMenu] = useState(null);
    const handleOpenAddMenu = (event: any) => {
        setOpenAddMenu(event.currentTarget);
    };
    const handleCloseAddMenu = () => {
        setOpenAddMenu(null);
    };
    // end add Button

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

    const getRegisterForPartnerProgramURL = () => {
        return programId ? `https://digistore24.com/signup/${programId}/GermanWebDev/` : sources[0]?.signupLink
    }

    const getSalesPageURL = () => {
        return programId ? `https://www.digistore24.com/redir/${programId}/GermanWebDev/` : "https://www." + title
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return <Card sx={{overflow: "hidden", p: 4}}>
        <Box sx={{height: "100%", display: "flex", flexDirection: "column"}}>
            <Box sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <Box sx={{ alignSelf: "flex-start" }}>
                    {selectable && <Checkbox checked={selected} onClick={() => toggleSelected()}/>}
                </Box>
                <Box sx={{justifySelf: "flex-end", alignSelf: "flex-end", display: "flex", gap: ".6rem"}}>
                    {actionItems.map((actionItem: any, index: number) => <React.Fragment key={`${actionItem.title}-${index}`}>{actionItem(item, auth.isAuthenticated)}</React.Fragment>)}
                </Box>
            </Box>
            <Box className={classes.content}>
                <Box sx={{
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem"
                }}>
                    <Box sx={{flex: 1, height: "100%", alignSelf: "center"}}>
                        <ProductImageContainer>
                            <Box sx={{ background: () => theme.palette.grey[100], p: 2 }}><Image src={productImg} alt={productImg} sx={{maxHeight: "256px"}} /></Box>
                        </ProductImageContainer>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <Box>
                            <Typography color="textPrimary" variant="subtitle1" align={"left"}>
                                {title}
                            </Typography>
                            <Typography mb={2} color="textinfo" variant="caption" align={"left"}>
                                {fDate(created)}
                            </Typography>
                            <Box>
                                {!!categories?.length && <Grid my={2} spacing={1} container>
                                    {categories.slice(0, 5).map((categoryItem: any, index: number) => <Grid key={`${categoryItem.id}-${index}`} p={0} item><Chip
                                        className={classes.tagItem}
                                        size="small"
                                        title={`${categoryItem.title}`}
                                        label={`${categoryItem.title}`}/></Grid>)
                                    }</Grid>
                                }
                            </Box>
                        </Box>
                        <Box sx={(theme: any) => ({ display: "flex", gap: theme.spacing(4) })}>
                            <Box sx={(theme: any) => ({
                                width: "100%",
                                minHeight: "286px",
                                maxHeight: "286px",
                                borderRadius: "2px"
                            })}>
                                <Scrollbar
                                    sx={(theme: any) => ({
                                        // maxHeight: "256px",
                                        bgcolor: theme.palette.background.neutral,
                                        minHeight: "286px",
                                        height: "286px",
                                        "ul": {
                                            marginLeft: "2rem"
                                        }
                                    })}
                                    forceVisible="y" autoHide={true}>
                                    <Box
                                        py={2}
                                        px={6}
                                        sx={(theme: any) => ({
                                            minHeight: "286px",
                                            height: "100%",
                                            borderRadius: "2px"
                                        })}
                                    >
                                        <Typography variant={"body2"} component="span">
                                            {fRenderedHTML(toStylelessDocument(description))}
                                        </Typography>
                                    </Box>
                                </Scrollbar>
                            </Box>
                            <Box sx={(theme) => ({
                                minWidth: "420px",
                                minHeight: "286px",
                            })}>
                                <InformationContainer>
                                    {!!commissionInPercent && <InformationItem active={"true"} sx={{ minHeight: "58px" }}>
                                        <Typography color="white" variant="subtitle2" align={"left"}>
                                            Commission
                                        </Typography>
                                        <Box sx={(theme: any) => ({display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" })}>
                                            <Typography color="white" variant="subtitle2">
                                                {commissionInPercent} %
                                            </Typography>
                                            <PercentageBarChartComponent percentage={commissionInPercent} />
                                        </Box>
                                    </InformationItem>}
                                    {!!(earningsPerSale || commissionFixed) && <InformationItem active={!commissionInPercent ? "true" : "false"}>
                                        <Typography color={!commissionInPercent ? "white" : theme.palette.text.primary} variant="subtitle2" align={"left"}>
                                            Provision
                                        </Typography>
                                        <Typography color={!commissionInPercent ? "white" : theme.palette.text.primary} variant={!commissionInPercent ? "subtitle1" : "subtitle2"} align={"left"}>
                                            {earningsPerSale ? fCurrency(earningsPerSale) : fCurrency(commissionFixed)}
                                        </Typography>
                                    </InformationItem>}
                                    {!!averageSalesPrice && <InformationItem>
                                        <Typography color="textPrimary" variant="subtitle2" align={"left"}>
                                            Ø Verkaufspreis
                                        </Typography>
                                        <Typography color="textPrimary" variant="subtitle2" align={"left"}>
                                            {fCurrency(averageSalesPrice)}
                                        </Typography>
                                    </InformationItem>}
                                    {!!performance && <InformationItem>
                                        <Typography color="textPrimary" variant="subtitle2" align={"left"}>
                                            Popularität
                                        </Typography>
                                        <Typography color="textPrimary" variant="subtitle2" align={"left"}>
                                            <StyledRating
                                                name="performance"
                                                value={performance}
                                                size="small"
                                                readOnly
                                            />
                                        </Typography>
                                    </InformationItem>}
                                    <InformationItem sx={(theme: any) => ({ padding: theme.spacing(sources?.length > 4 ? 4 : 2) })}>
                                        <Typography color="textPrimary" variant="subtitle2" align={"left"}>
                                            Affiliate Netzwerke
                                        </Typography>
                                        <Box sx={(theme: any) => ({ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) })}>
                                            <ImageButton>
                                                {!!sources?.length > 0 ? sources.map((sourceItem: any, index: number) => <Tooltip key={`${sourceItem.id}-${index}`} title={sourceItem?.source?.title}><SourceBox href={sourceItem.signupLink} target="_blank">
                                                    <Image
                                                        src={sourceItem?.smallLogo ? partnerProgramsBackend.filesEndpoint + sourceItem?.smallLogo : "https://www.100partnerprogramme.de/filestore/icons/network/awin-neu.jpg"}
                                                        sx={{width: "20px", height: "20px"}}></Image>
                                                </SourceBox></Tooltip>) : <Tooltip title={"digistore24"}><SourceBox href={getRegisterForPartnerProgramURL()} target="_blank">
                                                    <Image
                                                        src={"https://www.digistore24.com/webinc/images/brand/digistore/favicons/favicon.png"}
                                                        sx={{width: "20px", height: "20px"}}></Image>
                                                </SourceBox></Tooltip>}
                                            </ImageButton>
                                        </Box>
                                    </InformationItem>
                                    <AnchorsItem sx={{flexGrow: 1, height: "100%"}}>
                                        <Box sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-end",
                                            alignItems: "flex-start"
                                        }}>
                                            <Link
                                                color="info"
                                                sx={{textAlign: "left"}}
                                                onClick={() => {
                                                    toggleExternalLink(item, getSalesPageURL())
                                                }}
                                                size="medium">Zur Sales Page</Link>
                                            <Link sx={{textAlign: "left"}} color="info" onClick={() => {
                                                toggleExternalLink(item, affiliateSupportURL)
                                            }} size="small">Zur
                                                Affiliate
                                                Support Page</Link>
                                        </Box>
                                        <Box sx={{
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "flex-end",
                                            alignSelf: "flex-end"
                                        }}>
                                            <Button
                                                sx={{width: "100%"}} color="info" variant="contained" target="_blank" size={"large"}  onClick={handleOpenAddMenu}><Icon icon={'akar-icons:link-chain'} sx={{ mr: theme.spacing(2) }} />Get Affiliate Link</Button>
                                            <Menu
                                                keepMounted
                                                id="affiliate-source-menu"
                                                anchorEl={isOpenAddMenu}
                                                open={Boolean(isOpenAddMenu)}
                                                onClose={handleCloseAddMenu}
                                            >
                                                {!!sources?.length > 0 ? sources.map((sourceItem, index) => <MenuItem key={`${sourceItem?.id}-${index}`} onClick={() => { window.open(sourceItem?.signupLink, '_blank').focus(); handleCloseAddMenu(); }} sx={{ display: "flex", gap: (theme) => theme.spacing(2) }}>
                                                    <Box>
                                                        <Image
                                                            src={sourceItem?.smallLogo ? partnerProgramsBackend.filesEndpoint + sourceItem?.smallLogo : "https://www.100partnerprogramme.de/filestore/icons/network/awin-neu.jpg"}
                                                            sx={{width: "20px", height: "20px"}} />
                                                    </Box>
                                                    <Box>
                                                        {sourceItem?.source?.title}
                                                    </Box>
                                                </MenuItem>) : <MenuItem onClick={() => { window.open(getRegisterForPartnerProgramURL(), '_blank').focus(); handleCloseAddMenu(); }} sx={{ display: "flex", gap: (theme) => theme.spacing(2) }}>
                                                    <Box>
                                                        <Image
                                                            src={"https://www.digistore24.com/webinc/images/brand/digistore/favicons/favicon.png"}
                                                            sx={{width: "20px", height: "20px"}} />
                                                    </Box>
                                                    <Box>
                                                        Digistore24
                                                    </Box>
                                                </MenuItem>}
                                            </Menu>
                                        </Box>
                                    </AnchorsItem>
                                </InformationContainer>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Card>
}