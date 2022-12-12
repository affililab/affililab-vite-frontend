import React, {FC, useState} from "react";
import {
    Grid,
    Box,
    EmptyContent,
    Scrollbar,
    Checkbox,
    useAuth, IconButton, Icon
} from "my-lib";
import {ElearningMenu} from "@resources/ELearningResources/components/ElearningMenu";
import {ELearningItem} from "@resources/ELearningResources/components/ELearningItem";
import {ElearningItemModal} from "@resources/ELearningResources/components/ElearningItemModal";
import {useELearningResourceData} from "@resources/ELearningResources/hook/useELearningResourceData";
import {AddToModal} from "@resources/Campaign/components/AddToModal";
import {CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";

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

        <Box sx={{display: 'flex'}}>
            <Item>
                <ElearningMenu earchValue={searchValue} setSearchValue={setSearchValue}
                               updateSearch={(e) => setSearchValue(e.target.value)}
                               activeCategories={activeCategories}
                               setActiveCategories={setActiveCategories}/>
            </Item>
            <Item sx={{width: "100%", height: "724px"}}>
                <Scrollbar forceVisible={"y"} autoHide={false}>
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
                </Scrollbar>
            </Item>
        </Box></>
}