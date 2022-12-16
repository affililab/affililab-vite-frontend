import React, {FC, useRef, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    EmptyContent,
    Grid,
    Icon,
    IconButton,
    Scrollbar,
    useAuth,
    useSettings
} from "my-lib";
import {ToolMenu} from "@resources/Tools/components/ToolMenu";
import {CampaignCard, CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";
import {ToolItem} from "@resources/Tools/components/ToolItem";
import {useData} from "@resources/Tools/hooks/useData";
import {ToolItemModal} from "@resources/Tools/components/ToolItemModal";
import {AddToModal} from "@resources/Campaign/components/AddToModal";
import {StickySubNavProvider} from "../../../../providers/StickyNavProvider";

function Item(props) {
    const {sx, ...other} = props;
    return (
        <Box
            sx={{
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

    const scrollableNodeRef = useRef();

    const {themeStretch} = useSettings();

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
        <Scrollbar sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        ".simplebar-content-wrapper": {
            // height: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
        },
        ".simplebar-content": {
            // height: "100%",
            flex: 1
        }
    }} forceVisible="y" autoHide={false} ref={scrollableNodeRef} style={{height: "100%"}}>
        <Box sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
        }}>
            {/*<StickySubNavProvider>*/}
            {/*    /!*<Box sx={(theme) => ({display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: theme.spacing(4)})}>*!/*/}
            {/*    /!*    <Button*!/*/}
            {/*    /!*        variant="contained"*!/*/}
            {/*    /!*        size={"large"}*!/*/}
            {/*    /!*        startIcon={<Icon icon={'eva:plus-fill'}/>}*!/*/}
            {/*    /!*        onClick={openCreateModal}*!/*/}
            {/*    /!*    >new Campaign</Button>*!/*/}
            {/*    /!*</Box>*!/*/}
            {/*</StickySubNavProvider>*/}
            <Box sx={{flex: 1, display: "flex"}}>
                <Box>
                    <ToolMenu sx={{ background: "paper", position: "sticky", height: "calc( 100vh - 64px)",  top: 0, }} searchValue={searchValue} setSearchValue={setSearchValue}
                              updateSearch={(e) => setSearchValue(e.target.value)}
                              activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
                </Box>
                <Container maxWidth={themeStretch ? false : 'xl'} sx={(theme) => ({ py: theme.spacing(2) })}>
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
                </Container>
            </Box>
        </Box></Scrollbar></>
};
