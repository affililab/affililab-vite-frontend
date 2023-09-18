import {Box, Button, CircularProgress, HeaderItemsContext, Page, Step, StepLabel, Stepper} from "my-lib";
import React, {useContext, useEffect, useState} from "react";
import {TargetGroupSelection} from "@resources/TargetGroup/components/TargetGroupSelection";
import {SelectTable} from "@resources/Product/components/SelectTable";
import { Ad } from "./Steps/Ad";
import {useGeneratedAd} from "../../hooks/useGeneratedAd";

export default () => {

    const selectedTargetGroupState = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedTargetGroups] = selectedTargetGroupState;
    const [generatedAd, setGeneratedAd] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [activeStep, setActiveStep] = useState(0);
    const { getGeneratedAd } = useGeneratedAd();

    const {reset} = useContext(HeaderItemsContext);

    useEffect(() => {
        reset();
    }, []);

    const steps = [
        {
            label: 'Select products',
            component: <SelectTable handleSelectedItems={(items: any) => setSelectedProduct(items[0])}/>,
            stopCondition: !!selectedProduct
        },
        {
            label: 'Which Target Groups ?',
            component: <TargetGroupSelection selectedState={selectedTargetGroupState}/>
        },
        {
            label: 'Ad',
            component: <Ad generatedAd={generatedAd} />
        },
        // {
        //     label: 'Which Platform ?',
        //     component: <>Select Facebook or Instagram or Google</>
        // },

    ];

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = async () => {
        // TODO: handle finish
    };

    const handleNext = async () => {

        if (activeStep + 1 >= steps.length - 1) {
            // TODO: load generation
            setLoading(true);
            if (selectedProduct) setGeneratedAd(await getGeneratedAd(selectedProduct, selectedTargetGroups));
            setLoading(false);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            return;
        }

        if (activeStep + 1 >= steps.length) {
            handleFinish();
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return <Page title="Ad Generator Tool">
        {/*<Container sx={{ mt: 4, display: "flex", flexDirection: "column"  }}>*/}
        <Stepper sx={{p: 2, background: (theme: any) => theme.palette.background.paper}} nonLinear activeStep={activeStep} alternativeLabel>
            {steps.map((stepItem, index) => {
                const {label} = stepItem;
                const stepProps = {};
                const labelProps = {};

                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
        {/*{loading ? <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box> : steps[activeStep].component}*/}
        <Box sx={{display: 'flex', p: 4,  background: (theme: any) => theme.palette.background.paper}}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
                Back
            </Button>
            <Box sx={{flexGrow: 1}}/>
            <Button size={'large'} variant="contained" onClick={handleNext}
                    disabled={'stopCondition' in steps[activeStep] ? !steps[activeStep].stopCondition : false}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
        {/*</Box>*/}
        {/*</Container>*/}
    </Page>
}