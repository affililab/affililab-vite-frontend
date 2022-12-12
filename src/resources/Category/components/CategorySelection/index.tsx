import React, {FC, useState} from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { useData } from "../../hooks/useData"
import { CategoryItem } from "../CategoryItem"
export const CategorySelection: FC<any> = ({ selectedState }) => {
    const [selected, setSelected] = selectedState;
    const { items } = useData();
    return <>
        <Scrollbar style={{width: "100%", height: "512px"}} forceVisible="y" autoHide={false}>
                <Grid spacing={2} container>
                    {items.map(item => <Grid xs={4} item><CategoryItem actionItems={[
                        <Checkbox onClick={() => setSelected(selected.indexOf(item.id) !== -1 ? selected.filter(selectedItem => selectedItem !== item.id) : [...selected, item.id])} />
                    ]} item={item} /></Grid>)}
                </Grid>
        </Scrollbar>
    </>
}