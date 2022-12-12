import React, {FC, useState} from "react";
import {Box, Checkbox, EmptyContent, Grid, Icon, IconButton, Scrollbar, useAuth} from "my-lib";
import {ToolMenu} from "@resources/Tools/components/ToolMenu";
import {CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";
import {ToolItem} from "@resources/Tools/components/ToolItem";
import {useData} from "@resources/Tools/hooks/useData";
import {ToolItemModal} from "@resources/Tools/components/ToolItemModal";
import {AddToModal} from "@resources/Campaign/components/AddToModal";

function Item(props) {
    const {sx, ...other} = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                ...sx,
            }}
            {...other}
        />
    );
}

export const OverviewItems: FC<any> = ({ isSelection, actionItems, selected = [], implemented = [], setSelected = () => null }) => {

    const { isAuthenticated } = useAuth();

    const [itemModalState, setItemModalState] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [addToCampaignItems, setAddToCampaignItems] = useState([]);
    const [showAddToCampaignModal, setShowAddToCampaignModal] = useState(false);
    const [activeCategories, setActiveCategories] = useState([]);

    const {items, loading, searchValue, setSearchValue, page, fetchNext, called} = useData({
        filters: [
            {
                searchParam: "categories",
                items: activeCategories,
                showEmpty: false
            }
        ]
    });

    const openModalHandler = (item) => {
        setItemModalState(true);
        setCurrentItem(item);
    }

    const closeModalHandler = () => {
        setItemModalState(false);
    }

    const addToCampaign = (item) => {
        setShowAddToCampaignModal(true);
        setAddToCampaignItems([item.id]);
    }

    return <>
        <ToolItemModal item={currentItem} addToCampaign={addToCampaign} isModalOpen={itemModalState}
                       handleCloseModal={closeModalHandler} />

        <AddToModal
            addToObjects={{tools: addToCampaignItems}}
            isModalOpen={showAddToCampaignModal}
            handleCloseModal={() => {
                setShowAddToCampaignModal(false)
            }}
            resource={"Tools"}
        />

        <Box sx={{display: 'flex'}}>
        <Item>
            <ToolMenu searchValue={searchValue} setSearchValue={setSearchValue}
                      updateSearch={(e) => setSearchValue(e.target.value)}
                      activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
        </Item>
        <Item sx={{width: "100%", height: "724px"}}>
            <Scrollbar forceVisible={"y"} autoHide={false}>
                <Grid container spacing={4} px={2}>
                    {loading ? Array.from(Array(5)).map(i => <Grid item xs={12} sm={6}
                                                                   md={4}><CampaignCardSkeleton/></Grid>) : !!items.length ? items.map(toolItem => (
                        <Grid item xs={12} sm={6} md={4}>
                            {isSelection ? <ToolItem
                                actionItems={[
                                    <Checkbox disabled={implemented.indexOf(toolItem.id) !== -1} checked={ selected.indexOf(toolItem.id) !== -1 ||  implemented.indexOf(toolItem.id) !== -1} onClick={() => setSelected(selected.indexOf(toolItem.id) !== -1 ? selected.filter(selectedItem => selectedItem !== toolItem.id) : [...selected, toolItem.id])}/>
                                ]}
                                openModalHandler={() => openModalHandler(toolItem)}
                                toolItem={toolItem} /> : <ToolItem
                                { ...(actionItems ? { actionItems: actionItems.length ? actionItems : [
                                        isAuthenticated && <IconButton onClick={() => { addToCampaign(toolItem) }}>
                                            <Icon color={"white"} icon={'carbon:add-alt'} />
                                        </IconButton>,
                                        <IconButton onClick={() => { openModalHandler(toolItem) }}>
                                            <Icon color={"white"} icon={'tabler:arrows-maximize'} />
                                        </IconButton>
                                ] } : {}) }
                                addToCampaign={() => addToCampaign(toolItem)}
                                                                   openModalHandler={() => openModalHandler(toolItem)}
                                                                   toolItem={toolItem} />}
                        </Grid>
                    )) : called && <Box sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><EmptyContent
                        title="Keine Tools gefunden"
                        description="Nach diesen Kriterien wurden keine Tools gefunden"
                        img="/static/illustrations/illustration_empty.svg"
                    /></Box>}
                </Grid>
            </Scrollbar>
        </Item>
    </Box></>
};
