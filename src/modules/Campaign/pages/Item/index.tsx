import {
    Box,
    Button,
    Container,
    Icon,
    Menu,
    MenuItem,
    Page,
    Router,
    Scrollbar,
    Tab,
    Tabs,
    Typography,
    useSettings
} from "my-lib";
import React, {useEffect, useRef, useState} from "react";
import {capitalCase} from "change-case";
import {ELearningContent, ProductsContent, ToolsContent} from "./Content"
import {AddProductsModal} from "@resources/Campaign/components/AddProductsModal";
import {AddToolsModal} from "@resources/Campaign/components/AddToolsModal";
import {AddELearningResourcesModal} from "@resources/Campaign/components/AddELearningResourcesModal";
import {DashboardContent} from "./Content/DashboardContent";
import {CategoriesContent} from "./Content/CategoriesContent";
import {TargetGroupsContent} from "./Content/TargetGroupsContent";
import {StickySubNavProvider} from "../../../../providers/StickyNavProvider";
import {DeleteModal} from "@components/DeleteModal";
import {resourceSchema} from "@resources/Campaign/configs/resourceSchema";
import {EditCreateModal} from "@components/EditCreateModal";
import {useDataItem} from "@resources/Campaign/hooks/useDataItem";

const {useParams, useNavigate} = Router;

export default () => {
    const {campaignId} = useParams();


    const {
        item,
        refetchingOptions,
        createMutation,
        editMutation,
        edit
    } = useDataItem(campaignId);


    const getGraphqlUpdateObjects = (resourceKey, id) => {
        const updateRelationshipObject = {};
        updateRelationshipObject[resourceKey] = {delete: [id]};
        return updateRelationshipObject;

    };
    const [addProductsModalState, setAddProductsModalState] = useState(false);
    const [addToolsModalState, setAddToolsModalState] = useState(false);

    const [addELearningResourcesModalState, setAddELearningResourcesModalState] = useState(false);

    const [removeModalState, setRemoveModalState] = useState(false);
    const [currentResource, setCurrentResource] = useState<{ key: string, id: string }>(null);

    const [editModalState, setEditModalState] = useState(false);

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
        setCurrentResource(null);
        setRemoveModalState(false);
    }

    const [currentTab, setCurrentTab] = useState("dashboard");

    useEffect(() => {
        if (scrollableNodeRef) scrollableNodeRef.current.getScrollElement().scrollTo(0, 0);
    }, [currentTab])

    const {themeStretch} = useSettings();
    const navigate = useNavigate();

    const removeResource = (resourceKey, id) => {
        setCurrentResource({
            key: resourceKey,
            id
        });
        setRemoveModalState(true);
    };

    const agreeRemove = async () => {
        await edit(currentResource, campaignId, getGraphqlUpdateObjects(currentResource.key, currentResource.id))
        closeRemoveModalHandler();
    }

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

    const scrollableNodeRef = useRef(null);

    // tabs
    const TABS = [
        {
            value: 'dashboard',
            icon: <Icon icon={'carbon:dashboard'} width={20} height={20}/>,
            component: (active: boolean) => <DashboardContent active={active} campaign={item}/>
        },
        {
            value: 'products',
            icon: <Icon icon={'tabler:package'} width={20} height={20}/>,
            component: (active: boolean) => <ProductsContent active={active} scrollableNodeRef={scrollableNodeRef} campaignData={item} remove={removeResource} ids={item?.partnerPrograms?.map(item => item?.id)}/>
        },
        {
            value: 'categories',
            icon: <Icon icon={'dashicons:screenoptions'} width={20} height={20}/>,
            component: (active: boolean) => <CategoriesContent campaign={item}/>
        },
        {
            value: 'targetGroups',
            icon: <Icon icon={'fluent:target-arrow-16-filled'} width={20} height={20}/>,
            component: (active: boolean) => <TargetGroupsContent campaign={item}/>
        },
        {
            value: 'tools',
            icon: <Icon icon={'clarity:tools-line'} width={20} height={20}/>,
            component: (active: boolean) => <ToolsContent campaignData={item} remove={removeResource}
                                     ids={item?.tools?.map(tool => tool?.id)}/>
        },
        {
            value: 'E-Learning',
            icon: <Icon icon={'bx:movie-play'} width={20} height={20}/>,
            component: (active: boolean) => <ELearningContent campaignData={item} remove={removeResource} ids={item?.eLearningResources?.map(eLearningResource => eLearningResource?.id)}/>
        },
        // {
        //     value: 'Tasks',
        //     icon: <Icon icon={'tabler:layout-list'} width={20} height={20}/>,
        //     component: <TasksContent />
        // }
    ];

    return <Page title="Campaign Item">
        <EditCreateModal
            resourceName={'Campaign'}
            resourceSchema={resourceSchema()}
            handleCloseModal={closeModalHandler}
            isModalOpen={editModalState}
            refetchingOptions={refetchingOptions}
            item={item}
            isEdit={true}
            createMutation={createMutation}
            editMutation={editMutation}
        />
        <DeleteModal resourceName={"Parnterprogram"} isModalOpen={removeModalState}
                     handleCloseModal={closeRemoveModalHandler} agree={agreeRemove}/>
        <AddProductsModal refetchingOptions={refetchingOptions} isModalOpen={addProductsModalState}
                          handleCloseModal={closeAddProductsModalHandler} item={item}/>
        <AddToolsModal isModalOpen={addToolsModalState} handleCloseModal={closeAddToolsModalHandler} item={item}/>
        <AddELearningResourcesModal isModalOpen={addELearningResourcesModalState}
                                    handleCloseModal={closeAddELearningResourcesModalHandler} item={item}/>
        {scrollableNodeRef && <Scrollbar sx={{
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
            {!!scrollableNodeRef.current && <Box sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column"
            }}>
                <StickySubNavProvider sx={{py: 0, height: "62px"}}>
                    <Box sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        height: "100%",
                        justifyContent: 'space-between',
                        px: theme.spacing(4)
                    })}>
                        <Box sx={{display: "flex", gap: (theme) => theme.spacing(2), alignItems: "center"}}>
                            <Button onClick={() => {
                                navigate("/app/campaign")
                            }} color="inherit" startIcon={<Icon icon="eva:arrow-back-fill"/>}>Zurück</Button>
                            <Typography variant="h6" component="h4">{item?.title}</Typography>
                        </Box>
                        <Box sx={{alignSelf: "flex-end"}}>
                            <Tabs
                                value={currentTab}
                                allowScrollButtonsMobile
                                aria-label="scrollable force tabs example"
                                onChange={(e, value) => setCurrentTab(value)}>
                                {TABS.map((tab, index) => (
                                    <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon}
                                         value={tab.value}/>
                                ))}
                            </Tabs>
                        </Box>
                        <Box sx={(theme) => ({display: "flex", gap: theme.spacing(2)})}>
                            <Button onClick={() => {
                                editCampaign()
                            }} color="inherit" endIcon={<Icon
                                icon="fluent:text-bullet-list-square-edit-20-regular"/>}>edit</Button>
                            <Button variant="contained" size={"large"} onClick={handleOpenAddMenu} color="primary"
                                    startIcon={<Icon icon="akar-icons:plus"/>}>add Item</Button>
                            <Menu
                                sx={{marginTop: "-52px"}}
                                keepMounted
                                anchorEl={isOpenAddMenu}
                                open={Boolean(isOpenAddMenu)}
                                onClose={handleCloseAddMenu}
                            >
                                <MenuItem sx={{height: "64px", minWidth: "312px"}} onClick={() => {
                                    toggleAddProductsModal();
                                    handleCloseAddMenu()
                                }}>Partnerprograms</MenuItem>
                                <MenuItem sx={{height: "64px", minWidth: "312px"}} onClick={() => {
                                    toggleAddToolsModal();
                                    handleCloseAddMenu()
                                }}>Tools</MenuItem>
                                <MenuItem sx={{height: "64px", minWidth: "312px"}} onClick={() => {
                                    toggleAddELearningResourcesModal();
                                    handleCloseAddMenu()
                                }}>E-Learning Resources</MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </StickySubNavProvider>
                <Box sx={{display: "flex", flexDirection: "column", flex: 1}}>
                    <Container sx={{flex: 1, display: "flex", flexDirection: "column"}}
                               maxWidth={themeStretch ? false : 'xl'}>
                        <Box sx={(theme) => ({
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignCenter: "center",
                            background: theme.palette.background.neutral,
                            paddingTop: theme.spacing(2)
                        })}>
                            {item && TABS.map((tab, index) => <Box key={index} sx={{
                                display: currentTab === tab.value ? "flex" : "none",
                                width: "100%",
                                flex: 1,
                                flexDirection: "column"
                            }}>
                                { tab.component(currentTab === tab.value) }
                            </Box>)}
                        </Box>
                    </Container>
                </Box>
            </Box>}
            </Scrollbar>}
    </Page>;
}
