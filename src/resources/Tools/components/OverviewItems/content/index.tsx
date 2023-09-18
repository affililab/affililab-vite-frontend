import {
    Box,
    Checkbox,
    CircularProgress,
    Container,
    Grid,
    HeaderItemsContext, Icon,
    InfiniteScroll,
    SearchInput,
    ToggleButton,
    Tooltip,
    useAuth,
    useSettings
} from "my-lib";
import React, {FC, useContext, useEffect, useState} from "react";
import {ToolItemModal} from "@resources/Tools/components/ToolItemModal";
import {AddToModal} from "@resources/Campaign/components/AddToModal";
import {ToolMenu} from "@resources/Tools/components/ToolMenu";
import {useData} from "@resources/Tools/hooks/useData";
import {ToolItem} from "@resources/Tools/components/ToolItem";

export const Content: FC<any> = ({
                                     isSelection,
                                     scrollableNodeRef,
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

    const {items, loading, searchValue, setSearchValue, page, fetchNext, total, called, rowsPerPage} = useData({
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

    const {themeStretch} = useSettings();

    const {setCenterItems} = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche aus Tools ..."} searchValue={searchValue}
                                     updateInput={setSearchValue}/>]);
    }, []);

    const [fetchAllowed, setFetchAllowed] = useState(true);

    const nextPage = async () => {
        console.log("fetchnext");
        if (!fetchAllowed) return;
        setFetchAllowed(false);
        await fetchNext();
        setFetchAllowed(true);
    }

    return <>
        <ToolItemModal item={currentItem} addToCampaign={addToCampaign} isModalOpen={itemModalState}
                       handleCloseModal={closeModalHandler}/>

        <AddToModal
            addToObjects={{tools: addToCampaignItems}}
            isModalOpen={showAddToCampaignModal}
            handleCloseModal={() => {
                setShowAddToCampaignModal(false)
            }}
            resource={"Tools"}
        />
        <Box sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
        }}>
            <Box sx={{flex: 1, display: "flex"}}>
                <Box>
                    <ToolMenu sx={{
                        background: "paper",
                        zIndex: 1000,
                        position: "sticky",
                        height: "calc( 100vh - 64px)",
                        top: 0
                    }}
                              searchValue={searchValue} setSearchValue={setSearchValue}
                              updateSearch={(e) => setSearchValue(e.target.value)}
                              activeCategories={activeCategories} setActiveCategories={setActiveCategories}/>
                </Box>
                <Container maxWidth={themeStretch ? false : 'xl'} sx={(theme) => ({py: theme.spacing(2)})}>
                        {!!scrollableNodeRef?.current && <Box
                            sx={(theme: any) => ({height: "100%", flex: 1, display: "flex", flexDirection: "column"})}>

                            {loading && <Box sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <CircularProgress/>
                            </Box>}
                            <InfiniteScroll
                                scrollableTarget={scrollableNodeRef.current.getScrollElement()}
                                dataLength={total}
                                scrollThreshold={1}
                                sx={(theme: any) => ({
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    overflow: "hidden",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                })}
                                next={nextPage}
                                hasMore={(total - ((page + 1) * rowsPerPage)) > 0}
                                // endMessage={
                                //     <p style={{ textAlign: 'center' }}>
                                //         <b>Yay! You have seen it all</b>
                                //     </p>
                                // }
                                loader={(100 - ((page + 1) * rowsPerPage)) > 0 && <Box sx={{
                                    mt: 4,
                                    height: "256px",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <CircularProgress/>
                                </Box>}
                                >
                                <Grid container spacing={4} px={2}>
                                {items.map(toolItem => <Grid item xs={12} sm={6} md={4}>
                                    {isSelection ? <ToolItem
                                    actionItems={[
                                        <Checkbox disabled={implemented.indexOf(toolItem.id) !== -1}
                                                  checked={selected.indexOf(toolItem.id) !== -1 || implemented.indexOf(toolItem.id) !== -1}
                                                  onClick={() => setSelected(selected.indexOf(toolItem.id) !== -1 ? selected.filter(selectedItem => selectedItem !== toolItem.id) : [...selected, toolItem.id])}/>
                                    ]}
                                    openModalHandler={() => openModalHandler(toolItem)}
                                    toolItem={toolItem}/> : <ToolItem
                                    {...(actionItems ? {
                                        actionItems: actionItems.length ? actionItems : [
                                            isAuthenticated && <Tooltip title={"add to campaign"} arrow>
                                                <ToggleButton sx={(theme) => ({background: theme.palette.grey[500_80]})}
                                                              onClick={() => addToCampaign(toolItem)}
                                                              aria-label="add to campaign">
                                                    <Icon color={"white"} sx={(theme) => ({
                                                        height: 20,
                                                        width: 20,
                                                        color: theme.palette.primary.dark
                                                    })} icon={"codicon:add"}/>
                                                </ToggleButton>
                                            </Tooltip>,
                                            <Tooltip title={"show"} arrow>
                                                <ToggleButton sx={(theme) => ({background: theme.palette.grey[500_80]})}
                                                              onClick={() => {
                                                                  openModalHandler(toolItem)
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
                                    addToCampaign={() => addToCampaign(toolItem)}
                                    openModalHandler={() => openModalHandler(toolItem)}
                                    toolItem={toolItem} />}
                                </Grid>)}
                                </Grid>
                            </InfiniteScroll>
                        </Box>}
                    </Container></Box></Box>
    </>
};