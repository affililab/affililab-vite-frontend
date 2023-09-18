import React, {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    CarouselDots,
    CarouselSlider,
    CircularProgress,
    Container,
    Grid,
    Page,
    Typography,
    useAuthorization,
    useSettings,
    Icon,
    useTheme
} from "my-lib";
/* TODO: outsource recommendet */
import {useRecommendet} from "@resources/Product/hooks/useRecommendet";
import {useAddToCampaign} from "@resources/Campaign/hooks/useAddToCampaign";
import {ExternalProductsPageModal} from "@resources/Product/components";
import {useExternalLink} from "@resources/Product/hooks/useExternalLink";
import {PartnerProgramModal} from "@resources/Product/components/PartnerProgramModal";
import {AddToModal} from "@resources/Campaign/components/AddToModal";
import {useNoticedPartnerProgram} from "@resources/Product/hooks/useNoticedPartnerProgram";
import {DashboardTotalCard} from "@components/DashboardTotalCard";
import {useStats} from "../hooks/useStats";
import {SmallItem} from "@resources/Product/components/SmallItem";
/* end recommendet */

export default function () {

    const theme = useTheme();

    /* TODO: outsource recommended code */
    const [recommendetPartnerPrograms, setRecommendetPartnerprograms] = useState([]);
    const [showPartnerProgramModal, setShowPartnerProgramModal] = useState(false);
    const [currentPartnerProgram, setCurrentPartnerProgram] = useState(null);

    const {data: statsData, loading: statsLoading} = useStats();

    const toggleDetailedPartnerProgramModal = (partnerProgram) => {
        setCurrentPartnerProgram(partnerProgram);
        setShowPartnerProgramModal(!showPartnerProgramModal);
    }
    const {
        showExternalLinkModal,
        setShowExternalLinkModal,
        currentPartnerProgramLink,
        toggleExternalLink
    } = useExternalLink(setCurrentPartnerProgram);

    const {
        showNoticedPartnerPrograms,
        setShowNoticedPartnerPrograms,
        noticedPartnerPrograms,
        dipatchToggleNoticedPartnerProgram,
        handleCloseNoticedPartnerProgramsModal
    } = useNoticedPartnerProgram();

    const {
        showAddToCampaignModal,
        setShowAddToCampaignModal,
        addToCampaignItems,
        setAddToCampaignItems
    } = useAddToCampaign();
    const {getRecommendet} = useRecommendet();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecommendet();
            setRecommendetPartnerprograms(data);
        }
        fetchData()
    }, []);
    /* end recommendet */

    const {themeStretch} = useSettings();
    //
    const ability = useAuthorization();

    const settings = {
        speed: 1000,
        autoplaySpeed: 5000,
        dots: true,
        arrows: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: true,
        pauseOnHover: true,
        rtl: Boolean(theme.direction === 'rtl'),
        ...CarouselDots({position: 'absolute', right: 0, bottom: -12}),
    };

    return <>
        <Page title="Dashboard">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3} sx={{my: 2}}>
                    {<Grid item xs={12} md={12}>
                        <Grid container spacing={3}>
                            {/*<DevelopmentCard*/}
                            {/*    title={"Income"}*/}
                            {/*    color={"info"}*/}
                            {/*    percent={20}*/}
                            {/*    icon={'eva:diagonal-arrow-right-up-fill'}*/}
                            {/*    chartData={[111, 136, 76, 108, 74, 54, 57, 200]}*/}
                            {/*    total={18765}/>*/}
                            {/*<DevelopmentCard*/}
                            {/*    title={"Income"}*/}
                            {/*    percent={2.6}*/}
                            {/*    color={"info"}*/}
                            {/*    icon={'eva:diagonal-arrow-right-up-fill'}*/}
                            {/*    chartData={[111, 136, 76, 108, 74, 54, 57, 484]}*/}
                            {/*    total={18765}/>*/}
                            {/*<DevelopmentCard*/}
                            {/*    title={"Income"}*/}
                            {/*    percent={2.6}*/}
                            {/*    color={"warning"}*/}
                            {/*    icon={'eva:diagonal-arrow-right-up-fill'}*/}
                            {/*    chartData={[111, 136, 76, 108, 74, 54, 57, 484]}*/}
                            {/*    total={18765}/>*/}
                            <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Campaigns"
                                                                                 loading={(statsLoading && !statsData)}
                                                                                 total={statsData?.getStats?.totalCampaigns}
                                                                                 icon={<Icon width={48} height={48}
                                                                                                icon={"tabler:speakerphone"}/>}/></Grid>
                            <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Categories"
                                                                                 loading={(statsLoading && !statsData)}
                                                                                 total={(!statsLoading && statsData) ? statsData.getStats.totalCategories : <CircularProgress />}
                                                                                 icon={<Icon width={48} height={48}
                                                                                                icon={"dashicons:screenoptions"}/>}/></Grid>
                            <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Target Groups"
                                                                                 loading={(statsLoading && !statsData)}
                                                                                 total={statsData?.getStats?.totalTargetGroups}
                                                                                 icon={<Icon width={48} height={48}
                                                                                                icon={"fluent:target-arrow-16-filled"}/>}/></Grid>
                            <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Tools"
                                                                                 loading={(statsLoading && !statsData)}
                                                                                 total={statsData?.getStats?.totalTools}
                                                                                 icon={<Icon width={48} height={48}
                                                                                                icon={"clarity:tools-line"}/>}/></Grid>
                            <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Partner Programs"
                                                                                 loading={(statsLoading && !statsData)}
                                                                                 total={statsData?.getStats?.totalPartnerPrograms}
                                                                                 icon={<Icon width={48} height={48}
                                                                                                icon={"tabler:package"}/>}/></Grid>
                            <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total ELearning Resources"
                                                                                 loading={(statsLoading && !statsData)}
                                                                                 total={statsData?.getStats?.totalELearningResources}
                                                                                 icon={<Icon width={48} height={48}
                                                                                                icon={"bx:movie-play"}/>}/></Grid>
                        </Grid>
                    </Grid>}
                    <Grid item xs={4}>
                        <Card sx={{p: 2}}>
                            <Typography variant="subtitle1">
                                Empfohlene Partnerprogramme
                            </Typography>
                            <CardContent>
                                {!recommendetPartnerPrograms.length && <Box sx={{
                                    height: "256px",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <CircularProgress/>
                                </Box>}
                                <CarouselSlider {...settings}>
                                    {recommendetPartnerPrograms.map((partnerprogram, index) => (
                                        <Box sx={{px: 2}}>
                                            <SmallItem
                                                key={index}
                                                addToCampaign={(id) => {
                                                    setAddToCampaignItems([id]);
                                                    setShowAddToCampaignModal(true);
                                                }}
                                                toggleModal={toggleDetailedPartnerProgramModal}
                                                item={partnerprogram}
                                                isNoticed={noticedPartnerPrograms.find(item => item.id === partnerprogram.id)}
                                                toggleExternalLink={toggleExternalLink}
                                                toggleNoticedPartnerProgram={dipatchToggleNoticedPartnerProgram}/>
                                        </Box>
                                    ))}
                                </CarouselSlider>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
        {/* modals */}
        <AddToModal addToObjects={{partnerPrograms: addToCampaignItems}} isModalOpen={showAddToCampaignModal}
                    handleCloseModal={() => {
                        setShowAddToCampaignModal(false)
                    }} resource={"Products"}
        />
        <ExternalProductsPageModal
            open={showExternalLinkModal}
            item={currentPartnerProgram}
            link={currentPartnerProgramLink}
            isNoticed={currentPartnerProgram ? noticedPartnerPrograms.find(item => item.id === currentPartnerProgram.id) : false}
            noticedPartnerPrograms={noticedPartnerPrograms}
            toggleNoticedPartnerProgram={dipatchToggleNoticedPartnerProgram}
            handleClose={() => {
                setShowExternalLinkModal(false)
            }}/>
        <PartnerProgramModal
            isModalOpen={showPartnerProgramModal}
            toggleModal={toggleDetailedPartnerProgramModal}
            handleCloseModal={() => {
                setShowPartnerProgramModal(false)
            }}
            toggleNoticedPartnerProgram={dipatchToggleNoticedPartnerProgram}
            isNoticed={currentPartnerProgram ? noticedPartnerPrograms.find(item => item.id === currentPartnerProgram.id) : false}
            partnerprogram={currentPartnerProgram}
        />
        {/* end modals */}
    </>
}