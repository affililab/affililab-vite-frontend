import React, {FC, useState} from "react";
import {
    Box,
    Button, CircularProgress,
    DialogAnimate,
    DialogTitle, Grid,
    Icon,
    IconButton, Scrollbar,
    Step,
    StepLabel,
    Stepper, Tooltip, Typography,
    varScale,
    varTranEnter
} from "my-lib";
import {Selection} from "@resources/CategoryGroup/components/Selection"
import {SelectItems} from "@resources/Tools/components/SelectItems";
import {
    CampaignSupportCategorySelection
} from "@resources/CampaignSupportCategory/components/CampaignSupportCategorySelection";
import {MarketingChannelsSelection} from "@resources/Product/components/WizardModal/MarketingChannelsSelection";
import {useRecommendet} from "@resources/Product/hooks/useRecommendet";
import {Item} from "@resources/Product/components/Item";
import {useNoticedPartnerProgram} from "@resources/Product/hooks/useNoticedPartnerProgram";
import {toggleNoticedPartnerProgram} from "@slices/noticedPartnerPrograms";

const WizardContent: FC<any> = ({ toggleDetailedModal = () => {} }) => {

    const {
        showNoticedPartnerPrograms,
        setShowNoticedPartnerPrograms,
        noticedPartnerPrograms,
        dipatchToggleNoticedPartnerProgram,
        handleCloseNoticedPartnerProgramsModal
    } = useNoticedPartnerProgram();

    const { getRecommendedByPreferences } = useRecommendet();

    const [recommendations, setRecommendations] = useState(null);
    const [loadingRecommendations, setLoadingRecommendations] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const selectedCategoriesState = useState([]);
    const selectedCampaignSupportCategoryState = useState([]);
    const selectedToolsState = useState([]);
    const selectedMarketingChannelsState = useState([]);
    const [selectedCategories, setSelectedCategories] = selectedCategoriesState;
    const [selectedCampaignSupportCategory, setSelectedCampaignSupportCategoryState] = selectedCampaignSupportCategoryState;
    const [selectedTools, setSelectedTools] = selectedToolsState;
    const [selectedMarketingChannels, setSelectedMarketingChannels] = selectedMarketingChannelsState;

    const steps = [
        {
            label: 'Select topics which are interesting to you',
            state: selectedCategoriesState,
            min: 1,
            max: 2,
            component: <Box sx={{display: "flex", height: "60vh", background: (theme: any) => theme.palette.background.neutral}}>
                <Selection selectedState={selectedCategoriesState} />
            </Box>
        },
        {
            label: 'In which fields you already have experience',
            state: selectedCampaignSupportCategoryState,
            min: 0,
            max: 2,
            component: <Box sx={{display: "flex", height: "60vh", background: (theme: any) => theme.palette.background.neutral}}>
                <CampaignSupportCategorySelection selectedState={selectedCampaignSupportCategoryState} />
            </Box>
        },
        // {
        //     label: 'Which tools do you already use ?',
        //     component: <Box sx={{display: "flex", height: "60vh", background: (theme: any) => theme.palette.background.neutral}}>
        //         <SelectItems selected={selectedTools}
        //                      setSelected={setSelectedTools} isSelection />
        //     </Box>
        // },
        {
            label: 'What are you prefered Marketing Channels ?',
            state: selectedMarketingChannelsState,
            min: 0,
            max: 2,
            component: <Box sx={{display: "flex", height: "60vh", background: (theme: any) => theme.palette.background.neutral}}>
                <MarketingChannelsSelection selectedState={selectedMarketingChannelsState} />
            </Box>
        },
        {
            label: 'Recommendations',
            component: <Box sx={{display: "flex", flex: 1, height: "60vh", background: (theme: any) => theme.palette.background.neutral}}>
                {loadingRecommendations && <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                    <Typography variant="body1" component="p" ml={2}>Loading Recommendations</Typography>
                </Box>}
                {(!loadingRecommendations && recommendations) && <Scrollbar sx={{ display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    ".simplebar-content-wrapper": {
                        // height: "100%",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    },
                    ".simplebar-content": {
                        // height: "100%",
                        flex: 1
                    }
                }} forceVisible="y" autoHide={false} style={{height: "100%"}}>
                    <Grid p={2} rowSpacing={3} container alignItems="center" justifyContent="center" spacing={4}>
                        {recommendations.map((partnerprogram: any, index: number) => (
                            <Grid key={index} item xs={12}><Item
                                actionItems={[
                                    (item: any) => <Box>
                                        <Tooltip
                                            title={"merken"}
                                            arrow>
                                            <IconButton
                                                sx={(theme: any) => ({
                                                    color: theme.palette.text.secondary,
                                                    height: "42px",
                                                    width: "42px"
                                                })}
                                                value={noticedPartnerPrograms.find(item => item.id === partnerprogram.id) ? 'checked' : 'unchecked'}
                                                onClick={() => dipatchToggleNoticedPartnerProgram(item)}
                                                color="info"
                                                aria-label="toggle noticed partnerprogram"
                                            >
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    sx={(theme) => ({
                                                        color: theme.palette.primary.dark
                                                    })}
                                                    icon={noticedPartnerPrograms.find(item => item.id === partnerprogram.id) ? "bi:bookmark-star-fill" : "bi:bookmark-star"}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                ]}
                                item={partnerprogram}
                                isNoticed={noticedPartnerPrograms.find(item => item.id === partnerprogram.id)}
                                toggleNoticedPartnerProgram={dipatchToggleNoticedPartnerProgram}
                            /></Grid>))}
                    </Grid></Scrollbar>}
            </Box>
        },
        // {
        //     label: 'We found following Partnerprograms for you',
        //     component: <>Step 4</>
        // },
        // {
        //     label: 'Comparison of Partnerprograms',
        //     component: <>Step 5</>
        // },
        // {
        //     label: 'Select Products to add to your first Campaign',
        //     component: <>Step 6</>
        // },
        // {
        //     label: 'We suggest following Tools',
        //     component: <>Step 7</>
        // },
        // {
        //     label: 'We suggest following Learning Material',
        //     component: <>Step 7</>
        // },
        // {
        //     label: 'Continue',
        //     component: <>Redirect to Campaign or stay and Close + Toast to create successfully the campaign</>
        // }
    ];

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleBack = () => {
        if (activeStep >= steps.length - 1) {
            setRecommendations(null);
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = async () => {
        if (activeStep >= steps.length - 1) {
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep >= steps.length - 2) {
            setLoadingRecommendations(true)
            const recommendations = await getRecommendedByPreferences(selectedCategories, selectedCampaignSupportCategory, selectedTools, selectedMarketingChannels);
            setLoadingRecommendations(false)
            setRecommendations(recommendations)
        }
    };

    return <Box sx={{overflow: "hidden"}}>
        <Stepper sx={{p: 2}} activeStep={activeStep} alternativeLabel>
            {steps.map((stepItem, index) => {
                const {label } = stepItem;
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>

        {steps[activeStep].component}

        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 2,
            boxShadow: (theme) => theme.customShadows.z12,
        }}>
            <Box sx={{justifySelf: "flex-end",  width: "100%", justifyContent: "space-between", display: "flex", gap: (theme) => theme.spacing(2)}}>
                <Button size={'large'} color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                    {steps[activeStep]?.state && 'Gewählt: ' + steps[activeStep]?.state[0]?.length + ' Wähle zwischen ' + steps[activeStep].min + ' und ' + steps[activeStep].max}
                    {activeStep <= steps.length - 2 && <Button disabled={!(steps[activeStep]?.state[0]?.length >= steps[activeStep]?.min && steps[activeStep]?.state[0]?.length <= steps[activeStep]?.max)} size={'large'} variant="contained" onClick={handleNext}>
                        {activeStep === steps.length - 2 ? 'load recommendations' : 'Next'}
                        {activeStep < steps.length - 2 && <Icon sx={{ ml: 2 }} width={24}
                                                                height={24}
                                                                icon={'carbon:chevron-right'} />}
                    </Button>}
                    {activeStep === steps.length - 1 && <Button disabled={loadingRecommendations} target={"_blank"} href={"https://forms.gle/neQ4iaDqyc1UZtU58"} size={'large'} variant="contained" onClick={handleNext}>
                        Zur Umfrage
                    </Button>}
                </Box>
            </Box>
        </Box>
    </Box>
}

export const WizardModal = ({ isModalOpen, handleCloseModal }) => {
    return (
        <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
            <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <DialogTitle variant={'subtitle1'}>Product Finding Wizard</DialogTitle>
                <IconButton aria-label="close" onClick={handleCloseModal}>
                    <Icon width={42}
                          height={42}
                          icon={'ei:close'}/>
                </IconButton>
            </Box>
            <WizardContent  />
        </DialogAnimate>
    )
}