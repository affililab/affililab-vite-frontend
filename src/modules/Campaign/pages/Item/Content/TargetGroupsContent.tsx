import React, {useEffect, useState} from "react";
import {Grid, Scrollbar} from "my-lib";
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

    return <Grid spacing={2} container>
            {targetGroups.map(item => <Grid xs={4} item><TargetGroupItem actionItems={[]} item={item} /></Grid>)}
        </Grid>
}