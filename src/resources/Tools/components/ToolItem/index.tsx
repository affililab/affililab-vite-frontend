import React, {FC} from "react";
import {
    alpha,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    fRenderedHTML,
    Grid,
    Icon,
    IconButton,
    Image,
    styled,
    SVGIcon,
    TextMaxLine,
    Typography
} from "my-lib"
import {partnerProgramsBackend} from "@config"

// ----------------------------------------------------------------------

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.neutral,
}));

const ToolIconBox = styled(Box)(({theme}) => ({
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

// ----------------------------------------------------------------------

export const ToolItem: FC<any> = ({toolItem, addToCampaign, openModalHandler, actionItems = [
    <IconButton onClick={() => { addToCampaign(toolItem) }}>
        <Icon color={"white"} icon={'carbon:add-alt'} />
    </IconButton>
]}) => {

    const {cover, title, shortDescription, categories} = toolItem;

    return (
        <Card sx={{cursor: 'pointer', textAlign: 'center'}}>
            <CardHeader
                sx={(theme) => ({
                    position: "absolute",
                    height: "64px",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    backdropFilter: "blur(1px)",
                    backgroundColor: alpha("#0000", 0.8)
                })}
                action={<>{actionItems.map(item => item)}</>}
            />
            <CardContent onClick={openModalHandler} sx={{p: 0}}>
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
                <ToolIconBox sx={{
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
                </ToolIconBox>
                <PrimaryColoredBox>
                    <Image sx={{ height: "186px" }} src={cover ? partnerProgramsBackend.filesEndpoint + cover : "/static/images/campaignbg.svg"} alt={cover ? partnerProgramsBackend.apiURL + cover : "/static/images/campaignbg.svg"}/>
                </PrimaryColoredBox>
            </Box>

            {/*<OverlayStyle />*/}

            <Typography variant="subtitle1" sx={{mt: 6, mb: 2}}>
                {title}
            </Typography>

            <Typography color="textSecondary" variant="body2" sx={{align: "center", px: 4, pb: 2, height: "84px"}}>
                <TextMaxLine line={3}>
                    {fRenderedHTML(shortDescription)}
                </TextMaxLine>
            </Typography>

            <Divider sx={{borderStyle: ''}}/>
            <Box sx={{ display: "flex", height: "84px", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", p: 2 }}>
                <Typography variant={"subtitle2"}>Kategorien</Typography>
                <Grid spacing={1} container>
                    {categories?.map((category, index) => (<Grid key={index} item>
                        <Chip size="small" label={category?.title}/>
                    </Grid>))}
                </Grid>
            </Box>
            </CardContent>
        </Card>
    );
}
