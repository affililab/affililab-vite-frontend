import {useState} from "react";
import {
    Box,
    Chip,
    Grid,
    Icon,
    Image,
    styled,
    Tab,
    Tabs,
    Typography,
    fCurrency,
    BaseOptionChart, ReactApexChart, useTheme, Rating
} from "my-lib";
import {capitalCase} from "change-case";
import {InformationContent} from "./InformationContent";
import {merge} from "lodash";

export const InformationTabs = ({item}) => {

    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState('General');

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
        cartConversionInPercent,
        cancellationRateInPercent,
        salaryModel,
        revenueType,
        vendor,
        created,
        processingTime,
        semHints,
        summary,
        rank,
        salespage,
        salesPageURL,
        targetGroups,
        trackingTypes,
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

    const SourceBox = styled(Box)(({theme}) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "32px",
        width: "32px",
        border: `solid 1px ${theme.palette.divider}`,
        borderRadius: "2px"
    }));

    const StyledRating = styled(Rating)(({theme}) => ({
        '& .MuiRating-iconFilled': {
            color: theme.palette.primary.main
        },
        '& .MuiRating-iconEmpty': {
            color: theme.palette.grey[500_48]
        }
    }));

    const CategoriesRenderer = (value) => ( !!value.length ? <Grid spacing={1} container>
        {value.map((valueItem, index) => <Grid item><Chip key={index}
                                                          sx={{maxWidth: "212px"}}
                                                          size="small"
                                                          title={`${valueItem.title}`}
                                                          label={`${valueItem.title}`}/></Grid>)
        }
    </Grid> : 'Keine Angabe');

    const CategoryRenderer = (value) => (!!value ? <Chip
        sx={{maxWidth: "212px"}}
        size="small"
        title={`${value.title}`}
        label={`${value.title}`}/> : 'Keine Angabe');

    const SourcesRenderer = (value) => <Box sx={(theme) => ({ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) })}>
        {!!(value?.length) ? value?.map(sourceItem => <SourceBox>
            <Image
                src={"https://www.100partnerprogramme.de/filestore/icons/network/awin-neu.jpg"}
                sx={{width: "20px", height: "20px"}}></Image>
        </SourceBox>) : <SourceBox>
            <Image
                src={"https://www.digistore24.com/webinc/images/brand/digistore/favicons/favicon.png"}
                sx={{width: "20px", height: "20px"}}></Image>
        </SourceBox>}
    </Box>;

    const SubproductsRenderer = (value) => ( !!value?.length ? <Grid spacing={1} container>
        {value?.map((valueItem, index) => <Grid item><Chip key={index}
                                                          sx={{maxWidth: "212px"}}
                                                          size="small"
                                                          title={`${valueItem}`}
                                                          label={`${valueItem}`}/></Grid>)
        }
    </Grid> : 'Keine Angabe');

    const PercentageRenderer = (value) =>  (!!value ? <Box sx={(theme) => ({display: "flex", alignItems: "center", gap: theme.spacing(2) })}>
            <ReactApexChart
                options={chartOptions(value)}
                width={112}
                height={8}
                type="bar"
                series={[{
                    data: [value]
                }]}
            />
            <Typography color="textPrimary" variant="body2">
                {value} %
            </Typography>
        </Box> : 'Keine angabe')

    const RatingRenderer = (value) =>  (!!value ? <StyledRating
        name="performance"
        value={performance}
        size="small"
        readOnly
    /> : 'Keine angabe')

    // tabs
    const INFORMATION_TABS = [
        {
            value: 'General',
            icon: <Icon icon={'charm:credit-card'} width={20} height={20}/>,
            component: <InformationContent informationItems={[
                {
                    title: "Provision %",
                    component: PercentageRenderer(provisionInPercent)
                },
                {
                    title: "Bezahlarten",
                    component: CategoriesRenderer(salaryModel)
                },
                {
                    title: "Vergütungsmodell",
                    component: CategoryRenderer(revenueType)
                },
                {
                    title: "Affiliate Netzwerke",
                    component: SourcesRenderer(sources)
                },
                {
                    title: "Kategorien",
                    component: CategoriesRenderer(categories)
                },
                {
                    title: "Produkte",
                    component: SubproductsRenderer(products)
                },
                {
                    title: "Provision",
                    component:  <Typography color="textPrimary" variant="body1" align={"left"}>
                            {(earningsPerSale || provisionFixed) ? earningsPerSale ? fCurrency(earningsPerSale) : fCurrency(provisionFixed) : "Keine Angabe"}
                        </Typography>
                },
                {
                    title: "Ø Verkaufspreis",
                    component:  <Typography color="textPrimary" variant="body1"
                                            align={"left"}>{averageSalesPrice ? fCurrency(averageSalesPrice) : "Keine Angabe"}</Typography>
                },
                {
                    title: "Bearbeitungszeit",
                    component: <Typography color="textPrimary" variant="body1" align={"left"}>{processingTime ? processingTime + ' Tage' : 'Keine Angabe'}</Typography>
                }
            ]}/>
        },
        {
            value: 'Advertising',
            icon: <Icon icon={'bi:badge-ad'} width={20} height={20}/>,
            component: <InformationContent informationItems={[
                {
                    title: "Zielgruppen",
                    component: CategoriesRenderer(targetGroups)
                },
                {
                    title: "Marketing Assets",
                    component: CategoriesRenderer(advertismentAssets)
                },
                {
                    title: "Tracking",
                    component: CategoriesRenderer(trackingTypes)
                },
                {
                    title: "Tracking Lifetime",
                    component: <Typography color="textPrimary" variant="body2" align={"left"}>{trackingLifetime} Tage</Typography>
                }
            ]}/>
        },
        {
            value: 'Performance',
            icon: <Icon icon={'charm:chart-line'} width={20} height={20}/>,
            component: <InformationContent informationItems={[
                {
                    title: "Popularität",
                    component: RatingRenderer(performance)
                },
                {
                    title: "Ranking",
                    component: <Typography color="textPrimary" variant="body2" align={"left"}>{rank ?? 'Keine Angabe'}</Typography>
                },
                {
                    title: "Conversionrate",
                    component: PercentageRenderer(cartConversionInPercent)
                },
                {
                    title: "Stornoquote",
                    component: PercentageRenderer(cancellationRateInPercent)
                }
            ]}/>
        }
    ];

    return <Box sx={(theme) => ({height: "100%", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"})}>
        <Tabs
            sx={{ height: "52px" }}
            value={currentTab}
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            onChange={(e, value) => setCurrentTab(value)}>
            {INFORMATION_TABS.map((tab, index) => (
                <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value}/>
            ))}
        </Tabs>
        <Box mt={2} sx={(theme) => ({
            // height: "calc(100% - 52px)",
            flex: 1,
            p: theme.spacing(2),
            backgroundColor: theme.palette.background.neutral
        })}>
            {INFORMATION_TABS.find(tab => tab.value === currentTab)?.component}
        </Box>
    </Box>
}