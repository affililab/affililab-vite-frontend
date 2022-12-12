import React, {FC, useEffect, useState} from "react";
import {Box, Grid, Stack, Switch, Typography} from "my-lib";
import {usePlans} from "@resources/Plan/hooks/usePlans";
import {PricingPlanCard} from "@resources/Payments/components/PricingPlanCard";

export const PricingList : FC<any> = ({ selected, choose = (plan: any) => {}, unit, chooseUnit = (unit: any) => {}}) => {

    const [planData, setPlanData] = useState([]);

    const {getPlans, loading} = usePlans();

    useEffect((active = () => {} ) => {
        const fetchData = async () => {
            const plansData = await getPlans();
            setPlanData(plansData.data?.getAllPlans ?? []);
            choose(plansData.data?.getAllPlans[0].id);
        }
        fetchData()
    }, []);

    return <Box>
        <Typography variant="h3" align="center" paragraph>
            Flexible plans for your
            <br /> community&apos;s size and needs
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
            Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
                <Typography variant="overline" sx={{ mr: 1.5 }}>
                    MONATLICH
                </Typography>
                <Switch sx={{margin: 2}} onChange={(event: any, val: any) => {
                    chooseUnit(unit === 'month' ? 'year' : 'month');
                }} size="small" defaultChecked={unit === 'year'} />
                <Typography variant="overline" sx={{ ml: 1.5 }}>
                    JÄHRLICH (spare 10%)
                </Typography>
            </Stack>
            <Typography variant="caption" align="right" sx={{ color: 'text.secondary', display: 'block' }}>
                * Plus applicable taxes
            </Typography>
        </Box>

        <Grid container spacing={3}>
            {planData.map((plan: any, index) => (
                <Grid item xs={12} md={4} key={plan.id + "_" +plan.title}>
                    <PricingPlanCard selected={selected} choose={() => { choose(plan.id) } } isYearly={unit === 'year'} plan={plan} index={index} />
                </Grid>
            ))}
        </Grid>
    </Box>
};
