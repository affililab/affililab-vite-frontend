import React, {FC, useState} from "react";
import {Box, Button, DialogAnimate, DialogTitle, Icon, IconButton, Step, StepLabel, Stepper} from "my-lib";
import {Selection} from "@resources/CategoryGroup/components/Selection"
import {OverviewItems as ToolsOverviewItems} from "@resources/Tools/components/OverviewItems"

const steps = [
        {
            label: 'Select topics which are interesting to you',
            component: <Selection />,
        },
        {
            label: 'In which fields you already have experience',
            component: <>Step 2</>
        },
        {
            label: 'Which tools do you already use ?',
            component: <ToolsOverviewItems isSelection/>
        },
        {
            label: 'What are you prefered Marketing Channels ?',
            component: <>Step 3</>
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

const WizardContent: FC<any> = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        if (activeStep + 1 >= steps.length - 1) return;
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
                <Button size={'large'} color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button size={'large'} variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    <Icon sx={{ ml: 2 }} width={24}
                          height={24}
                          icon={'carbon:chevron-right'}/>
                </Button>
            </Box>
        </>
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
            <WizardContent />
        </DialogAnimate>
    )
}