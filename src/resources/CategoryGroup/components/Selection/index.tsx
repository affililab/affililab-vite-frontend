import React, { useState } from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { CategoryGroupItem } from "../CategoryGroupItem"
import {useGetAllWithNumbers} from "@resources/CategoryGroup/hooks/useGetAllWithNumbers";
export const Selection = () => {
    const { items } = useGetAllWithNumbers();
    const [selected, setSelected] = useState([]);
    return <>
        <Scrollbar style={{width: "100%", height: "512px"}} forceVisible="y" autoHide={false}>
                <Grid spacing={2} container>
                    {items.map((item, index) => <Grid key={index} xs={4} item><CategoryGroupItem actionItems={[
                        <Checkbox onClick={() => setSelected(selected.indexOf(item.id) !== -1 ? selected.filter(selectedItem => selectedItem !== item.id) : [...selected, item.id])} />
                    ]} item={item} /></Grid>)}
                </Grid>
        </Scrollbar>
    </>
}