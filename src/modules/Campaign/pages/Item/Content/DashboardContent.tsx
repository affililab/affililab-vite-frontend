import React, {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    CarouselDots,
    CarouselSlider,
    CircularProgress,
    Grid,
    Icon,
    Typography,
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
/* end recommendet */
import {ComparisonChart} from "@resources/Product/components/ComparisonChart";
import {useLazyQuery} from "@apollo/client";
import {GET_PARTNERPROGRAMS_BY_IDS} from "@schemas";
import {SmallItem} from "@resources/Product/components/SmallItem";
import {DashboardTotalCard} from "@components/DashboardTotalCard";
import {useStats} from "@resources/Campaign/hooks/useStats";

export const DashboardContent = ({ campaign }) => {

    const theme = useTheme();

    const [getPartnerProgramsItems, {loading, error, data, called}] = useLazyQuery(GET_PARTNERPROGRAMS_BY_IDS);
    const [partnerPrograms, setPartnerPrograms] = useState([]);
    const [stats, setStats] = useState(null);

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

    const {getStats, loading: statsLoading} = useStats();

    /* TODO: outsource recommended code */
    const [recommendetPartnerPrograms, setRecommendetPartnerprograms] = useState([]);
    const [showPartnerProgramModal, setShowPartnerProgramModal] = useState(false);
    const [currentPartnerProgram, setCurrentPartnerProgram] = useState(null);

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
    const {getRecommendetByCampaign} = useRecommendet();

    useEffect(() => {
        const fetchData = async () => {
            const statsData = await getStats({variables: {id: campaign?.id }});
            setStats(statsData.data.getCampaignStats);
        }
        fetchData()
    }, [campaign]);

    useEffect(() => {
        const fetchData = async () => {
            if (!campaign.id) return;
            const data = await getRecommendetByCampaign(campaign.id);
            setRecommendetPartnerprograms(data);

            const partnerProgramsData = await getPartnerProgramsItems({variables: {ids: campaign?.partnerPrograms?.map(item => item?.id)}});
            setPartnerPrograms(partnerProgramsData.data.getPartnerProgramsByIds);
        }
        fetchData()
    }, [campaign]);
    /* end recommendet */
    return <>
        <Grid container spacing={3} sx={{my: 2}}>
            {/*<Grid item xs={12} md={12}>*/}
            {/*    <Stack direction={{xs: 'column', sm: 'row'}} spacing={3}>*/}
            {/*        <DevelopmentCard*/}
            {/*            title={"Income"}*/}
            {/*            color={"info"}*/}
            {/*            percent={20}*/}
            {/*            icon={'eva:diagonal-arrow-right-up-fill'}*/}
            {/*            chartData={[111, 136, 76, 108, 74, 54, 57, 200]}*/}
            {/*            total={18765}/>*/}
            {/*        <DevelopmentCard*/}
            {/*            title={"Income"}*/}
            {/*            percent={2.6}*/}
            {/*            color={"info"}*/}
            {/*            icon={'eva:diagonal-arrow-right-up-fill'}*/}
            {/*            chartData={[111, 136, 76, 108, 74, 54, 57, 484]}*/}
            {/*            total={18765}/>*/}
            {/*        <DevelopmentCard*/}
            {/*            title={"Income"}*/}
            {/*            percent={2.6}*/}
            {/*            color={"warning"}*/}
            {/*            icon={'eva:diagonal-arrow-right-up-fill'}*/}
            {/*            chartData={[111, 136, 76, 108, 74, 54, 57, 484]}*/}
            {/*            total={18765}/>*/}
            {/*    </Stack>*/}
            {/*</Grid>*/}
            <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Categories"
                                                                         loading={(statsLoading || !stats)}
                                                                         total={stats?.totalCategories}
                                                                         icon={<Icon width={48} height={48}
                                                                                        icon={"dashicons:screenoptions"}/>}/></Grid>
                    <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Target Groups"
                                                                         loading={(statsLoading || !stats)}
                                                                         total={stats?.totalTargetGroups}
                                                                         icon={<Icon width={48} height={48}
                                                                                        icon={"fluent:target-arrow-16-filled"}/>}/></Grid>
                    <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Tools"
                                                                         loading={(statsLoading || !stats)}
                                                                         total={stats?.totalTools}
                                                                         icon={<Icon width={48} height={48}
                                                                                        icon={"clarity:tools-line"}/>}/></Grid>
                    <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total Partner Programs"
                                                                         loading={(statsLoading || !stats)}
                                                                         total={stats?.totalPartnerPrograms}
                                                                         icon={<Icon width={48} height={48}
                                                                                        icon={"tabler:package"}/>}/></Grid>
                    <Grid item xs={12} md={6} xl={4}><DashboardTotalCard title="Total ELearning Resources"
                                                                         loading={(statsLoading || !stats)}
                                                                         total={stats?.totalELearningResources}
                                                                         icon={<Icon width={48} height={48}
                                                                                        icon={"bx:movie-play"}/>}/></Grid>
                </Grid>
            </Grid>
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
            <Grid item xs={8}>
                <Card sx={{p: 2}}>
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
                        <CarouselSlider {...{...settings, autoplay: false}}>
                            {!!recommendetPartnerPrograms?.length &&
                                <Box>
                                    <Typography variant="subtitle1">
                                        Vergleich der Empfohlenen Partnerprogramme
                                    </Typography>
                                    <ComparisonChart items={recommendetPartnerPrograms}/>
                                </Box>}
                            {!!partnerPrograms?.length && <Box>
                                <Typography variant="subtitle1">
                                    Vergleich der Partnerprogramme in der Kampagne
                                </Typography>
                                <ComparisonChart items={partnerPrograms}/>
                            </Box>}
                            {!!(recommendetPartnerPrograms?.length && partnerPrograms?.length) && <Box>
                                <Typography variant="subtitle1">
                                    Vergleich der Partnerprogramme in der Kampagne & der empfohlenen
                                </Typography>
                                <ComparisonChart items={[...recommendetPartnerPrograms, ...partnerPrograms]}/>
                            </Box>}
                        </CarouselSlider>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
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