import React, {useEffect, useState} from "react";
import {Box, EmptyContent, Grid, Icon, IconButton, ToggleButton, Tooltip} from "my-lib"
import {ELearningItem} from "@resources/ELearningResources/components/ELearningItem";
import {useLazyQuery} from "@apollo/client";
import {GET_ELEARNINGRESOURCES_BY_IDS} from "@schemas";
import {CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";
import {ElearningItemModal} from "@resources/ELearningResources/components/ElearningItemModal";

export const ELearningContent = ({
                                     campaignData, ids = [], remove = () => {
    }
                                 }) => {

    const [getItems, {loading, error, data, called}] = useLazyQuery(GET_ELEARNINGRESOURCES_BY_IDS);

    const [items, setItems] = useState([]);

    const [itemModalState, setItemModalState] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        getItems({variables: {ids}});
    }, [campaignData, ids]);

    useEffect(() => {
        if (data) setItems(data.getELearningResourcesByIds);
    }, [data]);

    const openModalHandler = (item) => {
        setItemModalState(true);
        setCurrentItem(item);
    }

    const closeModalHandler = () => {
        setItemModalState(false);
    }

    return <>
        <ElearningItemModal item={currentItem} isModalOpen={itemModalState}
                            handleCloseModal={closeModalHandler}/>
        <Grid container spacing={4} sx={{mt: 2}}>
            {loading ? Array.from(Array(5)).map(i => <Grid item xs={12} sm={6}
                                                           md={4}><CampaignCardSkeleton/></Grid>) : !!items.length ? items.map(item => (
                <Grid item xs={12} sm={6} md={4}>
                    <ELearningItem
                        openModalHandler={() => openModalHandler(item)}
                        eLearningResourcesItem={item}
                        actionItems={[   <Box>
                            <Tooltip title={ "von Kampagne entfernen" } arrow>
                                <ToggleButton sx={(theme) => ({ background: theme.palette.grey[500_80] })} onClick={() => remove("tools", item.id)} aria-label="von Kampagne entfernen">
                                    <Icon color={"white"} sx={(theme) => ({height: 20, width: 20 })} icon={"codicon:remove"}/>
                                </ToggleButton>
                            </Tooltip>
                        </Box>]}/>
                </Grid>
            )) : called && <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}><EmptyContent
                title="Keine E Learning Resources gefunden"
                description="Nach diesen Kriterien wurden keine Tools gefunden"
                img="/static/illustrations/illustration_empty.svg"
            /></Box>}
        </Grid>
    </>
}