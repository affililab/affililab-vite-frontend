import React, {FC} from "react";
import {
    Card,
    CardContent,
    Image,
    Typography,
    styled,
    Box,
    CardHeader
} from "my-lib"
import {partnerProgramsBackend} from "@config";

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
}));

export const MarketingChannelItem: FC<any> = ({ item, actionItems = [] }) => {
    const { cover, title, totalPartnerPrograms } = item;
    return <Card sx={{textAlign: 'center'}}>
        <CardHeader
            sx={(theme) => ({
                height: "64px",
                backgroundColor: theme.palette.background.paper,
            })}
            action={<>{actionItems.map((item, index) => <Box key={index}>{item}</Box>) }</>}
        />
        <CardContent sx={{p: 0}}>
            <Box sx={{position: 'relative'}}>
                <PrimaryColoredBox>
                    <Image sx={{ height: "186px" }} src={cover ? partnerProgramsBackend.filesEndpoint + cover : "/static/images/campaignbg.svg"} alt={cover ? partnerProgramsBackend.apiURL + cover : "/static/images/campaignbg.svg"}/>
                </PrimaryColoredBox>
            </Box>
            <Typography variant="subtitle1" sx={{mt: 6, mb: 2}}>
                {title}
            </Typography>
        </CardContent>
    </Card>
}