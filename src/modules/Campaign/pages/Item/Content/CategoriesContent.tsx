import React, {useEffect, useState} from "react";
import {Grid, Scrollbar} from "my-lib";
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

    return <Grid spacing={2} container>
            {categories.map(item => <Grid xs={4} item><CategoryItem actionItems={[]} item={item} /></Grid>)}
        </Grid>
}