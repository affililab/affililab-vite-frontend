import { Grid } from "my-lib"
import { useData } from "../../hooks/useData"
import { CategoryGroupItem } from "../CategoryGroupItem"
export const Overview = () => {
    const { items } = useData();
    return <>
        <Grid spacing={2} container>
            {items.map(item => <Grid xs={4} item><CategoryGroupItem item={item} /></Grid>)}
        </Grid>
    </>
}