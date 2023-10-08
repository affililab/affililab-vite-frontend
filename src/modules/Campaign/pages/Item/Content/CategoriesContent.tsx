import React, {useEffect, useState} from "react";
import {Box, EmptyContent, Grid, Scrollbar} from "my-lib";
import {CategoryItem} from "@resources/Category/components/CategoryItem";
import {useCategories} from "@resources/Campaign/hooks/useCategories";

export const CategoriesContent = ({ campaign }) => {

    const { getCategories } = useCategories(campaign.id);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories(campaign.id);
            setCategories(data);
        }
        fetchData()
    }, []);

    return <Grid sx={{ flex: 1, display: "flex", flexDirection: "container"}} spacing={4} container>
            {categories.map((item, index) => <Grid key={index} xs={4} item><CategoryItem actionItems={[]} item={item} /></Grid>)}
            {!categories.length && <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><EmptyContent
                title="Keine Categories gefunden"
                description="Es wurden keine Categories gefunden"
                img="/static/illustrations/illustration_empty.svg"
            /></Box>}
        </Grid>
}