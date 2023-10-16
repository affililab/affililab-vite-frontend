import React, {FC, useState} from "react";
import {
    Box,
    Button,
    DialogAnimate,
    DialogTitle,
    Icon,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    varScale,
    varTranEnter
} from "my-lib";
import {Selection} from "@resources/CategoryGroup/components/Selection"
import {SelectItems} from "@resources/Tools/components/SelectItems";

const WizardContent: FC<any> = () => {
    const [activeStep, setActiveStep] = useState(0);
    const selectedCategoriesState = useState([]);
    const [selectedCategories, setSelectedCategories] = selectedCategoriesState;

    const steps = [
        {
            label: 'Select topics which are interesting to you',
            component: <Box sx={{display: "flex", height: "50vh", background: (theme: any) => theme.palette.background.neutral}}>
                <Selection selectedState={selectedCategoriesState} />
            </Box>
        },
        {
            label: 'In which fields you already have experience',
            component: <Box sx={{display: "flex", height: "50vh", background: (theme: any) => theme.palette.background.neutral}}>Step 2</Box>
        },
        {
            label: 'Which tools do you already use ?',
            component: <Box sx={{display: "flex", height: "50vh", background: (theme: any) => theme.palette.background.neutral}}>
                <SelectItems implemented={[]} selected={[]}
                             setSelected={() => {}} isSelection />
            </Box>
        },
        {
            label: 'What are you prefered Marketing Channels ?',
            component: <Box sx={{display: "flex", height: "50vh", background: (theme: any) => theme.palette.background.neutral}}>
                Step 3
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
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        if (activeStep >= steps.length - 1) {
            // TODO: active step
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
                <Button size={'large'} color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button>
                <Button size={'large'} variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    {activeStep < steps.length - 1 && <Icon sx={{ ml: 2 }} width={24}
                          height={24}
                          icon={'carbon:chevron-right'} />}
                </Button>
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
            <WizardContent />
        </DialogAnimate>
    )
}