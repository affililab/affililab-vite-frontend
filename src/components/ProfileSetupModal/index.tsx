import React, { useState, useEffect } from "react"
import {
    DialogTitle, DialogAnimate, useAuth, Button, Box, Stepper, StepLabel, Step, useSnackbar
} from "my-lib"
import {useSelector} from '@store';
import {openModal, closeModal} from '@slices/profileSetup';

import { CategorySelection } from "@resources/Category/components/CategorySelection"
import { TargetGroupSelection } from "@resources/TargetGroup/components/TargetGroupSelection"
import {useMutation} from "@apollo/client";
import {UPDATE_PROFILE} from "@schemas/user";

const WizardContent = ({ finishCallback = () => {} }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [activeStep, setActiveStep] = useState(0);
    const selectedCategoriesState = useState([]);
    const selectedTargetGroupState = useState([]);

    const [selectedCategories] = selectedCategoriesState;
    const [selectedTargetGroups] = selectedTargetGroupState;

    const [updateProfileMutation, { error: updateProfileError }] = useMutation(UPDATE_PROFILE);

    const steps = [
        {
            label: 'Select topics which are interesting to you',
            component: <CategorySelection selectedState={selectedCategoriesState} />,
        },
        {
            label: 'Which Target Groups do prefer ?',
            component: <TargetGroupSelection selectedState={selectedTargetGroupState} />
        }
    ];

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = async () => {
        // TODO: update profile
        await updateProfileMutation({ variables: { categories: selectedCategories, targetGroups: selectedTargetGroups } });
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

    return <Box sx={{p: 4}}>
        <Stepper activeStep={activeStep} alternativeLabel>
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
        <>
            <Box sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
                {steps[activeStep].component}
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </>
    </Box>
}

export const ProfileSetupModal = () => {

    const {isAuthenticated, user} = useAuth();

    const {isModalOpen} = useSelector((state) => state.profileSetup);
    const {isModalOpen : isModalOpenAuth, mode} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) (!user?.preferred && user?.role?.title !== "admin" ) && openModal();
    }, [isAuthenticated]);

    return <DialogAnimate maxWidth={"xl"} open={isModalOpen && !isModalOpenAuth} onClose={() => closeModal()}>
        {/*<DialogTitle sx={{py: 2}}>Select Categories</DialogTitle>*/}
        <WizardContent finishCallback={() => closeModal()} />
    </DialogAnimate>
}
