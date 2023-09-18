import React, {FC, useState} from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { useData } from "../../hooks/useData"
import { TargetGroupItem } from "../TargetGroupItem"
export const TargetGroupSelection: FC<any> = ({ selectedState }) => {
    const [selected, setSelected] = selectedState;
    const { items } = useData();
    return <Scrollbar sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            ".simplebar-content-wrapper": {
                // height: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",

                overflow: "auto"
            },
            ".simplebar-content": {
                // height: "100%",
                flex: 1,
            }
        }} forceVisible="y" style={{height: "100%"}}>
                <Grid p={4} spacing={2} container>
                    {items.map(item => <Grid xs={12} sm={6} md={4} lg={3} item><TargetGroupItem actionItems={[
                        <Checkbox onClick={() => setSelected(selected.indexOf(item.id) !== -1 ? selected.filter(selectedItem => selectedItem !== item.id) : [...selected, item.id])} />
                    ]} item={item} /></Grid>)}
                </Grid>
        </Scrollbar>
}