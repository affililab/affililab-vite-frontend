import React, {useEffect, useState} from "react"
import {
    Box,
    Button,
    DialogAnimate,
    DialogTitle, Icon,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    useAuth,
    useSnackbar
} from "my-lib"
import {useSelector} from '@store';
import {closeModal, openModal} from '@slices/profileSetup';
import {useMutation} from "@apollo/client";
import {GET_USER, UPDATE_PROFILE} from "@schemas/user";
import {Selection as CategorySelection} from "@resources/CategoryGroup/components/Selection"
import {GET_CAMPAIGN} from "@schemas";

const WizardContent = ({ finishCallback = () => {} }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [activeStep, setActiveStep] = useState(1);
    const selectedCategoriesState = useState([]);
    const selectedTargetGroupState = useState([]);

    const [selectedCategories] = selectedCategoriesState;
    const [selectedTargetGroups] = selectedTargetGroupState;

    const [updateProfileMutation, { error: updateProfileError }] = useMutation(UPDATE_PROFILE);

    const steps = [
        {
            label: 'Register',
            component: <></>,
        },
        {
            label: 'Select topics which are interesting to you',
            component: <Box sx={{display: "flex", height: "50vh", background: (theme: any) => theme.palette.background.neutral}}>
                <CategorySelection selectedState={selectedCategoriesState} />
            </Box>
        },
        // {
        //     label: 'Which Target Groups do prefer ?',
        //     component: <TargetGroupSelection selectedState={selectedTargetGroupState} />
        // }
    ];

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = async () => {
        // update profile
        await updateProfileMutation({ variables: { categories: selectedCategories }});
        await closeModal();
        enqueueSnackbar('Profile successfully completed!');
        finishCallback();
    };

    const handleNext = () => {
        if (activeStep + 1 >= steps.length) {
            handleFinish();
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                {activeStep > 1 ? <Button size={'large'} color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button> : <Box />}
                <Button size={'large'} variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    </Box>
}

export const ProfileSetupModal = () => {

    const {isAuthenticated, user} = useAuth();


    const {isModalOpen} = useSelector((state) => state.profileSetup);
    const {isModalOpen : isModalOpenAuth, mode} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) (!user?.preferred?.categories && user?.role?.title !== "admin" ) && openModal();
    }, [isAuthenticated]);

    return <DialogAnimate maxWidth={"xl"} open={isModalOpen && !isModalOpenAuth} onClose={() => closeModal()}>
        <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
            <DialogTitle variant={'subtitle1'}>Account Setup</DialogTitle>
            <IconButton aria-label="close" onClick={closeModal}>
                <Icon width={42}
                      height={42}
                      icon={'ei:close'}/>
            </IconButton>
        </Box>
        <WizardContent finishCallback={() => closeModal()} />
    </DialogAnimate>
}
