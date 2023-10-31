import React, { useState } from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { CampaignSupportCategoryItem } from "../CampaignSupportCategoryItem"
import {useGetAllWithNumbers} from "@resources/CampaignSupportCategory/hooks/useGetAllWithNumbers";
export const CampaignSupportCategorySelection = ({selectedState}) => {
    const { items } = useGetAllWithNumbers();
    const [selected, setSelected] = selectedState ?? useState([]);
    return <>
        <Scrollbar sx={{width: "100%", p: 2, height: "100%"}} forceVisible="y" autoHide={false}>
                <Grid spacing={2} container>
                    {items.map((item, index) => <Grid key={index} xs={3} item><CampaignSupportCategoryItem actionItems={[
                        <Checkbox checked={selected.indexOf(item.id) !== -1 ? 'checked' : ''} onClick={() => setSelected(selected.indexOf(item.id) !== -1 ? selected.filter(selectedItem => selectedItem !== item.id) : [...selected, item.id])} />
                    ]} item={item} /></Grid>)}
                </Grid>
        </Scrollbar>
    </>
}