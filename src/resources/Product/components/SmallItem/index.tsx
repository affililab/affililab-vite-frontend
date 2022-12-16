import {
    BaseOptionChart,
    Box,
    Card,
    Icon, IconButton,
    Image,
    makeStyles,
    Rating,
    styled,
    SVGIcon,
    ToggleButton,
    Tooltip,
    Typography,
    useAuth,
    useTheme
} from 'my-lib';
import {merge} from "lodash";
import React, {useState} from "react";

const useStyles = makeStyles(theme => ({
    content: {
        height: "100%"
    },
    tagItem: {
        maxWidth: 200
    }
}));

const ToolIconBox = styled(Box)(({theme}) => ({
    // ...cssStyles().bgBlur({ blur: 0, color: theme.palette.primary.darker }),
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100,
    width: 48,
    height: 48,
    zIndex: 11,
    left: 0,
    right: 0,
    bottom: -16,
    position: 'absolute',
}));

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.neutral,
    minHeight: "124px"
}));

const SourceBox = styled('a')(({theme}) => ({
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    height: "32px",
    width: "32px",
    border: `solid 1px ${theme.palette.divider}`,
    borderRadius: "2px"
}));

const InformationContainer = styled(Box)(({theme, sx}) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    ...sx
}));

const InformationItem = styled(Box)(({theme, sx}) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.palette.mode === "dark" ? "rgba(24, 144, 255, 0.2)" : theme.palette.info.lighter,
    minHeight: "42px",
    borderBottom: theme.palette.mode === "dark" ? "1px solid rgba(24, 144, 255, 0.41)" : "1px solid " + theme.palette.info.light,
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
    border: `solid 1px ${theme.palette.divider}`,
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

const toStylelessDocument = (htmlString) => {
    // TODO: with regex remove styles
    const regex = /style="(.*?)"/gm;
    const subst = ``;

// The substituted value will be contained in the result variable
    return htmlString.replace(regex, subst);
}

export const SmallItem = ({
                         item,
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
    const handleOpenAddMenu = (event) => {
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
        provisionInPercent,
        provisionFixed,
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
        advertismentAssets,
        sources,
        createdAt,
        updatedAt
    } = item;

    const chartOptions = (value) => ( merge(BaseOptionChart(), {
        chart: {
            type: "bar",
            offsetY: -8,
            stacked: true,
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            width: 0,
            curve: 'smooth',
            lineCap: 'round'
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "100%",
                borderRadius: 0,
                colors: {
                    backgroundBarColors: [theme.palette.grey[500_48]],
                }
            }
        },
        colors: [theme.palette.primary.lighter],
        tooltip: {
            enabled: false
        },
        subtitle: {
            enabled: false,
        },
        xaxis: {
            categories: ["Process 1"]
        },
        yaxis: {
            max: 100
        },
        fill: {
            opacity: 1,
            type: "gradient",
            gradient: {
                gradientToColors: [theme.palette.primary.darker],
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 1
            }
        },
    }));

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


    return <Box sx={{textAlign: 'center', paddingBottom: 0}}>
        <Box sx={{p: 0}}>
            <Box sx={(theme) => ({position: 'relative', display: "flex", flexDirection: "column", backgroundColor: theme.palette.background.neutral})}>
                <Box sx={{alignSelf: "flex-end", display: "flex", gap: ".6rem", p: 2}}>
                    {actionItems.map(actionItem => actionItem(item, auth.isAuthenticated))}
                </Box>
                <SVGIcon
                    src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
                    sx={{
                        width: 144,
                        height: 62,
                        zIndex: 10,
                        left: 0,
                        right: 0,
                        bottom: -26,
                        mx: 'auto',
                        position: 'absolute',
                        color: 'background.paper',
                    }}
                />
                <ToolIconBox sx={{
                    left: 0,
                    right: 0,
                    bottom: -16,
                    mx: 'auto',
                    position: 'absolute',
                    p: 2
                }}>
                    <Icon icon={'eos-icons:product-subscriptions-outlined'} sx={{
                        color: "white",
                        width: "100%",
                        height: "100%"
                    }}/>
                </ToolIconBox>
                <PrimaryColoredBox>
                    <Image sx={{width: "164px", maxHeight: "164px", backgroundColor: "white"}} src={productImg}/>
                </PrimaryColoredBox>
            </Box>
            <Typography variant="subtitle2" sx={{mt: 6, mb: 2, p: 2, height: "48px"}}>
                {title}
            </Typography>
            {/*{ withDescription && <Typography variant="body2" sx={{align: "center", px: 4, pb: 2, height: "84px"}}>*/}
            {/*    <TextMaxLine line={3}>*/}
            {/*        {fRenderedHTML(description)}*/}
            {/*    </TextMaxLine>*/}
            {/*</Typography>}*/}
        </Box>
    </Box>
}

export const SkeletonItem = () => {
    return <Card sx={{height: "456px", overflow: "hidden", p: 4}}>loading</Card>
}