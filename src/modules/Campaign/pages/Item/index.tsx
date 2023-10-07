import {
    useSettings,
    Router,
    Box,
    Tabs,
    Tab,
    Page,
    Button,
    Container,
    Icon,
    Typography,
    Menu,
    MenuItem, Scrollbar
} from "my-lib";
import React, {useState, useEffect, useRef} from "react";
import {GET_CAMPAIGN, UPDATE_CAMPAIGN} from "@schemas"
import {useMutation, useQuery} from "@apollo/client";
import {capitalCase} from "change-case";
import { ToolsContent, ELearningContent, ProductsContent, TasksContent } from "./Content"
import {Modal} from "@resources/Campaign/components/CampaignSaveModal";
import {DeleteFromCampaignModal} from "@resources/Campaign/components/DeleteFromCampaignModal";
import {AddProductsModal} from "@resources/Campaign/components/AddProductsModal";
import {AddToolsModal} from "@resources/Campaign/components/AddToolsModal";
import {AddELearningResourcesModal} from "@resources/Campaign/components/AddELearningResourcesModal";
import {DashboardContent} from "./Content/DashboardContent";
import {CategoriesContent} from "./Content/CategoriesContent";
import {TargetGroupsContent} from "./Content/TargetGroupsContent";
import {StickySubNavProvider} from "../../../../providers/StickyNavProvider";
import { useProductInteraction } from "@resources/User/hooks/useProductInteraction";

const {useParams, useNavigate} = Router;

export default () => {
    const {campaignId} = useParams();

    const getGraphqlUpdateObjects = (resourceKey, id) => {
        const updateRelationshipObject = {};
        updateRelationshipObject[resourceKey] = { delete: [id] };
        return updateRelationshipObject;
    };

    const {loading: isLoading, error, data: campaignData, status, refetch} = useQuery(GET_CAMPAIGN, { variables: { id: campaignId } });


    const [editCampaignMutation, { error: updateCampaignError }] = useMutation(UPDATE_CAMPAIGN, {
        refetchQueries: [
            { query: GET_CAMPAIGN, variables: { id: campaignId } }
        ]
    });

    const [campaign, setCampaign] = useState(null);

    const [addProductsModalState, setAddProductsModalState] = useState(false);
    const [addToolsModalState, setAddToolsModalState] = useState(false);
    const [addELearningResourcesModalState, setAddELearningResourcesModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);

    const [removeModalState, setRemoveModalState] = useState(false);
    const [currentResource, setCurrentResource] = useState(false);

    const { registerInteraction } = useProductInteraction();

    // add Button
    const [isOpenAddMenu, setOpenAddMenu] = useState(null);
    const handleOpenAddMenu = (event) => {
        setOpenAddMenu(event.currentTarget);
    };
    const handleCloseAddMenu = () => {
        setOpenAddMenu(null);
    };
    // end add Button

    const closeAddProductsModalHandler = () => {
        setAddProductsModalState(false);
    }

    const closeAddToolsModalHandler = () => {
        setAddToolsModalState(false);
    }

    const closeAddELearningResourcesModalHandler = () => {
        setAddELearningResourcesModalState(false);
    }

    const closeModalHandler = () => {
        setEditModalState(false);
        // setIsEdit(false);
    }

    const closeRemoveModalHandler = () => {
        setCurrentResource();
        setRemoveModalState(false);
    }

    const [currentTab, setCurrentTab] = useState("dashboard");

    const {themeStretch} = useSettings();
    const navigate = useNavigate();

    useEffect(() => {
        if (campaignId) refetch();
    }, [campaignId])

    useEffect(() => {
        if (campaignData) setCampaign(campaignData?.getCampaign);
    }, [campaignData]);

    const removeResource = (resourceKey, id) => {
        setCurrentResource({
            key: resourceKey,
            id
        });
        setRemoveModalState(true);
    };

    const agreeRemove = async () => {
        await editCampaignMutation({ variables: { id: campaignId, ...getGraphqlUpdateObjects(currentResource.key, currentResource.id) } })
        if (currentResource.key === 'partnerPrograms') {
            registerInteraction(currentResource.id, "removed_from_campaign");
        }
        closeRemoveModalHandler();
    }

    // tabs
    const TABS = [
        {
            value: 'dashboard',
            icon: <Icon icon={'carbon:dashboard'} width={20} height={20}/>,
            component: <DashboardContent campaign={campaign} />
        },
        {
            value: 'products',
            icon: <Icon icon={'tabler:package'} width={20} height={20}/>,
            component: <ProductsContent campaignData={campaignData} remove={removeResource} pItems={campaign?.partnerPrograms} ids={campaign?.partnerPrograms?.map(item => item?.id)} />
        },
        {
            value: 'categories',
            icon: <Icon icon={'dashicons:screenoptions'} width={20} height={20}/>,
            component: <CategoriesContent campaign={campaign} />
        },
        {
            value: 'targetGroups',
            icon: <Icon icon={'fluent:target-arrow-16-filled'} width={20} height={20}/>,
            component: <TargetGroupsContent campaign={campaign} />
        },
        {
            value: 'tools',
            icon: <Icon icon={'clarity:tools-line'} width={20} height={20}/>,
            component: <ToolsContent campaignData={campaignData} remove={removeResource} ids={campaign?.tools?.map(item => item?.id)} />
        },
        {
            value: 'E-Learning',
            icon: <Icon icon={'bx:movie-play'} width={20} height={20}/>,
            component: <ELearningContent campaignData={campaignData} remove={removeResource} ids={campaign?.eLearningResources?.map(item => item?.id)} />
        },
        // {
        //     value: 'Tasks',
        //     icon: <Icon icon={'tabler:layout-list'} width={20} height={20}/>,
        //     component: <TasksContent />
        // }
    ];

    const editCampaign = () => {
        setEditModalState(true);
    }

    const toggleAddProductsModal = () => {
        setAddProductsModalState(true);
    }

    const toggleAddToolsModal = () => {
        setAddToolsModalState(true);
    }

    const toggleAddELearningResourcesModal = () => {
        setAddELearningResourcesModalState(true);
    }

    const scrollableNodeRef = useRef();

    return <Page title="Campaign Item">
        <Modal update={true} isModalOpen={editModalState} item={campaign} handleCloseModal={closeModalHandler}/>
        <DeleteFromCampaignModal isModalOpen={removeModalState} handleCloseModal={closeRemoveModalHandler} agree={agreeRemove} />
        <AddProductsModal isModalOpen={addProductsModalState} handleCloseModal={closeAddProductsModalHandler} item={campaign} />
        <AddToolsModal isModalOpen={addToolsModalState} handleCloseModal={closeAddToolsModalHandler} item={campaign} />
        <AddELearningResourcesModal isModalOpen={addELearningResourcesModalState} handleCloseModal={closeAddELearningResourcesModalHandler} item={campaign} />
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
            flexDirection: "column"
        }}>
            <StickySubNavProvider sx={{ py: 0, height: "62px" }}>
                <Box sx={(theme) => ({display: 'flex', alignItems: 'center', height: "100%", justifyContent: 'space-between', px: theme.spacing(4)})}>
                    <Box sx={{ display: "flex", gap: (theme) => theme.spacing(2), alignItems: "center" }}>
                        <Button onClick={() => {navigate("/app/campaign")}} color="inherit" startIcon={<Icon icon="eva:arrow-back-fill" />}>Zurück</Button>
                        <Typography variant="h6" component="h4">{campaign?.title}</Typography>
                    </Box>
                    <Box sx={{ alignSelf: "flex-end" }}>
                        <Tabs
                            value={currentTab}
                            allowScrollButtonsMobile
                            aria-label="scrollable force tabs example"
                            onChange={(e, value) => setCurrentTab(value)}>
                            {TABS.map((tab, index) => (
                                <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value}/>
                            ))}
                        </Tabs>
                    </Box>
                    <Box sx={(theme) => ({ display: "flex", gap: theme.spacing(2) })}>
                        <Button onClick={() => {editCampaign()}} color="inherit" endIcon={<Icon icon="fluent:text-bullet-list-square-edit-20-regular" />}>edit</Button>
                        <Button variant="contained" size={"large"}  onClick={handleOpenAddMenu} color="primary" startIcon={<Icon icon="akar-icons:plus" />}>add Item</Button>
                        <Menu
                            keepMounted
                            id="demo-positioned-menu"
                            anchorEl={isOpenAddMenu}
                            open={Boolean(isOpenAddMenu)}
                            onClose={handleCloseAddMenu}
                        >
                            <MenuItem onClick={() => { toggleAddProductsModal(); handleCloseAddMenu()}}>Partnerprograms</MenuItem>
                            <MenuItem onClick={() => { toggleAddToolsModal(); handleCloseAddMenu()}}>Tools</MenuItem>
                            <MenuItem onClick={() => { toggleAddELearningResourcesModal(); handleCloseAddMenu()}}>E-Learning Resources</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </StickySubNavProvider>
            <Box sx={{flex: 1}}>
                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Box sx={(theme) => ({
                        display: "flex",
                        justifyContent: "center",
                        alignCenter: "center",
                        background: theme.palette.background.neutral,
                        paddingTop: theme.spacing(2)
                    })}>
                        {TABS.map((tab, index) => {
                            const isMatched = tab.value === currentTab;
                            return isMatched && <Box sx={{ width: "100%" }} key={index}>{tab.component}</Box>
                        })}
                    </Box>
                </Container>
            </Box>
        </Box></Scrollbar></Page>;
}
