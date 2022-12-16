import { useEffect, useState } from "react"
import {Box, EmptyContent, Grid, IconButton, Icon, Tooltip} from "my-lib"
import {ToolItem} from "@resources/Tools/components/ToolItem";
import {useLazyQuery} from "@apollo/client";
import {GET_TOOLS_BY_IDS} from "@schemas";
import {CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";
import {ToolItemModal} from "@resources/Tools/components/ToolItemModal";

export const ToolsContent = ({ campaignData, ids = [], remove = () => {} }) => {

    const [getItems, { loading, error, data, called }] = useLazyQuery(GET_TOOLS_BY_IDS);

    const [items, setItems] = useState([]);

    const [itemModalState, setItemModalState] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        getItems({ variables: { ids } });
    }, [campaignData, ids]);

    useEffect(() => {
        if (data) setItems(data.getToolsByIds);
    }, [data]);

    const openModalHandler = (item) => {
        setItemModalState(true);
        setCurrentItem(item);
    }

    const closeModalHandler = () => {
        setItemModalState(false);
    }

    // render - show items
    return <>
        <ToolItemModal item={currentItem} isModalOpen={itemModalState} handleCloseModal={closeModalHandler} />
        <Grid container spacing={4}>
            {loading ? Array.from(Array(5)).map(i =>  <Grid item xs={12} sm={6} md={4}><CampaignCardSkeleton /></Grid>) : !!items.length ? items.map(item => (
                <Grid item xs={12} sm={6} md={4}>
                    <ToolItem
                        openModalHandler={() => openModalHandler(item)}
                        toolItem={item} actionItems={[
                        <Tooltip title={"von Kampagne entfernen"} arrow>
                            <IconButton onClick={() => remove("tools", item.id)}>
                                <Icon color={"white"} sx={(theme) => ({height: 20, width: 20 })} icon={"carbon:subtract-alt"}/>
                            </IconButton>
                        </Tooltip>]} />
                </Grid>
            )) : called && <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><EmptyContent
                title="Keine Tools gefunden"
                description="Nach diesen Kriterien wurden keine Tools gefunden"
                img="/static/illustrations/illustration_empty.svg"
            /></Box>}
        </Grid>
    </>
}