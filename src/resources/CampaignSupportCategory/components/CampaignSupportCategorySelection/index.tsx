import React, { useState } from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { CampaignSupportCategoryItem } from "../CampaignSupportCategoryItem"
import {useGetAllWithNumbers} from "@resources/CampaignSupportCategory/hooks/useGetAllWithNumbers";
export const CampaignSupportCategorySelection = ({selectedState, min = 0, max = 2}) => {
    const { items } = useGetAllWithNumbers();
    const [selected, setSelected] = selectedState ?? useState([]);

    const maxAchieved = selected.length >= max;
    const toggleItemSelect = (item: any) => {
        if (maxAchieved && selected.indexOf(item.id) === -1) return;
        setSelected(selected.indexOf(item.id) !== -1 ? selected.filter(selectedItem => selectedItem !== item.id) : [...selected, item.id])
    }

    return <>
        <Scrollbar sx={{width: "100%", p: 2, height: "100%"}} forceVisible="y" autoHide={false}>
                <Grid spacing={2} container>
                    {items.map((item, index) => <Grid key={index} xs={3} sx={{ cursor: "pointer" }} onClick={() => toggleItemSelect(item)} item><CampaignSupportCategoryItem actionItems={[
                        <Checkbox disabled={maxAchieved && selected.indexOf(item.id) === -1} checked={selected.indexOf(item.id) !== -1 ? 'checked' : ''} onClick={() => toggleItemSelect(item)} />
                    ]} item={item} /></Grid>)}
                </Grid>
        </Scrollbar>
    </>
}