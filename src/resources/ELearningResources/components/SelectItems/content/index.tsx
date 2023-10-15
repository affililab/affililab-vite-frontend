import React, {FC, useContext, useEffect, useState} from "react";
import {
    Box,
    Checkbox,
    Container,
    EmptyContent,
    Grid,
    HeaderItemsContext,
    Icon,
    SearchInput,
    ToggleButton,
    Tooltip,
    useAuth,
    useSettings
} from "my-lib";
import {ElearningMenu} from "@resources/ELearningResources/components/ElearningMenu";
import {CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";
import {ELearningItem} from "@resources/ELearningResources/components/ELearningItem";
import {ElearningItemModal} from "@resources/ELearningResources/components/ElearningItemModal";
import {AddToModal} from "@resources/Campaign/components/AddToModal";
import {useELearningResourceData} from "@resources/ELearningResources/hook/useELearningResourceData";

export const Content: FC<any> = ({
                                     isSelection,
                                     actionItems,
                                     selected = [],
                                     implemented = [],
                                     setSelected = () => null
                                 }) => {

    const {isAuthenticated} = useAuth();

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

    const {setCenterItems} = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche aus E Learning Resources ..."} searchValue={searchValue}
                                     updateInput={setSearchValue}/>]);
    }, []);

    const {themeStretch} = useSettings();

    return <>
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
                <ElearningMenu
                    sx={{background: "paper", zIndex: 1000, position: "sticky", height: "70vh", top: 0}}
                    searchValue={searchValue} setSearchValue={setSearchValue}
                    updateSearch={setSearchValue}
                    activeCategories={activeCategories}
                    setActiveCategories={setActiveCategories}/>
                <Container maxWidth={themeStretch ? false : 'xl'} sx={(theme) => ({py: theme.spacing(2)})}>
                    <Grid container spacing={4} px={2}>
                        {loading ? Array.from(Array(5)).map((i, index) => <Grid key={index} item xs={12} sm={6}
                                                                       md={4}><CampaignCardSkeleton/></Grid>) : !!items.length ? items.map((eLearningResourcesItem, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                {isSelection ? <ELearningItem
                                    actionItems={[
                                        <Checkbox disabled={implemented.indexOf(eLearningResourcesItem.id) !== -1}
                                                  checked={selected.indexOf(eLearningResourcesItem.id) !== -1 || implemented.indexOf(eLearningResourcesItem.id) !== -1}
                                                  onClick={() => setSelected(selected.indexOf(eLearningResourcesItem.id) !== -1 ? selected.filter(selectedItem => selectedItem !== eLearningResourcesItem.id) : [...selected, eLearningResourcesItem.id])}/>
                                    ]}
                                    openModalHandler={() => openModalHandler(eLearningResourcesItem)}
                                    eLearningResourcesItem={eLearningResourcesItem}/> : <ELearningItem
                                    {...(actionItems ? {
                                        actionItems: actionItems.length ? actionItems : [
                                            isAuthenticated && <Tooltip title={"add to campaign"} arrow>
                                                <ToggleButton
                                                    value={"check"}
                                                    sx={(theme) => ({background: theme.palette.grey[500_80]})}
                                                              onClick={() => addToCampaign(eLearningResourcesItem)}
                                                              aria-label="add to campaign">
                                                    <Icon color={"white"} sx={(theme) => ({
                                                        height: 20,
                                                        width: 20,
                                                        color: theme.palette.primary.dark
                                                    })} icon={"codicon:add"}/>
                                                </ToggleButton>
                                            </Tooltip>,
                                            <Tooltip title={"show"} arrow>
                                                <ToggleButton value={"check"} sx={(theme) => ({background: theme.palette.grey[500_80]})}
                                                              onClick={() => {
                                                                  openModalHandler(eLearningResourcesItem)
                                                              }} aria-label="add to campaign">
                                                    <Icon color={"white"} sx={(theme) => ({
                                                        height: 20,
                                                        width: 20,
                                                        color: theme.palette.primary.dark
                                                    })} icon={"akar-icons:eye-open"}/>
                                                </ToggleButton>
                                            </Tooltip>
                                        ]
                                    } : {})}
                                    addToCampaign={() => addToCampaign(eLearningResourcesItem)}
                                    openModalHandler={() => openModalHandler(eLearningResourcesItem)}
                                    eLearningResourcesItem={eLearningResourcesItem}/>}
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
        </Box>
    </>
}