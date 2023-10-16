import React, {FC} from "react";
import {
    styled,
    Icon,
    Grid,
    Box,
    Card,
    Avatar,
    Divider,
    Typography,
    Stack,
    Image,
    SVGIcon,
    fRenderedHTML,
    Chip, alpha, IconButton, CardHeader, CardContent, Tooltip, ToggleButton, ToggleButtonGroup
} from "my-lib"

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    // ...cssStyles().bgBlur({ blur: 0, color: theme.palette.primary.darker }),
    backgroundColor: theme.palette.background.neutral
}));

const ElearningIconBox = styled(Box)(({theme}) => ({
    // ...cssStyles().bgBlur({ blur: 0, color: theme.palette.primary.darker }),
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100,
    width: 48,
    height: 48,
    zIndex: 11,
    left: 0,
    right: 0,
    bottom: -16,
    position: 'absolute',
}));
import { partnerProgramsBackend } from "@config"

export const ELearningItem: FC<any> = ({eLearningResourcesItem, addToCampaign, openModalHandler, actionItems = [
    <Box>
        <Tooltip title={ "add to campaign" } arrow>
                <ToggleButton value={"check"} sx={(theme) => ({ background: theme.palette.grey[500_80] })} onClick={() =>  addToCampaign(eLearningResourcesItem)} aria-label="add to campaign">
                    <Icon color={"white"} sx={(theme) => ({height: 20, width: 20, color: theme.palette.primary.dark })} icon={"codicon:add"}/>
                </ToggleButton>
        </Tooltip>
    </Box>
]}) => {
    const {title, cover, description, shortDescription, categories} = eLearningResourcesItem;

    return (
        <Card sx={{cursor: 'pointer', textAlign: 'center'}}>
            <CardHeader
                sx={(theme) => ({
                    height: "64px",
                })}
                action={<Box sx={(theme) => ({ display: "flex", gap: theme.spacing(1) })}>
                    {actionItems.map((item, index) => (<Box key={index}>{item}</Box>))}
                </Box>}
            ></CardHeader>
            <CardContent onClick={() => {
                openModalHandler()
            }} sx={{p: 0}}>
                <Box sx={{position: 'relative'}}>
                    <SVGIcon
                        src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
                        sx={{
                            width: 144,
                            height: 62,
                            zIndex: 10,
                            left: 0,
                            right: 0,
                            bottom: -26,
                            mx: 'auto',
                            position: 'absolute',
                            color: 'background.paper',
                        }}
                    />
                    <ElearningIconBox sx={{
                        left: 0,
                        right: 0,
                        bottom: -16,
                        mx: 'auto',
                        position: 'absolute',
                        p: 2
                    }}>
                        <Icon icon={'bi:tools'} sx={{
                            color: "white",
                            width: "100%",
                            height: "100%"
                        }}/>
                    </ElearningIconBox>
                    <PrimaryColoredBox>
                        <Image sx={{ height: "186px" }} src={cover ? partnerProgramsBackend.filesEndpoint + cover : "/static/images/campaignbg.svg"} alt={cover ? partnerProgramsBackend.apiURL + cover : "/static/images/campaignbg.svg"}/>
                    </PrimaryColoredBox>
                </Box>

                <Typography variant="subtitle1" sx={{mt: 6, mb: 6}}>
                    {title}
                </Typography>

                <Box sx={{align: "center", px: 4, pb: 2, height: "84px"}}>
                    {fRenderedHTML(description ?? shortDescription)}
                </Box>

                <Divider sx={{borderStyle: ''}}/>
                <Box sx={{
                    display: "flex",
                    height: "84px",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    p: 2
                }}>
                    <Typography variant={"subtitle2"}>Kategorien</Typography>
                    <Grid container>
                        {categories?.map((category, index) => (<Grid key={index} item>
                            <Chip size="small" label={category?.title ?? ""}/>
                        </Grid>))}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}
