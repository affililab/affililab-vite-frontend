import React, {useEffect, useState} from "react";
import {Box, EmptyContent, Grid, Scrollbar} from "my-lib";
import {TargetGroupItem} from "@resources/TargetGroup/components/TargetGroupItem";
import {useTargetGroups} from "@resources/Campaign/hooks/useTargetGroups";

export const TargetGroupsContent = ({ campaign }) => {

    const { getTargetGroups } = useTargetGroups(campaign.id);

    const [targetGroups, setTargetGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTargetGroups(campaign.id);
            setTargetGroups(data);
        }
        fetchData()
    }, []);

    return <Grid sx={{ flex: 1, display: "flex", flexDirection: "container"}} spacing={4} container>
            {targetGroups.map(item => <Grid xs={4} item><TargetGroupItem actionItems={[]} item={item} /></Grid>)}
            {!targetGroups.length && <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><EmptyContent
                title="Keine Target Groups gefunden"
                description="Es wurden keine Target Groups gefunden"
                img="/static/illustrations/illustration_empty.svg"
            /></Box>}
        </Grid>
}