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

export const ToolTypeItem: FC<any> = ({ item, actionItems = [] }) => {
    const { cover, title } = item;
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
        <Typography variant="body1" sx={{mt: 2}}>
            {title}
        </Typography>
        </CardContent>
    </Card>
}