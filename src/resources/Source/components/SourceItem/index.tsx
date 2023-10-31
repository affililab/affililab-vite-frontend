import React, {FC} from "react";
import {
    alpha,
    Card,
    CardHeader,
    CardContent,
    Image,
    Typography,
    styled,
    Box,
    SVGIcon, Icon
} from "my-lib"
import {partnerProgramsBackend} from "@config";

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
}));

const ToolIconBox = styled(Box)(({theme}) => ({
    backgroundColor: "#ffff",
    borderRadius: 100,
    width: 62,
    height: 62,
    zIndex: 11,
    left: 0,
    right: 0,
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export const SourceItem: FC<any> = ({ item }) => {
    const { cover, title, smallLogo } = item;
    return <Card sx={{textAlign: 'center'}}>
        {/*<CardHeader*/}
        {/*    sx={(theme) => ({*/}
        {/*        position: "absolute",*/}
        {/*        height: "64px",*/}
        {/*        top: 0,*/}
        {/*        left: 0,*/}
        {/*        right: 0,*/}
        {/*        zIndex: 2,*/}
        {/*        backdropFilter: "blur(1px)",*/}
        {/*        backgroundColor: alpha("#0000", 0.8)*/}
        {/*    })}*/}
        {/*/>*/}
        <CardContent sx={{p: 0}}>
            <Box sx={{position: 'relative'}}>
                <SVGIcon
                    src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
                    sx={{
                        width: 184,
                        height: 134,
                        zIndex: 10,
                        left: 0,
                        right: 0,
                        bottom: -62,
                        mx: 'auto',
                        position: 'absolute',
                        color: 'background.paper',
                    }}
                />
                <ToolIconBox sx={{
                    left: 0,
                    right: 0,
                    bottom: -24,
                    mx: 'auto',
                    position: 'absolute',
                    p: 2
                }}>

                    {smallLogo ?
                        <Image src={smallLogo ? partnerProgramsBackend.filesEndpoint + smallLogo : "/static/images/campaignbg.svg"} alt={smallLogo ? partnerProgramsBackend.apiURL + smallLogo : "/static/images/campaignbg.svg"}/>
                        : <Icon icon={'bx:network-chart'} sx={{
                            color: "black",
                            width: "100%",
                            height: "100%",
                            p: 2
                        }}/>}
                </ToolIconBox>
                <PrimaryColoredBox>
                    <Image sx={{ height: "186px" }} src={cover ? partnerProgramsBackend.filesEndpoint + cover : "/static/images/campaignbg.svg"} alt={cover ? partnerProgramsBackend.apiURL + cover : "/static/images/campaignbg.svg"}/>
                </PrimaryColoredBox>
            </Box>
        <Typography variant="body1" sx={{mt: 6}}>
            {title}
        </Typography>
        </CardContent>
    </Card>
}