import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    Container,
    EmptyContent,
    Grid,
    HeaderItemsContext,
    Icon,
    Page,
    Scrollbar,
    SearchInput,
    TablePagination,
    useSettings,
    useSnackbar
} from "my-lib";
import {StickySubNavProvider} from "../../../../providers/StickyNavProvider";
import {CampaignCard} from "@resources/Campaign/components/CampaignCard";
import {EditCreateModal} from "@components/EditCreateModal";
import {resourceSchema} from "@resources/Campaign/configs/resourceSchema"
import {useData} from "@resources/Campaign/hooks/useData";
import {DeleteModal} from "@components/DeleteModal";

const Content: FC<any> = ({
                              openCreateModal,
                              emptyData,
                              deleteCampaign,
                              editCampaign,
                              campaigns,
                              isLoading
                          }) => {

    const {themeStretch} = useSettings();

    const scrollableNodeRef = useRef();

    return <Scrollbar sx={{
        display: "flex",
        flex: 1,
        height: "100%",
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
            <StickySubNavProvider>
                <Box sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: theme.spacing(4)
                })}>
                    <Button
                        variant="contained"
                        size={"large"}
                        startIcon={<Icon icon={'eva:plus-fill'}/>}
                        onClick={openCreateModal}
                    >new Campaign</Button>
                </Box>
            </StickySubNavProvider>
            <Box sx={{flex: 1, display: "flex", flexDirection: "container"}}>
                <Container sx={{flex: 1, display: "flex", flexDirection: "container"}}
                           maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4} sx={{
                        paddingTop: 4,
                        paddingRight: (theme) => theme.spacing(2),
                        paddingBottom: campaigns.length ? "52px" : "0px"
                    }}>
                        {isLoading ? Array.from(Array(10)).map((i, index) => <Grid key={"campaign-skeleton-" + index}
                                                                                   item xs={12} sm={4} md={3}
                                                                                   md={3}><CampaignCard loading={true}
                                                                                                        campaign={{}}/></Grid>) : campaigns.map((campaignItem: any, index: number) => (
                            <Grid key={campaignItem + "-" + index} item xs={12} sm={4} md={3}>
                                <CampaignCard deleteCampaign={deleteCampaign} editCampaign={editCampaign}
                                              campaign={campaignItem}></CampaignCard>
                            </Grid>
                        ))}

                        {emptyData && <Box sx={{
                            width: "100%",
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}><EmptyContent
                            title="Keine Kampagnen gefunden"
                            description="Keine Kampagnen gefunden"
                            img="/static/illustrations/illustration_empty.svg"
                        /></Box>}
                    </Grid>
                </Container>
            </Box>
        </Box></Scrollbar>
};

export default () => {

    const [currentCampaign, setCurrentCampaign] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [createModalState, setCreateModalState] = useState(false);

    const {
        refetchingOptions,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        total,
        setLimit,
        createMutation,
        editMutation,
        searchValue,
        setSearchValue,
        deleteItems,
        items,
        emptyData,
        loading
    } = useData();

    const {enqueueSnackbar} = useSnackbar();

    const {setCenterItems} = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche aus deinen Kampagnen"} searchValue={searchValue}
                                     updateInput={setSearchValue} key={1}/>]);
    }, []);

    const closeModalHandler = () => {
        setCurrentCampaign(null);
        setCreateModalState(false);
        setIsEdit(false);
    }

    const openCreateModal = () => {
        setCreateModalState(true);
    }

    const openDeleteModal = () => {
        setDeleteModal(true);
    }

    const closeDeleteModalHandler = () => {
        setDeleteModal(false);
    }

    const agreeDeleteCampaign = async () => {
        await deleteItems([currentCampaign.id]);
        closeDeleteModalHandler();
    }


    const deleteCampaign = (campaign) => {
        setCurrentCampaign(campaign);
        openDeleteModal();
    }

    const editCampaign = (campaign) => {
        setCurrentCampaign(campaign);
        setCreateModalState(true);
        setIsEdit(true);
    }


    return <>
        <Page title="Dashboard">
            <Content emptyContent={emptyData} isLoading={loading}
                     campaigns={items} openCreateModal={openCreateModal} editCampaign={editCampaign}
                     deleteCampaign={deleteCampaign}/>
            {!!items.length && <TablePagination
                sx={(theme) => ({
                    position: "sticky",
                    zIndex: 999,
                    overflow: "visible",
                    boxShadow: theme.customShadows.z24,
                    background: theme.palette.background.paper,
                    bottom: 0,
                    left: 0,
                    right: 0
                })}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, page: number) => {
                    setPage(page);
                }}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setLimit(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />}
        </Page>
        <EditCreateModal
            resourceName={'Campaign'}
            resourceSchema={resourceSchema()}
            handleCloseModal={closeModalHandler}
            refetchingOptions={refetchingOptions}
            isModalOpen={createModalState}
            item={currentCampaign}
            isEdit={isEdit}
            createMutation={createMutation}
            editMutation={editMutation}
        />
        <DeleteModal resourceName={"Campaign"} isModalOpen={deleteModal} handleCloseModal={closeDeleteModalHandler}
                     agree={agreeDeleteCampaign} />
    </>
}
