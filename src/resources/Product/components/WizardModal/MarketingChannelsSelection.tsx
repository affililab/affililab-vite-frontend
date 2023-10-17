import React, { useState } from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { MarketingChannelItem } from "./MarketingChannelItem"

export const MarketingChannelsSelection = ({selectedState}) => {
    const items = [
        {
            id: 1,
            title: "Blogs und Content-Websites",
            description: "Category 1 description",
        },
        {
            id: 2,
            title: "Social Media",
            description: "Facebook, Instagram, Pinterest, ... Inhalte",
        },
        {
            id: 3,
            title: "YouTube",
            description: "Video-Content-Erstellung",
        },
        {
            id: 4,
            title: "E-Mail-Marketing",
            description: "Category 2 description",
        },
        {
            id: 5,
            title: "Podcasts",
            description: "Category 2 description",
        },
        {
            id: 6,
            title: "Foren und Community-Plattformen",
            description: "Category 2 description",
        },
        {
            id: 7,
            title: "Nischenseiten und Vergleichsportale",
            description: "Category 2 description",
        },
        {
            id: 8,
            title: "Advertising",
            description: "Category 2 description",
        }
    ];

    const [selected, setSelected] = selectedState ?? useState([]);
    return <>
        <Scrollbar sx={{width: "100%", p: 2, height: "100%"}} forceVisible="y" autoHide={false}>
            <Grid spacing={2} container>
                {items.map((item, index) => <Grid key={item.id + " " + index} xs={4} item><MarketingChannelItem actionItems={[
                    <Checkbox onClick={() => setSelected(selected.indexOf(item.id) !== -1 ? selected.filter(selectedItem => selectedItem !== item.id) : [...selected, item.id])} />
                ]} item={item} /></Grid>)}
            </Grid>
        </Scrollbar>
    </>
}