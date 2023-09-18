import React, {FC, useEffect, useRef, useState} from "react";
import {Box, Button, Container, EmptyContent, Grid, Icon, Page, Scrollbar, useSettings, useSnackbar} from "my-lib";
import {Modal} from "@resources/Campaign/components/CampaignSaveModal";
import {useMutation, useQuery} from "@apollo/client";
import {CampaignDeleteModal} from "@resources/Campaign/components/CampaignDeleteModal"
import {DELETE_CAMPAIGN, GET_CAMPAIGNS} from "@schemas/campaigns"
import {StickySubNavProvider} from "../../../../providers/StickyNavProvider";
import {CampaignCard, CampaignCardSkeleton} from "@resources/Campaign/components/CampaignCard";

const Content: FC<any> = ({
                              openCreateModal,
                              searchValue,
                              setSearchValue,
                              called,
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
                <Box sx={(theme) => ({display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: theme.spacing(4)})}>
                    <Button
                        variant="contained"
                        size={"large"}
                        startIcon={<Icon icon={'eva:plus-fill'}/>}
                        onClick={openCreateModal}
                    >new Campaign</Button>
                </Box>
            </StickySubNavProvider>
            <Box sx={{flex: 1}}>
                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4} sx={{paddingTop: 4, paddingRight: (theme) => theme.spacing(2)}}>
                        {isLoading ? Array.from(Array(5)).map(i => <Grid item xs={12} sm={4}
                                                                         md={3}><CampaignCardSkeleton/></Grid>) : !!campaigns.length ? campaigns.map(campaignItem => (
                            <Grid item xs={12} sm={4} md={3}>
                                <CampaignCard deleteCampaign={deleteCampaign} editCampaign={editCampaign}
                                              campaign={campaignItem}></CampaignCard>
                            </Grid>
                        )) : called && <Box sx={{
                            width: "100%",
                            display: "flex",
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

    const [currentCampaign, setCurrentCampaign] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [createModalState, setCreateModalState] = useState(false);

    const [campaigns, setCampaigns] = useState([]);

    const {enqueueSnackbar} = useSnackbar();
    const {loading: isLoading, error, data: campaignData, called, status, refetch} = useQuery(GET_CAMPAIGNS, {
            variables: {meta: {page: 0, direction: 1, sortBy: "title", limit: 10, filters: []}}
        }
    );

    const [deleteCampaignMutation, {deleteCampaignError}] = useMutation(DELETE_CAMPAIGN, {
        refetchQueries: [
            {
                query: GET_CAMPAIGNS,
                variables: {
                    meta: {page: 0, direction: 1, sortBy: "title", limit: 10, filters: []}
                }
            }
        ]
    });

    useEffect(() => {
        const refetchItems = async () => {
            await refetch({
                meta: {
                    page: 0,
                    direction: 1,
                    sortBy: "title",
                    limit: 10,
                    filters: [{searchParam: "title", searchQuery: searchValue}],
                }
            })
        }
        refetchItems();
    }, [searchValue]);

    useEffect(() => {
        if (campaignData) {
            setCampaigns(campaignData.getCampaigns?.items);
        }
    }, [campaignData])

    useEffect(() => {
        if (error) {
            error.graphQLErrors.forEach(({message}) => {
                enqueueSnackbar(message, {
                    variant: 'error', anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                });
            })
        }
    }, [error]);

    const closeModalHandler = () => {
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
        await deleteCampaignMutation({variables: {ids: [currentCampaign.id]}});
        closeDeleteModalHandler();
        enqueueSnackbar('Campaign successfully removed!');
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
            <Modal update={isEdit} isModalOpen={createModalState} item={currentCampaign}
                   handleCloseModal={closeModalHandler}/>
            <CampaignDeleteModal isModalOpen={deleteModal} handleCloseModal={closeDeleteModalHandler}
                                 agree={agreeDeleteCampaign}/>
            <Content searchValue={searchValue} setSearchValue={setSearchValue} called={called} isLoading={isLoading}
                     campaigns={campaigns} openCreateModal={openCreateModal} editCampaign={editCampaign}
                     deleteCampaign={deleteCampaign}/>
        </Page>
    </>
}
