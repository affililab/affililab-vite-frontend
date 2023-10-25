import clsx from 'clsx';
import React, {FC} from 'react';
import {
    BaseOptionChart,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    fCurrency,
    fRenderedHTML,
    Grid,
    Icon,
    Image,
    makeStyles,
    Paper,
    Rating,
    ReactApexChart,
    Scrollbar,
    ToggleButton,
    Tooltip,
    Typography,
    useAuth,
    useTheme
} from 'my-lib';
import {merge} from 'lodash';


const useStyles = makeStyles((theme: any) => ({
    root: {
        // position: 'relative'
    },
    cardMediaWrap: {
        // display: "flex",
        // width: "100%",
        // gap: "2rem",
        // flexWrap: "wrap",
        // alignItems: "center"
    },
    productImage: {
        background: theme.palette.grey[0]
    },
    cardMediaImageWrap: {
        width: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
    },
    cardMedia: {
        // paddingTop: "2rem",
        maxHeight: '200px',
        // width: "100px"
    },
    tagWrapper: {
        display: "flex",
        flexWrap: "wrap"
    },
    tagItem: {
        margin: ".1rem",
        maxWidth: 200
    }
}));

const _isEmpty = (value: any) => {
    return typeof value !== "undefined" && value !== null;
};

export const PartnerProgramsItem: FC<any> = ({
                                        toggleExternalLink,
                                        addToCampaign,
                                        detailed,
                                        toggleModal,
                                        toggleNoticedPartnerProgram,
                                        isNoticed,
                                        active,
                                        partnerprogram,
                                        actionItems = [
                                            (item: any, isAuthenticated: boolean) => isAuthenticated && <Box>
                                                <Tooltip title={ "add to campaign" } arrow>
                                                    <ToggleButton value={isNoticed} onClick={() => addToCampaign(item.id)} color="primary" aria-label="add to campaign">
                                                        <Icon sx={(theme) => ({height: 20, width: 20, color: theme.palette.primary.dark })} icon={"codicon:add"}/>
                                                    </ToggleButton>
                                                </Tooltip>
                                            </Box>,
                                            (item: any) => <Box>
                                                <Tooltip title={ isNoticed ? "nicht mehr merken" : "merken"} arrow>
                                                    <ToggleButton value={isNoticed} onClick={() => toggleNoticedPartnerProgram(item)} color="primary" aria-label="toggle noticed partnerprogram">
                                                        <Icon sx={(theme) => ({height: 20, width: 20, color: theme.palette.primary.dark })} icon={isNoticed ? "bi:bookmark-star-fill" : "bi:bookmark-star"}/>
                                                    </ToggleButton>
                                                </Tooltip>
                                            </Box>,
                                            (item: any) => <Box>
                                                <Tooltip title={"öffnen"} arrow>
                                                    <ToggleButton value="checked"  onClick={() => toggleModal(partnerprogram)} color="primary" aria-label={"open partnerprogram"}>
                                                        <Icon sx={(theme) => ({height: 20, width: 20, color: theme.palette.primary.dark })} icon={"tabler:arrows-maximize"}/>
                                                    </ToggleButton>
                                                </Tooltip>
                                            </Box>
                                        ],
                                        className,
                                        ...rest
                                    }) => {
    const theme = useTheme();
    const auth = useAuth();
    const chartOptions = merge(BaseOptionChart(), {
        chart: {
            sparkline: {enabled: true},
            animations: {
                enabled: false
            }
        },
        legend: {show: false},
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: [
                    [
                        {offset: 0, color: theme.palette.primary.light},
                        {offset: 100, color: theme.palette.primary.main}
                    ]
                ]
            }
        },
        stroke: {
            width: 1,
            curve: 'smooth',
            lineCap: 'round'
        },
        plotOptions: {
            radialBar: {
                hollow: {size: '78%'},
                track: {margin: 0},
                dataLabels: {
                    name: {show: false},
                    value: {
                        offsetY: 6,
                        color: theme.palette.text.primary,
                        fontSize: theme.typography.subtitle2.fontSize
                    },
                }
            }
        }
    });
    const classes = useStyles();
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
        salesPageUrl,
        targetGroups,
        directActivation,
        affiliateSupportURL,
        advertisementAssets,
        sources,
        createdAt,
        updatedAt
    } = partnerprogram;

    const replaceColorWithThemeColor = (html: string) => {
        let clearedHtml = html;
        clearedHtml = clearedHtml.replace('color: rgb(0, 0, 0);"', '');
        clearedHtml = clearedHtml.replace('color: rgb(255, 255, 255);"', '');
        return clearedHtml;
    };

    const getSalesPageURL = () => {
        console.log(salesPageUrl);
        return programId ? `https://www.digistore24.com/redir/${programId}/GermanWebDev/` : salesPageUrl ?? "https://www." + title;
    };

    const getRegisterForPartnerProgramURL = () => {
        return programId ? `https://digistore24.com/signup/${programId}/GermanWebDev/` : sources[0]?.signupLink;
    };

    return <Card sx={{p: 4}}>
        <Box sx={{ float: "right", display: "flex", gap: 2 }}>
            {/*{auth.isAuthenticated && <Box>*/}
            {/*    <Tooltip title={ "add to campaign" } arrow>*/}
            {/*        <ToggleButton value={isNoticed} onClick={() => addToCampaign(partnerprogram.id)} color="primary" aria-label="add to campaign">*/}
            {/*            <Icon sx={{height: 20, width: 20, color: theme.palette.primary.dark }} icon={"carbon:add-alt"}/>*/}
            {/*        </ToggleButton>*/}
            {/*    </Tooltip>*/}
            {/*</Box>}*/}
            {/*<Box>*/}
            {/*    <Tooltip title={ isNoticed ? "nicht mehr merken" : "merken"} arrow>*/}
            {/*        <ToggleButton value={isNoticed} onClick={() => toggleNoticedPartnerProgram(partnerprogram)} color="primary" aria-label="toggle noticed partnerprogram">*/}
            {/*            <Icon sx={{height: 20, width: 20, color: theme.palette.primary.dark }} icon={isNoticed ? "bi:bookmark-star-fill" : "bi:bookmark-star"}/>*/}
            {/*        </ToggleButton>*/}
            {/*    </Tooltip>*/}
            {/*</Box>*/}
            {/*<Box>*/}
            {/*    <Tooltip title={detailed ? "schließen" : "öffnen"} arrow>*/}
            {/*        <ToggleButton value="checked"  onClick={() => toggleModal(partnerprogram)} color="primary" aria-label={detailed ? "close partnerprogram" : "open partnerprogram"}>*/}
            {/*            <Icon sx={{height: 20, width: 20, color: theme.palette.primary.dark }} icon={detailed ? "tabler:arrows-minimize" : "tabler:arrows-maximize"}/>*/}
            {/*        </ToggleButton>*/}
            {/*    </Tooltip>*/}
            {/*</Box>*/}

            {actionItems.map((item: any) => item(partnerprogram, auth.isAuthenticated))}
        </Box>
        <Grid spacing={3} sx={{flexWrap: "nowrap"}} container justifyContent={"space-between"}
              className={clsx(classes.root, className)} {...rest}>
            <Grid xs={2} sx={{alignSelf: "center"}} className={clsx(classes.cardMediaWrap)} item>
                <Image src={productImg} alt={productImg} className={clsx(classes.productImage)} sx={{maxHeight: "214px"}}/>
            </Grid>

            <Grid xs={6} item>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "space-between"}}>
                    <Grid direction={"column"} container>
                        <Typography sx={{marginBottom: "2rem"}} color="textPrimary" variant="subtitle1" align={"left"}>
                            {title}
                        </Typography>
                        <div style={{width: "100%", height: detailed ? "512px" :  "256px" }}>
                            <Scrollbar forceVisible="y" autoHide={true}>
                                <Paper
                                    variant="outlined"
                                    sx={{p: 4, height: "auto", bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[500_48] : theme.palette.background.neutral }}
                                >
                                    <Typography variant={"body2"} component="span">
                                        {fRenderedHTML(description)}
                                    </Typography>
                                </Paper>
                            </Scrollbar>
                        </div>
                    </Grid>
                    <Divider component={"div"} orientation="vertical" style={{height: "100%"}}/>
                </Box>
            </Grid>
            <Grid xs={4} item>
                {/* button container */}
                <Grid sx={{height: "100%"}} direction={"column"} justifyContent={"space-between"} container>
                    <Grid sx={{alignSelf: "flex-end"}} item>
                        {commissionInPercent !== null && <ReactApexChart
                            width={86}
                            height={86}
                            type="radialBar"
                            series={[commissionInPercent]}
                            options={chartOptions}
                        />}
                    </Grid>
                    <Grid item>
                        {!!earningsPerSale && <Typography sx={{color: "info.main"}} variant={"body1"} component="span">
                            Verdienst pro Verkauf ca. <b>{earningsPerSale && fCurrency(earningsPerSale)}</b>
                        </Typography>}

                        {!!performance && <div>
                            <Typography component="legend">Popularität</Typography>
                            <Rating
                                name="performance"
                                value={performance}
                                size="small"
                                readOnly
                            />
                        </div>}

                        {_isEmpty(cancellationRateInPercent) && <Chip className={clsx(classes.tagItem)} size="small"
                                                                      title={`Stornoquote: ${cancellationRateInPercent}%`}
                                                                      label={`Stornoquote: ${cancellationRateInPercent}%`}/>}

                        {/* TODO: show average salesprice */}
                        {/*<Typography variant={"body1"} component="legend">Verkaufspreis:</Typography>*/}
                        {/*{_isEmpty(averageSalesPrice) && <div><Chip className={clsx(classes.tagItem)} size="small"*/}
                        {/*                                           title={`${fCurrency(averageSalesPrice)}`}*/}
                        {/*                                           label={`${fCurrency(averageSalesPrice)}`}/></div>}*/}

                        <div className={clsx(classes.tagWrapper)}>


                            {!!categories?.length &&
                                <Typography variant={"body1"} component="legend">Kategorie:</Typography>}
                            {!!categories?.length && <div>
                                {categories.map((categoryItem, index) => <Chip key={index}
                                                                               className={clsx(classes.tagItem)}
                                                                               size="small"
                                                                               title={`${categoryItem.title}`}
                                                                               label={`${categoryItem.title}`}/>)
                                }</div>
                            }


                            {/* targetGroups */}
                            {!!targetGroups?.length && <div>
                                <Typography variant={"body1"} component="legend">Zielgruppen:</Typography>
                                <div className={clsx(classes.tagWrapper)}>
                                    {targetGroups.map((targetGroupItem, index) => <Chip key={index}
                                                                                        className={clsx(classes.tagItem)}
                                                                                        size="small"
                                                                                        title={`${targetGroupItem.title}`}
                                                                                        label={`${targetGroupItem.title}`}/>)}
                                </div>
                            </div>}
                        </div>
                    </Grid>
                    <Grid item>
                        <Grid spacing={2} direction={"column"} container>
                            <Grid item>
                                <Grid spacing={2} justifyContent={"space-between"} container>
                                    <Grid item>
                                        <Button
                                            color="info"
                                            onClick={() => { toggleExternalLink(partnerprogram, getSalesPageURL()) }}
                                            size="small">Zur Sales Page</Button>
                                    </Grid>
                                    {affiliateSupportURL && <Grid item>
                                        <Button color="info" onClick={() => { console.log("affiliateSupportURL", affiliateSupportURL); toggleExternalLink(partnerprogram, affiliateSupportURL) }} size="small">Zur
                                            Affiliate
                                            Support Page</Button>
                                    </Grid>}
                                </Grid>
                            </Grid>
                            <Grid sx={{alignSelf: "flex-end", width: "100%"}} item>
                                <Button sx={{width: "100%"}} color="info" variant="contained" target="_blank"
                                        href={getRegisterForPartnerProgramURL()}
                                        size="large">Registrieren</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid></Card>
};