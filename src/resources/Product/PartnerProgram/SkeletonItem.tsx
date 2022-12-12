import React, {FC} from "react";
import {Card, Grid, Skeleton} from "my-lib";

export const SkeletonItem : FC<any> = ({ sx, ...rest }) => {
    return <Card sx={{p: 4, width: "100%", height: "365px", ...sx}}   {...rest}>
        <Grid sx={{ height: "100%", flexWrap: "nowrap" }} spacing={3} container
              justifyContent={"center"} alignItems="center">
            <Grid xs={2} item>
                <Skeleton sx={{ height: "128px", width: "100%" }} variant="rectangular"/>
            </Grid>
            <Grid xs={6} item>
                <Grid direction={"column"} spacing={3} container>
                    <Grid item>
                        <Skeleton sx={{ height: "28px", width: "100%" }} variant="rectangular"/>
                    </Grid>
                    <Grid item>
                        <Skeleton sx={{ height: "154px", width: "100%" }} variant="rectangular"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={4} item>
                <Grid direction={"column"} spacing={3} container>
                    <Grid item>
                        <Skeleton sx={{ height: "56px", width: "56px", float: "right" }} variant="circular"/>
                    </Grid>
                    <Grid item>
                        <Skeleton sx={{ height: "128px", width: "100%" }} variant="rectangular"/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Card>
};