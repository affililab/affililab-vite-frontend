import {
    Box,
    Button,
    DialogAnimate,
    DialogTitle,
    Icon,
    IconButton,
    Logo,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "my-lib";
import React, {FC, useState} from "react";
import {useSelector} from "@store";
import {useWelcomeModal} from "@resources/Intro/hooks/useWelcomeModal";
import {Selection} from "@resources/CategoryGroup/components/Selection";
import {
    CampaignSupportCategorySelection
} from "@resources/CampaignSupportCategory/components/CampaignSupportCategorySelection";

const IntroContent: FC<any> = ({ handleCloseModal = () => {} }) => {

    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            label: 'Willkommen bei Affililab',
            component: <Box sx={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "60vh"}}>
                <Typography variant={'subtitle1'}>Entdecke dein ideales Affiliate-Partnerprogramm</Typography>
                <Logo sx={{marginTop: 12, px: 12}} type={1} />
                <Typography align={'center'} sx={{marginTop: 12}} variant={'body2'}>
                    Finde mühelos das Partnerprogramm, das perfekt zu dir passt.
                </Typography>
            </Box>
        },
        {
            label: 'Partnerprogramme merken',
            component: <Box sx={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "60vh"}}>
                <Typography sx={{marginBottom: 12}} variant={'subtitle1'}>Merke dir interessante Partnerprogramme</Typography>
                <Icon  width={84}
                       height={84}
                       icon={"bi:bookmark-star-fill"}/>
                <Typography align={'center'} sx={{marginTop: 12, px: 12}} variant={'body2'}>
                    Behalte den Überblick über Programme, die dein Interesse geweckt haben.
                </Typography>
            </Box>
        },
        {
            label: 'Zu Kampagne hinzugügen',
            component: <Box sx={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "60vh"}}>
                <Typography sx={{marginBottom: 12}} variant={'subtitle1'}>Erstelle beeindruckende Kampagnen</Typography>
                <Icon  width={84}
                       height={84}
                       sx={(theme) => ({color: theme.palette.primary.main})} icon={"simple-icons:campaignmonitor"}/>
                <Typography align={'center'} sx={{marginTop: 12, px: 12}} element={'p'} variant={'body2'}>
                    Gestalte ansprechende Kampagnen und füge Partnerprogramme, Tools und Lernressourcen hinzu. Erhalte Empfehlungen für passende Partnerprogramme zu deiner Kampagne.
                </Typography>
            </Box>
        },
        {
            label: 'Product Finder Wizard',
            component: <Box sx={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "60vh"}}>
                <Typography sx={{ marginBottom: 12 }} variant={'subtitle1'}>Nutze den Product Finder Wizard</Typography>
                <Icon  width={84}
                       height={84}
                       sx={(theme) => ({marginTop: 12, color: theme.palette.primary.main })}
                       icon={"bxs:magic-wand"} />
                <Typography align={'center'} sx={{marginTop: 12, px: 12}} variant={'body2'}>
                    Erhalte personalisierte Empfehlungen für Partnerprogramme mit unserem Product Finder Wizard. Gib einfach an, welche Themen dich interessieren, wie viel Erfahrung du hast und welche Kanäle du bevorzugst.
                </Typography>
            </Box>
        }
    ];

    const handleNext = async () => {
        if (activeStep === steps.length -1) {
            handleCloseModal()
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                {activeStep <= steps.length -1  && <Button size={'large'} variant="contained" onClick={handleNext}>
                    { activeStep < steps.length -1 ? 'Next' : 'Finish' }
                    {activeStep < steps.length - 2 && <Icon sx={{ ml: 2 }} width={24}
                                                            height={24}
                                                            icon={'carbon:chevron-right'} />}
                </Button>}
            </Box>
        </Box>
    </Box>
}

export const IntroModal = ({  }) => {
    const {welcomeDone, handleCloseWelcomeModal} = useWelcomeModal();

    return (
        <DialogAnimate open={!welcomeDone} onClose={() => handleCloseWelcomeModal() }>
            <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <DialogTitle variant={'subtitle1'}></DialogTitle>
                <IconButton aria-label="close" onClick={handleCloseWelcomeModal}>
                    <Icon width={42}
                          height={42}
                          icon={'ei:close'}/>
                </IconButton>
            </Box>
            <IntroContent handleCloseModal={() => handleCloseWelcomeModal()} />
        </DialogAnimate>
    )
}