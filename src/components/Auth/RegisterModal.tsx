import React, {FC, useEffect, useState} from "react";
import {
    DialogAnimate,
    Box,
    IconButton,
    Icon,
    Container,
    useTheme,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Button,
    RouterDom,
    useSnackbar,
    useMediaQuery,
    Grid
} from "my-lib";
import {closeModal, openModal} from "@slices/auth";
import {useSelector} from "@store";
import {useMutation} from "@apollo/client";
import {PricingList} from "@resources/Payments/components/PricingList";
const { useSearchParams } = RouterDom;
import {CHOOSE_PLAN, COMPLETE_SUBSCRIPTION, UPDATE_PROFILE} from "@schemas/user"
import {RegisterForm} from "./RegisterForm";
import {TargetGroupSelection} from "@resources/TargetGroup/components/TargetGroupSelection";
import {Selection as CategorySelection} from "@resources/CategoryGroup/components/Selection"

export const Content : FC<any> = ({
                            handleCloseModal = () => {}
                        }) => {

    const selectedCategoriesState = useState([]);
    const selectedTargetGroupState = useState([]);
    const [step, setStep] = useState(0);
    const [plan, setPlan] = useState<any>(null);
    const [singlePlan, setSinglePlan] = useState<boolean>(false);
    const [unit, setUnit] = useState('month');

    const [selectedCategories] = selectedCategoriesState;
    const [selectedTargetGroups] = selectedTargetGroupState;

    const [choosePlanMutation, { error: choosePlanError }] = useMutation(CHOOSE_PLAN);
    const [saveProfileData, {error}] = useMutation(UPDATE_PROFILE);

    const steps: any = [
        {
            label: 'Registration',
            component: <></>,
        },
        {
            label: 'Choose your Pricing Plan',
            callbackFnc: async () => {
                //send mutation and redirect to stripe if successfull
                const response = await choosePlanMutation({ variables: { id: plan, unit, callbackUrl: `${window.location.origin.toString()}/partnerPrograms/` } });
                if (plan.monthlyPrice > 0 && response?.data?.choosePlan?.payload?.sessionUrl) {
                    window.location.replace(response.data.choosePlan.payload.sessionUrl)
                }
            },
            component: <PricingList setSinglePlan={setSinglePlan} unit={unit} selected={plan} choose={(plan: any) => { setPlan(plan) }} chooseUnit={(unit: any) => { setUnit(unit) }} />,
        }
    ];

    useEffect(() => {
        (async () => {
            if (singlePlan) {
                if (steps[step+1]?.callbackFnc) await steps[step+1]?.callbackFnc();
                await nextStep();
            }
        })();
    }, [singlePlan]);

    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const nextStep = async () => {
        console.log("step", step);
        if (step === steps.length - 1) {
            // save user preferences
            await saveProfileData({variables: {categories: selectedCategories }});
            handleCloseModal(false);
            return;
        }
        steps[step].callbackFnc && await steps[step].callbackFnc();
        setStep(step+1);
    }

    return <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={1}
    >
        <IconButton sx={{position: "absolute", top: theme.spacing(2), right: theme.spacing(2), zIndex: 2}}
                    aria-label="close" onClick={handleCloseModal}>
            <Icon
                sx={{color: 'text.disabled'}}
                width={42}
                height={42}
                icon={'ei:close'} />
        </IconButton>
        <Container sx={(theme: any) => ({ padding: theme.spacing(4) })}>
            { step === 0 && <Grid container spacing={6}>
                {isMd ? (
                    <Grid item container justifyContent={'center'} xs={12} md={6}>
                        <Box height={1} width={1} maxWidth={500}>
                            <Box
                                component={'img'}
                                src={
                                    '/static/images/register.svg'
                                }
                                width={1}
                                height={1}
                                sx={{
                                    filter:
                                        theme.palette.mode === 'dark'
                                            ? 'brightness(0.8)'
                                            : 'none',
                                }}
                            />
                        </Box>
                    </Grid>
                ) : null}
                <Grid
                    item
                    container
                    alignItems={'center'}
                    justifyContent={'center'}
                    xs={12}
                    md={6}
                >
                    <Stack direction={'column'} spacing={2}>
                        <RegisterForm openLogin={() => openModal("login")} onFinish={() => nextStep()} />
                    </Stack>
                </Grid>
            </Grid>}
            {step > 0 &&  <Stack rowGap={2}><Stepper activeStep={step} alternativeLabel>
                {steps.map((stepItem: any, index: number) => {
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
                <Box>
                    {steps[step].component}
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button variant="contained" onClick={() => nextStep()}>
                        {step === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Stack>}
        </Container>
    </Box>;
};

export const RegisterModal : FC<any> = () => {

    const {isModalOpen, mode} = useSelector((state: any) => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();

    const {enqueueSnackbar} = useSnackbar();
    const [completeSubscription, { error: completeSubscriptionError }] = useMutation(COMPLETE_SUBSCRIPTION);

    useEffect(() => {
        (async () => {
            const success = searchParams.get("success");
            const session_id = searchParams.get("session_id");
            if (success && session_id) {
                // send complete subscription_mutation
                const completeSubscriptionResponse = await completeSubscription({ variables: { id: session_id}});

                if (completeSubscriptionResponse?.data?.completeSubscription?.success) {
                    enqueueSnackbar('Congratulations your Subscription was successfull');
                }
            }
        })();
    }, [searchParams]);


    return <DialogAnimate maxWidth={"xl"} open={isModalOpen && mode === "register"} onClose={() => {
        closeModal()
    }}>
        <Content handleCloseModal={() => {
            closeModal()
        }}/>
    </DialogAnimate>
}
