import { Typography, Label, Box, Stack, Icon, Button, styled, Card } from "my-lib"
import {PlanStarterIcon} from "@assets";
import {FC} from "react";

const RootStyle : any = styled(Card)(({ theme }: any) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
        padding: theme.spacing(5),
    },
}));

export const PricingPlanCard : FC<any> = ({ plan, index, isYearly, selected, choose = () => {} }) => {
    const { title, icon, monthlyPrice, yearlyPrice, description, shortDescription, features } = plan;

    return (
        <RootStyle>
            {index === 1 && (
                <Label
                    color="info"
                    sx={{
                        top: 16,
                        right: 16,
                        position: 'absolute',
                    }}
                >
                    POPULAR
                </Label>
            )}

            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                {title}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                {(isYearly ? yearlyPrice > 0 : monthlyPrice > 0) && <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    €
                </Typography>}
                <Typography variant="h2" sx={{ mx: 1 }}>
                    {isYearly ? yearlyPrice === 0 ? 'Free' : yearlyPrice : monthlyPrice === 0 ? 'Free' : monthlyPrice}
                </Typography>
                <Typography
                    gutterBottom
                    component="span"
                    variant="subtitle2"
                    sx={{
                        alignSelf: 'flex-end',
                        color: 'text.secondary',
                    }}
                >
                    {(isYearly ? yearlyPrice > 0 : monthlyPrice > 0) && <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                        { isYearly ? '/ Jahr' : '/ Monat'}
                    </Typography>}
                </Typography>
            </Box>

            <Typography
                variant="caption"
                sx={{
                    color: 'primary.main',
                    textTransform: 'capitalize',
                }}
            >
                {shortDescription}
            </Typography>

            <Box sx={{ width: 80, height: 80, mt: 3 }}><PlanStarterIcon /></Box>

            <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
                {features.map((item: any, index: number) => (
                    <Stack
                        key={index + " " + item.title}
                        component="li"
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{ typography: 'body2', color: !item.disabled ? 'text.primary' : 'text.disabled' }}
                    >
                        <Icon icon={item.disabled ? 'eva:close-fill' : 'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
                        <Typography variant="body2">{item.amount > 0 ? item.amount : '' } {item.title}</Typography>
                    </Stack>
                ))}
            </Stack>

            <Button onClick={() => { choose() }} fullWidth size="large" variant="contained" disabled={selected === plan.id}>
                choose {title}
            </Button>
        </RootStyle>
    );
};
