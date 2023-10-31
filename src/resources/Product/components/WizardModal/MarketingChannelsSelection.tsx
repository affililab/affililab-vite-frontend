import React, { useState } from "react";
import {Checkbox, Grid, Scrollbar} from "my-lib"
import { MarketingChannelItem } from "./MarketingChannelItem"

export const MarketingChannelsSelection = ({selectedState}) => {
    const items = [
        {
            id: 1,
            cover: '653ec16f50fb46a6f53fec70',
            title: "Blogs und Content-Websites",
            description: "Category 1 description",
        },
        {
            id: 2,
            cover: '653ec1de50fb46a6f53feeb4',
            title: "Social Media",
            description: "Facebook, Instagram, Pinterest, ... Inhalte",
        },
        {
            id: 3,
            cover: '653f60ea977d500adce368ca',
            title: "YouTube",
            description: "Video-Content-Erstellung",
        },
        {
            id: 4,
            cover: '653ec19f50fb46a6f53fed58',
            title: "E-Mail-Marketing",
            description: "Category 2 description",
        },
        {
            id: 5,
            cover: '653f61b0977d500adce36910',
            title: "Podcasts",
            description: "Category 2 description",
        },
        {
            id: 6,
            cover: '653f6355977d500adce369c7',
            title: "Foren und Community-Plattformen",
            description: "Category 2 description",
        },
        {
            id: 7,
            cover: '653ec1c250fb46a6f53fee06',
            title: "Nischenseiten und Vergleichsportale",
            description: "Category 2 description",
        },
        {
            id: 8,
            cover: '653ec18050fb46a6f53fecaa',
            title: "Advertising",
            description: "Category 2 description",
        }
    ];

    const [selected, setSelected] = selectedState ?? useState([]);
    return <>
        <Scrollbar sx={{width: "100%", p: 2, height: "100%"}} forceVisible="y" autoHide={false}>
            <Grid spacing={2} container>
                {items.map((item, index) => <Grid key={item.id + " " + index} xs={3} item><MarketingChannelItem actionItems={[
                    <Checkbox checked={selected.indexOf(item.title) !== -1 ? 'checked' : ''} onClick={() => setSelected(selected.indexOf(item.title) !== -1 ? selected.filter(selectedItem => selectedItem !== item.title) : [...selected, item.title])} />
                ]} item={item} /></Grid>)}
            </Grid>
        </Scrollbar>
    </>
}