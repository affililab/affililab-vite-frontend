import React, {FC} from "react";
import {
    Card,
    CardContent,
    Image,
    Typography,
    styled,
    Box, alpha, CardHeader,
} from "my-lib"
import {partnerProgramsBackend} from "@config";

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
}));

export const CategoryGroupItem: FC<any> = ({ item, actionItems = [] }) => {
    const { cover, title, totalPartnerPrograms } = item;
    return <Card sx={{textAlign: 'center'}}>
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
        <CardContent sx={{p: 0}}>
            <Box sx={{position: 'relative'}}>
                <PrimaryColoredBox>
                    <Image sx={{ height: "186px" }} src={cover ? partnerProgramsBackend.filesEndpoint + cover : "/static/images/campaignbg.svg"} alt={cover ? partnerProgramsBackend.apiURL + cover : "/static/images/campaignbg.svg"}/>
                </PrimaryColoredBox>
            </Box>
        <Typography variant="subtitle1" sx={{mt: 6, mb: 2}}>
            {title}
        </Typography>
        <Typography variant="body2" color={"text.secondary"} sx={{mt: 6, mb: 2}}>
            ({totalPartnerPrograms}) Partnerprogramme
        </Typography>
        </CardContent>
    </Card>
}