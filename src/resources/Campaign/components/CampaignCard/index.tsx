import React, {FC} from "react";
import {
    alpha,
    Router,
    styled,
    Icon,
    Box,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Divider,
    Typography,
    Stack,
    Image,
    SVGIcon,
    fShortenNumber,
    Skeleton
} from "my-lib";
import {CampaignMoreMenu} from "./MoreMenu";

const {useNavigate} = Router;

// ----------------------------------------------------------------------

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    // ...cssStyles().bgBlur({ blur: 0, color: theme.palette.primary.darker }),
    backgroundColor: theme.palette.primary.main,
    height: "140px",
}));

const CampaignIconBox = styled(Box)(({theme}) => ({
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

// ----------------------------------------------------------------------

export const CampaignCard: FC<any> = ({loading, campaign, deleteCampaign, editCampaign}) => {
    const navigate = useNavigate();
    const {title, tools, partnerPrograms, eLearningResources} = campaign;

    return (
        <Card sx={{cursor: 'pointer', textAlign: 'center', position: "relative"}}>
            <CardHeader
                sx={(theme) => ({
                    position: "absolute",
                    height: "64px",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    // backdropFilter: "blur(6px)",
                    // backgroundColor: alpha(theme?.palette.background.default, 0.1)
                })}
                action={
                    <CampaignMoreMenu
                        onEdit={async () => {
                            editCampaign(campaign)
                        }}
                        onDelete={async () => {
                            deleteCampaign(campaign);
                        }}/>
                }/>
            <CardContent sx={{p: 0}} onClick={() => {
                navigate("/app/campaign/" + campaign.id)
            }}>
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
                    <CampaignIconBox sx={{
                        left: 0,
                        right: 0,
                        bottom: -16,
                        mx: 'auto',
                        position: 'absolute',
                        p: 2,
                    }}>
                        <Icon icon={'simple-icons:campaignmonitor'} sx={{
                            color: "white",
                            width: "100%",
                            height: "100%"
                        }}/>
                    </CampaignIconBox>
                    {loading ? <PrimaryColoredBox /> : <PrimaryColoredBox>
                        <Image src={"/static/images/campaignbg.svg"} alt={"/static/images/campaignbg.svg"}/>
                    </PrimaryColoredBox>}
                </Box>
                {/*<OverlayStyle />*/}

                <Typography variant="subtitle1" sx={{mt: 6, mb: 6, display: "flex", justifyContent: "center"}}>
                    {loading ? <Skeleton variant={"text"} width={"124px"} fontSize={"24px"} /> : title}
                </Typography>

                <Divider sx={{borderStyle: 'dashed'}}/>

                <Box sx={{py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    <div>
                        <Typography variant="caption" component="div" sx={{mb: 0.75, color: 'text.disabled'}}>
                            Tools
                        </Typography>
                        <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center" }}>
                            {loading ? <Skeleton width={"26px"} variant={"text"} fontSize={"24px"} /> : fShortenNumber(tools.length)}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="caption" component="div" sx={{mb: 0.75, color: 'text.disabled'}}>
                            Products
                        </Typography>
                        <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center" }}>
                            {loading ? <Skeleton width={"26px"} variant={"text"} fontSize={"24px"} /> : fShortenNumber(partnerPrograms.length)}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="caption" component="div" sx={{mb: 0.75, color: 'text.disabled'}}>
                            Learning Items
                        </Typography>
                        <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center" }}>
                            {loading ? <Skeleton width={"26px"} variant={"text"} fontSize={"24px"} /> : fShortenNumber(eLearningResources.length)}
                        </Typography>
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
}