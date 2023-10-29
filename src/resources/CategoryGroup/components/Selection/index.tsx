import React, { useState } from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { CategoryGroupItem } from "../CategoryGroupItem"
import {useGetAllWithNumbers} from "@resources/CategoryGroup/hooks/useGetAllWithNumbers";
export const Selection = ({selectedState}) => {
    const { items } = useGetAllWithNumbers();
    const [selected, setSelected] = selectedState ?? useState([]);
    return <>
        <Scrollbar sx={{width: "100%", p: 2, height: "100%"}} forceVisible="y" autoHide={false}>
                <Grid spacing={2} container>
                    {items.map((item, index) => <Grid key={index} xs={3} item><CategoryGroupItem actionItems={[
                        <Checkbox onClick={() => setSelected(selected.indexOf(item.id) !== -1 ? selected.filter(selectedItem => selectedItem !== item.id) : [...selected, item.id])} />
                    ]} item={item} /></Grid>)}
                </Grid>
        </Scrollbar>
    </>
}