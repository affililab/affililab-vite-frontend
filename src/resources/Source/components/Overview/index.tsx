import { Grid } from "my-lib"
import { useData } from "../../hooks/useData"
import { SourceItem } from "../SourceItem"
export const Overview = () => {
    const { items, loading, total } = useData();
    return <>
        <Grid spacing={2} container>
            {items.map(item => <Grid xs={4} item><SourceItem item={item} /></Grid>)}
        </Grid>
    </>
};