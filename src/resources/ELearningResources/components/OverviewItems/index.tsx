import React, {FC, useRef, useState} from "react";
import {
    Grid,
    Box,
    EmptyContent,
    Scrollbar,
    Checkbox,
    useAuth, IconButton, Icon, Container, useSettings
} from "my-lib";
import {ElearningMenu} from "@resources/ELearningResources/components/ElearningMenu";
import {ELearningItem} from "@resources/ELearningResources/components/ELearningItem";
import {ElearningItemModal} from "@resources/ELearningResources/components/ElearningItemModal";
import {useELearningResourceData} from "@resources/ELearningResources/hook/useELearningResourceData";
import {AddToModal} from "@resources/Campaign/components/AddToModal";
import {CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";
import {ToolItemModal} from "@resources/Tools/components/ToolItemModal";
import {ToolMenu} from "@resources/Tools/components/ToolMenu";
import {ToolItem} from "@resources/Tools/components/ToolItem";

function Item(props: any) {
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

    const {items, loading, called, searchValue, setSearchValue, page, fetchNext} = useELearningResourceData({
        direction: 1,
        sortBy: "title",
        limit: 10,
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

    return  <>
        <ElearningItemModal item={currentItem} addToCampaign={addToCampaign} isModalOpen={itemModalState}
                            handleCloseModal={closeModalHandler}/>

        <AddToModal
            addToObjects={{eLearningResources: addToCampaignItems}}
            isModalOpen={showAddToCampaignModal}
            handleCloseModal={() => {
                setShowAddToCampaignModal(false)
            }}
            resource={"Elearning Resources"}
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
                        <ElearningMenu sx={{ background: "paper", position: "sticky", height: "calc( 100vh - 64px)",  top: 0 }} earchValue={searchValue} setSearchValue={setSearchValue}
                                       updateSearch={(e) => setSearchValue(e.target.value)}
                                       activeCategories={activeCategories}
                                       setActiveCategories={setActiveCategories}/>
                    <Container maxWidth={themeStretch ? false : 'xl'} sx={(theme) => ({ py: theme.spacing(2) })}>
                        <Grid container spacing={4} px={2}>
                            {loading ? Array.from(Array(5)).map(i => <Grid key={i} item xs={12} sm={6}
                                                                           md={4}><CampaignCardSkeleton/></Grid>) : !!items.length ? items.map(eLearningResourcesItem => (
                                <Grid item xs={12} sm={6} md={4}>
                                    {isSelection ? <ELearningItem
                                        actionItems={[
                                            <Checkbox disabled={implemented.indexOf(eLearningResourcesItem.id) !== -1} checked={ selected.indexOf(eLearningResourcesItem.id) !== -1 ||  implemented.indexOf(eLearningResourcesItem.id) !== -1} onClick={() => setSelected(selected.indexOf(eLearningResourcesItem.id) !== -1 ? selected.filter(selectedItem => selectedItem !== eLearningResourcesItem.id) : [...selected, eLearningResourcesItem.id])}/>
                                        ]}
                                        openModalHandler={() => openModalHandler(eLearningResourcesItem)}
                                        eLearningResourcesItem={eLearningResourcesItem} /> : <ELearningItem
                                        { ...(actionItems ? { actionItems: actionItems.length ? actionItems : [
                                                isAuthenticated && <IconButton onClick={() => { addToCampaign(eLearningResourcesItem) }}>
                                                    <Icon color={"white"} icon={'carbon:add-alt'} />
                                                </IconButton>,
                                                <IconButton onClick={() => { openModalHandler(eLearningResourcesItem) }}>
                                                    <Icon color={"white"} icon={'tabler:arrows-maximize'} />
                                                </IconButton>
                                            ] } : {}) }
                                        addToCampaign={() => addToCampaign(eLearningResourcesItem)}
                                        openModalHandler={() => openModalHandler(eLearningResourcesItem)}
                                        eLearningResourcesItem={eLearningResourcesItem} />}
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
}